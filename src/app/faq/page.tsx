'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'When and where is the Arizona Women\'s Conference?',
        a: 'The conference takes place on Saturday, May 2, 2026 from 9:00 AM to 5:00 PM in Phoenix, AZ. The exact venue address will be sent to registered attendees via email.'
      },
      {
        q: 'Who should attend this conference?',
        a: 'The Arizona Women\'s Conference is for ambitious women entrepreneurs, business owners, executives, and professionals who want to grow their businesses, expand their networks, and learn from successful industry leaders.'
      },
      {
        q: 'Is this conference only for women?',
        a: 'While our content and community is focused on empowering women in business, allies and supporters of all genders are welcome to attend.'
      },
      {
        q: 'What should I bring to the conference?',
        a: 'We recommend bringing business cards for networking, a notebook or tablet for notes, and a positive attitude ready to learn and connect. Conference materials will be provided.'
      }
    ]
  },
  {
    category: 'Tickets & Registration',
    questions: [
      {
        q: 'What\'s the difference between General Admission and VIP?',
        a: 'General Admission ($197) includes full access to all sessions, networking lunch, conference materials, and certificate of attendance. VIP ($397) includes everything in General plus VIP seating, exclusive networking reception with speakers, meet & greet opportunities, VIP gift bag, and access to session recordings.'
      },
      {
        q: 'Can I get a refund if I can\'t attend?',
        a: 'Tickets are non-refundable but are transferable. If you can\'t attend, you may transfer your ticket to another person by contacting us at hello@azwomensconference.com at least 7 days before the event.'
      },
      {
        q: 'Is there a group discount available?',
        a: 'Yes! For groups of 5 or more, please contact us at hello@azwomensconference.com for special group pricing.'
      },
      {
        q: 'When will I receive my ticket/confirmation?',
        a: 'You\'ll receive a confirmation email immediately after purchase. Your official ticket with event details will be sent approximately one week before the conference.'
      }
    ]
  },
  {
    category: 'Event Day',
    questions: [
      {
        q: 'What time should I arrive?',
        a: 'Doors open at 8:00 AM for registration and networking. The program begins promptly at 9:00 AM, so we recommend arriving by 8:30 AM to get settled.'
      },
      {
        q: 'Is lunch included?',
        a: 'Yes! A catered networking lunch is included with all ticket types. Please let us know of any dietary restrictions when you register.'
      },
      {
        q: 'Will there be parking available?',
        a: 'Yes, parking information will be included in your pre-event email. There are also rideshare drop-off points nearby.'
      },
      {
        q: 'Can I leave and re-enter during the event?',
        a: 'Yes, your badge allows you to leave and re-enter throughout the day. However, we encourage you to stay for the full experience!'
      }
    ]
  },
  {
    category: 'Networking & More',
    questions: [
      {
        q: 'Will there be networking opportunities?',
        a: 'Absolutely! Networking is a core part of the conference experience. There are dedicated networking breaks, a networking lunch, and the VIP reception offers additional networking with speakers and other VIP attendees.'
      },
      {
        q: 'Can I connect with other attendees before the event?',
        a: 'Registered attendees will receive access to our private community where you can connect with other attendees before the conference.'
      },
      {
        q: 'Will sessions be recorded?',
        a: 'Session recordings are available exclusively for VIP ticket holders. Recordings will be available within 2 weeks after the event.'
      },
      {
        q: 'How can I become a sponsor?',
        a: 'We offer various sponsorship packages for businesses who want to connect with our community of ambitious women entrepreneurs. Email hello@azwomensconference.com for our sponsorship deck.'
      }
    ]
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#101010', fontFamily: '"Open Sans", sans-serif' }}>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4" style={{ backgroundColor: '#101010' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Have Questions?</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Find answers to common questions about the Arizona Women&apos;s Conference.
            Can&apos;t find what you&apos;re looking for? Contact us!
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-[#1a1a1a] uppercase mb-6" style={{ fontFamily: '"Acherus Bold", Montserrat, sans-serif' }}>
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item, qIndex) => {
                  const id = `${catIndex}-${qIndex}`
                  const isOpen = openItems[id]
                  return (
                    <div
                      key={qIndex}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(id)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-[#1a1a1a] pr-4">{item.q}</span>
                        <svg
                          className={`w-5 h-5 text-[#E91E8C] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-[#666] leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Still Have Questions?
          </h2>
          <p className="text-white/70 mb-8">
            We&apos;re here to help! Reach out to our team and we&apos;ll get back to you as soon as possible.
          </p>
          <a
            href="mailto:hello@azwomensconference.com"
            className="inline-block px-8 py-4 bg-[#E91E8C] text-white font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ backgroundColor: '#E91E8C' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Ready to Join Us?
          </h2>
          <p className="text-white/80 mb-8">
            Secure your spot at the Arizona Women&apos;s Conference today.
          </p>
          <Link
            href="/#tickets"
            className="inline-block px-8 py-4 bg-white text-[#E91E8C] font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity"
          >
            Get Your Ticket
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
