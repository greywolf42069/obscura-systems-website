import { useLanguage } from '@/contexts/LanguageContext'

type PackageKey = 'wireless' | 'wired' | 'big'

const packages: { key: PackageKey; popular?: boolean }[] = [
  { key: 'wireless' },
  { key: 'wired', popular: true },
  { key: 'big' },
]

export default function Packages() {
  const { t } = useLanguage()

  return (
    <section id="packages" className="py-24 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold">{t('packages.title')}</h2>
        <p className="text-gray-400 mt-4 max-w-3xl">{t('packages.subtitle')}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {packages.map(({ key, popular }) => (
            <div
              key={key}
              className="relative flex flex-col rounded-xl border border-gray-800 bg-noir-800 p-6 shadow-glow"
            >
              {popular && (
                <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary px-3 py-1 text-xs font-semibold text-white">
                  {t('packages.popular')}
                </span>
              )}
              <h3 className="text-2xl font-bold">{t(`packages.${key}.name`)}</h3>
              <p className="mt-2 text-sm text-accent-secondary">{t(`packages.${key}.for`)}</p>

              <ul className="mt-5 grow space-y-2 text-sm text-gray-300">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="flex items-start gap-2">
                    <span className="mt-1 inline-block w-1.5 h-1.5 shrink-0 rounded-full bg-accent-primary" />
                    <span>{t(`packages.${key}.eq${n}`)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-gray-700 pt-4 text-sm">
                <p className="text-gray-400">
                  {t('packages.equipmentLabel')}: <span className="font-semibold text-gray-200">{t(`packages.${key}.equipmentCost`)}</span>
                </p>
                <p className="mt-1 text-gray-400">{t('packages.serviceCost')}</p>
                <p className="mt-2 text-gray-300">
                  {t('packages.totalLabel')}: <span className="font-bold text-accent-secondary">{t(`packages.${key}.total`)}</span>
                </p>
              </div>

              <a
                href="#contact"
                className="mt-6 inline-block rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary px-6 py-3 text-center font-semibold text-white shadow-glow"
              >
                {t('packages.cta')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
