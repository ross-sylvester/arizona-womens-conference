'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/speakers', label: 'Speakers' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/venue', label: 'Venue' },
    { href: '/faq', label: 'FAQ' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#101010', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#E91E8C] flex items-center justify-center">
                <span className="text-white font-bold text-lg">AZ</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-bold text-sm uppercase tracking-wide leading-tight">Arizona Women&apos;s</p>
                <p className="text-[#E91E8C] text-xs uppercase tracking-wider">Conference</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-[#E91E8C] transition-colors text-sm uppercase tracking-wide font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#tickets"
              className="px-6 py-3 bg-[#E91E8C] text-white font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity"
            >
              Get Tickets
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-white/80 hover:text-[#E91E8C] transition-colors text-sm uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#tickets"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-4 py-3 px-6 bg-[#E91E8C] text-white font-bold text-sm uppercase tracking-wide rounded text-center"
            >
              Get Tickets
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
