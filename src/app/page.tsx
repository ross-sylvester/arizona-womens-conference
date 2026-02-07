'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

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

  const schedule = [
    { time: '8:00 AM', event: 'Doors Open & Registration' },
    { time: '9:00 AM', event: 'Opening Keynote: Tiffany Largie' },
    { time: '10:30 AM', event: 'Panel: Building Your Empire' },
    { time: '12:00 PM', event: 'Networking Lunch' },
    { time: '1:30 PM', event: 'Breakout Sessions' },
    { time: '3:00 PM', event: 'Workshop: Your Story, Your Power' },
    { time: '4:30 PM', event: 'Closing Keynote & Celebration' },
    { time: '5:00 PM', event: 'Event Concludes' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#101010', fontFamily: '"Open Sans", sans-serif' }}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 min-h-screen flex items-center px-4 text-center overflow-hidden">
        {/* Background Image Overlay */}
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
            Saturday, May 2, 2026 • Phoenix, AZ
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Arizona Women&apos;s<br />Conference
          </h1>

          <p className="text-xl md:text-2xl text-[#E91E8C] italic mb-8">
            Empower. Connect. Transform.
          </p>

          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-10">
            Join hundreds of ambitious women for a full day of inspiration, education, and connection.
            Leave with the tools, strategies, and network to take your business and life to the next level.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#tickets" className="inline-block px-8 py-4 bg-[#E91E8C] text-white font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity">
              Get Your Ticket
            </a>
            <Link href="/about" className="inline-block px-8 py-4 border-2 border-white/30 text-white font-bold text-sm uppercase tracking-wide rounded hover:border-white/60 transition-colors">
              Learn More
            </Link>
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Why Attend */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Why Attend</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] uppercase" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
              A Day That Will Change Everything
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '✨',
                title: 'Get Inspired',
                description: 'Hear from successful women entrepreneurs and industry leaders who have walked the path you\'re on.'
              },
              {
                icon: '🤝',
                title: 'Build Connections',
                description: 'Network with hundreds of ambitious, like-minded women who will become your support system.'
              },
              {
                icon: '🚀',
                title: 'Take Action',
                description: 'Leave with actionable strategies and a clear roadmap to achieve your business goals.'
              }
            ].map((item, i) => (
              <div key={i} className="text-center p-8">
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#1a1a1a] uppercase mb-4">{item.title}</h3>
                <p className="text-[#666]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 px-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Event Details</p>
              <h2 className="text-3xl font-bold text-white uppercase mb-8" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
                Mark Your Calendar
              </h2>
              <div className="space-y-6">
                {[
                  { icon: '📅', label: 'Date', value: 'Saturday, May 2, 2026' },
                  { icon: '⏰', label: 'Time', value: '9:00 AM - 5:00 PM' },
                  { icon: '📍', label: 'Location', value: 'Phoenix, AZ' },
                  { icon: '🎟️', label: 'Tickets', value: 'Starting at $197' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#E91E8C]/20 flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">What to Expect</p>
              <h2 className="text-3xl font-bold text-white uppercase mb-8" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
                An Unforgettable Experience
              </h2>
              <ul className="space-y-4">
                {[
                  'Powerful keynotes from industry leaders',
                  'Interactive workshops and breakout sessions',
                  'Networking with ambitious women entrepreneurs',
                  'Actionable strategies you can implement immediately',
                  'Exclusive resources and materials',
                  'Lunch and refreshments included'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#E91E8C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Speaker - PINK BACKGROUND */}
      <section className="py-20 px-4" style={{ backgroundColor: '#E91E8C' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-white/80 text-sm uppercase tracking-widest text-center mb-4">Featured Speaker</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white uppercase text-center mb-16" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Learn From the Best
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://dtdtnation.com/wp-content/uploads/2022/04/TiffanyL-LA-2018-1450.jpg"
              alt="Tiffany Largie"
              className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-white shadow-2xl"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white uppercase mb-2" style={{ fontFamily: '"Acherus Bold", Montserrat, sans-serif' }}>
                Tiffany Largie
              </h3>
              <p className="text-white/80 mb-4">CEO, DO THE DAMN THING</p>
              <p className="text-white/90 leading-relaxed max-w-xl mb-6">
                Tiffany Largie is a serial entrepreneur, international speaker, and the CEO of DO THE DAMN THING.
                She has built multiple seven-figure businesses and is passionate about helping women entrepreneurs
                unlock their full potential and create lasting success.
              </p>
              <Link
                href="/speakers"
                className="inline-block px-6 py-3 bg-white text-[#E91E8C] font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity"
              >
                View All Speakers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Preview */}
      <section className="py-20 px-4" style={{ backgroundColor: '#101010' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Event Schedule</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
              A Full Day of Impact
            </h2>
          </div>

          <div className="space-y-4">
            {schedule.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-6 p-4 rounded-lg transition-all hover:bg-white/5"
                style={{ borderLeft: '4px solid #E91E8C' }}
              >
                <span className="text-[#E91E8C] font-bold text-sm w-24 flex-shrink-0">{item.time}</span>
                <span className="text-white">{item.event}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/schedule"
              className="inline-block px-6 py-3 border-2 border-[#E91E8C] text-[#E91E8C] font-bold text-sm uppercase tracking-wide rounded hover:bg-[#E91E8C] hover:text-white transition-all"
            >
              View Full Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] uppercase" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
              What Attendees Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { quote: "This conference changed my perspective on what's possible. I left with a clear action plan and amazing connections.", name: "Jennifer M.", title: "Small Business Owner" },
              { quote: "The energy in the room was incredible. Every session provided actionable takeaways I'm still implementing today.", name: "Maria S.", title: "Entrepreneur" },
              { quote: "Tiffany and the speakers delivered exactly what we needed to hear. No fluff, just real strategies that work.", name: "Ashley T.", title: "Consultant" },
              { quote: "I've attended many conferences, but this one stands out. The community of women is supportive and inspiring.", name: "Rachel K.", title: "Startup Founder" }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-lg bg-[#f9f9f9]">
                <svg className="w-10 h-10 text-[#E91E8C] mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-[#333] italic mb-6 leading-relaxed">{testimonial.quote}</p>
                <p className="text-[#E91E8C] font-bold">{testimonial.name}</p>
                <p className="text-[#666] text-sm">{testimonial.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="py-20 px-4" style={{ backgroundColor: '#1a1a1a' }}>
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
                  <svg className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Full day access to all sessions
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Networking lunch included
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Conference materials
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
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
                  <svg className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Everything in General Admission
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  VIP seating (front rows)
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Exclusive VIP networking reception
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Meet & greet with speakers
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#E91E8C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
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

      {/* Final CTA */}
      <section className="py-20 px-4" style={{ backgroundColor: '#E91E8C' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Your Transformation Starts Here
          </h2>
          <p className="text-white/80 text-lg mb-8">
            May 2, 2026 • Phoenix, AZ • 9:00 AM - 5:00 PM
          </p>
          <a
            href="#tickets"
            className="inline-block px-10 py-4 bg-white text-[#E91E8C] font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity"
          >
            Get Your Ticket Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
