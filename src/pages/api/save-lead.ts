import type { APIRoute } from 'astro';
import { supabaseServer } from '../../lib/supabaseServer';

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { email, name = null, lead_type = 'newsletter', company_size = null, area = null, metadata = null } = body;
  if (!email) return new Response(JSON.stringify({ error: 'email required' }), { status: 400 });

  // Upsert: try inserting; if conflict on email, update
  try {
    const { data, error } = await supabaseServer.from('leads').upsert({ email, name, lead_type, company_size, area, metadata }, { onConflict: 'email' });
    if (error) throw error;
    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'supabase error' }), { status: 500 });
  }
};
