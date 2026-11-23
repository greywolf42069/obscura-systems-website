import { useLanguage } from '@/contexts/LanguageContext'

const steps = [1, 2, 3] as const

export default function HowItWorks() {
  const { t } = useLanguage()

  return (
    <section className="py-24 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold">{t('how.title')}</h2>
        <p className="text-gray-400 mt-4 max-w-2xl">{t('how.subtitle')}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step} className="rounded-xl border border-gray-800 bg-noir-800 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary font-bold text-white">
                {step}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{t(`how.step${step}.title`)}</h3>
              <p className="mt-2 text-gray-400">{t(`how.step${step}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
