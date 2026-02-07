import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Schedule | Arizona Women\'s Conference',
  description: 'View the full schedule for the Arizona Women\'s Conference on May 2, 2026 - keynotes, workshops, panels, and networking.',
}

const schedule = [
  {
    time: '8:00 AM',
    title: 'Doors Open & Registration',
    description: 'Check in, grab your badge and conference materials, enjoy light refreshments, and start networking with fellow attendees.',
    type: 'registration'
  },
  {
    time: '9:00 AM',
    title: 'Opening Keynote: Tiffany Largie',
    description: 'Kick off the day with an inspiring keynote from Tiffany Largie on building a business and life you love.',
    speaker: 'Tiffany Largie',
    type: 'keynote'
  },
  {
    time: '10:30 AM',
    title: 'Panel: Building Your Empire',
    description: 'Hear from successful women entrepreneurs about the real challenges and strategies for scaling a business.',
    type: 'panel'
  },
  {
    time: '11:30 AM',
    title: 'Breakout Session 1',
    description: 'Choose from multiple focused sessions on topics like marketing, sales, leadership, and work-life balance.',
    type: 'breakout'
  },
  {
    time: '12:00 PM',
    title: 'Networking Lunch',
    description: 'Enjoy a delicious catered lunch while connecting with fellow attendees. VIP ticket holders have reserved seating.',
    type: 'break'
  },
  {
    time: '1:30 PM',
    title: 'Breakout Session 2',
    description: 'Dive deeper with another round of focused breakout sessions covering advanced business strategies.',
    type: 'breakout'
  },
  {
    time: '2:30 PM',
    title: 'Panel: Overcoming Obstacles',
    description: 'Real talk about the challenges women face in business and how to push through to success.',
    type: 'panel'
  },
  {
    time: '3:30 PM',
    title: 'Workshop: Your Story, Your Power',
    description: 'Interactive workshop on leveraging your personal story to build your brand and connect with your audience.',
    type: 'workshop'
  },
  {
    time: '4:30 PM',
    title: 'Closing Keynote & Celebration',
    description: 'End the day with inspiration, reflection, and a celebration of everything we\'ve learned and the connections we\'ve made.',
    type: 'keynote'
  },
  {
    time: '5:00 PM',
    title: 'Event Concludes',
    description: 'General admission attendees depart. Continue networking and saying goodbye to new friends.',
    type: 'end'
  },
  {
    time: '5:30 PM',
    title: 'VIP Reception',
    description: 'Exclusive networking reception for VIP ticket holders. Meet and mingle with speakers and special guests.',
    type: 'vip'
  }
]

const typeColors: Record<string, string> = {
  registration: '#6B7280',
  keynote: '#E91E8C',
  panel: '#8B5CF6',
  breakout: '#3B82F6',
  workshop: '#10B981',
  break: '#F59E0B',
  end: '#6B7280',
  vip: '#E91E8C'
}

export default function SchedulePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#101010', fontFamily: '"Open Sans", sans-serif' }}>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4" style={{ backgroundColor: '#101010' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-[#E91E8C] mb-4">Event Schedule</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            A Full Day of Impact
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            From powerful keynotes to interactive workshops, every moment of the Arizona Women&apos;s Conference
            is designed to inspire, educate, and connect.
          </p>
          <div className="inline-flex items-center gap-4 bg-white/10 px-6 py-3 rounded-lg">
            <span className="text-[#E91E8C] font-bold">May 2, 2026</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">9:00 AM - 5:00 PM</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">Phoenix, AZ</span>
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { type: 'keynote', label: 'Keynote' },
              { type: 'panel', label: 'Panel' },
              { type: 'workshop', label: 'Workshop' },
              { type: 'breakout', label: 'Breakout' },
              { type: 'break', label: 'Meal/Break' },
              { type: 'vip', label: 'VIP Only' }
            ].map((item) => (
              <div key={item.type} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColors[item.type] }} />
                <span className="text-sm text-[#666]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {schedule.map((item, i) => (
              <div
                key={i}
                className="flex gap-6 p-6 rounded-lg transition-all hover:shadow-lg"
                style={{
                  backgroundColor: item.type === 'vip' ? 'rgba(233,30,140,0.1)' : '#f9f9f9',
                  borderLeft: `4px solid ${typeColors[item.type]}`
                }}
              >
                <div className="flex-shrink-0 w-24">
                  <span className="font-bold text-[#1a1a1a]">{item.time}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-bold text-[#1a1a1a]">{item.title}</h3>
                    {item.type === 'vip' && (
                      <span className="px-3 py-1 bg-[#E91E8C] text-white text-xs font-bold uppercase rounded-full">
                        VIP
                      </span>
                    )}
                  </div>
                  <p className="text-[#666] mt-2">{item.description}</p>
                  {item.speaker && (
                    <p className="text-[#E91E8C] font-medium mt-2">Featuring: {item.speaker}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-12 px-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/60 text-sm">
            * Schedule is subject to change. All registered attendees will receive the final schedule via email
            before the event. VIP Reception is exclusively for VIP ticket holders.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ backgroundColor: '#E91E8C' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Ready for a Full Day of Transformation?
          </h2>
          <p className="text-white/80 mb-8">
            Don&apos;t miss out on keynotes, workshops, panels, and networking opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#tickets"
              className="inline-block px-8 py-4 bg-white text-[#E91E8C] font-bold text-sm uppercase tracking-wide rounded hover:opacity-90 transition-opacity"
            >
              Get General Admission - $197
            </Link>
            <Link
              href="/#tickets"
              className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-sm uppercase tracking-wide rounded hover:bg-white hover:text-[#E91E8C] transition-all"
            >
              Get VIP Experience - $397
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
