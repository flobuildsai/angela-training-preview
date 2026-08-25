CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  first_name text,
  email text NOT NULL,
  whatsapp text,
  niche text,
  followers text,
  posting text,
  hours text,
  skill text,
  readiness int,
  score int,
  monthly_views int,
  price int,
  buyers int,
  source text NOT NULL DEFAULT 'creator_funnel',
  close_lead_id text,
  close_synced_at timestamptz,
  close_error text
);

CREATE INDEX leads_close_sync_idx ON public.leads (close_synced_at) WHERE close_synced_at IS NULL;
CREATE INDEX leads_email_idx ON public.leads (lower(email));

GRANT ALL ON public.leads TO service_role;
GRANT SELECT ON public.leads TO authenticated;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));