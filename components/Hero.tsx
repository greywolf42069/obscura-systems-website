import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  return (
    <section className="pt-24 md:pt-28 pb-16 md:pb-20">
      <div className="container mx-auto px-6 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[2rem] leading-snug sm:text-5xl lg:text-6xl lg:leading-tight font-extrabold"
          >
            {t('hero.title')}
          </motion.h1>
          <p className="text-gray-400 mt-4 max-w-2xl">{t('hero.subtitle')}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-6 py-3 rounded-lg font-semibold shadow-glow">{t('hero.ctaBook')}</a>
            <a href="#packages" className="border border-gray-700 text-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-noir-800">{t('hero.ctaExplore')}</a>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-gray-300">
            <span className="mt-1.5 inline-block w-1.5 h-1.5 shrink-0 rounded-full bg-accent-secondary" />
            <span>{t('trust.item1')}</span>
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 text-gray-400">
            <div>{t('hero.feature1')}</div>
            <div>{t('hero.feature2')}</div>
            <div>{t('hero.feature3')}</div>
            <div>{t('hero.feature4')}</div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-700 bg-noir-800 p-8 shadow-glow">
          <p className="text-sm uppercase tracking-widest text-gray-400">{t('hero.card.title')}</p>
          <p className="mt-3 text-6xl font-extrabold text-white">
            $375
            <span className="ml-2 align-middle text-base font-medium text-gray-400">{t('hero.card.once')}</span>
          </p>
          <ul className="mt-6 space-y-3 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 inline-block w-1.5 h-1.5 shrink-0 rounded-full bg-accent-secondary" />
              <span>{t('hero.card.line1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 inline-block w-1.5 h-1.5 shrink-0 rounded-full bg-accent-secondary" />
              <span>{t('hero.card.line2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 inline-block w-1.5 h-1.5 shrink-0 rounded-full bg-accent-secondary" />
              <span>{t('hero.card.line3')}</span>
            </li>
          </ul>
          <a href="#contact" className="mt-8 inline-block w-full rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary px-6 py-3 text-center font-semibold text-white shadow-glow">
            {t('hero.ctaBook')}
          </a>
        </div>
      </div>
    </section>
  )
}
