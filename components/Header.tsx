'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { lang: currentLang, setLang, t } = useLanguage()

  const navItems = [
    { key: 'nav.services', href: '#services' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ] as const

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'es', name: 'ES' },
    { code: 'pl', name: 'PL' },
  ]

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="sticky top-0 left-0 right-0 z-50 bg-noir-900/90 backdrop-blur-md border-b border-gray-800"
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <Image src="/logo.svg" alt="Obscura Security" width={180} height={40} />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              whileHover={{ scale: 1.1, color: '#8F00FF' }}
              className="text-gray-300 hover:text-accent-primary transition-colors duration-300 font-medium"
            >
              {t(item.key)}
            </motion.a>
          ))}
          
          {/* Language Switcher */}
          <div className="relative">
            <select 
              value={currentLang}
              onChange={(e) => setLang(e.target.value as 'en' | 'es' | 'pl')}
              className="bg-noir-800 text-accent-secondary border border-gray-700 rounded px-3 py-1 focus:outline-none focus:border-accent-primary"
              aria-label="Language selector"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(143, 0, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-6 py-2 rounded-lg font-semibold"
          >
            {t('nav.cta')}
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-accent-secondary"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-noir-800 border-t border-gray-700"
        >
          <div className="container mx-auto px-6 py-4 space-y-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block text-gray-300 hover:text-accent-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.key)}
              </a>
            ))}
            <a href="#contact" className="inline-block bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-6 py-2 rounded-lg font-semibold" onClick={() => setIsMenuOpen(false)}>
              {t('nav.cta')}
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

export default Header