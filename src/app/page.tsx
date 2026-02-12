'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Ticket, Check, Quote, DollarSign, Briefcase, Store, Heart, Crown, Handshake, BookOpen } from 'lucide-react'

export default function ArizonaWomensConferencePage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<'general' | 'vip' | null>(null)

  const handleSubmit = async (ticketType: 'general' | 'vip') => {
    if (!formData.name || !formData.email) {
      alert('Please enter your name and email')
      return
    }
    setIsLoading(true)
    setSelectedTicket(ticketType)

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          ticketType: ticketType === 'vip' ? 'awc-vip' : 'awc-general',
        }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setIsLoading(false)
      setSelectedTicket(null)
    }
  }

  const coverageAreas = [
    { icon: DollarSign, title: 'Financial Literacy & Wealth Building' },
    { icon: Briefcase, title: 'Career Advancement Workshops' },
    { icon: Store, title: 'Entrepreneurship & Small Business Tracks' },
    { icon: Heart, title: 'Mental Health & Burnout Recovery' },
    { icon: Crown, title: 'Leadership Development' },
    { icon: Handshake, title: 'Sponsor Marketplace & Activations' },
    { icon: BookOpen, title: 'Community Connection Sessions' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#101010', fontFamily: '"Open Sans", sans-serif' }}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 min-h-screen flex items-center px-4 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop)',
            filter: 'brightness(0.25)'
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(16,16,16,0.7) 0%, rgba(16,16,16,0.95) 100%)' }} />

        <div className="relative max-w-4xl mx-auto py-20">
          <p className="text-sm md:text-base uppercase tracking-widest text-[#E91E8C] mb-4">
            May 2, 2026 &bull; Phoenix, Arizona
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Arizona Women&apos;s<br />Conference
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            A statewide gathering of women leaders, professionals, founders, and builders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#interest" className="inline-block px-8 py-4 bg-[#E91E8C] text-white font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity">
              Join the Interest List
            </a>
            <a href="#sponsors" className="inline-block px-8 py-4 border-2 border-white/30 text-white font-bold text-sm uppercase tracking-wide rounded hover:border-white/60 transition-colors">
              Become a Sponsor
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#E91E8C]">500+</p>
              <p className="text-white/60 text-sm uppercase tracking-wide">Attendees</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#E91E8C]">10+</p>
              <p className="text-white/60 text-sm uppercase tracking-wide">Speakers</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#E91E8C]">1</p>
              <p className="text-white/60 text-sm uppercase tracking-wide">Epic Day</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Theme Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">The 2026 Theme</p>
          <h2 className="text-4xl md:text-6xl font-bold text-[#1a1a1a] uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            MORE
          </h2>
          <p className="text-xl md:text-2xl text-[#E91E8C] italic mb-10">
            Because success isn&apos;t always the same as fulfillment.
          </p>

          <div className="max-w-3xl mx-auto text-left space-y-6 text-[#333] text-base md:text-lg leading-relaxed">
            <p>
              The Arizona Women&apos;s Conference was created to bring together women across industries, careers, and life stages for one purpose: <strong>connection, advancement, and opportunity.</strong>
            </p>
            <p>
              This is not a single-industry event and not a networking mixer. It is a professional and personal development conference designed to support women as leaders in business, community, education, and family life.
            </p>
          </div>
        </div>
      </section>

      {/* Attendees Section */}
      <section className="py-20 px-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Who Attends</p>
              <h2 className="text-3xl font-bold text-white uppercase mb-8" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
                Women From Every Industry
              </h2>
              <ul className="space-y-4">
                {[
                  'Entrepreneurs',
                  'Corporate Professionals',
                  'Educators',
                  'Healthcare Leaders',
                  'Creatives',
                  'Public Sector Leaders',
                  'Women Re-entering the Workforce'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-[#E91E8C] flex-shrink-0" />
                    <span className="text-white/80 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <p className="text-white/60 text-lg leading-relaxed">
                This conference exists to strengthen the economic and social influence of women across Arizona.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Cover Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">What We Cover</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
              A Day of Impact
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <div className="flex items-center gap-3 justify-center">
                <div className="w-10 h-10 rounded-full bg-[#E91E8C]/10 flex items-center justify-center">
                  <span className="text-[#E91E8C] text-lg font-bold">&#9733;</span>
                </div>
                <span className="text-[#1a1a1a] font-bold text-lg">Keynote Speakers</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="w-10 h-10 rounded-full bg-[#E91E8C]/10 flex items-center justify-center">
                  <span className="text-[#E91E8C] text-lg font-bold">&#9733;</span>
                </div>
                <span className="text-[#1a1a1a] font-bold text-lg">Breakout Learning Sessions</span>
              </div>
            </div>
          </div>

          {/* Coverage Area Tiles */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverageAreas.map((area, i) => {
              const Icon = area.icon
              return (
                <div
                  key={i}
                  className="p-6 rounded-xl text-center border-2 border-[#f0f0f0] hover:border-[#E91E8C] hover:shadow-lg transition-all"
                  style={{ backgroundColor: '#fafafa' }}
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#E91E8C]/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#E91E8C]" />
                  </div>
                  <h3 className="text-base font-bold text-[#1a1a1a] uppercase">{area.title}</h3>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-20 px-4" style={{ backgroundColor: '#E91E8C' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-white/80 text-sm uppercase tracking-widest mb-4">2026 Speaker Lineup</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
              Speakers
            </h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed">
              Our speakers include national voices and Arizona leaders selected for practical experience, not just inspiration. Every session is designed to provide actionable takeaways attendees can apply immediately.
            </p>
          </div>

          {/* Speaker Grid - Larger Photos */}
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Tiffany Largie */}
            <div className="text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://dtdtnation.com/wp-content/uploads/2022/04/TiffanyL-LA-2018-1450.jpg"
                alt="Tiffany Largie"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-white shadow-xl mx-auto mb-5"
              />
              <h3 className="text-xl font-bold text-white uppercase">Tiffany Largie</h3>
              <p className="text-white/80 text-sm font-medium">Serial Entrepreneur</p>
              <p className="text-white/60 text-xs mt-1 uppercase tracking-wide">Keynote Speaker</p>
            </div>

            {/* Coming Soon Speakers */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white/20 mx-auto mb-5 flex items-center justify-center">
                  <span className="text-white/60 text-5xl">?</span>
                </div>
                <h3 className="text-xl font-bold text-white/60 uppercase">Coming Soon</h3>
                <p className="text-white/40 text-sm">Speaker Announcement</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/70 mb-6">More speakers to be announced. Follow us for updates!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/speakers"
                className="inline-block px-6 py-3 bg-white text-[#E91E8C] font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity"
              >
                View All Speakers
              </Link>
              <a
                href="mailto:hello@azwomensconference.com?subject=Speaker%20Nomination"
                className="inline-block px-6 py-3 border-2 border-white text-white font-bold text-sm uppercase tracking-wide rounded hover:bg-white/10 transition-colors"
              >
                Nominate a Speaker
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section id="sponsors" className="py-20 px-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Sponsorship</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
              Partner With The Women Of Arizona
            </h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed mb-4">
              The Arizona Women&apos;s Conference connects organizations directly with a powerful and engaged audience of decision-makers.
            </p>
            <p className="text-[#E91E8C] text-lg font-medium max-w-3xl mx-auto">
              Women influence or control over 70% of household purchasing decisions and represent one of the fastest-growing segments of business ownership in Arizona.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-xl font-bold text-white uppercase mb-4" style={{ fontFamily: '"Acherus Bold", Montserrat, sans-serif' }}>
                Why Partner With Us
              </h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Our sponsors are not passive advertisers — they are active participants in the conference experience through activations, education, and meaningful engagement.
              </p>
              <p className="text-white/70 leading-relaxed">
                We intentionally integrate partners into attendee interaction, creating genuine brand relationships rather than logo placement.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white uppercase mb-4" style={{ fontFamily: '"Acherus Bold", Montserrat, sans-serif' }}>
                Who Should Sponsor
              </h3>
              <ul className="space-y-3">
                {[
                  'Banks & Financial Institutions',
                  'Hospitals & Healthcare Systems',
                  'Universities & Colleges',
                  'Law Firms',
                  'Insurance Companies',
                  'Real Estate Groups',
                  'Corporate Employers',
                  'HR & Recruiting Firms',
                  'Technology Companies'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#E91E8C] flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sponsor Logos - Larger Area */}
          <div className="rounded-2xl p-10 mb-12 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-8">Current Sponsors</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <div className="text-center">
                <p className="text-xs uppercase tracking-wide text-[#E91E8C] mb-4">Title Sponsor</p>
                <a
                  href="https://dotheblankthing.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://dtdtnation.com/wp-content/uploads/2022/01/DTDT_logo-1.svg"
                    alt="DO THE DAMN THING"
                    style={{ height: '60px' }}
                  />
                </a>
              </div>
              <div className="hidden md:block w-px h-16 bg-white/20" />
              <div className="text-center">
                <p className="text-xs uppercase tracking-wide text-[#E91E8C] mb-4">Platinum Sponsor</p>
                <a
                  href="https://speedrun.adrata.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <svg className="w-5 h-5 translate-y-[1px] translate-x-0.5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white text-2xl">Adrata</span>
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm">Your logo here — sponsor spots are limited</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@azwomensconference.com?subject=Sponsor%20Deck%20Request"
              className="inline-block px-8 py-4 bg-[#E91E8C] text-white font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity text-center"
            >
              Request Sponsor Deck
            </a>
            <a
              href="mailto:hello@azwomensconference.com?subject=Sponsorship%20Inquiry"
              className="inline-block px-8 py-4 border-2 border-[#E91E8C] text-[#E91E8C] font-bold text-sm uppercase tracking-wide rounded hover:bg-[#E91E8C] hover:text-white transition-all text-center"
            >
              Become a Sponsor
            </a>
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="py-20 px-4" style={{ backgroundColor: '#101010' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Get Your Ticket</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
              Secure Your Spot
            </h2>
            <p className="text-white/60 mt-4">
              Join us for a transformative day on May 2, 2026
            </p>
          </div>

          {/* Registration Form */}
          <div className="max-w-md mx-auto mb-12">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Your Name"
              className="w-full px-4 py-3 mb-4 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#E91E8C] focus:outline-none rounded"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Your Email"
              className="w-full px-4 py-3 mb-4 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#E91E8C] focus:outline-none rounded"
            />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Your Phone (Optional)"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#E91E8C] focus:outline-none rounded"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* General Admission */}
            <div className="p-8 rounded-lg text-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)' }}>
              <h3 className="text-xl font-bold text-white uppercase mb-4" style={{ fontFamily: '"Acherus Bold", Montserrat, sans-serif' }}>
                General Admission
              </h3>
              <p className="text-4xl font-bold text-[#E91E8C] mb-2">$197</p>
              <p className="text-white/50 text-sm mb-6">Early Bird Price</p>
              <ul className="text-left space-y-3 mb-8 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" />
                  Full day access to all sessions
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" />
                  Networking lunch included
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" />
                  Conference materials
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" />
                  Certificate of attendance
                </li>
              </ul>
              <button
                onClick={() => handleSubmit('general')}
                disabled={isLoading && selectedTicket === 'general'}
                className="w-full py-4 rounded bg-[#E91E8C] text-white font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading && selectedTicket === 'general' ? 'Processing...' : 'Get General Ticket'}
              </button>
            </div>

            {/* VIP */}
            <div className="p-8 rounded-lg text-center" style={{ backgroundColor: 'rgba(233,30,140,0.1)', border: '2px solid #E91E8C' }}>
              <div className="inline-block px-4 py-1 bg-[#E91E8C] text-white text-xs font-bold uppercase tracking-wide rounded-full mb-4">
                Best Value
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-4" style={{ fontFamily: '"Acherus Bold", Montserrat, sans-serif' }}>
                VIP Experience
              </h3>
              <p className="text-4xl font-bold text-[#E91E8C] mb-2">$397</p>
              <p className="text-white/50 text-sm mb-6">Limited Availability</p>
              <ul className="text-left space-y-3 mb-8 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" />
                  Everything in General Admission
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" />
                  VIP seating (front rows)
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" />
                  Exclusive VIP networking reception
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" />
                  Meet & greet with speakers
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" />
                  VIP gift bag + Recording access
                </li>
              </ul>
              <button
                onClick={() => handleSubmit('vip')}
                disabled={isLoading && selectedTicket === 'vip'}
                className="w-full py-4 rounded bg-white text-[#1a1a1a] font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading && selectedTicket === 'vip' ? 'Processing...' : 'Get VIP Ticket'}
              </button>
            </div>
          </div>

          <p className="text-center text-white/40 text-sm mt-8">
            Have questions? <Link href="/faq" className="text-[#E91E8C] hover:underline">Check our FAQ</Link> or email <a href="mailto:hello@azwomensconference.com" className="text-[#E91E8C] hover:underline">hello@azwomensconference.com</a>
          </p>
        </div>
      </section>

      {/* Final CTA / Interest List */}
      <section id="interest" className="py-20 px-4" style={{ backgroundColor: '#E91E8C' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Decide What You Want More Of This Year.
          </h2>
          <p className="text-white/90 text-lg mb-10">
            Join the interest list for early announcements, speaker releases, and registration access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@azwomensconference.com?subject=Interest%20List"
              className="inline-block px-10 py-4 bg-white text-[#E91E8C] font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity"
            >
              Join the Interest List
            </a>
            <a
              href="#sponsors"
              className="inline-block px-10 py-4 border-2 border-white text-white font-bold text-sm uppercase tracking-wide rounded hover:bg-white/10 transition-colors"
            >
              Sponsor the Conference
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
