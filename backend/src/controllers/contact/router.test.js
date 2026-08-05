const express = require('express');
const request = require('supertest');

const mockSendMail = jest.fn();
jest.mock('nodemailer', () => ({ createTransport: () => ({ sendMail: mockSendMail }) }));
const router = require('./router');

const app = express().use(express.json()).use('/contact', router);

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
});
