import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Tu es l'assistant Vercel Prestige. Réponds toujours en français, ton premium, clair et concis (2 à 4 phrases max).

Infos clés:
- Zone: Vercel-Villedieu-le-Camp et Doubs
- Fondateurs: Miranda / Ackermann
- Accueil premium à bord: champagne/boissons selon formule

Tarifs:
- Mariage 600€
- EVG/EVJF 450€
- Anniversaire/Soirée privée 350€
- Cérémonies familiales 500€
- Forfait soirée VIP 3-4h 800€
- Sur mesure dès 500€
- Entreprises dès 500€

Paiement:
- Acompte 20% ou paiement total avec rabais immédiat -10%
- Annulation >72h: remboursement intégral
- Annulation <72h: non remboursable

Fidélité:
- 6e trajet à -50% après 5 réservations
- 11e trajet offert après 10 réservations

Si une info manque, propose de contacter l'équipe par téléphone ou WhatsApp.`;

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

async function askOpenAIResponses(
  apiKey: string,
  messages: ChatMessage[],
  maxOutputTokens: number,
) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-5-nano-2025-08-07",
      input: messages,
      max_output_tokens: maxOutputTokens,
    }),
  });

  const data = await response.json();
  return { response, data };
}

function extractResponseText(data: unknown): string {
  const payload = data as {
    output_text?: string;
    output?: Array<{
      type?: string;
      content?: Array<{ type?: string; text?: string }>;
    }>;
  };

  if (payload?.output_text && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const textParts =
    payload?.output
      ?.flatMap((item) => item.content ?? [])
      .filter((c) => c.type === "output_text" || c.type === "text")
      .map((c) => c.text ?? "")
      .filter(Boolean) ?? [];

  return textParts.join("\n").trim();
}

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

    const baseMessages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-6),
    ];

    const { response, data } = await askOpenAIResponses(apiKey, baseMessages, 700);

    if (!response.ok) {
      console.error("OpenAI API error:", response.status, JSON.stringify(data));
      return NextResponse.json({
        reply: "Je suis temporairement indisponible. N'hésitez pas à nous contacter directement par téléphone.",
      });
    }

    let reply = extractResponseText(data);

    // gpt-5-nano can sometimes stop by length with empty visible content.
    if (!reply || !String(reply).trim()) {
      const retryMessages: ChatMessage[] = [
        ...baseMessages,
        { role: "system", content: "Réponds maintenant en 2 phrases maximum, sans préambule." },
      ];
      const retry = await askOpenAIResponses(apiKey, retryMessages, 1200);
      reply = extractResponseText(retry.data);

      if (!reply || !String(reply).trim()) {
        console.error("OpenAI empty output after retry:", JSON.stringify(retry.data).slice(0, 500));
      }
    }

    if (!reply || !String(reply).trim()) {
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
