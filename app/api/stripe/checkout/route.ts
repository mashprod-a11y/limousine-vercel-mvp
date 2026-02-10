import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Extract pricing data sent from the form
  const {
    prestation,
    prestationLabel,
    totalPrice,
    depositAmount,
    formule,
    chauffeur,
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

  // ====================================================================
  // TODO: Replace simulation with real Stripe Checkout Session creation
  //
  // import Stripe from "stripe";
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" });
  //
  // const session = await stripe.checkout.sessions.create({
  //   mode: "payment",
  //   line_items: [
  //     {
  //       price_data: {
  //         currency: "eur",
  //         unit_amount: depositAmount * 100, // in cents
  //         product_data: {
  //           name: `Acompte – ${prestationLabel}`,
  //           description: `Acompte 10% sur ${totalPrice}€ – ${prestationLabel}`,
  //         },
  //       },
  //       quantity: 1,
  //     },
  //   ],
  //   metadata: {
  //     prestation,
  //     prestationLabel,
  //     totalPrice: String(totalPrice),
  //     depositAmount: String(depositAmount),
  //     formule,
  //     chauffeur,
  //     fullName,
  //     email,
  //     phone,
  //     dateStart,
  //     dateEnd: dateEnd || "",
  //     heureApprox: heureApprox || "",
  //     pickupPointId,
  //     passengers: passengers || "",
  //     notes: notes || "",
  //   },
  //   customer_email: email,
  //   success_url: `${new URL(request.url).origin}/merci?session_id={CHECKOUT_SESSION_ID}`,
  //   cancel_url: `${new URL(request.url).origin}/#reservation`,
  // });
  //
  // return NextResponse.json({ url: session.url });
  // ====================================================================

  // --- Simulation mode ---
  await new Promise((resolve) => setTimeout(resolve, 800));

  console.log("Reservation data received:", {
    prestation,
    prestationLabel,
    totalPrice,
    depositAmount,
    formule,
    chauffeur,
    fullName,
    email,
    phone,
    dateStart,
    dateEnd,
    heureApprox,
    pickupPointId,
    passengers,
    notes,
  });

  return NextResponse.json({
    url: `${new URL(request.url).origin}/merci?session_id=cs_test_simulated_${Date.now()}`,
  });
}
