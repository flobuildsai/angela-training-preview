REVOKE EXECUTE ON FUNCTION public.claim_orders_for_user(uuid, text) FROM authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated, anon;