import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const STORAGE_KEY = 'obscura_cookie_consent'
const ACCEPTED_VALUE = 'accepted'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    try {
      const accepted = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === ACCEPTED_VALUE
      setVisible(!accepted)
    } catch {
      // If localStorage is unavailable or throws, still render the banner
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 bg-noir-800 border border-gray-700 rounded-lg p-4 shadow-lg z-50">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-gray-300 flex-1">{t('cookie.message')}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              try { localStorage.setItem(STORAGE_KEY, ACCEPTED_VALUE) } catch {}
              setVisible(false)
            }}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium"
          >
            {t('cookie.accept')}
          </button>
          <button
            onClick={() => setVisible(false)}
            className="px-4 py-2 rounded-md border border-gray-600 text-gray-200 hover:bg-noir-700"
          >
            {t('cookie.decline')}
          </button>
        </div>
      </div>
    </div>
  )
}