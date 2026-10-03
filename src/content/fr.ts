/* Contenu de la vitrine « Zellige » : Qaws, atelier fictif de restauration
   de riads et d'aménagement intérieur à Fès. Tout ce que la page affiche
   vient d'ici ; en.ts et ar.ts reprennent exactement la même forme. Noms,
   chiffres et avis sont inventés ; les photos viennent d'Unsplash (voir le
   README). */

const fr = {
  company: {
    name: 'Qaws',
    tagline: 'atelier · Fès',
    email: 'atelier@qaws.example',
    address: ['Médina de Fès', 'Fès — Maroc'],
    hours: 'Visites d’atelier sur rendez-vous',
  },

  ui: {
    skip: 'Aller au contenu',
    home: 'accueil',
    navLabel: 'Navigation principale',
    menuLabel: 'Menu',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    langLabel: 'Langue',
    cta: 'Votre projet',
    rosette: 'Une rosace de zellige : des dizaines de pièces assemblées autour d’une coche',
  },

  nav: [
    { to: '#savoir-faire', label: 'Savoir-faire' },
    { to: '#methode', label: 'Méthode' },
    { to: '#avis', label: 'Avis' },
    { to: '#contact', label: 'Contact' },
  ],

  hero: {
    proof: '{n} riads restaurés depuis 2012',
    line1: 'Chaque pièce',
    line2: 'à sa place.',
    lead: 'Riads, zellige, tadelakt, bois sculpté : Qaws remet les maisons de la médina dans leur état d’origine, et les rend vivables, du premier relevé jusqu’à la remise des clés.',
    cta: 'Parler de votre projet',
    alt: 'Nos savoir-faire',
    note: 'Visite et premier relevé offerts',
  },

  partnersTitle: 'Ils nous ont confié leur maison',
  partners: ['Riad Yasmina', 'Dar Bensouda', 'Maison Sefrou', 'Palais Tazi', 'Riad Lune de Fès', 'Dar Seffarine'],

  crafts: {
    eyebrow: 'Nos savoir-faire',
    title: ['Cinq métiers d’art, ', 'un seul', ' atelier.'],
    more: 'Une maison, un projet, une question ?',
    moreLink: 'Parlons-en',
    go: 'En parler',
    swipe: 'Glissez pour voir les cinq savoir-faire',
    list: [
      { id: 'riad', n: '01', title: 'Restauration de riads',
        short: 'Structure, toitures, patios : la maison remise d’aplomb, sans rien perdre de son âme.',
        alt: 'Patio de riad aux portes de bois peint' },
      { id: 'zellige', n: '02', title: 'Zellige sur mesure',
        short: 'Des motifs dessinés pour votre maison, taillés et posés pièce par pièce par nos maâlems.',
        alt: 'Fontaine murale en zellige sous un arc' },
      { id: 'tadelakt', n: '03', title: 'Tadelakt et enduits',
        short: 'La chaux polie au galet pour les hammams, les salles d’eau et les murs qui respirent.',
        alt: 'Douche en enduit de chaux lissé' },
      { id: 'bois', n: '04', title: 'Bois et plâtre sculptés',
        short: 'Plafonds en cèdre, moucharabiehs, gebs ciselé : restaurés ou créés à l’identique.',
        alt: 'Plafond de cèdre et plâtre sculpté avec une lanterne' },
      { id: 'interieur', n: '05', title: 'Aménagement intérieur',
        short: 'Cuisine, salles de bains, lumière : le confort d’aujourd’hui, caché dans les murs d’hier.',
        alt: 'Salon marocain lumineux' },
    ],
  },

  method: {
    eyebrow: 'Notre méthode',
    title: ['Quatre étapes, ', 'tracées', ' avant d’être posées.'],
    lead: 'Comme un maître zellijeur, on relève, on dessine, on pose, puis on vérifie. La même méthode pour un patio ou pour une maison entière.',
    receive: 'Vous recevez',
    phases: [
      { n: '01', label: 'Relevé', duration: '2 semaines',
        title: 'On relève la maison telle qu’elle est',
        body: 'Chaque mur, chaque plafond, chaque carreau descellé est mesuré et photographié. On sait ce qui se garde, ce qui se restaure et ce qui se refait.',
        deliverable: 'Relevé complet et diagnostic des matériaux' },
      { n: '02', label: 'Dessin', duration: '3 à 6 semaines',
        title: 'On dessine avant de toucher une pierre',
        body: 'Plans, élévations et motifs de zellige tracés à la main puis au propre. Vous validez chaque pièce sur papier, et le budget avec.',
        deliverable: 'Plans, motifs et devis ligne par ligne' },
      { n: '03', label: 'Pose', duration: '4 à 12 mois',
        title: 'Les maâlems posent, couche après couche',
        body: 'Zellijeurs, menuisiers, plâtriers et maçons se relaient sur un planning partagé. Une photo du chantier vous arrive chaque semaine.',
        deliverable: 'Journal de chantier hebdomadaire' },
      { n: '04', label: 'Remise des clés', duration: 'le jour J',
        title: 'On vérifie tout, puis on vous ouvre la porte',
        body: 'Une visite complète, pièce par pièce, et une liste de réserves levées avant votre arrivée. L’atelier reste joignable dix ans pour l’entretien.',
        deliverable: 'Carnet d’entretien et garantie de dix ans' },
    ],
  },

  restore: {
    eyebrow: 'Avant · après',
    title: ['Ce que le temps abîme, ', 'la main', ' le rend.'],
    lead: 'Faites glisser la poignée : la même pièce avant et après restauration (illustration à partir d’une photo).',
    before: 'Avant',
    after: 'Après',
    slider: 'Comparer avant et après',
    alt: 'Salon marocain, comparé avant et après restauration',
    ledger: 'Au registre de l’atelier',
  },

  planner: {
    title: ['Votre ', 'maison ?'],
    lead: 'Choisissez votre projet : l’atelier vous dit combien de temps il prend, et par quoi il commence.',
    question: 'Quel est votre projet ?',
    durationLabel: 'Durée habituelle',
    firstLabel: 'On commence par',
    cta: 'Fixer une visite',
    choices: [
      { label: 'Un riad à restaurer', duration: '8 à 14 mois', first: 'Le relevé de la structure, des toitures et du patio' },
      { label: 'Une maison d’hôtes', duration: '10 à 16 mois', first: 'Le plan des chambres, des salles d’eau et du circuit des hôtes' },
      { label: 'Un appartement', duration: '3 à 5 mois', first: 'Le relevé des pièces et le choix des matériaux' },
      { label: 'Un commerce', duration: '2 à 4 mois', first: 'Le dessin de la façade et du sol en zellige' },
      { label: 'Je ne sais pas encore', duration: 'À définir ensemble', first: 'Une visite de la maison avec un maâlem' },
    ],
  },

  reviews: {
    eyebrow: 'Ils nous ont confié leur maison',
    title: ['Des maisons rendues, ', 'une par une.'],
    figures: [
      { value: 38, unit: '', label: 'riads restaurés depuis 2012' },
      { value: 24, unit: '', label: 'maâlems dans l’atelier' },
      { value: 61000, unit: '', label: 'pièces de zellige posées l’an dernier' },
      { value: 10, unit: ' ans', label: 'de garantie sur chaque chantier' },
    ],
    list: [
      { quote: 'Nous avions acheté une ruine. Dix mois plus tard, nous ouvrions une maison d’hôtes que nos clients prennent en photo à chaque pas.',
        name: 'Camille et Driss', role: 'Riad Yasmina' },
      { quote: 'Ils ont retrouvé le dessin d’origine du plafond sous trois couches de peinture. Personne d’autre ne l’avait remarqué.',
        name: 'Hamid', role: 'Propriétaire, Talaa Kebira' },
      { quote: 'Une photo du chantier chaque semaine, depuis Lyon. Je n’ai jamais eu à m’inquiéter.',
        name: 'Sophie', role: 'Résidence secondaire' },
    ],
  },

  close: {
    who: 'Q',
    title: ['Venez voir ', 'l’atelier.'],
    lead: 'Écrivez-nous : nous vous répondons sous 48 heures et fixons une visite, à l’atelier ou chez vous.',
    cta: 'Écrire un message',
  },

  footer: {
    line1: 'Chaque pièce',
    line2: 'à sa place.',
    about: 'Atelier de restauration dans la médina de Fès : riads, zellige, tadelakt, bois et plâtre sculptés, aménagement intérieur.',
    colCrafts: 'Savoir-faire',
    colStudio: 'L’atelier',
    studio: [
      { to: '#methode', label: 'Notre méthode' },
      { to: '#avis', label: 'Ils nous ont confié leur maison' },
      { to: '#projet', label: 'Votre projet' },
      { to: '#contact', label: 'Nous écrire' },
    ],
    colContact: 'Contact',
    city: 'Fès',
    demo: 'Marque fictive · site vitrine de démonstration',
  },

  notFound: {
    eyebrow: 'Erreur 404',
    title: 'Il manque une pièce : cette page n’existe pas.',
    lead: 'Elle a peut-être été déplacée.',
    cta: 'Retour à l’accueil',
  },

  error: {
    title: 'Une erreur est survenue',
    lead: 'Rechargez la page. Si le problème persiste, écrivez-nous à',
    reload: 'Recharger la page',
  },

  seo: {
    home: {
      title: 'Restauration de riads et zellige à Fès',
      description: 'Atelier de restauration à Fès : riads, zellige sur mesure, tadelakt, bois et plâtre sculptés, aménagement intérieur. Du relevé à la remise des clés, garantie de dix ans.',
    },
    notFound: { title: 'Page introuvable', description: 'Cette page n’existe pas ou a été déplacée.' },
  },
}

export type Content = typeof fr
export default fr
