CREATE TABLE public.admins (
  admin_id uuid NOT NULL DEFAULT gen_random_uuid(),
  username character varying(100) NOT NULL,
  email character varying(255) NULL,
  password_hash text NOT NULL,
  full_name character varying(255) NULL,
  role character varying(50) NULL DEFAULT 'admin',
  is_active boolean NULL DEFAULT true,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT admins_pkey PRIMARY KEY (admin_id),
  CONSTRAINT admins_username_key UNIQUE (username),
  CONSTRAINT admins_email_key UNIQUE (email)
);

CREATE TRIGGER trigger_update_admins_updated_at
BEFORE UPDATE ON public.admins
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

