-- Add new status values to the project_status enum
ALTER TYPE project_status ADD VALUE IF NOT EXISTS 'under_review';
ALTER TYPE project_status ADD VALUE IF NOT EXISTS 'rejected';
ALTER TYPE project_status ADD VALUE IF NOT EXISTS 'negotiation'; 
ALTER TYPE project_status ADD VALUE IF NOT EXISTS 'accepted';
ALTER TYPE project_status ADD VALUE IF NOT EXISTS 'payment_pending';
ALTER TYPE project_status ADD VALUE IF NOT EXISTS 'under_process';

-- Update the default status for new projects to be 'under_review' when submitted
ALTER TABLE projects ALTER COLUMN status SET DEFAULT 'under_review';