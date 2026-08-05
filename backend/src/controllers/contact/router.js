const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

const clean = (value, maxLength) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
const singleLine = (value, maxLength) => clean(value, maxLength).replace(/[\r\n]+/g, ' ');

router.post('/', async (req, res, next) => {
  const name = singleLine(req.body.name, 100);
  const email = singleLine(req.body.email, 254).toLowerCase();
  const subject = singleLine(req.body.subject, 160);
  const message = clean(req.body.message, 5000);
  const website = clean(req.body.website, 200);

  // Bots commonly fill fields hidden from people. Return a neutral response to avoid feedback.
  if (website) return res.status(202).json({ accepted: true });

  if (!name || !subject || message.length < 20 || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid contact form data' });
  }

  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASSWORD ||
    !process.env.CONTACT_EMAIL
  ) {
    return next(Object.assign(new Error('Contact service is not configured'), { status: 503 }));
  }

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      requireTLS: process.env.SMTP_ALLOW_INSECURE !== 'true',
      tls: { minVersion: 'TLSv1.2' },
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    await transport.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `[Miserere Mei] ${subject}`,
      text: `Feladó: ${name}\nVálaszcím: ${email}\n\n${message}`,
    });
    return res.status(202).json({ accepted: true });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
