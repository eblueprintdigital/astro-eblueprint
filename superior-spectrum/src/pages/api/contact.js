export const prerender = false;

import nodemailer from 'nodemailer';

async function verifyRecaptcha(token) {
  const secretKey = import.meta.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    }
  );

  const data = await response.json();

  // For v3, we also check the score
  if (data.success && data.score >= 0.5) {
    return true;
  }
  return false;
}

export async function POST({ request }) {
  const { name, email, subject, message, recaptchaResponse } =
    await request.json();

  // Verify reCAPTCHA first
  try {
    const isRecaptchaValid = await verifyRecaptcha(recaptchaResponse);
    if (!isRecaptchaValid) {
      return new Response(
        JSON.stringify({
          error:
            'reCAPTCHA verification failed. Please try again or contact support if the issue persists.',
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to verify reCAPTCHA' }),
      { status: 500 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: import.meta.env.EMAIL_USER,
        pass: import.meta.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: import.meta.env.EMAIL_USER,
      subject: subject,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
    });
  }
}
