CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text NOT NULL,
  stripe_session_id text UNIQUE,
  stripe_customer_id text,
  stripe_subscription_id text,
  product_id text,
  price_id text NOT NULL,
  tier access_tier NOT NULL,
  amount_total integer,
  currency text NOT NULL DEFAULT 'eur',
  status text NOT NULL DEFAULT 'paid',
  installments_paid integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own orders select" ON public.orders
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins manage orders" ON public.orders
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX orders_email_idx ON public.orders (lower(email));

-- Links paid orders to a user account and grants the matching access tier.
CREATE OR REPLACE FUNCTION public.claim_orders_for_user(_user_id uuid, _email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _email IS NULL THEN
    RETURN;
  END IF;

  UPDATE public.orders
     SET user_id = _user_id
   WHERE user_id IS NULL
     AND lower(email) = lower(_email);

  INSERT INTO public.entitlements (user_id, tier, source, note)
  SELECT _user_id, o.tier, 'stripe', o.price_id
    FROM public.orders o
   WHERE o.user_id = _user_id
     AND o.status = 'paid'
     AND NOT EXISTS (
       SELECT 1 FROM public.entitlements e
        WHERE e.user_id = _user_id AND e.tier = o.tier
     );
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name')
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'member')
  ON CONFLICT DO NOTHING;
  PERFORM public.claim_orders_for_user(NEW.id, NEW.email);
  RETURN NEW;
END;
$$;