import Stripe from 'stripe';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Lazy initialization to avoid build errors when env vars aren't set
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

    // Determine ticket details based on type
    const getTicketDetails = (type: string) => {
      switch (type) {
        case 'vip':
          return {
            name: 'VIP Experience',
            price: '$125',
            event: 'MORE: The Tea Party',
            includes: [
              'Full day access (1PM - 6PM)',
              'Unlimited food & coffee',
              '2026 Planner AND Workbook',
              'MORE Roadmap',
              'VIP seating at The Tea Party',
              'Access to Tiffany\'s Birthday Party (Feb 8th)',
              'Intimate dinner & connection',
              'Special birthday gift bag',
              'Photo opportunities with Tiffany'
            ]
          };
        case 'awc-vip':
          return {
            name: 'VIP Experience',
            price: '$397',
            event: "Arizona Women's Conference",
            includes: [
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
          };
        case 'awc-general':
          return {
            name: 'General Admission',
            price: '$197',
            event: "Arizona Women's Conference",
            includes: [
              'Full day access to all sessions',
              'Networking lunch included',
              'Conference materials',
              'Certificate of attendance',
              'Networking with ambitious women entrepreneurs'
            ]
          };
        case 'night-school':
          return {
            name: 'Night School Enrollment',
            price: '$497',
            event: 'Night School',
            includes: [
              '7 days of intensive, in-person training',
              'Nightly homework grading with instructor feedback',
              'Night School Workbook & Materials',
              '"Tiffany Cash" bonus (redeemable for 6 months)',
              'Graduation certificate',
              'Networking with alumni and mastermind members'
            ]
          };
        default:
          return {
            name: 'General Admission',
            price: '$88 (Workbook Fee)',
            event: 'MORE: The Tea Party',
            includes: [
              'Full day access (1PM - 6PM)',
              'Unlimited food & coffee',
              '2026 Workbook',
              'MORE Roadmap',
              'Guided conversations & experiences',
              'Connection with like-minded women'
            ]
          };
      }
    };

    const ticketDetails = getTicketDetails(ticketType);

    try {
      const resend = getResend();
      // Send confirmation email to attendee
      if (customerEmail) {
        await resend.emails.send({
          from: 'MORE: The Tea Party <noreply@dotheblankthing.com>',
          to: customerEmail,
          subject: `You're In! MORE: The Tea Party - ${ticketDetails.name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: 'Open Sans', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; }
                .header { background-color: #101010; padding: 40px 30px; text-align: center; }
                .header h1 { color: #FABE39; margin: 0; font-size: 48px; letter-spacing: 4px; }
                .header p { color: #ffffff; margin: 10px 0 0; letter-spacing: 6px; font-size: 14px; }
                .content { padding: 40px 30px; background-color: #ffffff; }
                .ticket-box { background-color: #f9f9f9; border-left: 4px solid #FABE39; padding: 20px; margin: 24px 0; }
                .ticket-type { color: #FABE39; font-size: 18px; font-weight: bold; text-transform: uppercase; margin: 0; }
                .details { margin: 24px 0; }
                .details-box { background-color: #101010; color: #ffffff; padding: 24px; margin: 24px 0; }
                .details-box h3 { color: #FABE39; margin-top: 0; }
                ul { padding-left: 20px; }
                li { margin: 8px 0; }
                .footer { background-color: #101010; color: #999; padding: 24px; text-align: center; font-size: 12px; }
                .gold { color: #FABE39; }
                .signature { margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>MORE</h1>
                  <p>THE TEA PARTY</p>
                </div>
                <div class="content">
                  <h2 style="color: #101010;">Hey ${customerName}!</h2>
                  <p>You did it. You said <strong>YES</strong> to yourself.</p>
                  <p>Welcome to MORE: The Tea Party. Your seat at the table is confirmed.</p>

                  <div class="ticket-box">
                    <p class="ticket-type">${ticketDetails.name}</p>
                    <p style="margin: 8px 0 0;"><strong>Amount Paid:</strong> ${ticketDetails.price}</p>
                  </div>

                  <div class="details-box">
                    <h3>Event Details</h3>
                    <p><strong>Date:</strong> February 7th, 2026</p>
                    <p><strong>Time:</strong> 1PM - 6PM</p>
                    <p><strong>Location:</strong> Van Buren Building, Phoenix, AZ</p>
                    ${ticketType === 'vip' ? '<p style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #333;"><strong style="color: #FABE39;">VIP Birthday Party:</strong> February 8th (details coming soon)</p>' : ''}
                  </div>

                  <div class="details">
                    <h3>What's Included</h3>
                    <ul>
                      ${ticketDetails.includes.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                  </div>

                  <p>We'll send you more details as we get closer to the event. For now, mark your calendar and get ready for a day of truth, clarity, and connection.</p>

                  <p>This is your first step toward MORE.</p>

                  <div class="signature">
                    <p>See you there,</p>
                    <p><strong class="gold">Tiffany Largie</strong><br>CEO, DO THE DAMN THING®</p>
                  </div>
                </div>
                <div class="footer">
                  <p>© 2026 DO THE DAMN THING™. All Rights Reserved.</p>
                  <p>Questions? Reply to this email or contact us at hello@dotheblankthing.com</p>
                </div>
              </div>
            </body>
            </html>
          `
        });
        console.log('Confirmation email sent to:', customerEmail);

        // Send follow-up email based on ticket type
        if (ticketType === 'general') {
          // GENERAL ADMISSION: Countdown/details email
          await resend.emails.send({
            from: 'MORE: The Tea Party <noreply@dotheblankthing.com>',
            to: customerEmail,
            subject: 'The Countdown Is ON — MORE TEA Party Is Almost Here ☕✨',
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: 'Open Sans', Arial, sans-serif; line-height: 1.7; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
                  .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
                  .header { background-color: #101010; padding: 40px 30px; text-align: center; }
                  .header h1 { color: #FABE39; margin: 0; font-size: 42px; letter-spacing: 3px; }
                  .header p { color: #ffffff; margin: 10px 0 0; letter-spacing: 4px; font-size: 13px; }
                  .content { padding: 40px 30px; }
                  .section { border-top: 1px solid #eee; padding-top: 28px; margin-top: 28px; }
                  .section-title { color: #101010; font-size: 18px; font-weight: bold; margin: 0 0 16px 0; }
                  .details-grid { margin: 16px 0; }
                  .details-grid p { margin: 6px 0; }
                  ul { padding-left: 24px; margin: 16px 0; list-style: disc; }
                  li { margin: 8px 0; }
                  .callout { background-color: #f9f9f9; padding: 16px 20px; margin: 20px 0; }
                  .footer { background-color: #101010; color: #999; padding: 24px; text-align: center; font-size: 12px; }
                  .signature { margin-top: 32px; }
                  .gold { color: #FABE39; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>MORE</h1>
                    <p>THE TEA PARTY</p>
                  </div>
                  <div class="content">
                    <p style="font-size: 20px; margin-bottom: 8px;">WHOooo hooo!!!</p>
                    <p>The countdown officially begins!</p>

                    <p>We are getting SO close and we could not be more excited to welcome you to the <strong>MORE TEA Party</strong> — it's happening and it's almost here!</p>

                    <p>This will be an afternoon designed for connection, conversation, elegance, and intention. A room full of women meeting their <strong>bestest self</strong> — and yes ma'am, we will be taking photos. 📸</p>

                    <p>Below are a few important details so you can prepare accordingly.</p>

                    <div class="section">
                      <p class="section-title">📍 EVENT DETAILS</p>
                      <div class="details-grid">
                        <p><strong>Date:</strong> Friday, February 7th</p>
                        <p><strong>Time:</strong> 1:00 PM – 6:00 PM</p>
                        <p><strong>Location:</strong><br>
                        1514 East Van Buren<br>
                        Phoenix, AZ 85006</p>
                      </div>
                      <p>Please plan to arrive a few minutes early so you can settle in, grab tea, and be fully present when we begin.</p>
                    </div>

                    <div class="section">
                      <p class="section-title">👗 DRESS CODE: TEA PARTY READY</p>
                      <p>This is a <strong>TEA Party for women</strong> — we invite you to dress for the moment.</p>
                      <p>Think:</p>
                      <ul>
                        <li>Elevated</li>
                        <li>Feminine</li>
                        <li>Intentional</li>
                        <li>Classic, playful, bold — whatever "your bestest self" looks like, no - you don't need to wear heels - and yes you can sure wear a hat.</li>
                      </ul>
                      <p>Dresses, skirts, tailored looks, accessories, hats, heels, flats — all welcome. Choose an outfit that makes you feel confident, beautiful, and fully expressed.</p>
                      <p>📸 <strong>Photos will be taken</strong>, so come camera-ready.</p>
                      <p class="callout">As always: you never know who will be in the room or what conversation could change everything.</p>
                    </div>

                    <div class="section">
                      <p class="section-title">✨ WHAT TO EXPECT</p>
                      <ul>
                        <li>Thoughtful conversation over tea</li>
                        <li>Beautiful energy and meaningful connection</li>
                        <li>Space to talk honestly about MORE</li>
                        <li>A curated, intimate afternoon designed for women</li>
                        <li>Working through your game plan with the women in the room and get Tiffany's Road map how to build and with what.</li>
                      </ul>
                      <p>This is not a rushed event. It's a pause. A gathering. A moment to be seen.</p>
                    </div>

                    <p style="margin-top: 32px;">We'll be sharing a few more details as we get closer. If you have any questions at all, just hit reply — we're happy to help.</p>

                    <p>We cannot wait to host you.</p>

                    <div class="signature">
                      <p>With excitement,</p>
                      <p><strong class="gold">Team Tiffany</strong> ☕✨</p>
                    </div>
                  </div>
                  <div class="footer">
                    <p>© 2026 DO THE DAMN THING™. All Rights Reserved.</p>
                    <p><a href="https://dotheblankthing.com/unsubscribe?email=${encodeURIComponent(customerEmail)}" style="color: #666;">Unsubscribe</a></p>
                  </div>
                </div>
              </body>
              </html>
            `
          });
          console.log('General admission countdown email sent to:', customerEmail);
        } else if (ticketType === 'vip') {
          // VIP: Welcome email with birthday party details
          await resend.emails.send({
            from: 'MORE: The Tea Party <noreply@dotheblankthing.com>',
            to: customerEmail,
            subject: 'You\'re In VIP! We Can\'t Wait to Celebrate With You! 🎂✨',
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: 'Open Sans', Arial, sans-serif; line-height: 1.7; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
                  .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
                  .header { background-color: #101010; padding: 40px 30px; text-align: center; }
                  .header h1 { color: #FABE39; margin: 0; font-size: 42px; letter-spacing: 3px; }
                  .header p { color: #ffffff; margin: 10px 0 0; letter-spacing: 4px; font-size: 13px; }
                  .vip-badge { background: linear-gradient(135deg, #FABE39, #f5c842); color: #000; padding: 8px 20px; display: inline-block; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-top: 16px; }
                  .content { padding: 40px 30px; }
                  .event-box { background-color: #f9f9f9; border-left: 4px solid #FABE39; padding: 20px; margin: 20px 0; }
                  .event-box h4 { color: #FABE39; margin: 0 0 8px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; }
                  .section { border-top: 1px solid #eee; padding-top: 28px; margin-top: 28px; }
                  .section-title { color: #101010; font-size: 18px; font-weight: bold; margin: 0 0 16px 0; }
                  .details-grid { margin: 16px 0; }
                  .details-grid p { margin: 6px 0; }
                  ul { padding-left: 24px; margin: 16px 0; list-style: disc; }
                  li { margin: 8px 0; }
                  .highlight-box { background-color: #101010; color: #fff; padding: 24px; margin: 24px 0; text-align: center; }
                  .footer { background-color: #101010; color: #999; padding: 24px; text-align: center; font-size: 12px; }
                  .signature { margin-top: 32px; }
                  .gold { color: #FABE39; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>MORE</h1>
                    <p>THE TEA PARTY</p>
                    <div class="vip-badge">VIP Experience</div>
                  </div>
                  <div class="content">
                    <p style="font-size: 22px; margin-bottom: 8px; color: #FABE39; font-weight: bold;">You're going to have the BEST time!</p>
                    <p>We are SO excited that you'll be joining us for <strong>BOTH</strong> events! This is going to be an incredible weekend.</p>

                    <div class="highlight-box">
                      <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">You're coming to</p>
                      <p style="margin: 8px 0 0; font-size: 24px; color: #FABE39; font-weight: bold;">TWO AMAZING EVENTS!</p>
                    </div>

                    <div class="event-box">
                      <h4>🍵 Event 1: MORE: The Tea Party</h4>
                      <p style="margin: 0;"><strong>Friday, February 7th</strong> • 1:00 PM – 6:00 PM</p>
                      <p style="margin: 4px 0 0; color: #666; font-size: 14px;">1514 E. Van Buren St. Phoenix, AZ 85006</p>
                    </div>

                    <div class="event-box">
                      <h4>🎂 Event 2: Tiffany's Birthday & Super Bowl Party!</h4>
                      <p style="margin: 0;"><strong>Saturday, February 8th</strong> • Starting at 3:00 PM</p>
                      <p style="margin: 4px 0 0; color: #666; font-size: 14px;">More details coming soon — it's going to be a celebration!</p>
                    </div>

                    <p><strong>As a VIP, you'll also receive:</strong></p>
                    <ul>
                      <li>VIP seating at The Tea Party</li>
                      <li>Both the 2026 Planner AND Workbook</li>
                      <li>Special birthday gift bag</li>
                      <li>Private "Ask Tiffany Anything" session</li>
                      <li>Photo opportunities with Tiffany</li>
                      <li>Intimate dinner & connection at the Birthday Party</li>
                    </ul>

                    <div class="section">
                      <p class="section-title">📍 TEA PARTY DETAILS (Feb 7th)</p>
                      <div class="details-grid">
                        <p><strong>Date:</strong> Friday, February 7th</p>
                        <p><strong>Time:</strong> 1:00 PM – 6:00 PM</p>
                        <p><strong>Location:</strong><br>
                        1514 East Van Buren<br>
                        Phoenix, AZ 85006</p>
                      </div>
                    </div>

                    <div class="section">
                      <p class="section-title">🎉 BIRTHDAY PARTY DETAILS (Feb 8th)</p>
                      <p style="color: #666;">We're SO excited to celebrate with you! The Birthday & Super Bowl Party kicks off at <strong>3:00 PM on Saturday, February 8th</strong>.</p>
                      <p style="background: #f9f9f9; padding: 12px; font-style: italic; margin-top: 12px;">More details on location and what to wear coming soon — but trust us, you're going to have the best time! 🎉</p>
                    </div>

                    <p style="margin-top: 32px;">Get ready for an amazing weekend — we cannot WAIT to celebrate with you!</p>

                    <div class="signature">
                      <p>With excitement,</p>
                      <p><strong class="gold">Team Tiffany</strong> ☕🎂✨</p>
                    </div>
                  </div>
                  <div class="footer">
                    <p>© 2026 DO THE DAMN THING™. All Rights Reserved.</p>
                    <p><a href="https://dotheblankthing.com/unsubscribe?email=${encodeURIComponent(customerEmail)}" style="color: #666;">Unsubscribe</a></p>
                  </div>
                </div>
              </body>
              </html>
            `
          });
          console.log('VIP welcome email sent to:', customerEmail);
        } else if (ticketType === 'awc-general' || ticketType === 'awc-vip') {
          // ARIZONA WOMEN'S CONFERENCE: Confirmation email
          const isVip = ticketType === 'awc-vip';
          await resend.emails.send({
            from: "Arizona Women's Conference <noreply@dotheblankthing.com>",
            to: customerEmail,
            subject: `You're In! Arizona Women's Conference - ${isVip ? 'VIP Experience' : 'General Admission'}`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: 'Open Sans', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                  .container { max-width: 600px; margin: 0 auto; }
                  .header { background-color: #101010; padding: 40px 30px; text-align: center; }
                  .header h1 { color: #FABE39; margin: 0; font-size: 32px; letter-spacing: 2px; text-transform: uppercase; }
                  .header p { color: #ffffff; margin: 10px 0 0; letter-spacing: 4px; font-size: 12px; }
                  ${isVip ? '.vip-badge { background: linear-gradient(135deg, #FABE39, #f5c842); color: #000; padding: 8px 20px; display: inline-block; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-top: 16px; }' : ''}
                  .content { padding: 40px 30px; background-color: #ffffff; }
                  .ticket-box { background-color: #f9f9f9; border-left: 4px solid #FABE39; padding: 20px; margin: 24px 0; }
                  .ticket-type { color: #FABE39; font-size: 18px; font-weight: bold; text-transform: uppercase; margin: 0; }
                  .details-box { background-color: #101010; color: #ffffff; padding: 24px; margin: 24px 0; }
                  .details-box h3 { color: #FABE39; margin-top: 0; }
                  ul { padding-left: 20px; }
                  li { margin: 8px 0; }
                  .footer { background-color: #101010; color: #999; padding: 24px; text-align: center; font-size: 12px; }
                  .gold { color: #FABE39; }
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
                      <p class="ticket-type">${isVip ? 'VIP Experience' : 'General Admission'}</p>
                      <p style="margin: 8px 0 0;"><strong>Amount Paid:</strong> ${isVip ? '$397' : '$197'}</p>
                    </div>

                    <div class="details-box">
                      <h3>Event Details</h3>
                      <p><strong>Date:</strong> Saturday, May 2, 2026</p>
                      <p><strong>Time:</strong> 9:00 AM - 5:00 PM</p>
                      <p><strong>Location:</strong> Van Buren Street, Phoenix, AZ</p>
                      ${isVip ? '<p style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #333;"><strong style="color: #FABE39;">VIP Reception:</strong> Exclusive networking event with speakers</p>' : ''}
                    </div>

                    <div style="margin: 24px 0;">
                      <h3>What's Included</h3>
                      <ul>
                        ${ticketDetails.includes.map(item => `<li>${item}</li>`).join('')}
                      </ul>
                    </div>

                    <p>We'll send you more details as we get closer to the event. For now, mark your calendar and get ready for an transformative day!</p>

                    <div class="signature">
                      <p>See you there,</p>
                      <p><strong class="gold">Tiffany Largie</strong><br>CEO, DO THE DAMN THING®</p>
                    </div>
                  </div>
                  <div class="footer">
                    <p>© 2026 DO THE DAMN THING™. All Rights Reserved.</p>
                    <p>Questions? Reply to this email or contact us at hello@dotheblankthing.com</p>
                  </div>
                </div>
              </body>
              </html>
            `
          });
          console.log('AWC confirmation email sent to:', customerEmail);

          // Send follow-up "next steps" email
          await resend.emails.send({
            from: "Arizona Women's Conference <noreply@dotheblankthing.com>",
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
                  .header h1 { color: #FABE39; margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; }
                  .content { padding: 40px 30px; }
                  .step { display: flex; margin: 20px 0; }
                  .step-number { background-color: #FABE39; color: #000; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; margin-right: 16px; }
                  .step-content h4 { margin: 0 0 8px 0; color: #101010; }
                  .step-content p { margin: 0; color: #666; font-size: 14px; }
                  .section { border-top: 1px solid #eee; padding-top: 28px; margin-top: 28px; }
                  .section-title { color: #FABE39; font-size: 16px; font-weight: bold; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 1px; }
                  ul { padding-left: 24px; margin: 16px 0; }
                  li { margin: 8px 0; }
                  .cta { text-align: center; margin: 32px 0; }
                  .cta a { display: inline-block; background-color: #FABE39; color: #000; padding: 16px 32px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
                  .footer { background-color: #101010; color: #999; padding: 24px; text-align: center; font-size: 12px; }
                  .gold { color: #FABE39; }
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

                    <div class="cta">
                      <a href="https://dotheblankthing.com/arizona-womens-conference">View Event Details</a>
                    </div>

                    <p>We'll send you a reminder as the event gets closer with final details and the exact venue address.</p>

                    <p>Get ready for an unforgettable day!</p>

                    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">
                      <p>With excitement,</p>
                      <p><strong class="gold">Team Tiffany</strong></p>
                    </div>
                  </div>
                  <div class="footer">
                    <p>© 2026 DO THE DAMN THING™. All Rights Reserved.</p>
                    <p><a href="https://dotheblankthing.com/unsubscribe?email=${encodeURIComponent(customerEmail)}" style="color: #666;">Unsubscribe</a></p>
                  </div>
                </div>
              </body>
              </html>
            `
          });
          console.log('AWC next steps email sent to:', customerEmail);
        } else if (ticketType === 'night-school') {
          // NIGHT SCHOOL: Confirmation email
          await resend.emails.send({
            from: 'Night School <noreply@dotheblankthing.com>',
            to: customerEmail,
            subject: "You're Enrolled! Welcome to Night School",
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: 'Open Sans', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                  .container { max-width: 600px; margin: 0 auto; }
                  .header { background-color: #101010; padding: 40px 30px; text-align: center; }
                  .header img { height: 60px; }
                  .content { padding: 40px 30px; background-color: #ffffff; }
                  .ticket-box { background-color: #f9f9f9; border-left: 4px solid #FABE39; padding: 20px; margin: 24px 0; }
                  .ticket-type { color: #FABE39; font-size: 18px; font-weight: bold; text-transform: uppercase; margin: 0; }
                  .details-box { background-color: #101010; color: #ffffff; padding: 24px; margin: 24px 0; }
                  .details-box h3 { color: #FABE39; margin-top: 0; }
                  ul { padding-left: 20px; }
                  li { margin: 8px 0; }
                  .footer { background-color: #101010; color: #999; padding: 24px; text-align: center; font-size: 12px; }
                  .gold { color: #FABE39; }
                  .signature { margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <img src="https://dtdtnation.com/wp-content/uploads/2022/09/NS-LOGO_use.png" alt="Night School" />
                  </div>
                  <div class="content">
                    <h2 style="color: #101010;">Welcome to Night School, ${customerName}!</h2>
                    <p>You just did the damn thing! Your enrollment in Night School is confirmed.</p>
                    <p>Get ready for 7 days that will transform your business and your life.</p>

                    <div class="ticket-box">
                      <p class="ticket-type">Night School Enrollment</p>
                      <p style="margin: 8px 0 0;"><strong>Amount Paid:</strong> $497</p>
                    </div>

                    <div class="details-box">
                      <h3>Event Details</h3>
                      <p><strong>Dates:</strong> March 2-8, 2026</p>
                      <p><strong>Time:</strong> 6:00 PM - 10:00 PM (Sat 10AM-6PM, Sun 12PM-5PM)</p>
                      <p><strong>Location:</strong> 130 N. Central Avenue, Suite 201, Phoenix, AZ 85004</p>
                    </div>

                    <div style="margin: 24px 0;">
                      <h3>What's Included</h3>
                      <ul>
                        ${ticketDetails.includes.map(item => `<li>${item}</li>`).join('')}
                      </ul>
                    </div>

                    <p>We'll send you pre-work materials and detailed instructions as we get closer to the start date.</p>

                    <div class="signature">
                      <p>Let's build something amazing,</p>
                      <p><strong class="gold">Tiffany Largie</strong><br>CEO, DO THE DAMN THING®</p>
                    </div>
                  </div>
                  <div class="footer">
                    <p>© 2026 DO THE DAMN THING™. All Rights Reserved.</p>
                    <p>Questions? Reply to this email or contact us at hello@dotheblankthing.com</p>
                  </div>
                </div>
              </body>
              </html>
            `
          });
          console.log('Night School confirmation email sent to:', customerEmail);

          // Send follow-up "what's next" email
          await resend.emails.send({
            from: 'Night School <noreply@dotheblankthing.com>',
            to: customerEmail,
            subject: "What's Next? Prepare for Night School",
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: 'Open Sans', Arial, sans-serif; line-height: 1.7; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
                  .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
                  .header { background-color: #101010; padding: 40px 30px; text-align: center; }
                  .header h1 { color: #FABE39; margin: 0; font-size: 28px; }
                  .content { padding: 40px 30px; }
                  .step { display: flex; margin: 20px 0; }
                  .step-number { background-color: #FABE39; color: #000; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; margin-right: 16px; }
                  .step-content h4 { margin: 0 0 8px 0; color: #101010; }
                  .step-content p { margin: 0; color: #666; font-size: 14px; }
                  .curriculum { background-color: #f9f9f9; padding: 20px; margin: 24px 0; }
                  .curriculum h4 { color: #FABE39; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px; font-size: 14px; }
                  .day { padding: 8px 0; border-bottom: 1px solid #eee; }
                  .day:last-child { border-bottom: none; }
                  .day strong { color: #101010; }
                  .cta { text-align: center; margin: 32px 0; }
                  .cta a { display: inline-block; background-color: #FABE39; color: #000; padding: 16px 32px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
                  .footer { background-color: #101010; color: #999; padding: 24px; text-align: center; font-size: 12px; }
                  .gold { color: #FABE39; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Prepare for Night School</h1>
                  </div>
                  <div class="content">
                    <p style="font-size: 18px;">Hey ${customerName}!</p>
                    <p>You're officially enrolled in Night School! Here's how to prepare for the 7 days that will change everything:</p>

                    <div style="margin: 32px 0;">
                      <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                          <h4>Block Your Calendar</h4>
                          <p>March 2-8, 2026. Every evening 6-10 PM, Saturday 10AM-6PM, Sunday 12-5PM</p>
                        </div>
                      </div>

                      <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                          <h4>Clear Your Mind</h4>
                          <p>Come ready to learn, grow, and do the work. No half-measures.</p>
                        </div>
                      </div>

                      <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                          <h4>Prepare to Work</h4>
                          <p>You'll have homework every night. This is an intensive, not a vacation.</p>
                        </div>
                      </div>

                      <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                          <h4>Bring a Laptop</h4>
                          <p>Day 6 is all about AI and automation. You'll need your laptop.</p>
                        </div>
                      </div>
                    </div>

                    <div class="curriculum">
                      <h4>Your 7-Day Journey</h4>
                      <div class="day"><strong>Day 1:</strong> The Foundation for an Empire</div>
                      <div class="day"><strong>Day 2:</strong> Story Distribution</div>
                      <div class="day"><strong>Day 3:</strong> Creating Profitable Offers</div>
                      <div class="day"><strong>Day 4:</strong> Gather the People with EVENTS</div>
                      <div class="day"><strong>Day 5:</strong> Be "Stumbleuponable"</div>
                      <div class="day"><strong>Day 6:</strong> AI & Systematic Scaling</div>
                      <div class="day"><strong>Day 7:</strong> Graduation Day</div>
                    </div>

                    <p>We'll send you your Night School Workbook and pre-work materials before Day 1.</p>

                    <p><strong>Remember:</strong> All graduates receive "Tiffany Cash" redeemable for 6 months on DTDT products and services!</p>

                    <div class="cta">
                      <a href="https://dotheblankthing.com/night-school">View Full Curriculum</a>
                    </div>

                    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">
                      <p>Let's do this,</p>
                      <p><strong class="gold">Team Tiffany</strong></p>
                    </div>
                  </div>
                  <div class="footer">
                    <p>© 2026 DO THE DAMN THING™. All Rights Reserved.</p>
                    <p><a href="https://dotheblankthing.com/unsubscribe?email=${encodeURIComponent(customerEmail)}" style="color: #666;">Unsubscribe</a></p>
                  </div>
                </div>
              </body>
              </html>
            `
          });
          console.log('Night School next steps email sent to:', customerEmail);
        }
      }

      // Send notification to admin
      const eventName = ticketDetails.event || 'MORE: The Tea Party';
      const adminEmail = process.env.ADMIN_EMAIL || 'tiffany@dotheblankthing.com';
      await resend.emails.send({
        from: `${eventName} <noreply@dotheblankthing.com>`,
        to: adminEmail,
        subject: `New Registration: ${eventName} - ${ticketDetails.name} - ${customerName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #FABE39; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f5f5f5; }
              table { width: 100%; border-collapse: collapse; background: #fff; }
              td { padding: 12px; border-bottom: 1px solid #eee; }
              .label { font-weight: bold; width: 140px; background: #f9f9f9; }
              .highlight { background-color: #FABE39; color: #000; padding: 4px 8px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin:0; color: #000;">New ${eventName} Registration!</h2>
              </div>
              <div class="content">
                <table>
                  <tr><td class="label">Event</td><td><strong>${eventName}</strong></td></tr>
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
