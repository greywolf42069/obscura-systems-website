import { render, screen } from '@testing-library/react'
import Legal from '@/components/Legal'
import { LanguageProvider } from '@/contexts/LanguageContext'

describe('Legal Component', () => {
  it('renders translated content instead of key names', () => {
    render(
      <LanguageProvider>
        <Legal />
      </LanguageProvider>
    )

    // Check that title is translated
    expect(screen.getByText('Legal & Warranty')).toBeInTheDocument()

    // Check that content sections are translated
    expect(screen.getByText(/We use comprehensive contracts/)).toBeInTheDocument()
    expect(screen.getByText(/OBSCURA is a private solution/)).toBeInTheDocument()
    expect(screen.getByText(/Warranty & Support:/)).toBeInTheDocument()
    expect(screen.getByText(/Note: We are not currently licensed installers/)).toBeInTheDocument()
  })
})