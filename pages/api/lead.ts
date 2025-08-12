import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  // Using Gmail via OAuth2 would be ideal, but for simplicity, we use direct. On Vercel, set SMTP env vars later.
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { name, email, phone, message, address, language } = req.body || {}
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const text = `New Consultation Request\n\n` +
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address || 'N/A'}\nLanguage: ${language || 'en'}\n\nMessage:\n${message || 'N/A'}`

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@obscura.local',
      to: 'phideauxleroux@gmail.com',
      subject: 'OBSCURA Security – New Consultation Request',
      text
    })

    return res.status(200).json({ message: 'Request sent' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Failed to send' })
  }
}