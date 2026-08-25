CREATE OR REPLACE FUNCTION public.has_tier(_user_id uuid, _tier access_tier)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.entitlements
    WHERE user_id = _user_id
      AND (
        tier = _tier
        -- 'community' (Programm) enthält den Template-Zugang, aber nicht umgekehrt
        OR (tier = 'community' AND _tier = 'template_club')
      )
  )
$function$;

REVOKE ALL ON FUNCTION public.claim_orders_for_user(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_orders_for_user(uuid, text) TO service_role;

REVOKE ALL ON FUNCTION public.has_tier(uuid, access_tier) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_tier(uuid, access_tier) TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;