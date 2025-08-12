import Head from 'next/head'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
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
        <title>OBSCURA Security - Custom Security Solutions Chicago</title>
        <meta name="description" content="Professional custom security camera installation in Chicago. $777 comprehensive consultation and installation. Private CCTV solutions with infrared night vision, motion detection, and intercom systems." />
        <meta name="keywords" content="security cameras Chicago, CCTV installation, custom security solutions, home security, business security, private security, surveillance systems" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "OBSCURA Security",
              "description": "Custom security camera installation and CCTV solutions",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Chicago",
                "addressRegion": "IL"
              },
              "telephone": "Contact via form",
              "email": "phideauxleroux@gmail.com",
              "priceRange": "$777",
              "serviceType": "Security Camera Installation",
              "areaServed": "Chicago, IL"
            })
          }}
        />
      </Head>

      <div className="min-h-screen noir-gradient">
        <Header />
        <main>
          <Hero />
          <Services />
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