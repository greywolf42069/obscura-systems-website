import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqItems: FAQItem[] = [
    { question: t('faq.question1'), answer: t('faq.answer1') },
    { question: t('faq.question2'), answer: t('faq.answer2') },
    { question: t('faq.question3'), answer: t('faq.answer3') },
    { question: t('faq.question4'), answer: t('faq.answer4') },
    { question: t('faq.question5'), answer: t('faq.answer5') },
    { question: t('faq.question6'), answer: t('faq.answer6') },
    { question: t('faq.question7'), answer: t('faq.answer7') },
    { question: t('faq.question8'), answer: t('faq.answer8') },
    { question: t('faq.question9'), answer: t('faq.answer9') }
  ]

  return (
    <section className="py-16 bg-noir-900 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-100 sm:text-4xl">
            {t('faq.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => {
            const open = openIndex === index
            return (
              <div key={index} className="bg-noir-800 rounded-lg border border-gray-800 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-base sm:text-lg font-semibold text-gray-100">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 text-accent-secondary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  >
                    ▾
                  </span>
                </button>
                {open && (
                  <p className="px-5 pb-5 text-gray-400 leading-relaxed">
                    {item.answer}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            {t('faq.serviceArea')}: <strong>Chicago, IL and surrounding areas including North Shore, South Suburbs, and West Suburbs</strong>
          </p>
          <a
            href="#contact"
            className="mt-6 inline-block rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary px-6 py-3 font-semibold text-white shadow-glow"
          >
            {t('hero.ctaBook')}
          </a>
        </div>
      </div>
    </section>
  )
}
