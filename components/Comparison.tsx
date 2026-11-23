import { useLanguage } from '@/contexts/LanguageContext'

const rows = [
  { key: 'storage', cells: ['comparison.o.storage', 'comparison.r.storage', 'comparison.a.storage'] },
  { key: 'monthly', cells: ['comparison.o.monthly', 'comparison.r.monthly', 'comparison.a.monthly'] },
  { key: 'fiveYear', cells: ['comparison.o.fiveYear', 'comparison.r.fiveYear', 'comparison.a.fiveYear'] },
  { key: 'access', cells: ['comparison.o.access', 'comparison.r.access', 'comparison.a.access'] },
  { key: 'police', cells: ['comparison.o.police', 'comparison.r.police', 'comparison.a.police'] },
] as const

const providers = [
  { nameKey: 'comparison.col.obscura', cellIdx: 0, highlight: true },
  { nameKey: 'comparison.col.ring', cellIdx: 1, highlight: false },
  { nameKey: 'comparison.col.adt', cellIdx: 2, highlight: false },
] as const

export default function Comparison() {
  const { t } = useLanguage()

  return (
    <section className="py-24 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold">{t('comparison.title')}</h2>
        <p className="text-gray-400 mt-4 max-w-3xl">{t('comparison.subtitle')}</p>

        {/* Mobile: stacked provider cards */}
        <div className="mt-10 space-y-4 md:hidden">
          {providers.map((p) => (
            <div
              key={p.nameKey}
              className={`rounded-xl border p-5 ${p.highlight ? 'border-accent-primary bg-noir-800 shadow-glow' : 'border-gray-800 bg-noir-800/50'}`}
            >
              <h3 className={`text-lg font-bold ${p.highlight ? 'text-accent-secondary' : 'text-gray-200'}`}>
                {t(p.nameKey)}
              </h3>
              <dl className="mt-3 space-y-2 text-sm">
                {rows.map((row) => (
                  <div key={row.key} className="flex flex-col">
                    <dt className="text-gray-500">{t(`comparison.row.${row.key}`)}</dt>
                    <dd className={p.highlight ? 'text-gray-100' : 'text-gray-400'}>{t(row.cells[p.cellIdx])}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        {/* Desktop / tablet: table */}
        <div className="mt-10 hidden overflow-x-auto rounded-xl border border-gray-800 md:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-noir-800 text-gray-200">
                <th className="p-4 font-semibold">{t('comparison.col.provider')}</th>
                <th className="p-4 font-semibold text-accent-secondary">{t('comparison.col.obscura')}</th>
                <th className="p-4 font-semibold">{t('comparison.col.ring')}</th>
                <th className="p-4 font-semibold">{t('comparison.col.adt')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-t border-gray-800 align-top">
                  <th scope="row" className="p-4 font-medium text-gray-300">{t(`comparison.row.${row.key}`)}</th>
                  {row.cells.map((cell, i) => (
                    <td key={i} className={`p-4 ${i === 0 ? 'text-gray-100' : 'text-gray-400'}`}>
                      {t(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
