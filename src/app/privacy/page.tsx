import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy | Arizona Women\'s Conference',
  description: 'Privacy policy for the Arizona Women\'s Conference website.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#101010', fontFamily: '"Open Sans", sans-serif' }}>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4" style={{ backgroundColor: '#101010' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6" style={{ fontFamily: '"Acherus Black", Montserrat, sans-serif' }}>
            Privacy Policy
          </h1>
          <p className="text-white/60">Last updated: February 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <div className="space-y-8 text-[#333]">
            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Introduction</h2>
              <p className="leading-relaxed">
                The Arizona Women&apos;s Conference (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to
                protecting your personal data. This privacy policy explains how we collect, use, and safeguard
                your information when you visit our website or register for our conference.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Information We Collect</h2>
              <p className="leading-relaxed mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information (email address, phone number)</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Ticket preferences and dietary restrictions</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your ticket purchase and registration</li>
                <li>Send you confirmation emails and event updates</li>
                <li>Communicate important information about the conference</li>
                <li>Improve our website and services</li>
                <li>Respond to your inquiries and support requests</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Payment Processing</h2>
              <p className="leading-relaxed">
                All payment transactions are processed through Stripe, a PCI-compliant payment processor.
                We do not store your credit card information on our servers. Please refer to Stripe&apos;s
                privacy policy for information on how they handle your payment data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Email Communications</h2>
              <p className="leading-relaxed">
                By registering for the conference, you agree to receive email communications related to your
                registration and the event. You may opt out of promotional emails at any time by clicking the
                unsubscribe link in any email or contacting us directly.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Third-Party Services</h2>
              <p className="leading-relaxed mb-4">We may share your information with trusted third parties who assist us in:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing payments (Stripe)</li>
                <li>Sending emails (Resend)</li>
                <li>Hosting our website (Vercel)</li>
              </ul>
              <p className="leading-relaxed mt-4">
                These service providers are bound by contractual obligations to keep your information confidential.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Your Rights</h2>
              <p className="leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this privacy policy or our data practices, please contact us at:
              </p>
              <p className="mt-4">
                <a href="mailto:hello@azwomensconference.com" className="text-[#E91E8C] hover:underline">
                  hello@azwomensconference.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by
                posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
