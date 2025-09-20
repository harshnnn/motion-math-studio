-- Create admin authentication table
CREATE TABLE public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  email text NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active boolean NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create admin access policy (only authenticated admins can access)
CREATE POLICY "Admin users can manage admin accounts" 
ON public.admin_users 
FOR ALL
USING (auth.uid() IN (
  SELECT user_id FROM public.profiles WHERE email IN (
    SELECT email FROM public.admin_users WHERE is_active = true
  )
));

-- Insert default admin user (username: admin, password: admin123)
-- In production, change this immediately!
INSERT INTO public.admin_users (username, password_hash, email) 
VALUES ('admin', '$2b$10$rOBKUv.zEO3Kt0qGiNSBT.fDNKzO3Qa7qV4ggRBf0C4P4g8fKiJ5G', 'admin@mathinmotion.com');

-- Add trigger for updated_at
CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON public.admin_users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add admin role to project status for tracking
ALTER TYPE public.project_status ADD VALUE IF NOT EXISTS 'assigned_to_animator';
ALTER TYPE public.project_status ADD VALUE IF NOT EXISTS 'in_revision';
