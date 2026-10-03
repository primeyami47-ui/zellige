import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { crafts, phases } from '../data/site'
import { Arrow } from './Reveal'
import './Zellige.css'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ------------------------------------------------------------ géométrie -- */

const rad = (d: number) => (d * Math.PI) / 180
const P = (r: number, deg: number) => [r * Math.cos(rad(deg)), r * Math.sin(rad(deg))] as const
const poly = (pts: (readonly [number, number])[]) => pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
/** Étoile à huit branches (deux carrés), rayon extérieur R, centrée en (cx, cy). */
function star(R: number, cx = 0, cy = 0, rot = 0) {
  const r = R * Math.cos(rad(45)) / Math.cos(rad(22.5))
  return poly(Array.from({ length: 16 }, (_, i) => {
    const [x, y] = P(i % 2 ? r : R, rot + i * 22.5 - 90)
    return [x + cx, y + cy] as const
  }))
}

/* =============================================================== rosace ===
   Le hero : une rosace de zellige dont les tesselles arrivent chacune de
   loin et se posent à leur place ; la rosace tourne lentement avec la page.
   Au centre, la coche : chaque pièce à sa place. Pré-rendue assemblée : sans JavaScript, l'image est
   complète. */

interface Tile { key: string; kind: 'poly'; points: string; fill: string; d: number; x: number; y: number; r: number }

function tiles(): Tile[] {
  const out: Tile[] = []
  const push = (key: string, points: string, fill: string, ring: number, ang: number, i: number) => {
    const [x, y] = P(90 + ring * 40, ang)
    out.push({ key, kind: 'poly', points, fill, d: 120 + ring * 160 + i * 38, x, y, r: (i % 2 ? 1 : -1) * (60 + ring * 25) })
  }
  // Anneau 1 : huit pétales (cerfs-volants), indigo et azur en alternance.
  for (let k = 0; k < 8; k++) {
    const a = k * 45 - 90
    push(`k${k}`, poly([P(78, a), P(138, a - 13), P(182, a), P(138, a + 13)]), k % 2 ? 'var(--azure)' : 'var(--indigo)', 1, a, k)
  }
  // Anneau 2 : huit petites étoiles, entre les pétales.
  for (let k = 0; k < 8; k++) {
    const a = k * 45 - 67.5
    const [cx, cy] = P(168, a)
    push(`s${k}`, star(26, cx, cy, 22.5), k % 2 ? 'var(--ochre)' : 'var(--terra)', 2, a, k)
  }
  // Anneau 3 : seize losanges.
  for (let k = 0; k < 16; k++) {
    const a = k * 22.5 - 90
    push(`l${k}`, poly([P(206, a), P(226, a - 5.2), P(246, a), P(226, a + 5.2)]), k % 2 ? 'var(--rose)' : 'var(--terra)', 3, a, k)
  }
  return out
}
const TILES = tiles()

export function Rosette() {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = ref.current
    if (!svg || reduced()) return
    svg.classList.add('is-live')
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => svg.style.setProperty('--spin', `${(window.scrollY * 0.06).toFixed(2)}deg`))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return (
    <svg ref={ref} className="rz" viewBox="-260 -260 520 520" role="img"
         aria-label="Une rosace de zellige : des dizaines de pièces assemblées autour d'une coche">
      <circle r="254" className="rz__ring" />
      <g className="rz__spin">
        {TILES.map((t) => (
          <polygon key={t.key} className="rz__t" points={t.points} fill={t.fill}
                   style={{ '--d': `${t.d}ms`, '--x': `${t.x.toFixed(1)}px`, '--y': `${t.y.toFixed(1)}px`, '--r': `${t.r}deg` } as CSSProperties} />
        ))}
        <g className="rz__core">
          <polygon points={star(76, 0, 0, 0)} fill="var(--ochre)" />
          <polygon points={star(76, 0, 0, 22.5)} fill="var(--terra)" opacity=".92" />
        </g>
      </g>
      <circle r="42" fill="var(--plaster)" className="rz__hub" />
      <path className="rz__tick" d="M-19 1 L-5 15 L21 -13" pathLength={100} />
    </svg>
  )
}

/* ============================================================== arcade ===
   Cinq arcs, un savoir-faire chacun, et dans chaque arc un panneau de
   zellige dessiné dans ses couleurs. Sur téléphone, on les fait glisser du
   pouce. */

const ARCH_TONES: Record<string, [string, string]> = {
  riad:      ['var(--azure)', 'var(--indigo)'],
  zellige:   ['#F2C9B6', '#5A1E10'],
  tadelakt:  ['var(--ochre)', '#3A2412'],
  bois:      ['#C9D6EE', 'var(--cobalt-d)'],
  interieur: ['#F1D9C9', '#6A2A18'],
}

/** Un panneau de zellige : étoiles à huit branches sur fond clair, avec un
    motif différent (taille, rotation, losanges) pour chaque arc. */
function Panel({ i, a, b }: { i: number; a: string; b: string }) {
  const size = [60, 46, 74, 52, 64][i % 5]
  const rot = i % 2 ? 22.5 : 0
  const cols = Math.ceil(240 / size) + 1, rows = Math.ceil(300 / size) + 1
  const cells = Array.from({ length: cols * rows }, (_, k) => [k % cols, Math.floor(k / cols)] as const)
  return (
    <svg viewBox="0 0 240 300" preserveAspectRatio="xMidYMid slice" className="arch__panel">
      <rect width="240" height="300" fill={a} />
      {cells.map(([c, r]) => (
        <polygon key={`s${c}-${r}`} points={star(size * 0.42, c * size, r * size, rot)} fill={b} />
      ))}
      {cells.map(([c, r]) => (
        <polygon key={`d${c}-${r}`} fill={a} opacity=".9"
                 points={poly([[c * size + size / 2, r * size + size / 2 - size * 0.16], [c * size + size / 2 + size * 0.16, r * size + size / 2],
                               [c * size + size / 2, r * size + size / 2 + size * 0.16], [c * size + size / 2 - size * 0.16, r * size + size / 2]])} />
      ))}
      {cells.map(([c, r]) => (
        <circle key={`c${c}-${r}`} cx={c * size} cy={r * size} r={size * 0.1} fill={a} />
      ))}
    </svg>
  )
}

