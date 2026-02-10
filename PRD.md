# PRD — MVP Landing de réservation (Vercel-Villedieu-le-Camp) + Acompte Stripe Checkout (sans base de données)

**Audience du PRD : un LLM qui va coder (instructions précises, sans ambiguïté).**  
**Objectif : livrer en 1 jour sur Vercel.**  
**Stack imposée : Next.js (App Router) + TypeScript + Tailwind CSS + Stripe Checkout.**  
**Contraintes :**
- **Pas de base de données** (zéro Supabase / zéro stockage persistant).
- **Stripe Checkout uniquement** (pas PayPal, pas Payment Links).
- **Responsive mobile-first**.
- Style **futuriste mais minimal** (“less is more”), très lisible, performant.

---

## 1) Résultat attendu (ce que le site doit faire)
Le site est une **landing page** (1 page principale) qui :
1) présente clairement la location de **limousine / voiture de prestige** à **Vercel-Villedieu-le-Camp** (avec ou sans chauffeur),
2) affiche des **tarifs** basés sur ces fourchettes :
   - Mariage : **400–800€**
   - EVG / EVJF : **300–600€**
   - Anniversaire / soirée privée : **250–500€**
   - Cérémonies familiales : **350–700€**
   - Forfait soirée (3–4h) : **600–1 000€**
3) permet de faire une **demande de réservation** (date approximative / plage, formule, point de RDV, contact),
4) encaisse un **acompte fixe** via **Stripe Checkout**,
5) après paiement : affiche une page **Merci** avec un récap et indique “Nous vous contactons rapidement”.

**Important :**
- Pas de calendrier / disponibilité automatique : confirmation manuelle après paiement.
- Sans DB : les données sont transmises via **email** + **Stripe metadata**.

---

## 2) Pages & routes (obligatoires)
### Pages (App Router)
- `/` : landing principale
- `/merci` : page de confirmation (après paiement Stripe)
- `/mentions-legales`
- `/confidentialite`
- `/conditions` : conditions de réservation (acompte, annulation, sans chauffeur/caution à préciser)

### API routes (Route Handlers)
- `POST /api/stripe/checkout`
  - crée une session Stripe Checkout
  - inclut toutes les infos de réservation dans `metadata`
  - redirige le client vers Stripe Checkout
- `POST /api/stripe/webhook`
  - reçoit l’événement Stripe `checkout.session.completed`
  - déclenche l’envoi email (propriétaire + optionnel client)
  - **sans DB**, l’email est la “source de vérité”

---

## 3) Design / UI (futuriste minimal + responsive)

### 3.1 Palette CSS (à intégrer telle quelle)
Dans `app/globals.css` :
```css
:root{
  --ink-black: #03071e;
  --night-bordeaux: #370617;
  --black-cherry: #6a040f;
  --oxblood: #9d0208;
  --brick-ember: #d00000;
  --red-ochre: #dc2f02;
  --cayenne-red: #e85d04;
  --deep-saffron: #f48c06;
  --orange: #faa307;
  --amber-flame: #ffba08;
}
```

### 3.2 Règles visuelles (strictes)
- Less is more : beaucoup d’espace, peu d’effets.
- Futuriste = fond sombre, surfaces translucides, lignes fines, glow subtil.
- Pas de surcharge : max 2 tailles de cartes, 1 style de bouton principal.
- Texte très lisible : taille minimale 16px sur mobile.
- Animations discrètes : transitions 150–250ms, pas de motion lourde.
- Accessibilité : contrastes élevés + focus visible.

### 3.3 Thème (directives d’implémentation)
- Fond page : `--ink-black`
- Surfaces (cards) : `rgba(55,6,23,0.35)` + border `rgba(255,186,8,0.18)`
- Texte principal : `#F7F7F7`
- Texte secondaire : `rgba(247,247,247,0.72)`
- CTA principal : background `--amber-flame`, texte `--ink-black`, hover léger.
- CTA secondaire : border `--orange`, texte `--orange`.
- Accent (petites lignes / highlights) : `--deep-saffron` et `--orange`.

---

## 4) Contenu & structure de la landing (/)

