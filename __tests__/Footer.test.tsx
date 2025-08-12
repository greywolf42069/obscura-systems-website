import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'

describe('Footer', () => {
  it('renders copyright with current year', () => {
    const currentYear = new Date().getFullYear()
    
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    )

    const copyrightText = screen.getByText(new RegExp(`© ${currentYear} OBSCURA`))
    expect(copyrightText).toBeInTheDocument()
  })

  it('renders all footer links', () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    )

    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Legal')).toBeInTheDocument()
  })
})