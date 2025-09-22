-- Notifications & Project Messages Schema Migration
-- Adds user-facing notifications, project-specific messaging, and automatic
-- status change notifications for project owners.

-- Safety: required extension for gen_random_uuid (if not already present)
create extension if not exists "pgcrypto";

-- Notifications table
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  type text not null default 'general', -- e.g. general, status_change, message
  title text not null,
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

comment on table public.notifications is 'End-user notifications including project status changes and messages.';
create index if not exists idx_notifications_user_created on public.notifications(user_id, created_at desc);
create index if not exists idx_notifications_project on public.notifications(project_id);

alter table public.notifications enable row level security;

-- Allow users (or admins) to manage their notifications
drop policy if exists "notifications_select_own" on public.notifications;
create policy "notifications_select_own" on public.notifications
  for select using (auth.uid() = user_id);

drop policy if exists "notifications_update_mark_read" on public.notifications;
create policy "notifications_update_mark_read" on public.notifications
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Insert allowed for self or admins (so admin can push notifications to users)
drop policy if exists "notifications_insert_self_or_admin" on public.notifications;
create policy "notifications_insert_self_or_admin" on public.notifications
  for insert with check (
    auth.uid() = user_id
    or exists (select 1 from public.admin_users au where au.user_id = auth.uid())
  );

-- Project messages table
create table if not exists public.project_messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

comment on table public.project_messages is 'Per-project conversation between client and admins.';
create index if not exists idx_project_messages_project_created on public.project_messages(project_id, created_at desc);

alter table public.project_messages enable row level security;

-- Select messages where you are sender OR you own the project
drop policy if exists "project_messages_select" on public.project_messages;
create policy "project_messages_select" on public.project_messages
  for select using (
    sender_id = auth.uid() OR
    exists (
      select 1 from public.projects p where p.id = project_messages.project_id and p.user_id = auth.uid()
    ) OR
    exists (
      select 1 from public.admin_users au where au.user_id = auth.uid()
    )
  );

-- Insert messages when you are sender and you own the project or are admin
drop policy if exists "project_messages_insert" on public.project_messages;
create policy "project_messages_insert" on public.project_messages
  for insert with check (
    sender_id = auth.uid() AND (
      exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()) OR
      exists (select 1 from public.admin_users au where au.user_id = auth.uid())
    )
  );

-- Trigger to auto-create notification on project status change
create or replace function public.notify_project_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if TG_OP = 'UPDATE' and NEW.status is distinct from OLD.status then
    insert into public.notifications(user_id, project_id, type, title, message)
    values (
      NEW.user_id,
      NEW.id,
      'status_change',
      'Project status updated',
      format('Status changed from %s to %s', coalesce(OLD.status,'(none)'), NEW.status)
    );
  end if;
  return NEW;
end;
$$;

-- Create trigger if not exists (drop first to avoid duplicates)
drop trigger if exists trg_project_status_change on public.projects;
create trigger trg_project_status_change
after update on public.projects
for each row
when (OLD.status is distinct from NEW.status)
execute function public.notify_project_status_change();

-- Optional: notification on new message for other party (handled at app layer for now)
-- Could be implemented later with another trigger referencing project_messages.

-- End of migration
