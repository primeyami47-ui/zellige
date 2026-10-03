import type { Content } from './fr'

const en: Content = {
  company: {
    name: 'Qaws',
    tagline: 'studio · Fez',
    email: 'studio@qaws.example',
    address: ['Fez medina', 'Fez — Morocco'],
    hours: 'Studio visits by appointment',
  },

  ui: {
    skip: 'Skip to content',
    home: 'home',
    navLabel: 'Main navigation',
    menuLabel: 'Menu',
    menuOpen: 'Open the menu',
    menuClose: 'Close the menu',
    langLabel: 'Language',
    cta: 'Your project',
    rosette: 'A zellige rosette: dozens of pieces fitted together around a tick',
  },

  nav: [
    { to: '#savoir-faire', label: 'Crafts' },
    { to: '#methode', label: 'Method' },
    { to: '#avis', label: 'Reviews' },
    { to: '#contact', label: 'Contact' },
  ],

  hero: {
    proof: '{n} riads restored since 2012',
    line1: 'Every piece',
    line2: 'in its place.',
    lead: 'Riads, zellige, tadelakt, carved wood: Qaws brings the houses of the medina back to their original state, and makes them liveable, from the first survey to the handover of the keys.',
    cta: 'Tell us about your project',
    alt: 'Our crafts',
    note: 'Free visit and first survey',
  },

  partnersTitle: 'They trusted us with their house',
  partners: ['Riad Yasmina', 'Dar Bensouda', 'Maison Sefrou', 'Palais Tazi', 'Riad Lune de Fès', 'Dar Seffarine'],

  crafts: {
    eyebrow: 'Our crafts',
    title: ['Five crafts, ', 'one', ' studio.'],
    more: 'A house, a project, a question?',
    moreLink: 'Let’s talk',
    go: 'Talk to us',
    swipe: 'Swipe to see all five crafts',
    list: [
      { id: 'riad', n: '01', title: 'Riad restoration',
        short: 'Structure, roofs, patios: the house set straight again, without losing any of its soul.',
        alt: 'Riad patio with painted wooden doors' },
      { id: 'zellige', n: '02', title: 'Bespoke zellige',
        short: 'Patterns drawn for your house, cut and laid piece by piece by our maâlems.',
        alt: 'Zellige wall fountain under an arch' },
      { id: 'tadelakt', n: '03', title: 'Tadelakt & plasters',
        short: 'Lime polished with a stone for hammams, bathrooms and walls that breathe.',
        alt: 'Shower finished in smooth lime plaster' },
      { id: 'bois', n: '04', title: 'Carved wood & plaster',
        short: 'Cedar ceilings, mashrabiya screens, chiselled gebs: restored or recreated as they were.',
        alt: 'Carved cedar and plaster ceiling with a lantern' },
      { id: 'interieur', n: '05', title: 'Interior design',
        short: 'Kitchens, bathrooms, light: today’s comfort, hidden in yesterday’s walls.',
        alt: 'Bright Moroccan living room' },
    ],
  },

  method: {
    eyebrow: 'Our method',
    title: ['Four steps, ', 'drawn', ' before they are laid.'],
    lead: 'Like a master zellige-maker, we survey, we draw, we lay, then we check. The same method for a patio or a whole house.',
    receive: 'You receive',
    phases: [
      { n: '01', label: 'Survey', duration: '2 weeks',
        title: 'We record the house as it is',
        body: 'Every wall, every ceiling, every loose tile is measured and photographed. We know what stays, what gets restored and what is rebuilt.',
        deliverable: 'Full survey and materials report' },
      { n: '02', label: 'Drawing', duration: '3 to 6 weeks',
        title: 'We draw before touching a stone',
        body: 'Plans, elevations and zellige patterns drawn by hand, then cleanly. You approve every piece on paper, and the budget with it.',
        deliverable: 'Plans, patterns and a line-by-line quote' },
      { n: '03', label: 'Laying', duration: '4 to 12 months',
        title: 'The maâlems lay it, layer after layer',
        body: 'Zellige-makers, carpenters, plasterers and masons take turns on a shared schedule. A photo of the site reaches you every week.',
        deliverable: 'Weekly site journal' },
      { n: '04', label: 'Handover', duration: 'the big day',
        title: 'We check everything, then open the door for you',
        body: 'A full walk-through, room by room, and every snag fixed before you arrive. The studio stays on call for ten years of upkeep.',
        deliverable: 'Care book and ten-year guarantee' },
    ],
  },

  restore: {
    eyebrow: 'Before · after',
    title: ['What time wears down, ', 'the hand', ' gives back.'],
    lead: 'Drag the handle: the same room before and after restoration (an illustration made from a photo).',
    before: 'Before',
    after: 'After',
    slider: 'Compare before and after',
    alt: 'Moroccan living room, compared before and after restoration',
    ledger: 'From the studio’s ledger',
  },

  planner: {
    title: ['Your ', 'house?'],
    lead: 'Pick your project: the studio tells you how long it takes, and where it starts.',
    question: 'What is your project?',
    durationLabel: 'Usual duration',
    firstLabel: 'We start with',
    cta: 'Book a visit',
    choices: [
      { label: 'A riad to restore', duration: '8 to 14 months', first: 'A survey of the structure, the roofs and the patio' },
      { label: 'A guest house', duration: '10 to 16 months', first: 'A plan of the rooms, the bathrooms and the guests’ route' },
      { label: 'An apartment', duration: '3 to 5 months', first: 'A survey of the rooms and the choice of materials' },
      { label: 'A shop', duration: '2 to 4 months', first: 'A drawing of the facade and the zellige floor' },
      { label: 'Not sure yet', duration: 'To be agreed together', first: 'A visit to the house with a maâlem' },
    ],
  },

  reviews: {
    eyebrow: 'They trusted us with their house',
    title: ['Houses given back, ', 'one by one.'],
    figures: [
      { value: 38, unit: '', label: 'riads restored since 2012' },
      { value: 24, unit: '', label: 'maâlems in the studio' },
      { value: 61000, unit: '', label: 'zellige pieces laid last year' },
      { value: 10, unit: ' yrs', label: 'guarantee on every project' },
    ],
    list: [
      { quote: 'We had bought a ruin. Ten months later we opened a guest house our guests photograph at every step.',
        name: 'Camille & Driss', role: 'Riad Yasmina' },
      { quote: 'They found the original ceiling design under three coats of paint. Nobody else had noticed it.',
        name: 'Hamid', role: 'Owner, Talaa Kebira' },
      { quote: 'A photo of the site every week, all the way from Lyon. I never had to worry.',
        name: 'Sophie', role: 'Second home' },
    ],
  },

  close: {
    who: 'Q',
    title: ['Come and see ', 'the studio.'],
    lead: 'Write to us: we reply within 48 hours and arrange a visit, at the studio or at your house.',
    cta: 'Send a message',
  },

  footer: {
    line1: 'Every piece',
    line2: 'in its place.',
    about: 'Restoration studio in the Fez medina: riads, zellige, tadelakt, carved wood and plaster, interior design.',
    colCrafts: 'Crafts',
    colStudio: 'The studio',
    studio: [
      { to: '#methode', label: 'Our method' },
      { to: '#avis', label: 'Reviews' },
      { to: '#projet', label: 'Your project' },
      { to: '#contact', label: 'Write to us' },
    ],
    colContact: 'Contact',
    city: 'Fez',
    demo: 'Fictional brand · demo showcase site',
  },

  notFound: {
    eyebrow: 'Error 404',
    title: 'A piece is missing: this page doesn’t exist.',
    lead: 'It may have been moved.',
    cta: 'Back to the home page',
  },

  error: {
    title: 'Something went wrong',
    lead: 'Reload the page. If the problem persists, write to us at',
    reload: 'Reload the page',
  },

  seo: {
    home: {
      title: 'Riad restoration and zellige in Fez',
      description: 'Restoration studio in Fez: riads, bespoke zellige, tadelakt, carved wood and plaster, interior design. From survey to handover, with a ten-year guarantee.',
    },
    notFound: { title: 'Page not found', description: 'This page doesn’t exist or has moved.' },
  },
}

export default en
