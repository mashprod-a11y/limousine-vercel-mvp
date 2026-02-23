import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured.");
  return new Stripe(key);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      prestation,
      prestationLabel,
      totalPrice,
      depositAmount,
      paymentMode,
      formule,
      chauffeur,
      chauffeurHours,
      chauffeurExtra,
      fullName,
      email,
      phone,
      dateStart,
      dateEnd,
      heureApprox,
      pickupPointId,
      passengers,
      notes,
    } = body;

    if (!depositAmount || !prestationLabel || !email) {
      return NextResponse.json(
        { error: "Données manquantes." },
        { status: 400 },
      );
    }

    const isFullPayment = paymentMode === "total";
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: Math.round(depositAmount * 100),
            product_data: {
              name: isFullPayment
                ? `Paiement total – ${prestationLabel} (rabais -10%)`
                : `Acompte – ${prestationLabel}`,
              description: isFullPayment
                ? `Paiement intégral avec rabais 10% – ${prestationLabel}`
                : `Acompte 20% sur ${totalPrice} € – ${prestationLabel}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        prestation,
        prestationLabel,
        totalPrice: String(totalPrice),
        depositAmount: String(depositAmount),
        paymentMode: paymentMode || "acompte",
        formule,
        chauffeur,
        chauffeurHours: chauffeurHours ? String(chauffeurHours) : "",
        chauffeurExtra: chauffeurExtra ? String(chauffeurExtra) : "",
        fullName,
        email,
        phone,
        dateStart,
        dateEnd: dateEnd || "",
        heureApprox: heureApprox || "",
        pickupPointId,
        passengers: passengers || "",
        notes: notes || "",
      },
      customer_email: email,
      success_url: `${new URL(request.url).origin}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${new URL(request.url).origin}/#reservation`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Stripe checkout error:", err);
    const message =
      err instanceof Error ? err.message : "Erreur interne.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
