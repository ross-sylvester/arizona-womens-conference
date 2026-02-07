import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Check, MapPin } from 'lucide-react'

export const metadata = {
  title: 'Venue | Arizona Women\'s Conference',
  description: 'Join us in Phoenix, Arizona for the Arizona Women\'s Conference on May 2, 2026. Find venue information, directions, hotels, and travel tips.',
}

export default function VenuePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#101010', fontFamily: '"Open Sans", sans-serif' }}>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4" style={{ backgroundColor: '#101010' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Event Location</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Phoenix, Arizona
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Experience the Arizona Women&apos;s Conference in the heart of the Valley of the Sun.
          </p>
        </div>
      </section>

      {/* Venue Details */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] uppercase mb-8" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
                Conference Venue
              </h2>

              <div className="bg-[#f9f9f9] p-8 rounded-lg mb-8">
                <h3 className="font-bold text-[#1a1a1a] text-lg mb-4">Location Details</h3>
                <div className="space-y-4 text-[#666]">
                  <p><strong className="text-[#1a1a1a]">Address:</strong> Downtown Phoenix, AZ</p>
                  <p><strong className="text-[#1a1a1a]">Date:</strong> Saturday, May 2, 2026</p>
                  <p><strong className="text-[#1a1a1a]">Time:</strong> 9:00 AM - 5:00 PM</p>
                  <p><strong className="text-[#1a1a1a]">Doors Open:</strong> 8:00 AM</p>
                </div>
                <p className="mt-6 text-sm text-[#999] italic">
                  The exact venue address will be sent to registered attendees via email approximately one week before the event.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E91E8C]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-[#E91E8C]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a1a]">Free Parking</p>
                    <p className="text-[#666]">Complimentary parking available for all attendees</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E91E8C]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-[#E91E8C]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a1a]">Wheelchair Accessible</p>
                    <p className="text-[#666]">Full accessibility throughout the venue</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E91E8C]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-[#E91E8C]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a1a]">Climate Controlled</p>
                    <p className="text-[#666]">Air-conditioned indoor venue</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* Map placeholder */}
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-8">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Map Available Soon</p>
                </div>
              </div>

              <h3 className="font-bold text-[#1a1a1a] text-lg mb-4">Getting There</h3>
              <div className="space-y-4">
                <div className="p-4 bg-[#f9f9f9] rounded-lg">
                  <p className="font-bold text-[#1a1a1a] mb-1">By Car</p>
                  <p className="text-[#666] text-sm">Easy access from I-10 and I-17. Free parking on-site.</p>
                </div>
                <div className="p-4 bg-[#f9f9f9] rounded-lg">
                  <p className="font-bold text-[#1a1a1a] mb-1">By Light Rail</p>
                  <p className="text-[#666] text-sm">Valley Metro Rail stops near downtown Phoenix venues.</p>
                </div>
                <div className="p-4 bg-[#f9f9f9] rounded-lg">
                  <p className="font-bold text-[#1a1a1a] mb-1">By Rideshare</p>
                  <p className="text-[#666] text-sm">Uber and Lyft are readily available. Drop-off zones at entrance.</p>
                </div>
                <div className="p-4 bg-[#f9f9f9] rounded-lg">
                  <p className="font-bold text-[#1a1a1a] mb-1">From Airport</p>
                  <p className="text-[#666] text-sm">Phoenix Sky Harbor (PHX) is approximately 15 minutes from downtown.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels */}
      <section className="py-20 px-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Accommodations</p>
            <h2 className="text-3xl font-bold text-white uppercase" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
              Where to Stay
            </h2>
            <p className="text-white/70 mt-4">
              Recommended hotels near the conference venue
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Downtown Phoenix Hotels',
                distance: '5-10 min walk',
                description: 'Multiple options in the downtown core with easy walking distance to the venue.'
              },
              {
                name: 'Airport Hotels',
                distance: '15 min drive',
                description: 'Convenient options near Phoenix Sky Harbor with shuttle services available.'
              },
              {
                name: 'Scottsdale Hotels',
                distance: '20 min drive',
                description: 'Upscale options in nearby Scottsdale with resort-style amenities.'
              }
            ].map((hotel, i) => (
              <div key={i} className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <h3 className="font-bold text-white text-lg mb-2">{hotel.name}</h3>
                <p className="text-[#E91E8C] text-sm mb-3">{hotel.distance}</p>
                <p className="text-white/70 text-sm">{hotel.description}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-white/50 text-sm mt-8">
            Hotel recommendations and special rates will be emailed to registered attendees.
          </p>
        </div>
      </section>

      {/* Phoenix Info */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Explore the Valley</p>
            <h2 className="text-3xl font-bold text-[#1a1a1a] uppercase" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
              Discover Phoenix
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-bold text-[#1a1a1a] text-lg mb-4">Why Phoenix?</h3>
              <p className="text-[#666] mb-6 leading-relaxed">
                Phoenix, Arizona is the perfect backdrop for the Arizona Women&apos;s Conference.
                With over 300 days of sunshine, world-class dining, and a thriving business community,
                Phoenix offers an inspiring environment for learning, networking, and growth.
              </p>
              <ul className="space-y-2 text-[#666]">
                <li className="flex items-center gap-2">
                  <span className="text-[#E91E8C]">+</span>
                  Beautiful May weather (avg. 90°F / 32°C)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E91E8C]">+</span>
                  Vibrant downtown dining and nightlife
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E91E8C]">+</span>
                  Easy airport access (PHX)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E91E8C]">+</span>
                  World-class golf and spas nearby
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#1a1a1a] text-lg mb-4">Things to Do</h3>
              <div className="space-y-4">
                <div className="p-4 bg-[#f9f9f9] rounded-lg">
                  <p className="font-bold text-[#1a1a1a]">Desert Botanical Garden</p>
                  <p className="text-[#666] text-sm">Explore stunning desert landscapes and native plants</p>
                </div>
                <div className="p-4 bg-[#f9f9f9] rounded-lg">
                  <p className="font-bold text-[#1a1a1a]">Camelback Mountain</p>
                  <p className="text-[#666] text-sm">Iconic hiking with panoramic valley views</p>
                </div>
                <div className="p-4 bg-[#f9f9f9] rounded-lg">
                  <p className="font-bold text-[#1a1a1a]">Roosevelt Row</p>
                  <p className="text-[#666] text-sm">Arts district with galleries, murals, and local shops</p>
                </div>
                <div className="p-4 bg-[#f9f9f9] rounded-lg">
                  <p className="font-bold text-[#1a1a1a]">Old Town Scottsdale</p>
                  <p className="text-[#666] text-sm">Shopping, dining, and Southwest culture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ backgroundColor: '#E91E8C' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Ready to Join Us in Phoenix?
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
