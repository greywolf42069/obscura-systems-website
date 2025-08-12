import { useLanguage } from '../contexts/LanguageContext'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const { t } = useLanguage()

  const faqItems: FAQItem[] = [
    {
      question: t('faq.question1'),
      answer: t('faq.answer1')
    },
    {
      question: t('faq.question2'),
      answer: t('faq.answer2')
    },
    {
      question: t('faq.question3'),
      answer: t('faq.answer3')
    },
    {
      question: t('faq.question4'),
      answer: t('faq.answer4')
    },
    {
      question: t('faq.question5'),
      answer: t('faq.answer5')
    },
    {
      question: t('faq.question6'),
      answer: t('faq.answer6')
    },
    {
      question: t('faq.question7'),
      answer: t('faq.answer7')
    },
    {
      question: t('faq.question8'),
      answer: t('faq.answer8')
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('faq.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.question}
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            {t('faq.serviceArea')}: <strong>Chicago, IL and surrounding areas including North Shore, South Suburbs, and West Suburbs</strong>
          </p>
        </div>
      </div>
    </section>
  )
}