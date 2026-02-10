# PRD — MVP Landing de réservation (Vercel-Villedieu-le-Camp) + Acompte Stripe Checkout (sans base de données)

**Audience du PRD : un LLM qui va coder (instructions précises, sans ambiguïté).**
**Objectif : livrer en 1 jour sur Vercel.**
**Stack imposée : Next.js (App Router) + TypeScript + Tailwind CSS + Stripe Checkout.**
**Contraintes :**
- **Pas de base de données** (zéro Supabase / zéro stockage persistant).
- **Stripe Checkout uniquement** (pas PayPal, pas Payment Links).
- **Responsive mobile-first**.
- Style **futuriste glassmorphism/bento** ("less is more"), très lisible, performant.

---

## 1) Résultat attendu (ce que le site doit faire)
Le site est une **landing page** (1 page principale) qui :
1) présente clairement la location de **limousine / voiture de prestige** à **Vercel-Villedieu-le-Camp** (avec ou sans chauffeur),
2) affiche des **tarifs** basés sur ces fourchettes :
   - Mariage : **400–800 €**
   - EVG / EVJF : **300–600 €**
   - Anniversaire / soirée privée : **250–500 €**
   - Cérémonies familiales : **350–700 €**
   - Forfait soirée (3 à 4h) : **600–1 000 €**
3) permet de faire une **demande de réservation** (date approximative / plage, formule, point de RDV, contact),
4) encaisse un **acompte fixe** via **Stripe Checkout**,
5) après paiement : affiche une page **Merci** avec un récap et indique "Nous vous contactons rapidement".

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
  - reçoit l'événement Stripe `checkout.session.completed`
  - déclenche l'envoi email (propriétaire + optionnel client)
  - **sans DB**, l'email est la "source de vérité"

---

## 3) Design / UI (futuriste glassmorphism/bento + responsive)

### 3.1 Palette CSS (à intégrer telle quelle)
Dans `app/globals.css` :
```css
:root {
  --rich-mahogany: #250902;
  --rich-mahogany-2: #38040e;
  --black-cherry: #640d14;
  --dark-wine: #800e13;
  --brown-red: #ad2831;
  --gold: #d4af37;
  --gold-light: #e8c84a;
  --text-primary: #f8efee;
  --text-muted: rgba(248, 239, 238, 0.72);
  --glass-border: rgba(248, 239, 238, 0.14);
}
```

### 3.2 Règles visuelles (strictes)
- Less is more : beaucoup d'espace, peu d'effets inutiles.
- Style glassmorphism / bento : fond sombre mahogany, surfaces translucides avec blur, bordures fines, ombres profondes.
- Accents dorés (`--gold`) pour les liens, highlights et éléments de surbrillance.
- Pas de surcharge : max 2 tailles de cartes, 1 style de bouton principal.
- Texte très lisible : taille minimale 16px sur mobile.
- Animations au scroll visibles et fluides (fade-in, translate, scale), stagger sur les grilles.
- Interactions dynamiques : hover et clic avec transitions douces sur les cartes.
- Accessibilité : contrastes élevés + focus visible (anneau doré).

