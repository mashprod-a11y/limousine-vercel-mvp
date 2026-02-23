import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { buildConfirmationEmail } from "@/lib/emails/confirmation";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured.");
  return new Stripe(key);
}

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Vercel Prestige <noreply@vercelprestige.fr>";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "";

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

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const meta = session.metadata || {};

      console.log("=== PAIEMENT CONFIRMÉ ===");
      console.log("Client:", meta.fullName);
      console.log("Email:", meta.email);
      console.log("Prestation:", meta.prestationLabel);
      console.log("Prix total:", meta.totalPrice, "€");
      console.log("Montant payé:", meta.depositAmount, "€");
      console.log("Mode:", meta.paymentMode);
      console.log("Date:", meta.dateStart);
      console.log("Session ID:", session.id);
      console.log("========================");

      // Send confirmation email to client
      const resend = getResend();
      console.log("Resend configured:", !!resend);
      console.log("Client email:", meta.email);
      console.log("FROM_EMAIL:", FROM_EMAIL);
      console.log("RESEND_API_KEY present:", !!process.env.RESEND_API_KEY);
      if (resend && meta.email) {
        try {
          const html = buildConfirmationEmail({
            fullName: meta.fullName || "Client",
            prestationLabel: meta.prestationLabel || "Prestation",
            totalPrice: meta.totalPrice || "0",
            depositAmount: meta.depositAmount || "0",
            paymentMode: meta.paymentMode || "acompte",
            dateStart: meta.dateStart || "",
            formule: meta.formule || "",
            chauffeur: meta.chauffeur || "avec",
            heureApprox: meta.heureApprox || "",
            pickupPointId: meta.pickupPointId || "",
            sessionId: session.id,
          });

          // Email to client
          const { data: emailData, error: emailError } = await resend.emails.send({
            from: FROM_EMAIL,
            to: meta.email,
            subject: `Confirmation de réservation – ${meta.prestationLabel || "Vercel Prestige"}`,
            html,
          });

          if (emailError) {
            console.error("Resend error (client):", JSON.stringify(emailError));
          } else {
            console.log("Email de confirmation envoyé à:", meta.email, "ID:", emailData?.id);
          }

          // Email notification to admin (if configured)
          if (ADMIN_EMAIL) {
            await resend.emails.send({
              from: FROM_EMAIL,
              to: ADMIN_EMAIL,
              subject: `[Nouvelle réservation] ${meta.prestationLabel} – ${meta.fullName}`,
              html: `
                <h2>Nouvelle réservation reçue</h2>
                <ul>
                  <li><strong>Client :</strong> ${meta.fullName}</li>
                  <li><strong>Email :</strong> ${meta.email}</li>
                  <li><strong>Téléphone :</strong> ${meta.phone}</li>
                  <li><strong>Prestation :</strong> ${meta.prestationLabel}</li>
                  <li><strong>Prix total :</strong> ${meta.totalPrice} €</li>
                  <li><strong>Montant payé :</strong> ${meta.depositAmount} €</li>
                  <li><strong>Mode de paiement :</strong> ${meta.paymentMode}</li>
                  <li><strong>Date :</strong> ${meta.dateStart}</li>
                  <li><strong>Heure :</strong> ${meta.heureApprox || "Non précisée"}</li>
                  <li><strong>Formule :</strong> ${meta.formule}</li>
                  <li><strong>Chauffeur :</strong> ${meta.chauffeur}</li>
                  <li><strong>Heures chauffeur :</strong> ${meta.chauffeurHours || "0"}</li>
                  <li><strong>Supplément chauffeur :</strong> ${meta.chauffeurExtra || "0"} €</li>
                  <li><strong>Point RDV :</strong> ${meta.pickupPointId}</li>
                  <li><strong>Passagers :</strong> ${meta.passengers || "Non précisé"}</li>
                  <li><strong>Notes :</strong> ${meta.notes || "Aucune"}</li>
                  <li><strong>Session Stripe :</strong> ${session.id}</li>
                </ul>
              `,
            });
            console.log("Notification admin envoyée à:", ADMIN_EMAIL);
          }
        } catch (emailErr: unknown) {
          console.error("Erreur envoi email:", emailErr instanceof Error ? emailErr.message : emailErr);
          // Don't fail the webhook because of email error
        }
      }

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
