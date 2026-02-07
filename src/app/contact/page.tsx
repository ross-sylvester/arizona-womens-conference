'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Mail, MapPin, Calendar, Check } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to an API
    window.location.href = `mailto:hello@azwomensconference.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#101010', fontFamily: '"Open Sans", sans-serif' }}>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4" style={{ backgroundColor: '#101010' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Contact Us
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Have questions about the Arizona Women&apos;s Conference? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] uppercase mb-8" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E91E8C]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#E91E8C]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a1a]">Email</p>
                    <a href="mailto:hello@azwomensconference.com" className="text-[#E91E8C] hover:underline">
                      hello@azwomensconference.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E91E8C]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#E91E8C]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a1a]">Location</p>
                    <p className="text-[#666]">Phoenix, Arizona</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E91E8C]/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-[#E91E8C]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a1a]">Event Date</p>
                    <p className="text-[#666]">Saturday, May 2, 2026</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-[#f9f9f9] rounded-lg">
                <h3 className="font-bold text-[#1a1a1a] mb-4">Common Inquiries</h3>
                <ul className="space-y-2 text-[#666]">
                  <li><strong>Tickets:</strong> Visit our <a href="/#tickets" className="text-[#E91E8C] hover:underline">tickets section</a></li>
                  <li><strong>Sponsorship:</strong> Email with subject &quot;Sponsorship Inquiry&quot;</li>
                  <li><strong>Speaking:</strong> Email with subject &quot;Speaker Inquiry&quot;</li>
                  <li><strong>Press:</strong> Email with subject &quot;Media Inquiry&quot;</li>
                </ul>
              </div>

            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] uppercase mb-8" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
                Send a Message
              </h2>

              {submitted ? (
                <div className="p-8 bg-[#E91E8C]/10 rounded-lg text-center">
                  <Check className="w-16 h-16 text-[#E91E8C] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Message Sent!</h3>
                  <p className="text-[#666]">We&apos;ll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#E91E8C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#E91E8C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#E91E8C] focus:outline-none"
                    >
                      <option value="">Select a topic</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Ticket Question">Ticket Question</option>
                      <option value="Sponsorship Inquiry">Sponsorship Inquiry</option>
                      <option value="Speaker Inquiry">Speaker Inquiry</option>
                      <option value="Media/Press">Media/Press</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#E91E8C] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#E91E8C] text-white font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
