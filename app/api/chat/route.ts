import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Vercel Prestige, un service de location de limousine et véhicules de prestige situé à Vercel-Villedieu-le-Camp (Doubs, France).

Ton rôle : répondre aux questions des visiteurs de manière courtoise, professionnelle et concise. Tu parles toujours en français.

Informations clés :
- Siège : Rue du Château, face à l'église Sainte-Agathe, Vercel-Villedieu-le-Camp
- Implantations partenaires : Le Château – Café Vercel (12 Rue de la Fontaine), Le Rituel Lounge Bar Vercel (6 Rue de Lanchy), Le Rituel Bar & Music Valdahon (8 Rue de la Gare)
- Fondateurs : Miranda / Ackermann

Prestations et tarifs fixes :
- Pack Mariage – Arrivée Prestige : 600 € — Arrivée en limousine avec chauffeur, décoration élégante (rubans blancs / option fleurs), boisson de bienvenue (champagne ou softs), temps photo devant l'église, dépose au lieu de réception. Options : panneau "Just Married", tour romantique, transport parents/témoins, mise en scène surprise. Intervention dans tout le Doubs.
- EVG / EVJF : 450 € — Limousine avec chauffeur, boissons incluses, ambiance festive à bord, arrêt photos souvenir, dépose centre-ville/restaurant/soirée. Un enterrement de vie, ça se fête en grand.
- Anniversaire / Soirée privée : 350 € — Aller-retour limousine avec chauffeur, ambiance lumineuse et musicale, boisson de bienvenue, confort premium, arrêt photo, horaires flexibles. Parfait pour anniversaire, soirée entre amis, surprise.
- Cérémonies familiales : 500 € — Baptême, communion. Limousine avec chauffeur professionnel, ponctualité garantie, capacité famille, service discret, décoration possible, temps photos.
- Forfait Soirée VIP 3 à 4h : 800 € — Mise à disposition exclusive avec chauffeur dédié. Itinéraire flexible, ambiance sonore, confort premium, arrêts photos. Parfait pour soirée d'exception, groupe d'amis, événement pro.
- Expérience Sur Mesure : à partir de 500 € — Devis adapté, itinéraire à la carte, durée flexible, options personnalisables (boissons, décoration, surprise, arrêts spécifiques), contact dédié. Pour les moments qui ne rentrent pas dans un simple forfait.
- Offre Entreprises : à partir de 500 € — Événements corporate, soirées VIP, séminaires, team building. Chauffeur en costume, flotte adaptée, devis et facturation entreprise, contact dédié, coordination complète.

Accueil premium à bord (inclus dans toutes les prestations) :
- Champagne et boissons rafraîchissantes incluses selon la formule choisie

Paiement (deux options au choix du client) :
- Option 1 – Acompte : 20% à la réservation en ligne via Stripe, solde le jour de la prestation
- Option 2 – Paiement total : le client paie la totalité et bénéficie d'un rabais immédiat de 10% sur le prix de la prestation
- Annulation > 72h : remboursement intégral
- Annulation < 72h : acompte/paiement non remboursable

Programme de fidélité :
- Après 5 réservations : 50% de réduction sur le 6e trajet
- Après 10 réservations : le 11e trajet est entièrement offert (gratuit)
- Ces avantages sont automatiques et cumulables

Options :
- Avec chauffeur (recommandé) : service clé en main, chauffeur professionnel
- Sans chauffeur : permis > 5 ans, âge minimum 25 ans, caution obligatoire

Si on te demande quelque chose que tu ne sais pas, invite poliment le visiteur à contacter l'équipe directement.
Ne réponds jamais en anglais. Sois concis (2-4 phrases max par réponse).`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = body?.messages;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages manquants." },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "Le service de chat est en cours de configuration. Veuillez réessayer plus tard ou nous contacter directement." },
      );
    }

    const openaiBody = {
      model: "gpt-5-nano-2025-08-07",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-10),
      ],
      max_completion_tokens: 300,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(openaiBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", response.status, JSON.stringify(data));
      return NextResponse.json({
        reply: "Je suis temporairement indisponible. N'hésitez pas à nous contacter directement par téléphone.",
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content
      ?? data?.choices?.[0]?.text
      ?? null;

    if (!reply) {
      console.error("OpenAI unexpected response format:", JSON.stringify(data).slice(0, 500));
      return NextResponse.json({
        reply: "Désolé, je n'ai pas pu formuler une réponse. Essayez de reformuler votre question.",
      });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({
      reply: "Une erreur technique est survenue. Veuillez réessayer dans un instant.",
    });
  }
}
