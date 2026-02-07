'use client'

import { useState } from 'react'

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

  const speakers = [
    { name: 'Tiffany Largie', title: 'CEO, DO THE DAMN THING', image: 'https://dtdtnation.com/wp-content/uploads/2022/04/TiffanyL-LA-2018-1450.jpg' },
  ]

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
      {/* Header */}
      <header style={{ backgroundColor: '#101010', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <a href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://dtdtnation.com/wp-content/uploads/2022/01/DTDT_logo-1.svg"
              alt="DO THE DAMN THING"
              style={{ height: '45px' }}
            />
          </a>
          <a
            href="#tickets"
            className="px-6 py-3 bg-[#E91E8C] text-white font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity"
          >
            Get Your Tickets
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 text-center overflow-hidden">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://dtdtnation.com/wp-content/uploads/2022/04/TiffanyL-LA-2018-1450.jpg)',
            filter: 'brightness(0.3)'
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(16,16,16,0.8) 0%, rgba(16,16,16,0.95) 100%)' }} />

        <div className="relative max-w-4xl mx-auto">
          <p className="text-sm md:text-base uppercase tracking-widest text-[#E91E8C] mb-4">
            Saturday, May 2, 2026
          </p>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase mb-4" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Arizona Women&apos;s Conference
          </h1>

          <p className="text-lg md:text-xl text-[#E91E8C] italic mb-6">
            Empower. Connect. Transform.
          </p>

          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Join hundreds of ambitious women for a full day of inspiration, education, and connection.
            Leave with the tools, strategies, and network to take your business and life to the next level.
          </p>

          <a href="#tickets" className="inline-block px-8 py-4 bg-[#E91E8C] text-white font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity">
            Get Your Ticket
          </a>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
                Event Details
              </h2>
              <div className="space-y-4 text-[#333]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E91E8C]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#E91E8C] font-bold">D</span>
                  </div>
                  <div>
                    <p className="font-bold">Date</p>
                    <p className="text-[#666]">Saturday, May 2, 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E91E8C]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#E91E8C] font-bold">T</span>
                  </div>
                  <div>
                    <p className="font-bold">Time</p>
                    <p className="text-[#666]">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E91E8C]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#E91E8C] font-bold">L</span>
                  </div>
                  <div>
                    <p className="font-bold">Location</p>
                    <p className="text-[#666]">Van Buren Street</p>
                    <p className="text-[#666]">Phoenix, AZ</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
                What to Expect
              </h2>
              <ul className="space-y-3">
                {[
                  'Powerful keynotes from industry leaders',
                  'Interactive workshops and breakout sessions',
                  'Networking with ambitious women entrepreneurs',
                  'Actionable strategies you can implement immediately',
                  'Exclusive resources and materials',
                  'Lunch and refreshments included'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#E91E8C] font-bold mt-1">+</span>
                    <span className="text-[#333]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Speaker - PINK BACKGROUND */}
      <section className="py-16 px-4" style={{ backgroundColor: '#E91E8C' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase text-center mb-12" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Featured Speaker
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={speakers[0].image}
              alt={speakers[0].name}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white shadow-xl"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white uppercase mb-2" style={{ fontFamily: '"Acherus Bold", Montserrat, sans-serif' }}>
                {speakers[0].name}
              </h3>
              <p className="text-white/80 mb-4">{speakers[0].title}</p>
              <p className="text-white/90 leading-relaxed max-w-xl">
                Tiffany Largie is a serial entrepreneur, international speaker, and the CEO of DO THE DAMN THING.
                She has built multiple seven-figure businesses and is passionate about helping women entrepreneurs
                unlock their full potential and create lasting success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 px-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase text-center mb-12" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Event Schedule
          </h2>

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
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4" style={{ backgroundColor: '#101010' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase text-center mb-12" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            What Past Attendees Say
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { quote: "This conference changed my perspective on what's possible. I left with a clear action plan and amazing connections.", name: "Jennifer M.", title: "Small Business Owner" },
              { quote: "The energy in the room was incredible. Every session provided actionable takeaways I'm still implementing today.", name: "Maria S.", title: "Entrepreneur" },
              { quote: "Tiffany and the speakers delivered exactly what we needed to hear. No fluff, just real strategies that work.", name: "Ashley T.", title: "Consultant" },
              { quote: "I've attended many conferences, but this one stands out. The community of women is supportive and inspiring.", name: "Rachel K.", title: "Startup Founder" }
            ].map((testimonial, i) => (
              <div key={i} className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <p className="text-white/90 italic mb-4 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="text-[#E91E8C] font-bold">{testimonial.name}</p>
                <p className="text-white/50 text-sm">{testimonial.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="py-16 px-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase text-center mb-4" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Get Your Ticket
          </h2>
          <p className="text-white/60 text-center mb-12">
            Secure your spot at the Arizona Women&apos;s Conference
          </p>

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
              <ul className="text-left space-y-2 mb-8 text-white/70 text-sm">
                <li>+ Full day access to all sessions</li>
                <li>+ Networking lunch included</li>
                <li>+ Conference materials</li>
                <li>+ Certificate of attendance</li>
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
              <ul className="text-left space-y-2 mb-8 text-white/70 text-sm">
                <li>+ Everything in General Admission</li>
                <li>+ VIP seating (front rows)</li>
                <li>+ Exclusive VIP networking reception</li>
                <li>+ Meet & greet with speakers</li>
                <li>+ VIP gift bag</li>
                <li>+ Recording access</li>
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
        </div>
      </section>

      {/* CTA - PINK */}
      <section className="py-16 px-4" style={{ backgroundColor: '#E91E8C' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase mb-4" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Don&apos;t Miss This Opportunity
          </h2>
          <p className="text-white/80 mb-6">
            Join us on May 2, 2026 and take the next step in your journey.
          </p>
          <p className="text-white font-bold">
            Van Buren Street, Phoenix, AZ | 9:00 AM - 5:00 PM
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4" style={{ backgroundColor: '#0c0c0c', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            &copy; 2026 Arizona Women&apos;s Conference. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
