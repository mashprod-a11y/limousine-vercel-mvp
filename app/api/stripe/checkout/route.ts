import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Simulation de la création de session Stripe pour le test visuel
  // Dans la phase backend, on utilisera 'stripe' sdk ici.
  
  const body = await request.json();
  
  // Simulation d'un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Données reçues (Simulation):", body);

  // Redirection vers la page merci avec un faux session_id
  return NextResponse.json({
    url: `${new URL(request.url).origin}/merci?session_id=cs_test_simulated_123456`,
  });
}
