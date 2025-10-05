import type { APIRoute } from 'astro';
import { supabaseServer } from '../../lib/supabaseServer';

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { email, score, responses = {}, name = null } = body;
  if (!email) return new Response(JSON.stringify({ error: 'email required' }), { status: 400 });

  try {
    const { data: leadUpsert, error: upsertError } = await supabaseServer.from('leads').upsert({ email, name, lead_type: 'assessment' }, { onConflict: 'email', returning: 'representation' });
    if (upsertError) throw upsertError;
    const lead = Array.isArray(leadUpsert) ? leadUpsert[0] : leadUpsert;

    const { data, error } = await supabaseServer.from('assessments').insert([{ lead_id: lead.id, score: Number(score), responses }]);
    if (error) throw error;
    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
};
