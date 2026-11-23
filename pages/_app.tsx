import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { LanguageProvider } from '@/contexts/LanguageContext'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const locale = ((router.locale as 'en' | 'es' | 'pl') || 'en')
  return (
    <LanguageProvider locale={locale}>
      <Component {...pageProps} />
    </LanguageProvider>
  )
}
