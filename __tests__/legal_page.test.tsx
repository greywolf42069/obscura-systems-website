import { render, screen } from '@testing-library/react'
import LegalPage from '@/pages/legal'
import { LanguageProvider } from '@/contexts/LanguageContext'

describe('Legal Page', () => {
  it('renders the Legal component content with translations', () => {
    render(
      <LanguageProvider>
        <LegalPage />
      </LanguageProvider>
    )

    expect(screen.getByText('Legal & Warranty')).toBeInTheDocument()
    expect(screen.getByText(/We use comprehensive contracts/)).toBeInTheDocument()
  })
})