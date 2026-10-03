import Seo from '../components/Seo'
import Reveal, { Arrow } from '../components/Reveal'
import Figures from '../components/Figures'
import { Arcade, Compare, Planner, Rosette, Workshop } from '../components/Zellige'
import { Tick } from '../components/Icons'
import { useContent } from '../content'
import { LOCALES, useLang } from '../i18n'
import './Home.css'

export default function Home() {
  const t = useContent()
  const lang = useLang()
  return (
    <>
      <Seo {...t.seo.home} />

      {/* ---------------------------------------------------------- hero
          Une rosace de zellige qui s'assemble : chaque pièce à sa place.
          C'est exactement ce qu'est une maison bien restaurée. */}
      <section className="zhero">
        <div className="wrap zhero__in">
          <div className="zhero__text">
            <p className="zhero__proof">
              <Tick size={16} draw delay={600} />
              {t.hero.proof.replace('{n}', t.reviews.figures[0].value.toLocaleString(LOCALES[lang]))}
            </p>
            <h1 className="zhero__h">
              <span className="ln"><span>{t.hero.line1}</span></span>
              <span className="ln"><span><em>{t.hero.line2}</em></span></span>
            </h1>
            <p className="zhero__lead">{t.hero.lead}</p>
            <div className="zhero__cta">
              <a href="#projet" className="btn btn--primary">{t.hero.cta} <Arrow /></a>
              <a href="#savoir-faire" className="link">{t.hero.alt} <Arrow /></a>
            </div>
            <p className="zhero__note">{t.hero.note}</p>
          </div>
          <div className="zhero__art">
            <Rosette />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ confiance */}
      <section className="zlogos" aria-label={t.partnersTitle}>
        <div className="wrap">
          <p className="zlogos__h">{t.partnersTitle}</p>
          <ul className="zlogos__row zlogos__row--names">
            {t.partners.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------- savoir-faire */}
      <section className="sec zsvc" id="savoir-faire">
        <div className="wrap">
          <Reveal className="head zsvc__head">
            <span className="eyebrow">{t.crafts.eyebrow}</span>
            <h2 className="t-h2">{t.crafts.title[0]}<em>{t.crafts.title[1]}</em>{t.crafts.title[2]}</h2>
          </Reveal>
          <Arcade />
          <p className="zsvc__diag">
            {t.crafts.more}{' '}
            <a href="#projet" className="link">{t.crafts.moreLink} <Arrow /></a>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------ avant · après */}
      <section className="sec zrestore">
        <div className="wrap zrestore__in">
          <Reveal className="zrestore__cmp">
            <Compare />
          </Reveal>
          <Reveal delay={80} className="zrestore__text">
            <span className="eyebrow" style={{ ['--dot' as string]: 'var(--terra)' }}>{t.restore.eyebrow}</span>
            <h2 className="t-h2">{t.restore.title[0]}<em>{t.restore.title[1]}</em>{t.restore.title[2]}</h2>
            <p className="t-lead">{t.restore.lead}</p>
            <p className="zrestore__ledger">{t.restore.ledger}</p>
            <Figures />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- méthode */}
      <section className="sec sec--soft zmethod" id="methode">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow" style={{ ['--dot' as string]: 'var(--indigo)' }}>{t.method.eyebrow}</span>
            <h2 className="t-h2">{t.method.title[0]}<em>{t.method.title[1]}</em>{t.method.title[2]}</h2>
            <p className="t-lead">{t.method.lead}</p>
          </Reveal>
          <Workshop />
        </div>
      </section>

      {/* ----------------------------------------------------------- projet */}
      <section className="zdiag" id="projet">
        <div className="wrap zdiag__in">
          <Reveal className="zdiag__text">
            <h2 className="zdiag__h">{t.planner.title[0]}<em>{t.planner.title[1]}</em></h2>
            <p className="t-lead">{t.planner.lead}</p>
          </Reveal>
          <Reveal delay={80} className="zdiag__card"><Planner /></Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- avis */}
      <section className="sec zproof" id="avis">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow" style={{ ['--dot' as string]: 'var(--ochre)' }}>{t.reviews.eyebrow}</span>
            <h2 className="t-h2">{t.reviews.title[0]}<em>{t.reviews.title[1]}</em></h2>
          </Reveal>
          <ul className="zquotes">
            {t.reviews.list.map((r, i) => (
              <Reveal as="li" key={r.name} delay={i * 80} className="zquote">
                <blockquote>{lang === 'fr' ? `« ${r.quote} »` : lang === 'ar' ? `«${r.quote}»` : `“${r.quote}”`}</blockquote>
                <p className="zquote__who"><em>{r.name}</em><span>{r.role}</span></p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------------- fin */}
      <section className="sec zclose" id="contact">
        <div className="wrap">
          <Reveal className="close">
            <div className="close__who" aria-hidden="true">{t.close.who}</div>
            <div className="close__text">
              <h2 className="t-h2">{t.close.title[0]}<em>{t.close.title[1]}</em></h2>
              <p className="t-lead">{t.close.lead}</p>
            </div>
            <div className="close__cta">
              <a href={`mailto:${t.company.email}`} className="btn btn--primary">{t.close.cta} <Arrow /></a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
