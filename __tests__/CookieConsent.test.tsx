import { render, screen, fireEvent } from '@testing-library/react'
import CookieConsent from '@/components/CookieConsent'
import { LanguageProvider } from '@/contexts/LanguageContext'

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

const renderWithProvider = () => render(
  <LanguageProvider>
    <CookieConsent />
  </LanguageProvider>
)

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  it('renders the cookie consent banner when no consent is stored', () => {
    renderWithProvider()
    
    expect(screen.getByText(/We use essential cookies/i)).toBeInTheDocument()
    expect(screen.getByText('Accept')).toBeInTheDocument()
  })

  it('does not render when consent is already given', () => {
    localStorageMock.setItem('obscura_cookie_consent', 'accepted')
    
    renderWithProvider()
    
    expect(screen.queryByText(/We use essential cookies/i)).not.toBeInTheDocument()
  })

  it('stores consent in localStorage and hides banner when accepted', () => {
    renderWithProvider()
    
    fireEvent.click(screen.getByText('Accept'))
    
    expect(localStorageMock.getItem('obscura_cookie_consent')).toBe('accepted')
    expect(screen.queryByText(/We use essential cookies/i)).not.toBeInTheDocument()
  })

  it('handles localStorage errors gracefully', () => {
    // This test verifies the component handles localStorage errors gracefully
    // In practice, the component will render without crashing
    const originalGetItem = localStorageMock.getItem
    localStorageMock.getItem = jest.fn().mockImplementation(() => {
      throw new Error('localStorage is not available')
    })
    
    // Component should not crash when rendering
    expect(() => renderWithProvider()).not.toThrow()
    
    // Restore original method
    localStorageMock.getItem = originalGetItem
  })
})