# Zellige — Qaws, atelier de restauration

**Site vitrine de démonstration.** Qaws est une marque fictive : l’atelier,
les noms, les chiffres et les avis sont inventés pour montrer le design.

**En ligne :** https://primeyami47-ui.github.io/zellige/ — [English](https://primeyami47-ui.github.io/zellige/en/) · [العربية](https://primeyami47-ui.github.io/zellige/ar/)

## Le design

« Zellige » est bâti sur la géométrie de l’étoile à huit branches (le
khatam), sur l’arc outrepassé et sur les couleurs de la céramique de Fès :
terre cuite, indigo, ocre, sur un fond de plâtre. Les titres en serif, en
grand corps, alternent romain et italique ; aucune graisse forcée.

- **Une rosace qui s’assemble** dans le hero : des dizaines de tesselles
  arrivent chacune de loin et se posent à leur place autour d’une coche,
  puis la rosace tourne lentement avec la page. « Chaque pièce à sa place. »
- **Cinq arcs**, un savoir-faire chacun, garnis d’un panneau de zellige
  dessiné en SVG dans leurs couleurs ; au survol, le motif tourne d’un
  seizième de tour. Sur téléphone, on les fait glisser du pouce.
- **La méthode se construit sous vos yeux** : à chaque étape lue, le
  dessin de droite ajoute sa couche (la grille du relevé, le tracé des
  étoiles, la pose des couleurs, puis le sceau de la remise des clés).
- Chiffres dans des arcs, avis dans des fenêtres de riad, frise d’étoiles
  au pied de page, menu mobile indigo avec une grande étoile en filigrane.
- Tout s’arrête proprement avec « réduire les animations ».

## Ce qui la distingue

- **Un avant · après** à glisser (au doigt, à la souris, au clavier) : la
  même photo, vieillie par CSS à gauche, restaurée à droite.
- **Un registre de l’atelier** : les chiffres sont des lignes à points de
  conduite, pas des tuiles.
- **Un planificateur de projet** : on choisit riad, maison d’hôtes,
  appartement… et l’atelier répond (durée habituelle, premier geste).
- Des photos réelles dans les arcs, teintées au repos et en couleurs au
  survol.

## Trois langues

Français à la racine, anglais sous `/en/`, arabe (de droite à gauche) sous `/ar/`, chaque version prérendue. Les textes vivent dans `src/content/{fr,en,ar}.ts`. Le sélecteur de langue est un vrai lien : chaque langue arrive avec sa police et son sens de lecture, sans scintillement. En arabe, le nom de la marque est écrit en arabe.

## Technique

Vite + React 19 + TypeScript. Toute la géométrie (rosace, panneaux, motif
de la méthode) est calculée en SVG, sans image. La page est **prérendue en
HTML statique** puis reprise par React (hydratation). Polices
auto-hébergées : Instrument Serif et Instrument Sans.

```bash
npm install
npm run dev      # http://localhost:5173/zellige/
npm run build    # vérification des types, bundle et prérendu dans dist/
npm run lint
```

Chaque push sur `main` publie le site sur GitHub Pages
(`.github/workflows/pages.yml`).
