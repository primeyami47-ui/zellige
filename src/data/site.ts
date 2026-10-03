/* Contenu de la vitrine « Zellige » : Qaws, atelier fictif de restauration
   de riads et d'aménagement intérieur à Fès. Tout ce que les pages affichent
   vient d'ici ; les composants restent purement visuels. Noms, chiffres et
   avis sont inventés. */

export const company = {
  name: 'Qaws',
  tagline: 'Atelier de restauration',
  email: 'atelier@qaws.example',
  address: ['Médina de Fès', 'Fès — Maroc'],
  hours: 'Visites d’atelier sur rendez-vous',
} as const

/* ---------------------------------------------------------- savoir-faire -- */

export interface Craft { id: string; n: string; title: string; short: string }

export const crafts: Craft[] = [
  { id: 'riad', n: '01', title: 'Restauration de riads',
    short: 'Structure, toitures, patios : la maison remise d’aplomb, sans rien perdre de son âme.' },
  { id: 'zellige', n: '02', title: 'Zellige sur mesure',
    short: 'Des motifs dessinés pour votre maison, taillés et posés pièce par pièce par nos maâlems.' },
  { id: 'tadelakt', n: '03', title: 'Tadelakt et enduits',
    short: 'La chaux polie au galet pour les hammams, les salles d’eau et les murs qui respirent.' },
  { id: 'bois', n: '04', title: 'Bois et plâtre sculptés',
    short: 'Plafonds en cèdre, moucharabiehs, gebs ciselé : restaurés ou créés à l’identique.' },
  { id: 'interieur', n: '05', title: 'Aménagement intérieur',
    short: 'Cuisine, salles de bains, lumière : le confort d’aujourd’hui, caché dans les murs d’hier.' },
]

/* ------------------------------------------------------------- méthode -- */

export const phases = [
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
]

/* ------------------------------------------------------------- preuves -- */

/** Clients (inventés) : maisons d'hôtes et propriétaires. */
export const partners = ['Riad Yasmina', 'Dar Bensouda', 'Maison Sefrou', 'Palais Tazi', 'Riad Lune de Fès', 'Dar Seffarine']

export const figures = [
  { value: 38, label: 'riads restaurés depuis 2012' },
  { value: 24, label: 'maâlems dans l’atelier' },
  { value: 61000, label: 'pièces de zellige posées l’an dernier' },
  { value: 10, unit: ' ans', label: 'de garantie sur chaque chantier' },
]

export const testimonials = [
  { quote: 'Nous avions acheté une ruine. Dix mois plus tard, nous ouvrions une maison d’hôtes que nos clients prennent en photo à chaque pas.',
    name: 'Camille et Driss', role: 'Riad Yasmina' },
  { quote: 'Ils ont retrouvé le dessin d’origine du plafond sous trois couches de peinture. Personne d’autre ne l’avait remarqué.',
    name: 'Hamid', role: 'Propriétaire, Talaa Kebira' },
  { quote: 'Une photo du chantier chaque semaine, depuis Lyon. Je n’ai jamais eu à m’inquiéter.',
    name: 'Sophie', role: 'Résidence secondaire' },
]

/* ------------------------------------------------------- premier contact -- */

export const quiz = {
  title: 'Quel est votre projet ?',
  choices: ['Un riad à restaurer', 'Une maison d’hôtes', 'Un appartement', 'Un commerce', 'Je ne sais pas encore'],
}

/* ----------------------------------------------------------------- seo -- */

export const seo = {
  home: {
    title: 'Restauration de riads et zellige à Fès',
    description:
      'Atelier de restauration à Fès : riads, zellige sur mesure, tadelakt, bois et plâtre sculptés, aménagement intérieur. Du relevé à la remise des clés, garantie de dix ans.',
  },
  notFound: {
    title: 'Page introuvable',
    description: "Cette page n'existe pas ou a été déplacée.",
  },
} as const
