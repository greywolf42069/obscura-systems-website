import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const copyrightText = t('footer.copyright').replace('{year}', currentYear.toString())
  
  return (
    <footer className="border-t border-gray-800 py-10 mt-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-400">{copyrightText}</p>
        <div className="flex items-center gap-6 text-gray-400">
          <a href="#services" className="hover:text-white transition-colors">{t('footer.services')}</a>
          <a href="#about" className="hover:text-white transition-colors">{t('footer.about')}</a>
          <a href="#contact" className="hover:text-white transition-colors">{t('footer.contact')}</a>
          <Link href="/legal" className="hover:text-white transition-colors">{t('footer.legal')}</Link>
        </div>
      </div>
    </footer>
  )
}