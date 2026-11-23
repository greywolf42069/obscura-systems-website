import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  return (
    <section className="pt-28 pb-20">
      <div className="container mx-auto px-6 grid items-center gap-10 md:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            {t('hero.title')}
          </motion.h1>
          <p className="text-gray-400 mt-4 max-w-2xl">{t('hero.subtitle')}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-6 py-3 rounded-lg font-semibold shadow-glow">{t('hero.ctaBook')}</a>
            <a href="#services" className="border border-gray-700 text-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-noir-800">{t('hero.ctaExplore')}</a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 text-gray-400">
            <div>{t('hero.feature1')}</div>
            <div>{t('hero.feature2')}</div>
            <div>{t('hero.feature3')}</div>
            <div>{t('hero.feature4')}</div>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/CUSTOM%20SECURITY.jpeg"
            alt={t('hero.imageAlt')}
            width={1024}
            height={1401}
            className="w-full h-auto rounded-2xl object-cover shadow-glow"
            priority
          />
        </div>
      </div>
    </section>
  )
}
