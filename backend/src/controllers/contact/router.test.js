const express = require('express');
const request = require('supertest');

const mockSendMail = jest.fn();
jest.mock('nodemailer', () => ({ createTransport: () => ({ sendMail: mockSendMail }) }));
const router = require('./router');

const app = express()
  .use(express.json())
  .use('/contact', router)
  .use((err, req, res, _next) => res.status(err.status || 500).json({ message: err.message }));

const validMessage = {
  name: 'Test User',
  email: 'sender@example.com',
  subject: 'Question',
  message: 'This is a sufficiently long private message.',
};

describe('contact endpoint', () => {
  beforeEach(() => {
    mockSendMail.mockReset().mockResolvedValue({ messageId: 'test' });
    Object.assign(process.env, {
      SMTP_HOST: 'smtp.example.com',
      SMTP_PORT: '587',
      SMTP_USER: 'user',
      SMTP_PASSWORD: 'secret',
      CONTACT_EMAIL: 'private-target@example.com',
    });
  });

  test('silently accepts honeypot submissions without sending mail', async () => {
    await request(app).post('/contact').send({ website: 'https://spam.example' }).expect(202);
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  test('rejects invalid messages', async () => {
    await request(app).post('/contact').send({ name: 'Test', email: 'invalid' }).expect(400);
  });

  test('forwards valid messages without exposing the target address', async () => {
    const response = await request(app)
      .post('/contact')
      .send({
        name: 'Test User',
        email: 'sender@example.com',
        subject: 'Question',
        message: 'This is a sufficiently long private message.',
        website: '',
      })
      .expect(202);
    expect(response.body).toEqual({ accepted: true });
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'private-target@example.com', replyTo: 'sender@example.com' })
    );
  });

  test('strips header-injection attempts from single-line fields', async () => {
    await request(app)
      .post('/contact')
      .send({ ...validMessage, subject: 'Hi\r\nBcc: victim@example.com' })
      .expect(202);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({ subject: '[Miserere Mei] Hi Bcc: victim@example.com' })
    );
  });

  test('reports 503 when the mail transport is not configured', async () => {
    delete process.env.SMTP_HOST;
    await request(app).post('/contact').send(validMessage).expect(503);
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  test('passes transport failures to the error handler', async () => {
    mockSendMail.mockRejectedValueOnce(new Error('SMTP down'));
    await request(app).post('/contact').send(validMessage).expect(500);
  });
});
