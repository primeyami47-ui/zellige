import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useContent } from '../content'
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
  const label = useContent().ui.rosette
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
         aria-label={label}>
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
   Cinq arcs, un savoir-faire chacun, et dans chaque arc sa photo, teintée
   dans la couleur de l'arc au repos et rendue à ses couleurs au survol.
   Sur téléphone, on les fait glisser du pouce. */

const ARCH_TONES: Record<string, [string, string]> = {
  riad:      ['var(--azure)', 'var(--indigo)'],
  zellige:   ['#F2C9B6', '#5A1E10'],
  tadelakt:  ['var(--ochre)', '#3A2412'],
  bois:      ['#C9D6EE', 'var(--cobalt-d)'],
  interieur: ['#F1D9C9', '#6A2A18'],
}

/* Les photos des arcs (Unsplash, voir le README), à leur taille réelle. */
const PHOTOS: Record<string, [number, number]> = {
  riad: [720, 1080], zellige: [720, 960], tadelakt: [720, 900], bois: [720, 1177], interieur: [720, 480],
}

export function Arcade() {
  const t = useContent().crafts
  const crafts = t.list
  const track = useRef<HTMLUListElement>(null)
  const [seen, setSeen] = useState(0)
  const onScroll = () => {
    const el = track.current
    if (!el) return
    const w = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1
    setSeen(Math.min(crafts.length - 1, Math.round(Math.abs(el.scrollLeft) / w)))
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
                  <span className="arch__img duo">
                    <img src={`${import.meta.env.BASE_URL}img/${e.id}.webp`} alt={e.alt}
                         width={PHOTOS[e.id][0]} height={PHOTOS[e.id][1]} loading="lazy" />
                  </span>
                  <span className="arch__n">{e.n}</span>
                </span>
                <span className="arch__title">{e.title}</span>
                <span className="arch__short">{e.short}</span>
                <span className="arch__go">{t.go} <Arrow /></span>
              </a>
            </li>
          )
        })}
      </ul>
      <p className="arcade__hint" aria-hidden="true">
        <span className="t-num">{String(seen + 1).padStart(2, '0')} / 0{crafts.length}</span>
        <span>{t.swipe}</span>
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
  const { phases, receive } = useContent().method
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
            <p className="ws__deliv"><span>{receive}</span>{ph.deliverable}</p>
            <span className="ws__weeks">{ph.duration}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ============================================================ avant · après ===
   La même pièce, abîmée à gauche et restaurée à droite. La photo est la
   même : le « avant » est un effet (désaturée, ternie, poussiéreuse), pas un
   vrai chantier. Une poignée à glisser, au doigt comme au clavier. */

export function Compare() {
  const t = useContent().restore
  const [v, setV] = useState(52)
  return (
    <div className="cmp" style={{ '--v': `${v}%` } as CSSProperties}>
      <div className="cmp__stage">
        <img className="cmp__img" src={`${import.meta.env.BASE_URL}img/interieur.webp`} alt={t.alt} width={720} height={480} loading="lazy" />
        <div className="cmp__before" aria-hidden="true">
          <img className="cmp__img cmp__img--aged" src={`${import.meta.env.BASE_URL}img/interieur.webp`} alt="" width={720} height={480} loading="lazy" />
          <span className="cmp__dust" />
        </div>
        <span className="cmp__handle" aria-hidden="true"><i /></span>
        <span className="cmp__tag cmp__tag--before" aria-hidden="true">{t.before}</span>
        <span className="cmp__tag cmp__tag--after" aria-hidden="true">{t.after}</span>
      </div>
      <input className="cmp__range" type="range" min={0} max={100} value={v} aria-label={t.slider}
             onChange={(e) => setV(Number(e.target.value))} />
    </div>
  )
}

/* ================================================================ projet ===
   Le planificateur : on choisit son projet, l'atelier répond (durée, premier
   geste) et propose une visite. */

export function Planner() {
  const t = useContent().planner
  const [i, setI] = useState<number | null>(null)
  const c = i === null ? null : t.choices[i]
  return (
    <div className="plan">
      <p className="plan__q">{t.question}</p>
      <div className="plan__chips" role="radiogroup" aria-label={t.question}>
        {t.choices.map((ch, k) => (
          <button key={ch.label} type="button" role="radio" aria-checked={i === k}
                  className={`chip${i === k ? ' is-on' : ''}`} onClick={() => setI(k)}>{ch.label}</button>
        ))}
      </div>
      {c && (
        <div className="plan__out" key={i}>
          <p><span>{t.durationLabel}</span><strong>{c.duration}</strong></p>
          <p><span>{t.firstLabel}</span><strong>{c.first}</strong></p>
          <a href="#contact" className="btn btn--primary">{t.cta} <Arrow /></a>
        </div>
      )}
    </div>
  )
}
