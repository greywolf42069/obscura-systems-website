import { createMocks } from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'

const sendMailMock = jest.fn().mockResolvedValue({ messageId: 'test-id' })
const createTransportMock = jest.fn(() => ({ sendMail: sendMailMock }))

jest.mock('nodemailer', () => ({
  __esModule: true,
  default: { createTransport: createTransportMock },
  createTransport: createTransportMock,
}))

describe('/api/lead', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    sendMailMock.mockClear()
    createTransportMock.mockClear()
    process.env = { ...OLD_ENV, SMTP_FROM: 'sender@example.com' }
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  it('sends email to the fixed lead address with the submitted details', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        message: 'Hello',
        address: '123 St',
        language: 'en'
      }
    })

    // Dynamic import is required: jest.resetModules() must re-evaluate the mocked nodemailer transport.
    const { default: handler } = await import('@/pages/api/lead')
    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(createTransportMock).toHaveBeenCalled()
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'doggy@muse.ai',
        from: 'sender@example.com',
        subject: expect.any(String),
        text: expect.stringContaining('New Consultation Request')
      })
    )
  })

  it('rejects non-POST methods', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'GET' })
    // Dynamic import: see note above; each test needs a freshly mocked module.
    const { default: handler } = await import('@/pages/api/lead')
    await handler(req, res)
    expect(res._getStatusCode()).toBe(405)
  })

  it('validates required fields', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { name: '', email: '', phone: '' }
    })
    // Dynamic import: see note above; each test needs a freshly mocked module.
    const { default: handler } = await import('@/pages/api/lead')
    await handler(req, res)
    expect(res._getStatusCode()).toBe(400)
  })
})
