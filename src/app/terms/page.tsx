import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Terms of Service | Arizona Women\'s Conference',
  description: 'Terms of service for the Arizona Women\'s Conference website and event.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#101010', fontFamily: '"Open Sans", sans-serif' }}>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4" style={{ backgroundColor: '#101010' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Terms of Service
          </h1>
          <p className="text-white/60">Last updated: February 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <div className="space-y-8 text-[#333]">
            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Agreement to Terms</h2>
              <p className="leading-relaxed">
                By accessing our website and/or purchasing tickets to the Arizona Women&apos;s Conference,
                you agree to be bound by these Terms of Service. If you do not agree to these terms,
                please do not use our website or purchase tickets.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Ticket Purchase & Registration</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All ticket sales are final. Tickets are non-refundable.</li>
                <li>Tickets are transferable. You may transfer your ticket to another person by contacting us at least 7 days before the event.</li>
                <li>Prices are subject to change without notice until purchase is completed.</li>
                <li>We reserve the right to refuse entry to any ticket holder for any reason.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Event Policies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>The Arizona Women&apos;s Conference reserves the right to modify the event schedule, speakers, or venue.</li>
                <li>In the event of cancellation by the organizers, registered attendees will receive a full refund.</li>
                <li>Event date changes will be communicated to all registered attendees, with the option to request a refund.</li>
                <li>Personal photography and video is permitted for personal use only.</li>
                <li>Professional photography/video requires prior written approval.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Code of Conduct</h2>
              <p className="leading-relaxed mb-4">
                The Arizona Women&apos;s Conference is dedicated to providing a harassment-free experience for everyone.
                We do not tolerate harassment of participants in any form. By attending, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Treat all attendees, speakers, and staff with respect</li>
                <li>Refrain from discriminatory or harassing behavior</li>
                <li>Respect the privacy and boundaries of others</li>
                <li>Follow all venue rules and guidelines</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Violation of this code of conduct may result in removal from the event without refund.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Photo & Video Release</h2>
              <p className="leading-relaxed">
                By attending the Arizona Women&apos;s Conference, you grant permission to the event organizers
                to use photographs and video recordings taken during the event for promotional purposes,
                including but not limited to social media, website, and marketing materials.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Intellectual Property</h2>
              <p className="leading-relaxed">
                All content on this website, including text, graphics, logos, and images, is the property
                of the Arizona Women&apos;s Conference and is protected by copyright laws. You may not
                reproduce, distribute, or use any content without prior written permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Limitation of Liability</h2>
              <p className="leading-relaxed">
                The Arizona Women&apos;s Conference and its organizers shall not be liable for any direct,
                indirect, incidental, or consequential damages arising from your attendance at the event
                or use of this website. You attend the event at your own risk.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">VIP Ticket Benefits</h2>
              <p className="leading-relaxed">
                VIP ticket benefits are subject to availability. While we make every effort to provide
                all advertised VIP benefits, specific elements may be modified at our discretion.
                Recording access is provided digitally within 2 weeks of the event.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Governing Law</h2>
              <p className="leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws
                of the State of Arizona, without regard to its conflict of law provisions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-4">
                <a href="mailto:hello@azwomensconference.com" className="text-[#E91E8C] hover:underline">
                  hello@azwomensconference.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to update these Terms of Service at any time. Changes will be
                effective immediately upon posting to this page. Your continued use of our website
                or attendance at the event constitutes acceptance of the updated terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
