import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Speakers | Arizona Women\'s Conference',
  description: 'Meet the inspiring speakers at the Arizona Women\'s Conference - industry leaders and entrepreneurs sharing actionable insights.',
}

const speakers = [
  {
    name: 'Tiffany Largie',
    title: 'Keynote Speaker',
    role: 'Serial Entrepreneur & CEO',
    image: 'https://dtdtnation.com/wp-content/uploads/2022/04/TiffanyL-LA-2018-1450.jpg',
    bio: 'Serial entrepreneur and international speaker who has built multiple seven-figure businesses. Tiffany is passionate about helping women entrepreneurs unlock their full potential and create lasting success.',
    featured: true,
    announced: true
  },
  {
    name: 'To Be Announced',
    title: 'Keynote Speaker',
    role: 'Industry Leader',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    bio: 'We\'re curating an incredible lineup of keynote speakers. Stay tuned for announcements on the powerful women who will be sharing their insights.',
    featured: false,
    announced: false
  },
  {
    name: 'To Be Announced',
    title: 'Workshop Leader',
    role: 'Business Strategist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    bio: 'Our workshop leaders are experts in their fields, ready to deliver actionable strategies you can implement immediately.',
    featured: false,
    announced: false
  },
  {
    name: 'To Be Announced',
    title: 'Panel Speaker',
    role: 'Entrepreneur',
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop',
    bio: 'Join our panel discussions featuring successful women entrepreneurs sharing real stories and hard-won lessons.',
    featured: false,
    announced: false
  },
  {
    name: 'To Be Announced',
    title: 'Breakout Session',
    role: 'Marketing Expert',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
    bio: 'Our breakout sessions cover specialized topics to help you level up specific areas of your business.',
    featured: false,
    announced: false
  },
  {
    name: 'To Be Announced',
    title: 'Breakout Session',
    role: 'Finance Professional',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
    bio: 'Each speaker brings unique expertise and real-world experience to share with our community.',
    featured: false,
    announced: false
  }
]

export default function SpeakersPage() {
  const featuredSpeaker = speakers.find(s => s.featured)
  const otherSpeakers = speakers.filter(s => !s.featured)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#101010', fontFamily: '"Open Sans", sans-serif' }}>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4" style={{ backgroundColor: '#101010' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Meet Our Speakers</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Learn From the Best
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our carefully curated lineup of speakers brings together industry leaders, successful entrepreneurs,
            and experts who will share actionable insights to help you succeed.
          </p>
        </div>
      </section>

      {/* First Announced Speaker */}
      {featuredSpeaker && (
        <section className="py-20 px-4" style={{ backgroundColor: '#E91E8C' }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-white/80 text-sm uppercase tracking-widest text-center mb-12">First Announced Speaker</p>
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredSpeaker.image}
                alt={featuredSpeaker.name}
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-white shadow-2xl"
              />
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white uppercase mb-2" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
                  {featuredSpeaker.name}
                </h2>
                <p className="text-white/80 text-lg mb-2">{featuredSpeaker.role}</p>
                <p className="inline-block px-4 py-1 bg-white/20 text-white text-sm uppercase tracking-wide rounded-full mb-6">
                  {featuredSpeaker.title}
                </p>
                <p className="text-white/90 text-lg leading-relaxed max-w-xl">
                  {featuredSpeaker.bio}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* More Speakers */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1a1a1a] uppercase mb-4" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
              2026 Speaker Lineup
            </h2>
            <p className="text-[#666]">More speakers will be announced leading up to the conference</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {otherSpeakers.map((speaker, i) => (
              <div key={i} className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-48 h-48 rounded-full object-cover mx-auto mb-6 shadow-lg"
                  style={{ filter: speaker.name.includes('Announced') ? 'grayscale(100%) opacity(0.5)' : 'none' }}
                />
                <p className="text-xs uppercase tracking-wide text-[#E91E8C] mb-2">{speaker.title}</p>
                <h3 className="text-xl font-bold text-[#1a1a1a] uppercase mb-2" style={{ fontFamily: '"Acherus Bold", Montserrat, sans-serif' }}>
                  {speaker.name}
                </h3>
                <p className="text-[#666] font-medium mb-2">{speaker.role}</p>
                <p className="text-[#999] text-sm">{speaker.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Speaker */}
      <section className="py-20 px-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Interested in Speaking?
          </h2>
          <p className="text-white/70 mb-8">
            We&apos;re always looking for inspiring women to share their stories and expertise.
            If you&apos;re interested in speaking at a future conference, we&apos;d love to hear from you.
          </p>
          <a
            href="mailto:hello@azwomensconference.com?subject=Speaker Inquiry"
            className="inline-block px-8 py-4 border-2 border-[#E91E8C] text-[#E91E8C] font-bold text-sm uppercase tracking-wide rounded hover:bg-[#E91E8C] hover:text-white transition-all"
          >
            Submit Speaker Inquiry
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ backgroundColor: '#101010' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Don&apos;t Miss These Incredible Speakers
          </h2>
          <p className="text-white/70 mb-8">
            Secure your spot now and learn from the best in the industry.
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
