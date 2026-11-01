import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, Navigation, Crown, Quote } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { boutiques, getProduct } from '../data/mockData'
import ProductPhoto from '../components/ProductPhoto'
import { LogoMark } from '../components/Logo'
import Page, { SectionHeading, fadeUp } from '../components/Page'

function MapPlaceholder({ active, setActive }) {
  const { t, tr } = useStore()
  return (
    <div className="glass relative aspect-[4/3] overflow-hidden rounded-[2rem] sm:aspect-[16/10]">
      <svg viewBox="0 0 100 62" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="map-grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M5 0 L0 0 0 5" fill="none" stroke="rgb(var(--gold))" strokeOpacity=".07" strokeWidth=".2" />
          </pattern>
          <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2F6B73" stopOpacity=".35" />
            <stop offset="1" stopColor="#1C4A55" stopOpacity=".15" />
          </linearGradient>
        </defs>
        <rect width="100" height="62" fill="url(#sea)" />
        {/* stylised islands */}
        <path d="M18 62 C20 48 30 40 42 44 C50 46 58 40 70 42 C80 44 92 36 100 38 L100 62 Z" fill="rgb(var(--surface))" fillOpacity=".9" />
        <path d="M26 46 C30 38 40 32 50 36 C56 38 54 46 46 48 C38 50 30 50 26 46 Z" fill="rgb(var(--surface))" fillOpacity=".75" />
        <path d="M40 16 C44 10 54 10 56 16 C57 20 50 22 44 21 C40 20 39 18 40 16 Z" fill="rgb(var(--surface))" fillOpacity=".7" />
        <path d="M54 26 C58 22 64 23 64 27 C63 30 58 30 55 29 Z" fill="rgb(var(--surface))" fillOpacity=".7" />
        <path d="M76 18 C82 14 90 16 90 22 C89 26 82 27 78 25 C75 23 75 20 76 18 Z" fill="rgb(var(--surface))" fillOpacity=".7" />
        <rect width="100" height="62" fill="url(#map-grid)" />
        {/* roads */}
        <path d="M10 56 Q40 50 60 40 T98 28" fill="none" stroke="rgb(var(--gold))" strokeOpacity=".35" strokeWidth=".35" strokeDasharray="1 1" />
        <path d="M34 50 Q46 30 48 18" fill="none" stroke="rgb(var(--gold))" strokeOpacity=".25" strokeWidth=".3" strokeDasharray="1 1" />
      </svg>
      {boutiques.map((b) => (
        <button key={b.id} onClick={() => setActive(b.id)} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${b.pos.x}%`, top: `${b.pos.y + 14}%` }} aria-label={tr(b.name)}>
          <motion.span animate={{ y: active === b.id ? [0, -6, 0] : 0 }} transition={{ repeat: active === b.id ? Infinity : 0, duration: 1.4 }} className="relative flex flex-col items-center">
            <span className={`relative grid h-9 w-9 place-items-center rounded-full rounded-bl-none -rotate-45 shadow-glow transition ${active === b.id ? 'bg-gold-gradient scale-110' : 'bg-cocoa-800 ring-1 ring-gold/60'}`}>
              <MapPin size={16} className={`rotate-45 ${active === b.id ? 'text-cocoa-950' : 'text-gold'}`} />
            </span>
            {active === b.id && <span className="glass-strong mt-2 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium">{tr(b.name)}</span>}
          </motion.span>
          {active === b.id && <span className="absolute left-1/2 top-full h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-gold/30" />}
        </button>
      ))}
      <span className="glass-strong absolute bottom-3 start-3 rounded-full px-3 py-1.5 text-[11px] text-muted">{t.bout.mapNote}</span>
    </div>
  )
}

export default function Boutiques() {
  const { t, tr } = useStore()
  const [active, setActive] = useState(boutiques[0].id)

  return (
    <Page>
      <SectionHeading eyebrow={t.bout.eyebrow} title={t.bout.title} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <MapPlaceholder active={active} setActive={setActive} />
        <div className="space-y-3">
          {boutiques.map((b, i) => (
            <motion.button key={b.id} variants={fadeUp} initial="hidden" animate="show" custom={i} onClick={() => setActive(b.id)} className={`glass block w-full rounded-3xl p-5 text-start transition ${active === b.id ? 'ring-1 ring-gold/70 shadow-glow' : 'hover:ring-1 hover:ring-gold/30'}`}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl">{tr(b.name)}</h3>
                {b.flagship && <span className="flex shrink-0 items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-semibold text-gold"><Crown size={12} /> {t.bout.flagship}</span>}
              </div>
              <p className="mt-2 flex items-start gap-2 text-sm text-muted"><MapPin size={15} className="mt-0.5 shrink-0 text-gold" /> {tr(b.address)}</p>
              <p className="mt-1.5 flex items-start gap-2 text-sm text-muted"><Clock size={15} className="mt-0.5 shrink-0 text-gold" /> {tr(b.hours)}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted" dir="ltr"><Phone size={14} className="text-gold" /> {b.phone}</span>
                <span className="flex items-center gap-1 text-sm font-semibold text-gold"><Navigation size={14} /> {t.bout.directions}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <section className="mt-24 grid items-center gap-10 lg:grid-cols-2">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 rounded-full border border-gold/20" />
          <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 80, ease: 'linear' }} className="absolute inset-6 rounded-full border border-dashed border-gold/25" />
          <div className="absolute inset-14 rounded-full bg-gold/10 blur-2xl" />
          <div className="absolute inset-0 grid place-items-center">
            <LogoMark className="h-40 w-40 opacity-90" />
          </div>
          {['oud-truffle', 'saffron-pearl', 'rose-taif', 'medjool-almond'].map((id, i) => (
            <motion.div key={id} className="absolute w-20 sm:w-24" style={{ top: `${[0, 38, 76, 38][i]}%`, left: `${[39, 78, 39, 0][i]}%` }} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 + i, ease: 'easeInOut' }}>
              <ProductPhoto product={getProduct(id)} variant="medallion" className="w-full" />
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="eyebrow mb-3">{t.bout.storyEyebrow}</p>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">{t.bout.storyTitle}</h2>
          <p className="mt-6 leading-relaxed text-muted">{t.bout.story1}</p>
          <p className="mt-4 leading-relaxed text-muted">{t.bout.story2}</p>
          <figure className="glass mt-8 rounded-3xl p-6">
            <Quote size={22} className="text-gold" />
            <blockquote className="mt-2 font-display text-xl italic leading-relaxed">{t.bout.quote}</blockquote>
            <figcaption className="mt-3 text-sm text-gold">{t.bout.founder}</figcaption>
          </figure>
        </motion.div>
      </section>
    </Page>
  )
}