### 3.3 Thème (directives d'implémentation)
- Fond page : dégradé radial depuis `--rich-mahogany` et `--rich-mahogany-2`
- Surfaces (cards) : dégradé linéaire translucide + `backdrop-filter: blur(18px)` + `border: var(--glass-border)`
- Texte principal : `--text-primary` (#f8efee)
- Texte secondaire : `--text-muted` (rgba(248,239,238,0.72))
- CTA principal : dégradé `--brown-red` vers `--dark-wine`, texte blanc, ombre rouge.
- CTA secondaire : bordure dorée, texte doré, fond doré translucide.
- Liens et highlights : `--gold` (#d4af37), hover `--gold-light` (#e8c84a).
- Accent (petites lignes) : dégradé doré transparent.

---

## 4) Contenu & structure de la landing (/)

### 4.1 Header (sticky, glassmorphism)
- Logo/nom (texte doré) à gauche
- À droite : liens d'ancrage (Prestations, Tarifs, Points RDV, FAQ)
- Boutons :
  - Appeler (`tel:`)
  - WhatsApp (`wa.me`)
  - CTA Réserver (scroll vers section réservation)

### 4.2 Hero (above the fold)
- H1 : "Location de limousine et voiture de prestige"
- Sous-titre : "Service haut de gamme à Vercel-Villedieu-le-Camp et ses alentours"
- 3 bullets :
  - "Acompte en ligne, confirmation rapide"
  - "Chauffeur professionnel ou location libre"
  - "Prestations événementielles sur mesure"
- CTA primaire : "Réserver maintenant"
- CTA secondaire : "Voir les tarifs"
- Visuel : image hero (Pexels) avec overlay glassmorphism.

### 4.3 Bandeau valeur (bento grid)
4 éléments visuels mettant en avant : localisation, flexibilité, rapidité, service premium.

### 4.4 Offres / Prestations (cards interactives)
Cards cliquables avec détails expansibles au clic :
- Mariage
- EVG / EVJF
- Anniversaire / Soirée privée
- Cérémonies familiales
- Forfait soirée (3 à 4h)
- Sur mesure

### 4.5 Tarifs (grille interactive)
Cards avec hover/survol révélant les détails inclus + bouton "Réserver" :
- Mariage : 400–800 €
- EVG/EVJF : 300–600 €
- Anniversaire/soirée privée : 250–500 €
- Cérémonies familiales : 350–700 €
- Soirée 3 à 4h : 600–1 000 €

Note : "Le prix final dépend de la durée, de l'itinéraire et des options."

### 4.6 Formules + Sélecteur chauffeur (interactif)
Formules (chips) : À l'heure, Demi-journée, Journée, Événement

Toggle dynamique au clic :
- Avec chauffeur (détails expandables)
- Sans chauffeur (détails expandables + note conditions/caution)

### 4.7 Points de rendez-vous (cards + carte interactive)
- Carte OpenStreetMap/Leaflet avec marqueurs dorés épinglés
- 4–5 cards (données dans `data/pickupPoints.ts`) avec coordonnées GPS :
  - nom, adresse, instruction, bouton "Ouvrir sur Maps"

### 4.8 FAQ (accordéons)
Inclure au minimum :
- Comment réserver ?
- Comment fonctionne le paiement ?
- Quand sommes-nous confirmés ?
- Annulation et remboursement
- Location sans chauffeur : conditions
- Quelle zone desservez-vous ?

### 4.9 Section Réservation (form + paiement)
C'est la section la plus importante : formulaire + bouton payer acompte.

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
- `heureApprox` (input texte) : optionnel (ex "20h", "soirée", "après-midi")

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
- Le bouton "Payer l'acompte" est visible et sticky sur mobile dans la section réservation (option).
- Afficher un résumé (chips) au-dessus du bouton : prestation + formule + date(s) + RDV.
- Afficher un message clair en cas d'erreur, sans jargon.

---

## 6) Paiement Stripe Checkout (exigences techniques)

### 6.1 Montant acompte
- Acompte fixe (ex: 80 €) défini par env var : `DEPOSIT_AMOUNT_EUR`
- Devise : EUR

### 6.2 Stripe Checkout (implémentation)
Au clic "Payer l'acompte" :
1. `POST /api/stripe/checkout` avec tous les champs du formulaire (JSON).
2. Le serveur :
   - valide les champs (au minimum : `acceptConditions`, email, date)
   - calcule `amount = DEPOSIT_AMOUNT_EUR`
   - crée une session Stripe Checkout :
     - `mode` payment
     - line item : "Acompte réservation limousine"
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
  - optionnel : envoyer email client "demande reçue"
- Sécurité : vérifier signature webhook avec `STRIPE_WEBHOOK_SECRET`.

### 6.4 Page Merci
- `/merci` récupère `session_id` (query param)
- Côté serveur (route) : récupérer la session Stripe (server-side) pour afficher :
  - "Paiement reçu"
  - "Nous vous contactons rapidement"
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
- "Demande reçue, on vous contacte rapidement"
- Récap simple

Utiliser un provider email simple (Resend recommandé) via env var API key.

---

## 8) Données statiques (sans base)
Créer fichiers :
- `data/pickupPoints.ts` : liste de 4–5 points (id, nom, adresse, mapsUrl, instructions, lat, lng)
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
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (si nécessaire, mais Stripe Checkout côté serveur peut s'en passer)
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
- Landing responsive (mobile-first), style glassmorphism/bento conforme palette
- Sections : Hero, Bandeau valeur, Prestations (interactives), Tarifs (interactifs), Formules + Chauffeur (toggle), Points RDV (carte + cards), FAQ, Réservation
- Formulaire complet + validations
- Stripe Checkout : redirection, paiement, retour Merci
- Webhook : email propriétaire envoyé automatiquement
- Pages légales accessibles depuis footer
- Déploiement Vercel OK

---

## 12) Notes de copy (texte minimal à intégrer)
- Badge hero : "Limousine à Vercel-Villedieu-le-Camp"
- Micro-copy paiement : "Acompte remboursable selon conditions" (détail dans /conditions)
- Réservation : "La disponibilité est confirmée après validation de votre demande."

---

## 13) Interdictions (ne pas faire)
- Pas de base de données
- Pas de PayPal
- Pas de Payment Links
- Pas de UI chargée / sur-animée
- Pas de collecte excessive de données
- Pas de texte en anglais (tout en français)
