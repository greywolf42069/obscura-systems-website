import { render, screen } from '@testing-library/react'
import Services from '@/components/Services'
import { LanguageProvider } from '@/contexts/LanguageContext'

describe('Services Component', () => {
  it('renders translated content instead of key names', () => {
    render(
      <LanguageProvider>
        <Services />
      </LanguageProvider>
    )

    // Check that titles are translated
    expect(screen.getByText('Services & Pricing')).toBeInTheDocument()
    expect(screen.getByText(/\$777 one-time fee includes/)).toBeInTheDocument()

    // Check that feature list items are translated
    expect(screen.getByText('CCTV (extreme high definition)')).toBeInTheDocument()
    expect(screen.getByText('Infrared night time viewing')).toBeInTheDocument()
    expect(screen.getByText('Private solution (authorities can request videos, not take them)')).toBeInTheDocument()
    expect(screen.getByText('Intercom')).toBeInTheDocument()

    // Check that CTA button is translated
    expect(screen.getByText('Request Consultation')).toBeInTheDocument()
  })
})