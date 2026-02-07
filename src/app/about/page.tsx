import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Sparkles, Users, Rocket, Check } from 'lucide-react'

export const metadata = {
  title: 'About | Arizona Women\'s Conference',
  description: 'Learn about the Arizona Women\'s Conference - a transformative day of empowerment, connection, and growth for ambitious women.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#101010', fontFamily: '"Open Sans", sans-serif' }}>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4" style={{ backgroundColor: '#101010' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">About the Conference</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Empowering Women to Lead, Succeed & Thrive
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            The Arizona Women&apos;s Conference is more than an event—it&apos;s a movement. We bring together
            ambitious women from all industries for a day of inspiration, education, and meaningful connection.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1a1a1a] uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
                Our Mission
              </h2>
              <p className="text-[#333] mb-6 leading-relaxed">
                We believe that when women come together, incredible things happen. Our mission is to create
                a space where women can learn from industry leaders, connect with like-minded entrepreneurs,
                and leave with actionable strategies to transform their businesses and lives.
              </p>
              <p className="text-[#333] leading-relaxed">
                The Arizona Women&apos;s Conference was founded on the belief that every woman has the potential
                to do extraordinary things. We&apos;re here to help unlock that potential through world-class
                content, powerful networking, and an unforgettable experience.
              </p>
            </div>
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop"
                alt="Women networking at conference"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#E91E8C] text-white p-6 rounded-lg">
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm uppercase tracking-wide">Women Empowered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white uppercase text-center mb-16" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Empowerment',
                description: 'We believe in giving women the tools, knowledge, and confidence to take bold action in their businesses and lives.',
                icon: Sparkles
              },
              {
                title: 'Connection',
                description: 'Real relationships are built here. We foster an environment where meaningful connections happen naturally.',
                icon: Users
              },
              {
                title: 'Transformation',
                description: 'We don\'t just inspire—we equip you with actionable strategies that create real, lasting change.',
                icon: Rocket
              }
            ].map((value, i) => {
              const Icon = value.icon
              return (
                <div key={i} className="text-center p-8 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#E91E8C]/20 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#E91E8C]" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase mb-4">{value.title}</h3>
                  <p className="text-white/70">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Attend */}
      <section className="py-20 px-4" style={{ backgroundColor: '#E91E8C' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white uppercase text-center mb-16" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Why Attend?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              'Learn from successful women entrepreneurs and industry leaders',
              'Build lasting relationships with ambitious, like-minded women',
              'Get actionable strategies you can implement immediately',
              'Gain clarity on your next steps and business goals',
              'Be part of a supportive community that lifts each other up',
              'Leave inspired, motivated, and ready to take action'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-[#E91E8C]" strokeWidth={3} />
                </div>
                <p className="text-white text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Title Sponsor */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://dtdtnation.com/wp-content/uploads/2022/04/TiffanyL-LA-2018-1450.jpg"
              alt="Tiffany Largie"
              className="rounded-lg shadow-xl"
            />
            <div>
              <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Title Sponsor</p>
              <h2 className="text-3xl font-bold text-[#1a1a1a] uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
                DO THE DAMN THING
              </h2>
              <p className="text-[#333] mb-6 leading-relaxed">
                The Arizona Women&apos;s Conference is proudly sponsored by DO THE DAMN THING,
                a movement dedicated to helping women entrepreneurs build successful businesses on their own terms.
              </p>
              <p className="text-[#333] mb-8 leading-relaxed">
                Founded by Tiffany Largie, a serial entrepreneur with multiple seven-figure businesses,
                DO THE DAMN THING brings real talk and real results to ambitious women ready to take
                their businesses to the next level.
              </p>
              <Link
                href="/speakers"
                className="inline-block px-8 py-4 bg-[#E91E8C] text-white font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity"
              >
                View 2026 Speakers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ backgroundColor: '#101010' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Ready to Transform Your Journey?
          </h2>
          <p className="text-white/70 mb-8">
            Join us on May 2, 2026 for a day that will change the way you think about business,
            leadership, and what&apos;s possible for your life.
          </p>
          <Link
            href="/#tickets"
            className="inline-block px-8 py-4 bg-[#E91E8C] text-white font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity"
          >
            Get Your Ticket
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
