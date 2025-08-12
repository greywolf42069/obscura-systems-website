import { render, screen } from '@testing-library/react'
import FAQ from '../components/FAQ'
import { LanguageProvider } from '../contexts/LanguageContext'

describe('FAQ Component', () => {
  it('renders FAQ title and subtitle', () => {
    render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    )
    
    expect(screen.getByText(/Frequently Asked Questions|Preguntas Frecuentes|Często Zadawane Pytania/)).toBeInTheDocument()
    expect(screen.getByText(/security solutions|soluciones de seguridad|rozwiązaniach bezpieczeństwa/)).toBeInTheDocument()
  })

  it('renders multiple FAQ questions', () => {
    render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    )
    
    const questions = screen.getAllByRole('heading', { level: 3 })
    expect(questions.length).toBeGreaterThanOrEqual(6)
  })

  it('displays service area information', () => {
    render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    )
    
    expect(screen.getByText(/Chicago, IL/)).toBeInTheDocument()
  })

  it('has proper styling structure', () => {
    const { container } = render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    )
    
    expect(container.querySelector('section')).toBeInTheDocument()
    expect(container.querySelector('.max-w-4xl')).toBeInTheDocument()
  })
})