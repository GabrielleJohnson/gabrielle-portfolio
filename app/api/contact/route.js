import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req) {
  const { firstname, lastname, email, message } = await req.json()

  // ── Validation ─────────────────────────────────────────────
  const errors = {}

  if (!firstname || firstname.trim() === '') {
    errors.firstname = 'First name is required.'
  }
  if (!lastname || lastname.trim() === '') {
    errors.lastname = 'Last name is required.'
  }
  if (!email || email.trim() === '') {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!message || message.trim() === '') {
    errors.message = 'Message is required.'
  } else if (message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 })
  }

  // ── Send email ─────────────────────────────────────────────
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.verify()

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New message from ${firstname} ${lastname}`,
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${firstname} ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Mail error:', err)
    return NextResponse.json(
      { success: false, errors: { server: `Failed to send: ${err.message}` } },
      { status: 500 }
    )
  }
}