export function Arcade() {
  const track = useRef<HTMLUListElement>(null)
  const [seen, setSeen] = useState(0)
  const onScroll = () => {
    const el = track.current
    if (!el) return
    const w = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1
    setSeen(Math.min(crafts.length - 1, Math.round(el.scrollLeft / w)))
  }

  return (
    <div className="arcade-wrap">
      <ul className="arcade" ref={track} onScroll={onScroll}>
        {crafts.map((e, i) => {
          const [a, b] = ARCH_TONES[e.id] ?? ARCH_TONES.riad
          return (
            <li key={e.id} className="arch" style={{ '--i': i, '--duo-a': a, '--duo-b': b } as CSSProperties}>
              <a href="#contact" className="arch__in">
                <span className="arch__frame">
                  <span className="arch__img" aria-hidden="true"><Panel i={i} a={a} b={b} /></span>
                  <span className="arch__n">{e.n}</span>
                </span>
                <span className="arch__title">{e.title}</span>
                <span className="arch__short">{e.short}</span>
                <span className="arch__go">En parler <Arrow /></span>
              </a>
            </li>
          )
        })}
      </ul>
      <p className="arcade__hint" aria-hidden="true">
        <span className="t-num">{String(seen + 1).padStart(2, '0')} / 0{crafts.length}</span>
        <span>Glissez pour voir les cinq savoir-faire</span>
      </p>
    </div>
  )
}

/* ============================================================ chantier ===
   La méthode : le motif se construit sous vos yeux. Le relevé (la grille
   de tracé), le dessin des étoiles, la pose des couleurs, puis le sceau.
   Chaque étape de la méthode ajoute sa couche. */

const CELL = 100
const GRID = [0, 1, 2, 3]

function Layer({ on, className, children }: { on: boolean; className: string; children: ReactNode }) {
  return <g className={`bd__layer ${className}${on ? ' is-on' : ''}`}>{children}</g>
}

function Build({ step }: { step: number }) {
  return (
    <svg className="bd" viewBox="0 0 400 400" aria-hidden="true">
      <rect width="400" height="400" fill="var(--surface)" />
      <Layer on={step >= 2} className="bd__bg"><rect width="400" height="400" fill="var(--ochre)" /></Layer>
      <Layer on={step >= 0} className="bd__grid">
        {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((v) => (
          <g key={v}><line x1={v} y1="0" x2={v} y2="400" /><line x1="0" y1={v} x2="400" y2={v} /></g>
        ))}
        {GRID.flatMap((r) => GRID.map((c) => <circle key={`${r}${c}`} cx={c * CELL + 50} cy={r * CELL + 50} r="36" />))}
      </Layer>
      <Layer on={step >= 2} className="bd__fill">
        {GRID.flatMap((r) => GRID.map((c) => (
          <polygon key={`${r}${c}`} points={star(40, c * CELL + 50, r * CELL + 50, 0)}
                   fill={(r + c) % 2 ? 'var(--terra)' : 'var(--indigo)'} style={{ '--i': r * 4 + c } as CSSProperties} />
        )))}
      </Layer>
      <Layer on={step >= 1} className="bd__line">
        {GRID.flatMap((r) => GRID.map((c) => (
          <polygon key={`${r}${c}`} points={star(40, c * CELL + 50, r * CELL + 50, 0)} pathLength={100} style={{ '--i': r * 4 + c } as CSSProperties} />
        )))}
      </Layer>
      <Layer on={step >= 3} className="bd__seal">
        <circle cx="200" cy="200" r="74" fill="var(--plaster)" />
        <circle cx="200" cy="200" r="64" fill="none" stroke="var(--terra)" strokeWidth="3" strokeDasharray="4 6" />
        <path d="M168 202 L191 225 L234 178" fill="none" stroke="var(--terra)" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" pathLength={100} />
      </Layer>
    </svg>
  )
}

export function Workshop() {
  const [step, setStep] = useState(0)
  const list = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const el = list.current
    if (!el || !('IntersectionObserver' in window)) return
    const items = [...el.querySelectorAll<HTMLElement>('[data-step]')]
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.step)) })
    }, { rootMargin: '-45% 0px -45% 0px' })
    items.forEach((i) => io.observe(i))
    return () => io.disconnect()
  }, [])

  return (
    <div className="ws">
      <div className="ws__art">
        <Build step={step} />
        <p className="ws__cap" aria-hidden="true">
          <span className="t-num">0{step + 1}</span> {phases[step]?.label}
        </p>
      </div>
      <ol className="ws__steps" ref={list}>
        {phases.map((ph, i) => (
          <li key={ph.n} data-step={i} className={`ws__step${step === i ? ' is-on' : ''}`}>
            <span className="ws__n">{ph.n}</span>
            <p className="ws__label">{ph.label}</p>
            <h3 className="t-h3">{ph.title}</h3>
            <p className="ws__body">{ph.body}</p>
            <p className="ws__deliv"><span>Vous recevez</span>{ph.deliverable}</p>
            <span className="ws__weeks">{ph.duration}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
