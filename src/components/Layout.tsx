import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import type Lenis from 'lenis'
import { useContent } from '../content'
import { dirOf, homeOf, useLang } from '../i18n'
import LangSwitch from './LangSwitch'
import { Arrow } from './Reveal'
import Logo, { LogoMark } from './Logo'
import './Layout.css'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Layout() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const lang = useLang()
  const t = useContent()
  const { company, nav } = t

  // La langue et le sens de lecture suivent l'adresse (le prérendu les écrit
  // déjà dans le HTML ; ceci couvre les changements de langue sans rechargement).
  useLayoutEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dirOf(lang)
  }, [lang])
  const lenis = useRef<Lenis | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Défilement doux (Lenis) cadencé par GSAP ; au doigt, défilement natif.
  useEffect(() => {
    if (reduced()) return
    let stop = () => {}
    let cancelled = false
    ;(async () => {
      const [{ default: LenisCtor }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'), import('gsap'), import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const l = new LenisCtor({ lerp: 0.09, anchors: true })
      l.on('scroll', ScrollTrigger.update)
      const tick = (t: number) => l.raf(t * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      lenis.current = l
      stop = () => { gsap.ticker.remove(tick); l.destroy(); lenis.current = null }
    })()
    return () => { cancelled = true; stop() }
  }, [])

  useEffect(() => {
    if (!open) return
    lenis.current?.stop()
    document.documentElement.classList.add('menu-open')
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      lenis.current?.start()
      document.documentElement.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <>
      <a className="skip" href="#main">{t.ui.skip}</a>

      <header className={`hdr${stuck ? ' hdr--stuck' : ''}${open ? ' hdr--open' : ''}`}>
        <div className="hdr__in wrap">
          <Link to={homeOf(lang)} className="hdr__brand" aria-label={`${company.name}, ${t.ui.home}`} onClick={() => setOpen(false)}>
            <Logo tone={open ? 'reverse' : 'color'} size={40} draw sub={company.tagline} word={lang === 'ar' ? company.name : undefined} />
          </Link>

          <nav className="hdr__nav" aria-label={t.ui.navLabel}>
            {nav.map((n) => (
              <a key={n.to} href={n.to} className="hdr__link">{n.label}</a>
            ))}
          </nav>

          <LangSwitch label={t.ui.langLabel} className="hdr__langs" />

          <a href="#projet" className="btn btn--primary hdr__cta">
            {t.ui.cta} <Arrow />
          </a>

          <button className="hdr__burger" aria-expanded={open} aria-controls="menu"
                  aria-label={open ? t.ui.menuClose : t.ui.menuOpen}
                  onClick={() => setOpen((v) => !v)}>
            <span /><span />
          </button>
        </div>
      </header>

      {/* Menu mobile : fond indigo, une grande étoile qui tourne en filigrane,
          quatre titres en italique. */}
      <div id="menu" ref={menuRef} className={`menu${open ? ' is-open' : ''}`} inert={!open}>
        <LogoMark tone="white" size={520} className="menu__star" />
        <nav className="menu__nav wrap" aria-label={t.ui.menuLabel}>
          {nav.map((n, i) => (
            <a key={n.to} href={n.to} onClick={() => setOpen(false)}
               style={{ ['--i' as string]: i }} className="menu__link">
              <span className="menu__n">0{i + 1}</span>{n.label}
            </a>
          ))}
          <a href="#projet" onClick={() => setOpen(false)} className="btn btn--sun menu__cta" style={{ ['--i' as string]: 4 }}>
            {t.ui.cta} <Arrow />
          </a>
          <LangSwitch label={t.ui.langLabel} className="menu__langs" onPick={() => setOpen(false)} />
          <div className="menu__contact" style={{ ['--i' as string]: 5 }}>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <span>{company.hours}</span>
          </div>
        </nav>
      </div>

      <main id="main"><Outlet /></main>

      <footer className="ftr">
        <div className="frieze" aria-hidden="true" />
        <div className="wrap ftr__top">
          <p className="ftr__line">{t.footer.line1}<br /><em>{t.footer.line2}</em></p>
          <a href="#projet" className="btn btn--sun">{t.ui.cta} <Arrow /></a>
        </div>

        <div className="wrap ftr__in">
          <div className="ftr__brand">
            <Logo tone="reverse" size={44} sub={company.tagline} word={lang === 'ar' ? company.name : undefined} />
            <p>{t.footer.about}</p>
          </div>

          <div className="ftr__col">
            <h2>{t.footer.colCrafts}</h2>
            {t.crafts.list.map((c) => <a key={c.id} href="#savoir-faire">{c.title}</a>)}
          </div>

          <div className="ftr__col">
            <h2>{t.footer.colStudio}</h2>
            {t.footer.studio.map((l) => <a key={l.to} href={l.to}>{l.label}</a>)}
          </div>

          <div className="ftr__col">
            <h2>{t.footer.colContact}</h2>
            <address>{company.address.map((l) => <span key={l}>{l}</span>)}</address>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <span>{company.hours}</span>
          </div>
        </div>

        <div className="wrap ftr__bar">
          <span>© {new Date().getFullYear()} {company.name} · {t.footer.city}</span>
          <span className="ftr__demo">{t.footer.demo}</span>
        </div>
      </footer>
    </>
  )
}
