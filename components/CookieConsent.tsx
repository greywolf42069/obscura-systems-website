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
    <div className="fixed bottom-0 inset-x-0 bg-noir-800/95 backdrop-blur border-t border-gray-700 z-50">
      <div className="container mx-auto px-4 py-2.5 flex items-center gap-3">
        <p className="text-xs sm:text-sm text-gray-300 flex-1 leading-snug">{t('cookie.message')}</p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              try { localStorage.setItem(STORAGE_KEY, ACCEPTED_VALUE) } catch {}
              setVisible(false)
            }}
            className="px-3 py-1.5 text-sm rounded-md bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium"
          >
            {t('cookie.accept')}
          </button>
          <button
            onClick={() => setVisible(false)}
            className="px-3 py-1.5 text-sm rounded-md border border-gray-600 text-gray-200 hover:bg-noir-700"
          >
            {t('cookie.decline')}
          </button>
        </div>
      </div>
    </div>
  )
}
