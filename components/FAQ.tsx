export default function FAQ() {
  const faqs = [
    {
      question: "Comment réserver ?",
      answer: "Remplissez le formulaire de réservation ci-dessous et réglez l'acompte par carte bancaire. Vous recevrez une confirmation rapidement.",
    },
    {
      question: "Paiement sécurisé ?",
      answer: "Oui, l'acompte est encaissé via Stripe, leader mondial du paiement en ligne sécurisé.",
    },
    {
      question: "Quand sommes-nous confirmés ?",
      answer: "Une fois l'acompte versé, nous validons la disponibilité et vous contactons pour les derniers détails sous 24h.",
    },
    {
      question: "Annulation et remboursement",
      answer: "L'acompte est remboursable jusqu'à 72h avant la prestation. Passé ce délai, il reste acquis.",
    },
    {
      question: "Location sans chauffeur ?",
      answer: "Possible sous conditions strictes (âge, permis, caution). Contactez-nous pour un devis personnalisé.",
    },
    {
      question: "Zone desservie",
      answer: "Principalement Vercel-Villedieu-le-Camp et un rayon de 50km aux alentours (Besançon, Pontarlier, Valdahon).",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-inkBlack/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Questions Fréquentes</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-[rgba(55,6,23,0.35)] border border-[rgba(255,186,8,0.18)] rounded-lg open:bg-nightBordeaux/50 transition-colors"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer font-medium text-white select-none">
                {faq.question}
                <span className="text-amberFlame text-xl transition-transform group-open:rotate-180">
                  ↓
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
