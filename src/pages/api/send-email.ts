import type { APIRoute } from 'astro';
import { supabaseServer } from '../../lib/supabaseServer';

// Provider-agnostic email endpoint. Plug your provider (SendGrid, Postmark, SES, etc.) later.
export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { to, subject, html, text, assessment_id = null } = body;
  if (!to || !subject || (!html && !text)) return new Response(JSON.stringify({ error: 'invalid payload' }), { status: 400 });

  // Optional: record email send attempts in Supabase
  try {
    await supabaseServer.from('emails').insert([{ to, subject, body: { html, text }, assessment_id }]);
  } catch (e) {
    // ignore logging error
    console.warn('could not insert email log', e);
  }

  // If provider env is configured, forward the request. Otherwise return success so you can wire later.
  const PROVIDER = process.env.EMAIL_PROVIDER || null;
  if (!PROVIDER) {
    // For now, just return success — will be handled later when provider is configured.
    return new Response(JSON.stringify({ success: true, queued: true }), { status: 200 });
  }

  // Example provider hook placeholder (not implemented):
  // if (PROVIDER === 'sendgrid') { call sendgrid API }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
