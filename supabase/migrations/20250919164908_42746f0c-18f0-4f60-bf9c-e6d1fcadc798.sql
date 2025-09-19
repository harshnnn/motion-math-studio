-- Add new status values to the project_status enum one by one
ALTER TYPE project_status ADD VALUE 'under_review';
ALTER TYPE project_status ADD VALUE 'rejected';
ALTER TYPE project_status ADD VALUE 'negotiation';
ALTER TYPE project_status ADD VALUE 'accepted';
ALTER TYPE project_status ADD VALUE 'payment_pending';
ALTER TYPE project_status ADD VALUE 'under_process';