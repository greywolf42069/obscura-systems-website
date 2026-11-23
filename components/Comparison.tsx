import { useLanguage } from '@/contexts/LanguageContext'

const rows = [
  { key: 'storage', cells: ['comparison.o.storage', 'comparison.r.storage', 'comparison.a.storage'] },
  { key: 'monthly', cells: ['comparison.o.monthly', 'comparison.r.monthly', 'comparison.a.monthly'] },
  { key: 'fiveYear', cells: ['comparison.o.fiveYear', 'comparison.r.fiveYear', 'comparison.a.fiveYear'] },
  { key: 'access', cells: ['comparison.o.access', 'comparison.r.access', 'comparison.a.access'] },
  { key: 'police', cells: ['comparison.o.police', 'comparison.r.police', 'comparison.a.police'] },
] as const

export default function Comparison() {
  const { t } = useLanguage()

  return (
    <section className="py-24 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold">{t('comparison.title')}</h2>
        <p className="text-gray-400 mt-4 max-w-3xl">{t('comparison.subtitle')}</p>

        <div className="mt-10 overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
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
