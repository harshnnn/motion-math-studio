-- Enable leaked password protection
UPDATE auth.config 
SET password_config = jsonb_set(
  COALESCE(password_config, '{}'::jsonb),
  '{hibp_enabled}',
  'true'::jsonb
);