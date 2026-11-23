import Head from 'next/head'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import Packages from '@/components/Packages'
import HowItWorks from '@/components/HowItWorks'
import Comparison from '@/components/Comparison'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import FAQ from '@/components/FAQ'
import Legal from '@/components/Legal'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'

export default function Home() {
  return (
    <>
      <Head>
        <title>Security Camera Installation in Chicago | No Subscription, Private CCTV — OBSCURA Security</title>
        <meta name="description" content="Professional security camera installation in Chicago with $375 flat service covering both visits, no subscription, and local storage. Private CCTV with infrared night vision and motion detection." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
        <link rel="canonical" href="https://obscura-theta.vercel.app/" />
        <link rel="alternate" hrefLang="en" href="https://obscura-theta.vercel.app/" />
        <link rel="alternate" hrefLang="es" href="https://obscura-theta.vercel.app/es" />
        <link rel="alternate" hrefLang="pl" href="https://obscura-theta.vercel.app/pl" />
        <link rel="alternate" hrefLang="x-default" href="https://obscura-theta.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OBSCURA Security" />
        <meta property="og:title" content="Security Camera Installation in Chicago | No Subscription, Private CCTV — OBSCURA Security" />
        <meta property="og:description" content="$375 flat service covering consultation and installation. No subscription, footage stays in your home. Chicago security camera installation by trained professionals." />
        <meta property="og:url" content="https://obscura-theta.vercel.app/" />
        <meta property="og:image" content="https://obscura-theta.vercel.app/OBSCURA.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "OBSCURA Security",
              "url": "https://obscura-theta.vercel.app/",
              "description": "Custom security camera installation and CCTV solutions",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Chicago",
                "addressRegion": "IL"
              },
              "email": "doggy@muse.ai",
              "priceRange": "$",
              "serviceType": "Security Camera Installation",
              "areaServed": ["Chicago", "Evanston", "Oak Park", "Naperville", "Schaumburg", "Arlington Heights"],
              "openingHours": "Mo-Su 10:00-18:00",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 41.8781,
                "longitude": -87.6298
              },
            })
          }}
        />
      </Head>

      <div className="min-h-screen noir-gradient">
        <Header />
        <main>
          <Hero />
          <TrustStrip />
          <Services />
          <Packages />
          <HowItWorks />
          <Comparison />
          <About />
          <Contact />
          <FAQ />
          <Legal />
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </>
  )
}