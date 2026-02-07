'use client'

import { Sparkles } from 'lucide-react'

export default function AWCSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#101010', fontFamily: '"Open Sans", sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#101010', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-4 flex justify-center">
          <a href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://dtdtnation.com/wp-content/uploads/2022/01/DTDT_logo-1.svg"
              alt="DO THE DAMN THING"
              style={{ height: '45px' }}
            />
          </a>
        </div>
      </header>

      {/* Success Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: '#E91E8C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            fontSize: '48px'
          }}>
            <Sparkles size={48} color="#fff" />
          </div>

          <h1 style={{
            fontFamily: '"Acherus Black", Montserrat, sans-serif',
            fontSize: '48px',
            fontWeight: 500,
            color: '#E91E8C',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            You&apos;re In!
          </h1>

          <p style={{
            fontSize: '20px',
            color: '#ffffff',
            marginBottom: '32px',
            lineHeight: 1.6
          }}>
            Your spot at the Arizona Women&apos;s Conference is secured. Get ready for a transformative day of empowerment, connection, and growth.
          </p>

          {/* Event Details Box */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '32px',
            marginBottom: '32px'
          }}>
            <h2 style={{
              fontFamily: '"Acherus Bold", Montserrat, sans-serif',
              fontSize: '20px',
              color: '#ffffff',
              textTransform: 'uppercase',
              marginBottom: '24px'
            }}>
              What&apos;s Next
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start">
                <span style={{ color: '#E91E8C', marginRight: '16px', fontSize: '20px' }}>1.</span>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, marginBottom: '4px' }}>Check Your Email</p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                    Your confirmation and ticket details are on their way.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span style={{ color: '#E91E8C', marginRight: '16px', fontSize: '20px' }}>2.</span>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, marginBottom: '4px' }}>Mark Your Calendar</p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                    Saturday, May 2, 2026 • 9:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span style={{ color: '#E91E8C', marginRight: '16px', fontSize: '20px' }}>3.</span>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, marginBottom: '4px' }}>Prepare to Connect</p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                    Bring business cards and be ready to network with amazing women.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Motivational Quote */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{
              fontSize: '18px',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '12px'
            }}>
              &ldquo;Empowered women empower women. See you in Phoenix!&rdquo;
            </p>
            <p style={{ color: '#E91E8C', fontWeight: 600 }}>— Tiffany Largie</p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              style={{
                display: 'inline-block',
                padding: '16px 32px',
                backgroundColor: '#E91E8C',
                color: '#fff',
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
              Return Home
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0c0c0c', borderTop: '1px solid rgba(255,255,255,0.1)' }} className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm" style={{ color: '#6b7280' }}>
            &copy; 2026 Arizona Women&apos;s Conference. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
