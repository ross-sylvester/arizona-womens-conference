import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0c0c0c', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <p className="text-white font-bold uppercase tracking-wide text-lg">Arizona Women&apos;s</p>
              <p className="text-[#E91E8C] text-sm uppercase tracking-wider">Conference</p>
            </div>
            <p className="text-white/60 mb-6 max-w-md">
              Arizona&apos;s premier conference for women in business. Join hundreds of ambitious women
              for a transformative day of inspiration, education, and connection.
            </p>
            <div className="pt-4 border-t border-white/10">
              <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Sponsors</p>
              <div className="flex items-center gap-6">
                <a
                  href="https://dotheblankthing.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer hover:opacity-100 transition-opacity"
                  style={{ opacity: 0.7 }}
                  onClick={() => window.open('https://dotheblankthing.com', '_blank')}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://dtdtnation.com/wp-content/uploads/2022/01/DTDT_logo-1.svg"
                    alt="DO THE DAMN THING"
                    style={{ height: '24px' }}
                  />
                </a>
                <a
                  href="https://speedrun.adrata.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 cursor-pointer hover:opacity-100 transition-opacity"
                  style={{ opacity: 0.7 }}
                  onClick={() => window.open('https://speedrun.adrata.com', '_blank')}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H9M17 7V15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white text-sm font-medium">Adrata</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wide mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-white/60 hover:text-[#E91E8C] transition-colors">About</Link></li>
              <li><Link href="/speakers" className="text-white/60 hover:text-[#E91E8C] transition-colors">Speakers</Link></li>
              <li><Link href="/schedule" className="text-white/60 hover:text-[#E91E8C] transition-colors">Schedule</Link></li>
              <li><Link href="/venue" className="text-white/60 hover:text-[#E91E8C] transition-colors">Venue</Link></li>
              <li><Link href="/faq" className="text-white/60 hover:text-[#E91E8C] transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-[#E91E8C] transition-colors">Contact</Link></li>
              <li><Link href="/#tickets" className="text-white/60 hover:text-[#E91E8C] transition-colors">Get Tickets</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wide mb-6">Contact</h4>
            <ul className="space-y-3 text-white/60">
              <li>
                <a href="mailto:hello@azwomensconference.com" className="hover:text-[#E91E8C] transition-colors">
                  hello@azwomensconference.com
                </a>
              </li>
              <li>Phoenix, AZ</li>
              <li className="pt-4">
                <span className="text-[#E91E8C] font-bold">May 2, 2026</span><br />
                9:00 AM - 5:00 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/40">
            &copy; 2026 Arizona Women&apos;s Conference. All Rights Reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-white/40 hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-white/40 hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
