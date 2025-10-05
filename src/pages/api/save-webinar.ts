import type { APIRoute } from 'astro';
import { supabaseServer } from '../../lib/supabaseServer';

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { name = null, email, company_size = null, area = null, webinar_id = null, payment_status = null, payment_id = null, amount_paid = null, metadata = null } = body;
  if (!email) return new Response(JSON.stringify({ error: 'email required' }), { status: 400 });

  try {
    const { data: leadUpsert, error: upsertError } = await supabaseServer.from('leads').upsert({ email, name, lead_type: 'webinar' }, { onConflict: 'email', returning: 'representation' });
    if (upsertError) throw upsertError;
    const lead = Array.isArray(leadUpsert) ? leadUpsert[0] : leadUpsert;

  const normalizedEmail = (email || '').toLowerCase();
  const payload = { webinar_id, lead_id: lead.id, name, email: normalizedEmail, company_size, area, payment_status, payment_id, amount_paid, metadata };
  const { data, error } = await supabaseServer.from('registrations').upsert([payload], { onConflict: 'webinar_id,email', returning: 'representation' });
    if (error) throw error;
    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
};
