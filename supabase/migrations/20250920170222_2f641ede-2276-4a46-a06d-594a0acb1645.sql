-- Fix recursive RLS policy on admin_users that caused infinite recursion
-- Previous policy referenced admin_users inside a subquery of a policy on admin_users
-- which leads PostgREST/Supabase to detect infinite recursion when evaluating.

-- Safe rollback guard: only drop if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'admin_users' AND policyname = 'Admin users can manage admin accounts'
  ) THEN
    EXECUTE 'DROP POLICY "Admin users can manage admin accounts" ON public.admin_users';
  END IF;
END $$;

-- Option A (recommended): Restrict all access to authenticated users whose profile email matches the admin user row.
-- This still assumes your admin auth flows through Supabase auth (i.e., you log in via auth.users, not custom password logic here).
-- Adjust as needed if you later introduce an explicit mapping.
CREATE POLICY "Admins can read their admin row" ON public.admin_users
FOR SELECT USING (
  is_active = true AND
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.email = admin_users.email
      AND p.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can update their admin row" ON public.admin_users
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.email = admin_users.email
      AND p.user_id = auth.uid()
  )
) WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.email = admin_users.email
      AND p.user_id = auth.uid()
  )
);

-- If you want to allow only a super-admin to insert/delete, you can later replace these with a dedicated role or flag.
-- For now we disable open insert/delete by omitting policies (RLS will block them by default).
-- Uncomment and adapt if needed:
-- CREATE POLICY "Admins can insert admin rows" ON public.admin_users
-- FOR INSERT WITH CHECK (false);
-- CREATE POLICY "Admins can delete admin rows" ON public.admin_users
-- FOR DELETE USING (false);

-- NOTE: If you intended a separate credential system (username/password in this table) for admins
-- you should NOT expose password_hash via direct SELECT from the browser. Instead create a Postgres
-- function (SECURITY DEFINER) or an Edge Function to perform credential verification server-side.
-- Keeping this migration focused solely on removing recursion.
