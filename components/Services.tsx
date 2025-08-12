import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Services() {
  const { t } = useLanguage()
  const items = [
    t('services.feature1'),
    t('services.feature2'),
    t('services.feature3'),
    t('services.feature4'),
  ]
  return (
    <section id="services" className="py-24 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold">{t('services.title')}</h2>
        <p className="text-gray-400 mt-4 max-w-2xl">{t('services.subtitle')}</p>
        <ul className="mt-8 grid md:grid-cols-2 gap-4 text-gray-300">
          {items.map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 inline-block w-2 h-2 rounded-full bg-accent-primary" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <a href="#contact" className="inline-block mt-8 bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-8 py-3 rounded-lg font-semibold shadow-glow">
          {t('services.ctaRequest')}
        </a>
      </div>
    </section>
  )
}