CREATE TYPE public.app_role AS ENUM ('admin','member');
CREATE TYPE public.access_tier AS ENUM ('template_club','community');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "own roles select" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.entitlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier public.access_tier NOT NULL,
  source text NOT NULL DEFAULT 'manual',
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, tier)
);
GRANT SELECT ON public.entitlements TO authenticated;
GRANT ALL ON public.entitlements TO service_role;
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_tier(_user_id uuid, _tier public.access_tier)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.entitlements
    WHERE user_id = _user_id
      AND (tier = _tier OR tier = 'community')
  )
$$;

CREATE POLICY "own entitlements select" ON public.entitlements FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage entitlements" ON public.entitlements FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Allgemein',
  description text,
  canva_url text NOT NULL,
  tier public.access_tier NOT NULL DEFAULT 'template_club',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.templates TO authenticated;
GRANT ALL ON public.templates TO service_role;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read templates" ON public.templates FOR SELECT TO authenticated USING (public.has_tier(auth.uid(), tier));
CREATE POLICY "admins manage templates" ON public.templates FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.course_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module text NOT NULL,
  title text NOT NULL,
  description text,
  video_url text,
  resource_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_lessons TO authenticated;
GRANT ALL ON public.course_lessons TO service_role;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "community reads lessons" ON public.course_lessons FOR SELECT TO authenticated USING (public.has_tier(auth.uid(),'community'));
CREATE POLICY "admins manage lessons" ON public.course_lessons FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name')
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'member')
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

INSERT INTO public.templates (title, category, description, canva_url, tier, sort_order) VALUES
('Hook-Story-Offer Reel Cover', 'Reels', 'Cover-Vorlage für Reels mit klarer Hook-Zeile.', 'https://www.canva.com/design/REPLACE_ME_1/view?utm_content=template', 'template_club', 10),
('Carousel: 5 Punkte', 'Carousels', 'Fünfseitiges Karussell für Value-Posts.', 'https://www.canva.com/design/REPLACE_ME_2/view?utm_content=template', 'template_club', 20),
('Story-Umfrage Set', 'Stories', 'Story-Vorlagen für Umfragen und Fragen.', 'https://www.canva.com/design/REPLACE_ME_3/view?utm_content=template', 'template_club', 30),
('Testimonial Post', 'Social Proof', 'Vorlage, um Kundenstimmen hochwertig zu zeigen.', 'https://www.canva.com/design/REPLACE_ME_4/view?utm_content=template', 'template_club', 40),
('Angebots-Launch Serie', 'Launch', 'Fünf Posts für einen kompletten Angebots-Launch.', 'https://www.canva.com/design/REPLACE_ME_5/view?utm_content=template', 'community', 50),
('Salespage Wireframe', 'Offer', 'Canva-Wireframe für deine erste Verkaufsseite.', 'https://www.canva.com/design/REPLACE_ME_6/view?utm_content=template', 'community', 60);

INSERT INTO public.course_lessons (module, title, description, video_url, sort_order) VALUES
('Modul 1 · Fundament', 'Positionierung in 60 Minuten', 'Wofür stehst du und für wen.', NULL, 10),
('Modul 1 · Fundament', 'Content-Formate, die tragen', 'Die drei Formate, die Reichweite bringen.', NULL, 20),
('Modul 2 · Produkt', 'Dein erstes Angebot', 'Vom Können zum verkaufbaren Produkt.', NULL, 30),
('Modul 2 · Produkt', 'Preis und Positionierung', 'Wie du deinen Preis begründest.', NULL, 40),
('Modul 3 · Verkauf', 'Launch-Plan', 'Der Ablauf für deinen ersten Launch.', NULL, 50),
('Modul 3 · Verkauf', 'Verkaufen ohne Druck', 'Verkaufsgespräche und DMs.', NULL, 60);