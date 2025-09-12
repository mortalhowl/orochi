// supabase/functions/_shared/cors.ts
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Trong production, bạn nên thay '*' bằng domain của website
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};