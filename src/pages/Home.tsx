import Seo from '../components/Seo'
import Reveal, { Arrow } from '../components/Reveal'
import Figures from '../components/Figures'
import { Arcade, Rosette, Workshop } from '../components/Zellige'
import { Tick } from '../components/Icons'
import { company, figures, partners, quiz, seo, testimonials } from '../data/site'
import './Home.css'

export default function Home() {

  return (
    <>
      <Seo {...seo.home} />

      {/* ---------------------------------------------------------- hero
          Une rosace de zellige qui s'assemble : chaque pièce à sa place.
          C'est exactement ce qu'est une maison bien restaurée. */}
      <section className="zhero">
        <div className="wrap zhero__in">
          <div className="zhero__text">
            <p className="zhero__proof">
              <Tick size={16} draw delay={600} />
              {figures[0].value} riads restaurés depuis 2012
            </p>
            <h1 className="zhero__h">
              <span className="ln"><span>Chaque pièce</span></span>
              <span className="ln"><span><em>à sa place.</em></span></span>
            </h1>
            <p className="zhero__lead">
              Riads, zellige, tadelakt, bois sculpté&nbsp;: {company.name} remet
              les maisons de la médina dans leur état d’origine, et les rend
              vivables, du premier relevé jusqu’à la remise des clés.
            </p>
            <div className="zhero__cta">
              <a href="#projet" className="btn btn--primary">Parler de votre projet <Arrow /></a>
              <a href="#savoir-faire" className="link">Nos savoir-faire <Arrow /></a>
            </div>
            <p className="zhero__note">Visite et premier relevé offerts</p>
          </div>
          <div className="zhero__art">
            <Rosette />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ confiance */}
      <section className="zlogos" aria-label="Ils nous ont confié leur maison">
        <div className="wrap">
          <p className="zlogos__h">Ils nous ont confié leur maison</p>
          <ul className="zlogos__row zlogos__row--names">
            {partners.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------- savoir-faire */}
      <section className="sec zsvc" id="savoir-faire">
        <div className="wrap">
          <Reveal className="head zsvc__head">
            <span className="eyebrow">Nos savoir-faire</span>
            <h2 className="t-h2">Cinq métiers d’art, <em>un seul</em> atelier.</h2>
          </Reveal>
          <Arcade />
          <p className="zsvc__diag">
            Une maison, un projet, une question&nbsp;?{' '}
            <a href="#projet" className="link">Parlons-en <Arrow /></a>
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------- méthode */}
      <section className="sec sec--soft zmethod" id="methode">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow" style={{ ['--dot' as string]: 'var(--indigo)' }}>Notre méthode</span>
            <h2 className="t-h2">Quatre étapes, <em>tracées</em> avant d’être posées.</h2>
            <p className="t-lead">Comme un maître zellijeur, on relève, on dessine, on pose, puis on vérifie. La même méthode pour un patio ou pour une maison entière.</p>
          </Reveal>
          <Workshop />
        </div>
      </section>

      {/* ----------------------------------------------------------- projet */}
      <section className="zdiag" id="projet">
        <div className="wrap zdiag__in">
          <Reveal className="zdiag__text">
            <h2 className="zdiag__h">Votre <em>maison&nbsp;?</em></h2>
            <p className="t-lead">Dites-nous ce que vous avez en tête&nbsp;: un maâlem vient voir la maison et fait le premier relevé, sans engagement.</p>
          </Reveal>
          <Reveal delay={80} className="zdiag__card">
            <div className="zdiag__bar" aria-hidden="true"><span /></div>
            <p className="zdiag__step">Question 1 sur 3</p>
            <p className="zdiag__q">{quiz.title}</p>
            <div className="zdiag__chips">
              {quiz.choices.map((c) => <a key={c} href="#contact" className="chip">{c}</a>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- avis */}
      <section className="sec zproof" id="avis">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow" style={{ ['--dot' as string]: 'var(--ochre)' }}>Ils nous ont confié leur maison</span>
            <h2 className="t-h2">Des maisons rendues, <em>une par une.</em></h2>
          </Reveal>
          <Reveal><Figures /></Reveal>
          <ul className="zquotes">
            {testimonials.map((t, i) => (
              <Reveal as="li" key={t.name} delay={i * 80} className="zquote">
                <blockquote>« {t.quote} »</blockquote>
                <p className="zquote__who"><em>{t.name}</em><span>{t.role}</span></p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------------- fin */}
      <section className="sec zclose" id="contact">
        <div className="wrap">
          <Reveal className="close">
            <div className="close__who" aria-hidden="true">Q</div>
            <div className="close__text">
              <h2 className="t-h2">Venez voir <em>l’atelier.</em></h2>
              <p className="t-lead">
                Écrivez-nous&nbsp;: nous vous répondons sous 48&nbsp;heures et
                fixons une visite, à l’atelier ou chez vous.
              </p>
            </div>
            <div className="close__cta">
              <a href={`mailto:${company.email}`} className="btn btn--primary">Écrire un message <Arrow /></a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
