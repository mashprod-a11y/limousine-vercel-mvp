interface ConfirmationEmailProps {
  fullName: string;
  prestationLabel: string;
  totalPrice: string;
  depositAmount: string;
  paymentMode: string;
  dateStart: string;
  formule: string;
  chauffeur: string;
  heureApprox: string;
  pickupPointId: string;
  sessionId: string;
}

export function buildConfirmationEmail(props: ConfirmationEmailProps): string {
  const {
    fullName,
    prestationLabel,
    totalPrice,
    depositAmount,
    paymentMode,
    dateStart,
    formule,
    chauffeur,
    heureApprox,
    sessionId,
  } = props;

  const isFullPayment = paymentMode === "total";
  const formattedDate = dateStart || "À confirmer";
  const formattedHeure = heureApprox || "Non précisée";
  const chauffeurLabel = chauffeur === "avec" ? "Avec chauffeur" : "Sans chauffeur";

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de réservation – Vercel Prestige</title>
</head>
<body style="margin:0;padding:0;background-color:#000000;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#f0ece8;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#000000;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding:30px 0 20px;">
              <h1 style="margin:0;font-size:28px;font-weight:800;color:#d4af37;letter-spacing:3px;">VERCEL PRESTIGE</h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(240,236,232,0.5);font-style:italic;">L'art du transport de prestige</p>
            </td>
          </tr>

          <!-- Confirmation badge -->
          <tr>
            <td align="center" style="padding:10px 0 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background-color:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);border-radius:50px;padding:10px 24px;">
                    <span style="font-size:14px;font-weight:600;color:#22c55e;">&#10003; Paiement confirmé</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:0 30px 20px;">
              <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;">Bonjour ${fullName},</p>
              <p style="margin:10px 0 0;font-size:14px;line-height:1.6;color:rgba(240,236,232,0.7);">
                Merci pour votre confiance. Votre ${isFullPayment ? "paiement" : "acompte"} a bien été reçu et votre réservation est en cours de traitement.
              </p>
            </td>
          </tr>

          <!-- Reservation details card -->
          <tr>
            <td style="padding:0 30px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:rgba(18,18,18,0.8);border:1px solid rgba(240,236,232,0.1);border-radius:16px;overflow:hidden;">
                
                <!-- Card header -->
                <tr>
                  <td style="padding:20px 24px 16px;border-bottom:1px solid rgba(240,236,232,0.08);">
                    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:rgba(240,236,232,0.4);font-weight:600;">Votre réservation</p>
                  </td>
                </tr>

                <!-- Prestation -->
                <tr>
                  <td style="padding:16px 24px 0;">
                    <p style="margin:0;font-size:12px;color:rgba(240,236,232,0.4);">Prestation</p>
                    <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#d4af37;">${prestationLabel}</p>
                  </td>
                </tr>

                <!-- Date + Heure -->
                <tr>
                  <td style="padding:14px 24px 0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="50%" style="padding-right:10px;">
                          <p style="margin:0;font-size:12px;color:rgba(240,236,232,0.4);">Date</p>
                          <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#ffffff;">${formattedDate}</p>
                        </td>
                        <td width="50%">
                          <p style="margin:0;font-size:12px;color:rgba(240,236,232,0.4);">Heure</p>
                          <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#ffffff;">${formattedHeure}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Formule + Chauffeur -->
                <tr>
                  <td style="padding:14px 24px 0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="50%" style="padding-right:10px;">
                          <p style="margin:0;font-size:12px;color:rgba(240,236,232,0.4);">Formule</p>
                          <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#ffffff;">${formule}</p>
                        </td>
                        <td width="50%">
                          <p style="margin:0;font-size:12px;color:rgba(240,236,232,0.4);">Chauffeur</p>
                          <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#ffffff;">${chauffeurLabel}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding:20px 24px 0;">
                    <div style="height:1px;background:linear-gradient(to right,transparent,rgba(212,175,55,0.3),transparent);"></div>
                  </td>
                </tr>

                <!-- Payment summary -->
                <tr>
                  <td style="padding:16px 24px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <p style="margin:0;font-size:12px;color:rgba(240,236,232,0.4);">Prix total de la prestation</p>
                          <p style="margin:4px 0 0;font-size:14px;color:#ffffff;">${totalPrice} €</p>
                        </td>
                        <td align="right">
                          <p style="margin:0;font-size:12px;color:rgba(240,236,232,0.4);">${isFullPayment ? "Montant payé (rabais -10%)" : "Acompte payé (20%)"}</p>
                          <p style="margin:4px 0 0;font-size:22px;font-weight:800;color:#d4af37;">${depositAmount} €</p>
                        </td>
                      </tr>
                    </table>
                    ${!isFullPayment ? `
                    <p style="margin:12px 0 0;font-size:12px;color:rgba(240,236,232,0.5);">
                      Solde restant : <strong style="color:#ffffff;">${Number(totalPrice) - Number(depositAmount)} €</strong> à régler le jour de la prestation.
                    </p>
                    ` : `
                    <p style="margin:12px 0 0;font-size:12px;color:rgba(34,197,94,0.8);">
                      &#10003; Paiement intégral effectué. Rien à régler le jour J.
                    </p>
                    `}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next steps -->
          <tr>
            <td style="padding:0 30px 30px;">
              <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#ffffff;">Prochaines étapes</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:8px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;">
                          <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:rgba(212,175,55,0.15);color:#d4af37;font-size:11px;font-weight:700;text-align:center;line-height:22px;">1</span>
                        </td>
                        <td style="padding-left:10px;font-size:13px;color:rgba(240,236,232,0.7);line-height:1.5;">
                          Notre équipe valide votre réservation sous 24h.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;">
                          <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:rgba(212,175,55,0.15);color:#d4af37;font-size:11px;font-weight:700;text-align:center;line-height:22px;">2</span>
                        </td>
                        <td style="padding-left:10px;font-size:13px;color:rgba(240,236,232,0.7);line-height:1.5;">
                          Vous recevrez un message de confirmation avec les détails pratiques.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;">
                          <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:rgba(212,175,55,0.15);color:#d4af37;font-size:11px;font-weight:700;text-align:center;line-height:22px;">3</span>
                        </td>
                        <td style="padding-left:10px;font-size:13px;color:rgba(240,236,232,0.7);line-height:1.5;">
                          Le jour J, votre chauffeur sera ponctuel au point de rendez-vous convenu.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact -->
          <tr>
            <td style="padding:0 30px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:rgba(212,175,55,0.06);border:1px solid rgba(212,175,55,0.15);border-radius:12px;padding:20px 24px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:13px;font-weight:600;color:#d4af37;">Une question ?</p>
                    <p style="margin:6px 0 0;font-size:13px;color:rgba(240,236,232,0.6);line-height:1.5;">
                      Contactez-nous par WhatsApp au <strong style="color:#ffffff;">+33 7 85 55 28 79</strong> ou par email à <strong style="color:#ffffff;">contact@vercelprestige.com</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reference -->
          <tr>
            <td align="center" style="padding:0 30px 20px;">
              <p style="margin:0;font-size:11px;color:rgba(240,236,232,0.3);">
                Référence : ${sessionId}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:20px 30px;border-top:1px solid rgba(240,236,232,0.06);">
              <p style="margin:0;font-size:12px;font-weight:700;color:#d4af37;letter-spacing:2px;">VERCEL PRESTIGE</p>
              <p style="margin:6px 0 0;font-size:11px;color:rgba(240,236,232,0.3);">Miranda / Ackermann</p>
              <p style="margin:4px 0 0;font-size:11px;color:rgba(240,236,232,0.3);">Rue du Château, Vercel-Villedieu-le-Camp (25530)</p>
              <p style="margin:8px 0 0;font-size:10px;color:rgba(240,236,232,0.2);">
                Cet email est envoyé automatiquement suite à votre paiement. Ne pas répondre à cet email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