### 4.1 Header (sticky)
- Logo/nom (texte) à gauche
- À droite : liens d’ancrage (Offres, Tarifs, RDV, FAQ)
- Boutons :
  - Appeler (`tel:`)
  - WhatsApp (`wa.me`)
  - CTA Réserver (scroll vers section réservation)

### 4.2 Hero (above the fold)
- H1 : “Location limousine / voiture de prestige”
- Sous-titre : “Vercel-Villedieu-le-Camp & alentours — Avec ou sans chauffeur”
- 3 bullets :
  - “Acompte en ligne”
  - “Confirmation rapide”
  - “Prestations événementielles”
- CTA primaire : “Réserver”
- CTA secondaire : “Voir les tarifs”
- Visuel : une image (si dispo) sinon un bloc placeholder futuriste (gradient/glow).

### 4.3 Offres / Prestations (cards)
Cards cliquables ou simples :
- Mariage
- EVG / EVJF
- Anniversaire / soirée privée
- Cérémonies familiales
- Forfait soirée (3–4h)
- Sur mesure

### 4.4 Tarifs (grille claire)
Afficher les fourchettes EXACTES :
- Mariage : 400–800€
- EVG/EVJF : 300–600€
- Anniversaire/soirée privée : 250–500€
- Cérémonies familiales : 350–700€
- Soirée 3–4h : 600–1 000€

Ajouter une note courte :
- “Le prix final dépend de la durée, de l’itinéraire et des options.”

### 4.5 Formules (chips ou mini tabs)
- À l’heure
- Demi-journée
- Journée
- Événement

Sélecteur :
- Avec chauffeur
- Sans chauffeur (afficher note “conditions & caution selon dossier”)

### 4.6 Points de rendez-vous (4–5)
Afficher 4–5 cards (données dans un fichier `data/pickupPoints.ts`) :
- nom
- adresse
- bouton “Ouvrir sur Maps”
- petite instruction

### 4.7 Galerie photos
- 6–12 images (placeholder si pas encore)
- Optimiser via `next/image`

### 4.8 FAQ (accordéons)
Inclure au minimum :
- Comment réserver ?
- Paiement : “Acompte en ligne par carte via Stripe”
- Quand sommes-nous confirmés ?
- Annulation / acompte
- Sans chauffeur : caution / documents
- Zone desservie

### 4.9 Section Réservation (form + paiement)
C’est la section la plus importante : formulaire + bouton payer acompte.

---

## 5) Formulaire de réservation (spécifications exactes)

### 5.1 Champs
Tous ces champs doivent être présents :

Choix
- `prestation` (select) : mariage / evg_evjf / anniversaire_soiree / ceremonie_familiale / soiree_3_4h / sur_mesure
- `formule` (select) : heure / demi_journee / journee / evenement
- `chauffeur` (radio) : avec / sans

Dates
- `dateMode` (radio) : date_unique / plage
- `dateStart` (date input) : obligatoire
- `dateEnd` (date input) : obligatoire si plage
- `heureApprox` (input texte) : optionnel (ex “20h”, “soirée”, “après-midi”)

Rendez-vous
- `pickupPointId` (select) : points de RDV (4–5)

Contact
- `fullName` : obligatoire
- `phone` : obligatoire
- `email` : obligatoire
- `passengers` (number) : optionnel
- `notes` (textarea) : optionnel

Consentement
- `acceptConditions` (checkbox) : obligatoire (sinon bloquer paiement)

### 5.2 Validation
- Email format (simple)
- Téléphone non vide (validation légère)
- `dateStart` obligatoire
- Si plage : `dateEnd >= dateStart`
- Si `acceptConditions=false` : désactiver le bouton de paiement

### 5.3 Comportement UX
- Le bouton “Payer l’acompte” est visible et sticky sur mobile dans la section réservation (option).
- Afficher un résumé (chips) au-dessus du bouton : prestation + formule + date(s) + RDV.
- Afficher un message clair en cas d’erreur, sans jargon.

---

## 6) Paiement Stripe Checkout (exigences techniques)

### 6.1 Montant acompte
- Acompte fixe (ex: 80€) défini par env var : `DEPOSIT_AMOUNT_EUR`
- Devise : EUR

