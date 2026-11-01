import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Flag, Moon, Sparkles, Heart, Cake, Briefcase, ArrowRight, CalendarDays } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { occasions, getProduct } from '../data/mockData'
import ProductPhoto from '../components/ProductPhoto'
import Countdown from '../components/Countdown'
import Page, { SectionHeading, fadeUp } from '../components/Page'

const icons = { flag: Flag, moon: Moon, sparkles: Sparkles, heart: Heart, cake: Cake, briefcase: Briefcase }

export default function Occasions() {
  const { t, tr, lang } = useStore()
  const now = Date.now()
  const next = occasions.filter((o) => o.date && new Date(o.date).getTime() > now).sort((a, b) => new Date(a.date) - new Date(b.date))[0]
  const fmt = (d) => new Date(d).toLocaleDateString(lang === 'ar' ? 'ar-AE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <Page>
      <SectionHeading eyebrow={t.occ.eyebrow} title={t.occ.title} />

      {next && (
        <motion.section variants={fadeUp} initial="hidden" animate="show" className="relative mb-12 overflow-hidden rounded-[2.5rem] border border-gold/25 p-6 sm:p-10">
          <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${next.palette[0]}55, transparent 50%, ${next.palette[1]}44)` }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgb(var(--gold)/0.25),transparent_50%)]" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="eyebrow mb-3">{t.occ.next}</p>
              <h2 className="font-display text-4xl sm:text-5xl">{tr(next.name)}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted"><CalendarDays size={15} className="text-gold" /> {fmt(next.date)}</p>
              <p className="mt-4 max-w-lg text-muted">{tr(next.blurb)}</p>
              <div className="mt-6"><Countdown date={next.date} /></div>
            </div>
            <div className="relative hidden h-64 md:block">
              {next.products.slice(0, 3).map((id, i) => (
                <motion.div key={id} className="absolute w-40" style={{ left: `${i * 28}%`, top: i === 1 ? 0 : '25%', zIndex: i === 1 ? 2 : 1 }} animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 5 + i, ease: 'easeInOut' }}>
                  <ProductPhoto product={getProduct(id)} variant="medallion" className="w-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {occasions.map((o, i) => {
          const Icon = icons[o.icon]
          return (
            <motion.article key={o.id} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} whileHover={{ y: -6 }} className="glass group relative flex flex-col overflow-hidden rounded-[2rem] transition-shadow hover:shadow-glow">
              <div className="relative h-44 overflow-hidden" style={{ background: `linear-gradient(135deg, ${o.palette[0]}, ${o.palette[2]}66 120%)` }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
                <div className="absolute inset-0 flex items-center justify-center gap-0 pt-4">
                  {o.products.slice(0, 3).map((id, j) => (
                    <ProductPhoto key={id} product={getProduct(id)} variant="medallion" className={`-mx-2 transition-transform duration-700 ${j === 1 ? 'z-10 h-28 w-28 group-hover:-translate-y-3' : 'h-20 w-20 group-hover:-translate-y-1'}`} />
                  ))}
                </div>
                <span className="absolute start-4 top-4 grid h-11 w-11 place-items-center rounded-2xl bg-black/25 text-[#F3D58A] backdrop-blur"><Icon size={20} /></span>
                <span className="absolute end-4 top-4 rounded-full bg-black/30 px-3 py-1 text-xs text-[#F5E9D7] backdrop-blur">{o.date ? fmt(o.date) : t.occ.yearRound}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-2xl">{tr(o.name)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tr(o.blurb)}</p>
                <p className="mt-4 text-xs text-muted">{o.products.length} {t.occ.curated}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {o.products.map((id) => (
                    <Link key={id} to={`/product/${id}`} className="rounded-full border border-gold/15 px-2.5 py-1 text-[11px] text-muted transition hover:border-gold/60 hover:text-gold">{tr(getProduct(id).name)}</Link>
                  ))}
                </div>
                <Link to={`/product/${o.products[0]}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                  {t.occ.shop} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </div>
            </motion.article>
          )
        })}
      </div>
    </Page>
  )
}
