import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Truck, ShieldCheck, Leaf, Gift, Star, ChevronDown } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { products, stats, seasonal, chocolateOfTheDay, getProduct } from '../data/mockData'
import ProductPhoto from '../components/ProductPhoto'
import AnimatedCounter from '../components/AnimatedCounter'
import ProductCard from '../components/ProductCard'
import Page, { SectionHeading, fadeUp } from '../components/Page'

const heroPieces = [
  { id: 'saffron-pearl', cls: 'start-[3%] top-[16%] w-24 sm:w-32 lg:w-40', speed: -120, rot: -12, delay: 0 },
  { id: 'rose-taif', cls: 'end-[4%] top-[18%] w-20 sm:w-28 lg:w-36', speed: -200, rot: 14, delay: 0.6 },
  { id: 'pistachio-praline-gold', cls: 'end-[8%] bottom-[14%] w-24 sm:w-28 lg:w-36', speed: -80, rot: -8, delay: 1.1 },
  { id: 'cardamom-qahwa', cls: 'start-[9%] bottom-[10%] w-20 sm:w-28 lg:w-32', speed: -260, rot: 10, delay: 0.3 },
]

function Hero() {
  const { t } = useStore()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const dunesY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const ys = [
    useTransform(scrollYProgress, [0, 1], [0, heroPieces[0].speed]),
    useTransform(scrollYProgress, [0, 1], [0, heroPieces[1].speed]),
    useTransform(scrollYProgress, [0, 1], [0, heroPieces[2].speed]),
    useTransform(scrollYProgress, [0, 1], [0, heroPieces[3].speed]),
  ]

  return (
    <section ref={ref} className="relative -mt-16 flex min-h-[100svh] items-center overflow-hidden pt-16 md:-mt-20 md:pt-20">
      {/* floating chocolates */}
      <div className="pointer-events-none absolute inset-0 opacity-50 sm:opacity-90">
        {heroPieces.map((p, i) => (
          <motion.div key={p.id} style={{ y: ys[i] }} className={`absolute ${p.cls}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: p.rot * 2 }}
              animate={{ opacity: 1, scale: 1, rotate: p.rot, y: [0, -14, 0] }}
              transition={{ opacity: { duration: 1, delay: 0.4 + p.delay * 0.4 }, scale: { duration: 1.2, delay: 0.4 + p.delay * 0.4 }, rotate: { duration: 1.2 }, y: { duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: p.delay } }}
            >
              <ProductPhoto product={getProduct(p.id)} variant="medallion" className="w-full" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* gold dunes */}
      <motion.svg style={{ y: dunesY }} viewBox="0 0 1440 320" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full sm:h-56" aria-hidden="true">
        <defs>
          <linearGradient id="dune-g" x1="0" x2="1">
            <stop offset="0" stopColor="#D4A24C" stopOpacity="0" />
            <stop offset=".5" stopColor="#E9C27A" stopOpacity=".7" />
            <stop offset="1" stopColor="#C98B7A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dune-f" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgb(var(--gold))" stopOpacity=".1" />
            <stop offset="1" stopColor="rgb(var(--bg))" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d="M0 220 C240 140 420 260 720 190 C1000 124 1200 230 1440 170 L1440 320 L0 320 Z" fill="url(#dune-f)" />
        <path d="M0 220 C240 140 420 260 720 190 C1000 124 1200 230 1440 170" fill="none" stroke="url(#dune-g)" strokeWidth="2" />
        <path d="M0 270 C300 210 520 300 820 250 C1080 210 1260 280 1440 240" fill="none" stroke="url(#dune-g)" strokeWidth="1.2" opacity=".6" />
      </motion.svg>

      <motion.div style={{ y: titleY, opacity: fade }} className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="eyebrow mb-6 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-gold/25 bg-gold/5 px-4 py-2 !text-[10px] !tracking-[0.18em] backdrop-blur sm:!text-xs sm:!tracking-[0.28em]">
          <Sparkles size={14} /> {t.hero.eyebrow}
        </motion.p>
        <h1 className="font-display text-[3.2rem] font-medium leading-[0.95] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="block">
            {t.hero.title1}
          </motion.span>
          <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="text-gold-gradient block pb-3 italic">
            {t.hero.title2}
          </motion.span>
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {t.hero.sub}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/shop" className="btn-gold melt w-full !px-8 !py-4 text-base sm:w-auto">
            {t.hero.cta} <ArrowRight size={18} className="rtl:rotate-180" />
          </Link>
          <Link to="/build" className="btn-ghost w-full !px-7 !py-4 sm:w-auto">
            <Gift size={18} className="text-gold" /> {t.hero.cta2}
          </Link>
        </motion.div>
      </motion.div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.4 }} className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-muted sm:flex">
        {t.hero.scroll} <ChevronDown size={16} className="text-gold" />
      </motion.div>
    </section>
  )
}

function Stats() {
  const { tr } = useStore()
  return (
    <section className="relative z-10 mx-auto -mt-6 max-w-6xl px-4 sm:px-6">
      <div className="glass grid grid-cols-1 divide-y divide-gold/10 rounded-[2rem] sm:grid-cols-3 sm:divide-x sm:divide-y-0 rtl:sm:divide-x-reverse">
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="px-6 py-7 text-center sm:py-9">
            <p className="text-gold-gradient font-display text-4xl font-semibold sm:text-5xl">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{tr(s)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function SeasonalBanner() {
  const { t, tr } = useStore()
  const pieces = ['camel-milk-caramel', 'medjool-almond', 'sea-salt-dune']
  return (
    <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="relative mt-24 overflow-hidden rounded-[2.5rem] border border-gold/20">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#1F3D2F_0%,#2A1A11_45%,#4A1C1C_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(243,213,138,0.25),transparent_50%)]" />
      <div className="absolute -end-20 -top-20 h-72 w-72 rounded-full border border-gold/20" />
      <div className="absolute -end-10 -top-10 h-72 w-72 rounded-full border border-gold/10" />
      <div className="relative grid items-center gap-8 p-8 sm:p-12 md:grid-cols-2 lg:p-16">
        <div className="text-cream">
          <p className="eyebrow mb-4 !text-[#F3D58A]">{t.seasonal.eyebrow}</p>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">{tr(seasonal.title)}</h2>
          <p className="mt-4 max-w-md text-cream/75">{tr(seasonal.subtitle)}</p>
          <div className="mt-5 flex gap-1.5">
            {['#1F6B52', '#F5E9D7', '#111', '#C0392B'].map((c) => <span key={c} className="h-1.5 w-10 rounded-full" style={{ background: c }} />)}
          </div>
          <Link to="/occasions" className="btn-gold melt mt-8">{t.seasonal.cta} <ArrowRight size={16} className="rtl:rotate-180" /></Link>
        </div>
        <div className="relative flex h-64 items-center justify-center sm:h-80">
          {pieces.map((id, i) => (
            <motion.div key={id} className="absolute w-36 sm:w-48" style={{ x: (i - 1) * 110, zIndex: i === 1 ? 2 : 1 }} animate={{ y: [0, i === 1 ? -16 : -8, 0] }} transition={{ repeat: Infinity, duration: 5 + i, ease: 'easeInOut' }}>
              <ProductPhoto product={getProduct(id)} variant="medallion" className={`w-full ${i === 1 ? 'scale-125' : 'opacity-90'}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function ChocolateOfTheDay() {
  const { t, tr, money } = useStore()
  const dayIndex = Math.floor(Date.now() / 86400000) % chocolateOfTheDay.length
  const cotd = chocolateOfTheDay[dayIndex]
  const p = getProduct(cotd.productId)
  return (
    <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="glass mt-24 grid items-center gap-6 overflow-hidden rounded-[2.5rem] p-6 sm:p-10 md:grid-cols-[1fr_1.3fr]">
      <div className="relative mx-auto aspect-square w-full max-w-xs">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: 'linear' }} className="absolute inset-4 rounded-full border border-dashed border-gold/30" />
        <div className="absolute inset-10 rounded-full bg-gold/10 blur-2xl" />
        <motion.div animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} className="absolute inset-10">
          <ProductPhoto product={p} alt={tr(p.name)} variant="medallion" className="relative w-full" />
        </motion.div>
      </div>
      <div>
        <p className="eyebrow mb-3 flex items-center gap-2"><Star size={14} className="fill-gold" /> {t.cotd.eyebrow}</p>
        <h3 className="font-display text-3xl sm:text-4xl">{tr(p.name)}</h3>
        <p className="mt-2 font-semibold text-gold">{money(p.price)}</p>
        <div className="relative mt-6 rounded-2xl border-s-2 border-gold/60 bg-gold/5 p-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">{t.cotd.note}</p>
          <p className="font-display text-lg italic leading-relaxed">“{tr(cotd.note)}”</p>
        </div>
        <Link to={`/product/${p.id}`} className="btn-ghost mt-6">{t.cotd.view} <ArrowRight size={16} className="rtl:rotate-180" /></Link>
      </div>
    </motion.section>
  )
}

function Promises() {
  const { t } = useStore()
  const icons = [Leaf, ShieldCheck, Truck]
  return (
    <section className="mt-24 grid gap-4 sm:grid-cols-3">
      {t.promise.map((p, i) => {
        const Icon = icons[i]
        return (
          <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="glass flex items-start gap-4 rounded-3xl p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold/10 text-gold"><Icon size={22} /></span>
            <div>
              <h4 className="font-display text-xl">{p.t}</h4>
              <p className="mt-1 text-sm text-muted">{p.d}</p>
            </div>
          </motion.div>
        )
      })}
    </section>
  )
}

export default function Home() {
  const { t } = useStore()
  const featured = products.filter((p) => p.tag === 'bestseller' || p.tag === 'signature').slice(0, 4)
  return (
    <>
      <Hero />
      <Stats />
      <Page className="!pt-0">
        <SeasonalBanner />
        <section className="mt-24">
          <SectionHeading eyebrow={t.featured.eyebrow} title={t.featured.title}>
            <Link to="/shop" className="btn-ghost self-start sm:self-auto">{t.featured.all} <ArrowRight size={16} className="rtl:rotate-180" /></Link>
          </SectionHeading>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
        <ChocolateOfTheDay />
        <Promises />
      </Page>
    </>
  )
}