### 6.2 Stripe Checkout (implémentation)
Au clic “Payer l’acompte” :
1. `POST /api/stripe/checkout` avec tous les champs du formulaire (JSON).
2. Le serveur :
   - valide les champs (au minimum : `acceptConditions`, email, date)
   - calcule `amount = DEPOSIT_AMOUNT_EUR`
   - crée une session Stripe Checkout :
     - `mode` payment
     - line item : “Acompte réservation limousine”
     - `success_url` : `${ORIGIN}/merci?session_id={CHECKOUT_SESSION_ID}`
     - `cancel_url` : `${ORIGIN}/#reservation`
     - `metadata` : inclure toutes les infos (prestation, formule, chauffeur, dates, rdv, contact, notes, passengers)
     - `customer_email` : email du formulaire
3. Répond avec `url` de la session Checkout.
4. Frontend : `window.location.href = url`.

### 6.3 Webhook Stripe (obligatoire)
- Endpoint : `POST /api/stripe/webhook`
- Événement à gérer : `checkout.session.completed`
- À réception :
  - extraire session + metadata
  - envoyer email propriétaire avec toutes les infos + montant + id session
  - optionnel : envoyer email client “demande reçue”
- Sécurité : vérifier signature webhook avec `STRIPE_WEBHOOK_SECRET`.

### 6.4 Page Merci
- `/merci` récupère `session_id` (query param)
- Côté serveur (route) : récupérer la session Stripe (server-side) pour afficher :
  - “Paiement reçu”
  - “Nous vous contactons rapidement”
  - récap simplifié (prestation, date(s), RDV)
- Ne pas afficher de données sensibles.

---

## 7) Emails (sans DB, obligatoire)

### 7.1 Email propriétaire (obligatoire)
Destinataire : env var `BUSINESS_EMAIL_TO`

Contenu requis :
- Prestation
- Formule
- Chauffeur (avec/sans)
- Dates + heure approx
- Point RDV (nom + adresse)
- Nom / Téléphone / Email client
- Nb personnes (si fourni)
- Notes (si fourni)
- Montant acompte
- Stripe session id

### 7.2 Email client (optionnel mais recommandé)
- “Demande reçue — on vous contacte rapidement”
- Récap simple

Utiliser un provider email simple (Resend recommandé) via env var API key.

---

## 8) Données statiques (sans base)
Créer fichiers :
- `data/pickupPoints.ts` : liste de 4–5 points (id, nom, adresse, mapsUrl, instructions)
- `data/pricing.ts` : fourchettes tarifs (pour affichage)
- `data/content.ts` : téléphone, whatsapp, email, zone

---

## 9) Performances & qualité
- Score Lighthouse mobile acceptable (éviter lourdeurs)
- Images optimisées (`next/image`)
- Pas de libs inutiles
- Pas de tracking avancé MVP (optionnel plus tard)

---

## 10) Déploiement Vercel (checklist)
Env vars à configurer sur Vercel :
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_PHONE`
- `NEXT_PUBLIC_WHATSAPP_URL`
- `BUSINESS_EMAIL_TO`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (si nécessaire, mais Stripe Checkout côté serveur peut s’en passer)
- `STRIPE_WEBHOOK_SECRET`
- `DEPOSIT_AMOUNT_EUR`
- `EMAIL_PROVIDER_API_KEY` (si Resend)

Tester :
- paiement test (Stripe test mode)
- webhook fonctionnel
- email reçu
- mobile responsive OK

---

## 11) Acceptance Criteria (DoD)
- Landing responsive (mobile-first), style futuriste minimal conforme palette
- Sections : Hero, Offres, Tarifs, RDV, Galerie, FAQ, Réservation
- Formulaire complet + validations
- Stripe Checkout : redirection, paiement, retour Merci
- Webhook : email propriétaire envoyé automatiquement
- Pages légales accessibles depuis footer
- Déploiement Vercel OK

---

## 12) Notes de copy (texte minimal à intégrer)
- Badge : “Acompte en ligne — Confirmation rapide”
- Micro-copy paiement : “Acompte remboursable selon conditions” (détail dans /conditions)
- Réservation : “La disponibilité est confirmée après validation de votre demande.”

---

## 13) Interdictions (ne pas faire)
- Pas de base de données
- Pas de PayPal
- Pas de Payment Links
- Pas de UI chargée / sur-animée
- Pas de collecte excessive de données
