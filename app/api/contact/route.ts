import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional().nullable(),
  email: z.union([z.string().email(), z.literal('')]).optional().nullable(),
  phone: z.string().optional().nullable(),
  social: z.string().optional().nullable(),
  country_timezone: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  offer_summary: z.string().optional().nullable(),
  tried_before: z.string().optional().nullable(),
  looking_for: z.string().optional().nullable(),
  bottlenecks: z.array(z.string()).optional().default([]),
  start_timing: z.string().optional().nullable(),
  decision_context: z.string().optional().nullable(),
  paid_diagnostic_readiness: z.string().optional().nullable(),
  message: z.string().min(30),
  preferred_contact: z.array(z.enum(['email', 'phone', 'social'])).min(1),
  lang: z.enum(['pt', 'jp']),
  track: z.enum(['home', 'presenca', 'estrutura', 'diagnostico']).default('home'),
  source_path: z.string().optional().nullable(),
  website: z.string().optional().nullable()
});

async function saveToSupabase(data: z.infer<typeof ContactSchema>) {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return false;
  }

  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/contact_submissions`;
  const headers = {
    apikey: serviceKey,
    authorization: `Bearer ${serviceKey}`,
    'content-type': 'application/json',
    prefer: 'return=minimal'
  };
  const triageNotes = [
    data.bottlenecks.length ? `Gargalos: ${data.bottlenecks.join(', ')}` : null,
    data.country_timezone ? `Pais/fuso: ${data.country_timezone}` : null,
    data.website_url ? `Site/redes: ${data.website_url}` : null,
    data.offer_summary ? `Oferta: ${data.offer_summary}` : null,
    data.tried_before ? `Ja tentou: ${data.tried_before}` : null,
    data.looking_for ? `Busca: ${data.looking_for}` : null,
    data.start_timing ? `Inicio: ${data.start_timing}` : null,
    data.decision_context ? `Decisao: ${data.decision_context}` : null,
    data.paid_diagnostic_readiness ? `Diagnostico pago: ${data.paid_diagnostic_readiness}` : null
  ].filter(Boolean);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: data.name,
      company: data.company || null,
      email: data.email,
      phone: data.phone || null,
      social: data.social || null,
      country_timezone: data.country_timezone || null,
      website_url: data.website_url || null,
      offer_summary: data.offer_summary || null,
      tried_before: data.tried_before || null,
      looking_for: data.looking_for || null,
      bottlenecks: data.bottlenecks,
      start_timing: data.start_timing || null,
      decision_context: data.decision_context || null,
      paid_diagnostic_readiness: data.paid_diagnostic_readiness || null,
      message: data.message,
      preferred_contact: data.preferred_contact,
      lang: data.lang,
      track: data.track,
      source_path: data.source_path || null
    })
  });

  if (!response.ok) {
    const fallback = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: data.name,
        company: data.company || null,
        email: data.email || null,
        phone: data.phone || null,
        social: data.social || null,
        message: triageNotes.length ? `${data.message}\n\n${triageNotes.join('\n')}` : data.message,
        preferred_contact: data.preferred_contact,
        lang: data.lang,
        track: data.track,
        source_path: data.source_path || null
      })
    });

    if (!fallback.ok) {
      throw new Error(`supabase_insert_failed:${response.status}:${fallback.status}`);
    }
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const saved = await saveToSupabase(parsed.data);

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const to = process.env.CONTACT_TO_EMAIL ?? user;

    if (!user || !pass || !to) {
      if (saved) {
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json({ ok: false, error: 'missing_env' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass }
    });

    const company = parsed.data.company ? ` · ${parsed.data.company}` : '';

    await transporter.sendMail({
      from: `"Site palomaalbieri.com" <${user}>`,
      to,
      replyTo: parsed.data.email || undefined,
      subject: `[Site · ${parsed.data.track} · ${parsed.data.lang.toUpperCase()}] ${parsed.data.name}${company}`,
      text: [
        parsed.data.message,
        '',
        `Nome: ${parsed.data.name}`,
        `Empresa: ${parsed.data.company ?? '-'}`,
        `Email: ${parsed.data.email || '-'}`,
        `Telefone/WhatsApp: ${parsed.data.phone ?? '-'}`,
        `Rede social: ${parsed.data.social ?? '-'}`,
        `Pais/fuso: ${parsed.data.country_timezone || '-'}`,
        `Site/redes: ${parsed.data.website_url || '-'}`,
        `O que oferece: ${parsed.data.offer_summary || '-'}`,
        `Gargalos selecionados: ${parsed.data.bottlenecks.length ? parsed.data.bottlenecks.join(', ') : '-'}`,
        `O que ja tentou: ${parsed.data.tried_before || '-'}`,
        `Busca: ${parsed.data.looking_for || '-'}`,
        `Quando pretende comecar: ${parsed.data.start_timing || '-'}`,
        `Quem decide: ${parsed.data.decision_context || '-'}`,
        `Aberto(a) a diagnostico pago: ${parsed.data.paid_diagnostic_readiness || '-'}`,
        `Canais preferidos: ${parsed.data.preferred_contact.join(', ')}`,
        `Idioma: ${parsed.data.lang}`,
        `Trilha: ${parsed.data.track}`,
        `Origem: ${parsed.data.source_path ?? '-'}`
      ].join('\n')
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[/api/contact]', error);
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 });
  }
}
