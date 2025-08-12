import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const bullets = [t('about.hours'), t('about.location'), t('about.support')]
  return (
    <section id="about" className="py-24 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold">{t('about.title')}</h2>
        <p className="text-gray-400 mt-4 max-w-2xl">{t('about.para1')}</p>
        <p className="text-gray-400 mt-4 max-w-2xl">{t('about.para2')}</p>
        <ul className="mt-6 grid md:grid-cols-2 gap-3 text-gray-300">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 inline-block w-2 h-2 rounded-full bg-accent-primary" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}