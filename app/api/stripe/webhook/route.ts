import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured.");
  return new Stripe(key);
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing signature or webhook secret" },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Signature invalide";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const meta = session.metadata || {};

      console.log("=== PAIEMENT CONFIRMÉ ===");
      console.log("Client:", meta.fullName);
      console.log("Email:", meta.email);
      console.log("Téléphone:", meta.phone);
      console.log("Prestation:", meta.prestationLabel);
      console.log("Prix total:", meta.totalPrice, "€");
      console.log("Acompte payé:", meta.depositAmount, "€");
      console.log("Date:", meta.dateStart);
      console.log("Formule:", meta.formule);
      console.log("Chauffeur:", meta.chauffeur);
      console.log("Session ID:", session.id);
      console.log("========================");

      // TODO: Send confirmation email
      // TODO: Save to database (Supabase) if needed
      // TODO: Notify admin via email/SMS

      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Session expirée:", session.id);
      break;
    }

    default:
      console.log("Webhook event non géré:", event.type);
  }

  return NextResponse.json({ received: true });
}
