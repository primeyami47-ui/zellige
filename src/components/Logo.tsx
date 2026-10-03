/**
 * Le logo Qaws : une étoile à huit branches (le khatam, motif fondateur du
 * zellige) qui porte une coche en son cœur. Deux carrés superposés,
 * décalés d'un huitième de tour : la rigueur de la géométrie, et le travail
 * bien fini au centre.
 *
 * Repère 64 × 64, centre (32, 32) ; carrés de 44 de côté.
 */
export type LogoTone = 'color' | 'reverse' | 'ink' | 'white'

const TONES: Record<LogoTone, { a: string; b: string; tick: string }> = {
  color:   { a: 'var(--terra)', b: 'var(--indigo)', tick: '#fff' },
  reverse: { a: 'var(--ochre)', b: 'var(--terra)',  tick: 'var(--ink)' },
  ink:     { a: 'var(--ink)',   b: 'var(--ink)',    tick: '#fff' },
  white:   { a: '#fff',         b: '#fff',          tick: 'var(--indigo)' },
}

export const TICK = 'M22 32.5 L29 39.5 L43 24.5'

export function LogoMark({ tone = 'color', size = 40, className = '', draw = false }: {
  tone?: LogoTone; size?: number; className?: string; draw?: boolean
}) {
  const t = TONES[tone]
  return (
    <svg className={`zmark${draw ? ' zmark--draw' : ''} ${className}`} width={size} height={size}
         viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <g className="zmark__star">
        <rect x="10" y="10" width="44" height="44" fill={t.b} />
        <rect x="10" y="10" width="44" height="44" fill={t.a} transform="rotate(45 32 32)" />
      </g>
      <path className="zmark__tick" d={TICK} pathLength={100} stroke={t.tick} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Étoile + nom : « qaws » en italique, « atelier » en petites capitales. */
export default function Logo({ tone = 'color', size = 44, className = '', draw = false, sub, word = 'qaws' }: {
  tone?: LogoTone; size?: number; className?: string; draw?: boolean; sub: string; word?: string
}) {
  const text = tone === 'reverse' || tone === 'white' ? '#fff' : 'var(--ink)'
  return (
    <span className={`zlogo ${className}`} style={{ color: text }}>
      <LogoMark tone={tone} size={size} draw={draw} />
      <span className="zlogo__word" aria-hidden="true">
        {word}<small>{sub}</small>
      </span>
    </span>
  )
}
