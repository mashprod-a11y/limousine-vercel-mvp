const publicDepositAmount = Number(process.env.NEXT_PUBLIC_DEPOSIT_AMOUNT_EUR ?? 80);

export const content = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "Limo Rent",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+33600000000",
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/33600000000",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "contact@limousine-vercel.com",
  zone: "Vercel-Villedieu-le-Camp & alentours",
  depositAmount: Number.isFinite(publicDepositAmount) ? publicDepositAmount : 80,
};
