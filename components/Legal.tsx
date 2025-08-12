import { useLanguage } from '@/contexts/LanguageContext'

export default function Legal() {
  const { t } = useLanguage()
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('legal.title')}</h1>
        
        <h2 className="text-2xl font-semibold mt-10">Contracts & Liability</h2>
        <p className="text-gray-400 mt-2">{t('legal.contractsPara')}</p>

        <h2 className="text-2xl font-semibold mt-10">Privacy Policy</h2>
        <p className="text-gray-400 mt-2">{t('legal.privacyPara')}</p>

        <h2 className="text-2xl font-semibold mt-10">Warranty & Support</h2>
        <p className="text-gray-400 mt-2">{t('legal.warrantyPara')}</p>

        <h2 className="text-2xl font-semibold mt-10">Disclaimer</h2>
        <p className="text-gray-400 mt-2">{t('legal.disclaimerNote')}</p>
      </div>
    </section>
  )
}