-- Fix recursive / problematic RLS policies causing 42P17 infinite recursion
-- Timestamp: 2025-09-22

-- 1. QUICK ESTIMATES: Replace subquery to auth.users (can trigger recursion through internal views)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own estimates' AND tablename = 'quick_estimates'
  ) THEN
    DROP POLICY "Users can view their own estimates" ON public.quick_estimates;
  END IF;
END $$;

-- Policy: allow authenticated users to view ONLY their own estimates based on email claim.
-- We avoid querying auth.users or other tables inside the policy to prevent recursion.
CREATE POLICY "Users can view their own estimates" ON public.quick_estimates
FOR SELECT USING (
  email = coalesce(current_setting('request.jwt.claims', true)::json->>'email', '')
);

-- 2. ADMIN USERS policy currently self-references admin_users inside its own policy which can create recursion.
-- Drop and simplify temporarily to authenticated-only until a safer role-based approach is added.
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Admin users can manage admin accounts' AND tablename = 'admin_users'
  ) THEN
    DROP POLICY "Admin users can manage admin accounts" ON public.admin_users;
  END IF;
END $$;

-- Temporary replacement: only allow access if the requesting user's email exists in admin_users WITHOUT self-reference.
-- Achieved via a SECURITY DEFINER function that performs the lookup.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.email = coalesce(current_setting('request.jwt.claims', true)::json->>'email','')
      AND au.is_active = true
  );
$$;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

CREATE POLICY "Admin users can manage admin accounts" ON public.admin_users
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- NOTES:
-- * After deploying, test with: select * from quick_estimates; select * from admin_users;
--   using Supabase SQL editor while impersonating an authenticated user.
-- * Later you can tighten policies (separate SELECT/UPDATE/INSERT if needed).
