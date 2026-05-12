import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional().nullable(),
  email: z.string().email(),
  message: z.string().min(30),
  lang: z.enum(['pt', 'jp']),
  website: z.string().optional().nullable()
});

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

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const to = process.env.CONTACT_TO_EMAIL ?? user;

    if (!user || !pass || !to) {
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
      replyTo: parsed.data.email,
      subject: `[Site · ${parsed.data.lang.toUpperCase()}] ${parsed.data.name}${company}`,
      text: [
        parsed.data.message,
        '',
        `Nome: ${parsed.data.name}`,
        `Empresa: ${parsed.data.company ?? '-'}`,
        `Email: ${parsed.data.email}`,
        `Idioma: ${parsed.data.lang}`
      ].join('\n')
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[/api/contact]', error);
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 });
  }
}
