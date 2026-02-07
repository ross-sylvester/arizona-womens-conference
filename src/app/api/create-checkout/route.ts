import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, ticketType, source } = body;

    // Validate required fields
    if (!name || !email || !ticketType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();
    if (!stripeKey) {
      console.error('Missing STRIPE_SECRET_KEY');
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      );
    }

    const SITE_URL = (process.env.SITE_URL || 'https://arizonawomensconference.com').trim().replace(/\/$/, '');

    // Define ticket pricing for Arizona Women's Conference
    const tickets: Record<string, { name: string; priceInCents: number; description: string }> = {
      'awc-general': {
        name: "Arizona Women's Conference - General Admission",
        priceInCents: 19700,
        description: 'Full day access to all sessions, networking lunch, conference materials, and certificate of attendance.',
      },
      'awc-vip': {
        name: "Arizona Women's Conference - VIP Experience",
        priceInCents: 39700,
        description: 'VIP seating, exclusive networking reception, meet & greet with speakers, VIP gift bag, and recording access.',
      }
    };

    const selectedTicket = tickets[ticketType];
    if (!selectedTicket) {
      return NextResponse.json(
        { error: 'Invalid ticket type' },
        { status: 400 }
      );
    }

    // Build form data for Stripe API
    const successFullUrl = `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelFullUrl = `${SITE_URL}/`;

    const formData = [
      'payment_method_types[0]=card',
      'line_items[0][price_data][currency]=usd',
      `line_items[0][price_data][product_data][name]=${encodeURIComponent(selectedTicket.name)}`,
      `line_items[0][price_data][product_data][description]=${encodeURIComponent(selectedTicket.description)}`,
      `line_items[0][price_data][unit_amount]=${selectedTicket.priceInCents}`,
      'line_items[0][quantity]=1',
      'mode=payment',
      `customer_email=${encodeURIComponent(email)}`,
      `success_url=${encodeURIComponent(successFullUrl)}`,
      `cancel_url=${encodeURIComponent(cancelFullUrl)}`,
      `metadata[ticket_type]=${encodeURIComponent(ticketType)}`,
      `metadata[customer_name]=${encodeURIComponent(name)}`,
      `metadata[customer_email]=${encodeURIComponent(email)}`,
      `metadata[customer_phone]=${encodeURIComponent(phone || '')}`,
      `metadata[source]=${encodeURIComponent(source || 'website')}`,
      `metadata[event_name]=Arizona Women's Conference`,
      `metadata[event_date]=May 2, 2026`,
    ].join('&');

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Stripe error:', data);
      return NextResponse.json(
        { error: 'Failed to create checkout session', details: data.error?.message || 'Unknown error' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: data.url,
      sessionId: data.id
    });

  } catch (error) {
    console.error('Checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: errorMessage },
      { status: 500 }
    );
  }
}
