import { render, screen, act } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'
import { useEffect } from 'react'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    },
  }
})() 

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Test component that uses the language context
const TestComponent = () => {
  const { lang, setLang } = useLanguage()
  
  return (
    <div>
      <div data-testid="current-lang">{lang}</div>
      <button data-testid="set-es" onClick={() => setLang('es')}>Set Spanish</button>
      <button data-testid="set-pl" onClick={() => setLang('pl')}>Set Polish</button>
    </div>
  )
}

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('provides default language as English', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    expect(screen.getByTestId('current-lang').textContent).toBe('en')
  })

  it('allows changing the language', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    act(() => {
      screen.getByTestId('set-es').click()
    })

    expect(screen.getByTestId('current-lang').textContent).toBe('es')
  })

  it('persists language preference in localStorage', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    act(() => {
      screen.getByTestId('set-pl').click()
    })

    expect(localStorageMock.getItem('obscura_lang')).toBe('pl')
  })

  it('loads language preference from localStorage', () => {
    localStorageMock.setItem('obscura_lang', 'es')
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    expect(screen.getByTestId('current-lang').textContent).toBe('es')
  })
})