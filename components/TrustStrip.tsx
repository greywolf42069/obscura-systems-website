import { useLanguage } from '@/contexts/LanguageContext'

export default function TrustStrip() {
  const { t } = useLanguage()
  const items = [t('trust.item1'), t('trust.item2'), t('trust.item3'), t('trust.item4')]

  return (
    <section className="border-y border-gray-800 bg-noir-800/40 py-6" aria-label={t('trust.item1')}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-1 inline-block w-1.5 h-1.5 shrink-0 rounded-full bg-accent-secondary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
