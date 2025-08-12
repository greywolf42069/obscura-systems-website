# OBSCURA Security Systems

A professional security systems company website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Multi-language support**: English, Spanish, and Polish
- **Responsive design**: Mobile-first approach with Tailwind CSS
- **Contact form**: Integrated with Nodemailer for lead generation
- **SEO optimized**: Built with Next.js for optimal performance
- **Professional UI**: Clean, modern design focused on security services

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

For the contact form to work, set these environment variables in your Vercel dashboard:

- `SMTP_HOST`: Your email SMTP host (e.g., smtp.gmail.com)
- `SMTP_PORT`: SMTP port (e.g., 587)
- `SMTP_USER`: Your email username
- `SMTP_PASS`: Your email password
- `SMTP_FROM`: The from email address

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint

## Project Structure

```
obscurasystems/
├── components/          # React components
├── contexts/           # React contexts (language)
├── pages/             # Next.js pages
├── styles/            # Global styles
├── public/            # Static assets
├── __tests__/         # Test files
└── contexts/          # Context providers
```

## Deployment

This project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy!

## Testing

All components are covered by unit tests. Run tests with:

```bash
npm test
```

## License

Private - OBSCURA Security Systems