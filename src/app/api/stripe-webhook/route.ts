import Stripe from 'stripe';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY not configured');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

const getResend = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured');
  }
  return new Resend(process.env.RESEND_API_KEY);
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (process.env.STRIPE_WEBHOOK_SECRET && sig) {
      const stripe = getStripe();
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('Payment successful:', session.id);

    const metadata = session.metadata || {};
    const ticketType = metadata.ticket_type;
    const customerName = metadata.customer_name;
    const customerEmail = metadata.customer_email || session.customer_email;
    const customerPhone = metadata.customer_phone;

    const isVip = ticketType === 'awc-vip';
    const ticketDetails = {
      name: isVip ? 'VIP Experience' : 'General Admission',
      price: isVip ? '$397' : '$197',
      includes: isVip
        ? [
            'Full day access to all sessions',
            'VIP seating (front rows)',
            'Exclusive VIP networking reception',
            'Meet & greet with speakers',
            'VIP gift bag',
            'Recording access',
            'Networking lunch included',
            'Conference materials',
            'Certificate of attendance'
          ]
        : [
            'Full day access to all sessions',
            'Networking lunch included',
            'Conference materials',
            'Certificate of attendance',
            'Networking with ambitious women entrepreneurs'
          ]
    };

    try {
      const resend = getResend();

      if (customerEmail) {
        // Send confirmation email
        await resend.emails.send({
          from: "Arizona Women's Conference <noreply@arizonawomensconference.com>",
          to: customerEmail,
          subject: `You're In! Arizona Women's Conference - ${ticketDetails.name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: 'Open Sans', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; }
                .header { background-color: #101010; padding: 40px 30px; text-align: center; }
                .header h1 { color: #E91E8C; margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; }
                .header p { color: #ffffff; margin: 10px 0 0; letter-spacing: 4px; font-size: 12px; }
                ${isVip ? '.vip-badge { background: linear-gradient(135deg, #E91E8C, #ff69b4); color: #fff; padding: 8px 20px; display: inline-block; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-top: 16px; }' : ''}
                .content { padding: 40px 30px; background-color: #ffffff; }
                .ticket-box { background-color: #f9f9f9; border-left: 4px solid #E91E8C; padding: 20px; margin: 24px 0; }
                .ticket-type { color: #E91E8C; font-size: 18px; font-weight: bold; text-transform: uppercase; margin: 0; }
                .details-box { background-color: #101010; color: #ffffff; padding: 24px; margin: 24px 0; }
                .details-box h3 { color: #E91E8C; margin-top: 0; }
                ul { padding-left: 20px; }
                li { margin: 8px 0; }
                .footer { background-color: #101010; color: #999; padding: 24px; text-align: center; font-size: 12px; }
                .pink { color: #E91E8C; }
                .signature { margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Arizona Women's Conference</h1>
                  <p>EMPOWER. CONNECT. TRANSFORM.</p>
                  ${isVip ? '<div class="vip-badge">VIP Experience</div>' : ''}
                </div>
                <div class="content">
                  <h2 style="color: #101010;">Hey ${customerName}!</h2>
                  <p>You did it! Your spot at the <strong>Arizona Women's Conference</strong> is officially secured.</p>
                  <p>Get ready for an incredible day of inspiration, education, and connection with hundreds of ambitious women.</p>

                  <div class="ticket-box">
                    <p class="ticket-type">${ticketDetails.name}</p>
                    <p style="margin: 8px 0 0;"><strong>Amount Paid:</strong> ${ticketDetails.price}</p>
                  </div>

                  <div class="details-box">
                    <h3>Event Details</h3>
                    <p><strong>Date:</strong> Saturday, May 2, 2026</p>
                    <p><strong>Time:</strong> 9:00 AM - 5:00 PM</p>
                    <p><strong>Location:</strong> Van Buren Street, Phoenix, AZ</p>
                    ${isVip ? '<p style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #333;"><strong style="color: #E91E8C;">VIP Reception:</strong> Exclusive networking event with speakers</p>' : ''}
                  </div>

                  <div style="margin: 24px 0;">
                    <h3>What's Included</h3>
                    <ul>
                      ${ticketDetails.includes.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                  </div>

                  <p>We'll send you more details as we get closer to the event. For now, mark your calendar and get ready for a transformative day!</p>

                  <div class="signature">
                    <p>See you there,</p>
                    <p><strong class="pink">Tiffany Largie</strong><br>CEO, DO THE DAMN THING®</p>
                  </div>
                </div>
                <div class="footer">
                  <p>© 2026 Arizona Women's Conference. All Rights Reserved.</p>
                  <p>Questions? Reply to this email or contact us at hello@arizonawomensconference.com</p>
                </div>
              </div>
            </body>
            </html>
          `
        });
        console.log('Confirmation email sent to:', customerEmail);

        // Send follow-up "next steps" email
        await resend.emails.send({
          from: "Arizona Women's Conference <noreply@arizonawomensconference.com>",
          to: customerEmail,
          subject: "What's Next? Prepare for the Arizona Women's Conference",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: 'Open Sans', Arial, sans-serif; line-height: 1.7; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
                .header { background-color: #101010; padding: 40px 30px; text-align: center; }
                .header h1 { color: #E91E8C; margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; }
                .content { padding: 40px 30px; }
                .step { display: flex; margin: 20px 0; }
                .step-number { background-color: #E91E8C; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; margin-right: 16px; }
                .step-content h4 { margin: 0 0 8px 0; color: #101010; }
                .step-content p { margin: 0; color: #666; font-size: 14px; }
                .section { border-top: 1px solid #eee; padding-top: 28px; margin-top: 28px; }
                .section-title { color: #E91E8C; font-size: 16px; font-weight: bold; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 1px; }
                ul { padding-left: 24px; margin: 16px 0; }
                li { margin: 8px 0; }
                .cta { text-align: center; margin: 32px 0; }
                .cta a { display: inline-block; background-color: #E91E8C; color: #fff; padding: 16px 32px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
                .footer { background-color: #101010; color: #999; padding: 24px; text-align: center; font-size: 12px; }
                .pink { color: #E91E8C; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>What's Next?</h1>
                </div>
                <div class="content">
                  <p style="font-size: 18px;">Hey ${customerName}!</p>
                  <p>You're officially registered for the <strong>Arizona Women's Conference</strong> on May 2nd. Here's how to prepare:</p>

                  <div style="margin: 32px 0;">
                    <div class="step">
                      <div class="step-number">1</div>
                      <div class="step-content">
                        <h4>Mark Your Calendar</h4>
                        <p>Saturday, May 2, 2026 • 9:00 AM - 5:00 PM</p>
                      </div>
                    </div>

                    <div class="step">
                      <div class="step-number">2</div>
                      <div class="step-content">
                        <h4>Plan Your Outfit</h4>
                        <p>Dress professionally yet comfortably. You'll be networking all day!</p>
                      </div>
                    </div>

                    <div class="step">
                      <div class="step-number">3</div>
                      <div class="step-content">
                        <h4>Prepare Your Business Cards</h4>
                        <p>You never know who you'll meet. Bring plenty of cards for networking.</p>
                      </div>
                    </div>

                    <div class="step">
                      <div class="step-number">4</div>
                      <div class="step-content">
                        <h4>Come Ready to Learn</h4>
                        <p>Bring a notebook or tablet to capture insights and action items.</p>
                      </div>
                    </div>
                  </div>

                  <div class="section">
                    <p class="section-title">What to Expect</p>
                    <ul>
                      <li>Powerful keynotes from industry leaders</li>
                      <li>Interactive workshops and breakout sessions</li>
                      <li>Networking with ambitious women entrepreneurs</li>
                      <li>Actionable strategies you can implement immediately</li>
                      <li>Lunch and refreshments included</li>
                    </ul>
                  </div>

                  <p>We'll send you a reminder as the event gets closer with final details and the exact venue address.</p>

                  <p>Get ready for an unforgettable day!</p>

                  <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">
                    <p>With excitement,</p>
                    <p><strong class="pink">Team Tiffany</strong></p>
                  </div>
                </div>
                <div class="footer">
                  <p>© 2026 Arizona Women's Conference. All Rights Reserved.</p>
                </div>
              </div>
            </body>
            </html>
          `
        });
        console.log('Next steps email sent to:', customerEmail);
      }

      // Send notification to admin
      const adminEmail = process.env.ADMIN_EMAIL || 'tiffany@dotheblankthing.com';
      await resend.emails.send({
        from: "Arizona Women's Conference <noreply@arizonawomensconference.com>",
        to: adminEmail,
        subject: `New AWC Registration: ${ticketDetails.name} - ${customerName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #E91E8C; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f5f5f5; }
              table { width: 100%; border-collapse: collapse; background: #fff; }
              td { padding: 12px; border-bottom: 1px solid #eee; }
              .label { font-weight: bold; width: 140px; background: #f9f9f9; }
              .highlight { background-color: #E91E8C; color: #fff; padding: 4px 8px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin:0; color: #fff;">New AWC Registration!</h2>
              </div>
              <div class="content">
                <table>
                  <tr><td class="label">Name</td><td>${customerName}</td></tr>
                  <tr><td class="label">Email</td><td><a href="mailto:${customerEmail}">${customerEmail}</a></td></tr>
                  <tr><td class="label">Phone</td><td>${customerPhone || 'Not provided'}</td></tr>
                  <tr><td class="label">Ticket Type</td><td><span class="highlight">${ticketDetails.name}</span></td></tr>
                  <tr><td class="label">Amount Paid</td><td><strong>${ticketDetails.price}</strong></td></tr>
                  <tr><td class="label">Stripe Payment</td><td><a href="https://dashboard.stripe.com/payments/${session.payment_intent}">View in Stripe</a></td></tr>
                </table>
              </div>
            </div>
          </body>
          </html>
        `
      });
      console.log('Admin notification sent');

    } catch (emailError) {
      console.error('Email error:', emailError);
    }
  }

  return NextResponse.json({ received: true });
}
