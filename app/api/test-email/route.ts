import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildConfirmationEmail } from "@/lib/emails/confirmation";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const to = url.searchParams.get("to");

  if (!to) {
    return NextResponse.json({
      error: "Paramètre ?to=email@example.com requis",
      env: {
        RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET (" + process.env.RESEND_API_KEY.slice(0, 8) + "...)" : "NOT SET",
        RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || "NOT SET (default used)",
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ? "SET" : "NOT SET",
      },
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "RESEND_API_KEY non configurée" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Vercel Prestige <onboarding@resend.dev>";

  const html = buildConfirmationEmail({
    fullName: "Test Client",
    prestationLabel: "Pack Mariage – Arrivée Prestige",
    totalPrice: "600",
    depositAmount: "120",
    paymentMode: "acompte",
    dateStart: "2026-03-15",
    formule: "Événement",
    chauffeur: "avec",
    heureApprox: "14h",
    pickupPointId: "chateau-cafe",
    sessionId: "cs_test_xxx",
  });

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: "[TEST] Confirmation de réservation – Vercel Prestige",
      html,
    });

    if (error) {
      return NextResponse.json({ error, from: fromEmail, to }, { status: 400 });
    }

    return NextResponse.json({ success: true, emailId: data?.id, from: fromEmail, to });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message, from: fromEmail, to }, { status: 500 });
  }
}
