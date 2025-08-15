import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import Legal from '@/components/Legal'

export default function LegalPage() {
  return (
    <>
      <Head>
        <title>Legal | OBSCURA</title>
        <meta name="description" content="Legal & Warranty information for OBSCURA Security Systems." />
      </Head>
      <div className="min-h-screen noir-gradient">
        <Header />
        <main>
          <Legal />
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </>
  )
}