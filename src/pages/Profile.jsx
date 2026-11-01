import { AnimatePresence, motion } from 'framer-motion'
import { Crown, Heart, MapPin, Package, RotateCcw, Sparkles, Gift, Home as HomeIcon, Briefcase } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { getProduct, pastOrders, priceFor, products, user } from '../data/mockData'
import ProgressRing from '../components/ProgressRing'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'
import ProductPhoto from '../components/ProductPhoto'
import { BoxThumb } from '../components/CartLine'
import Page, { fadeUp } from '../components/Page'

export default function Profile() {
  const { t, tr, lang, money, orders, wishlist, addToCart, addBoxToCart, toast } = useStore()
  const tiers = user.tiers
  const tierIdx = tiers.reduce((idx, tier, i) => (user.points >= tier.min ? i : idx), 0)
  const tier = tiers[tierIdx]
  const nextTier = tiers[tierIdx + 1]
  const progress = nextTier ? (user.points - tier.min) / (nextTier.min - tier.min) : 1
  const favs = products.filter((p) => wishlist.includes(p.id))
  const allOrders = [...orders, ...pastOrders]
  const initials = user.name.split(' ').map((w) => w[0]).slice(0, 2).join('')

  const orderTotal = (o) => o.totals?.total ?? o.items.reduce((s, i) => s + (i.price ?? priceFor(getProduct(i.productId), i.pieces)) * i.qty, 0)

  const reorder = (o) => {
    o.items.forEach((i) => (i.type === 'box' ? addBoxToCart({ ...i, key: undefined }) : addToCart(i.productId, i.pieces, i.qty, { silent: true })))
    toast(t.prof.reordered)
  }

  return (
    <Page>
      {/* Header card */}
      <motion.section variants={fadeUp} initial="hidden" animate="show" className="glass relative overflow-hidden rounded-[2.5rem] p-6 sm:p-10">
        <div className="absolute -end-24 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-5">
            <div className="bg-gold-gradient melt relative grid h-20 w-20 shrink-0 place-items-center rounded-full p-[3px] sm:h-24 sm:w-24">
              <div className="grid h-full w-full place-items-center rounded-full bg-cocoa-900 font-display text-2xl text-[#F3D58A] sm:text-3xl">{initials}</div>
            </div>
            <div>
              <p className="eyebrow mb-1">{t.prof.eyebrow}</p>
              <h1 className="font-display text-3xl sm:text-4xl">{user.name}</h1>
              <p className="mt-1 text-sm text-muted">{user.email} · {t.prof.member} {user.memberSince}</p>
              <span className="bg-gold-gradient mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-cocoa-950">
                <Crown size={13} /> {lang === 'ar' ? `${t.prof.tier} ${tr(tier)}` : `${tr(tier)} ${t.prof.tier}`}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row md:flex-col lg:flex-row">
            <ProgressRing progress={progress} size={170}>
              <div>
                <p className="text-gold-gradient font-display text-4xl font-semibold">{user.points.toLocaleString('en-US')}</p>
                <p className="text-xs uppercase tracking-widest text-muted">{t.prof.points}</p>
              </div>
            </ProgressRing>
            <div className="text-center sm:text-start">
              <div className="mb-3 flex gap-1.5">
                {tiers.map((x, i) => (
                  <span key={x.id} className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${i <= tierIdx ? 'bg-gold/20 text-gold' : 'border border-gold/15 text-muted'}`}>{tr(x)}</span>
                ))}
              </div>
              <p className="text-sm text-muted">
                {nextTier ? <><span className="font-semibold text-ink">{(nextTier.min - user.points).toLocaleString('en-US')}</span> {t.prof.toNext} <span className="text-gold">{tr(nextTier)}</span></> : t.prof.maxTier}
              </p>
              <ul className="mt-3 space-y-1 text-xs text-muted">
                {t.prof.perkList.map((p) => <li key={p} className="flex items-center gap-1.5"><Sparkles size={11} className="text-gold" /> {p}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Orders */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-display text-2xl"><Package size={20} className="text-gold" /> {t.prof.orders}</h2>
          <div className="space-y-3">
            {allOrders.map((o, idx) => (
              <motion.div key={o.id} variants={fadeUp} initial="hidden" animate="show" custom={idx} className="glass rounded-3xl p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold" dir="ltr">{o.id}</p>
                    <p className="text-xs text-muted">{new Date(o.date).toLocaleDateString(lang === 'ar' ? 'ar-AE' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${o.status === 'processing' ? 'bg-gold/15 text-gold' : 'bg-emerald-500/15 text-emerald-400'}`}>{t.prof[o.status]}</span>
                </div>
                <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
                  {o.items.map((i, k) =>
                    i.type === 'box' ? (
                      <BoxThumb key={k} item={i} className="h-14 w-14" />
                    ) : (
                      <div key={k} className="relative h-14 w-14 shrink-0">
                        <ProductPhoto product={getProduct(i.productId)} className="h-full w-full rounded-xl" />
                        {i.qty > 1 && <span className="absolute -end-1 -top-1 rounded-full bg-gold px-1.5 text-[10px] font-bold text-cocoa-950">×{i.qty}</span>}
                      </div>
                    )
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-gold">{money(Math.round(orderTotal(o) * 100) / 100)}</span>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={() => reorder(o)} className="btn-ghost !px-4 !py-2 text-sm"><RotateCcw size={14} /> {t.prof.reorder}</motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Addresses */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-display text-2xl"><MapPin size={20} className="text-gold" /> {t.prof.addresses}</h2>
          <div className="space-y-3">
            {user.addresses.map((a, i) => {
              const Icon = i === 0 ? HomeIcon : Briefcase
              return (
                <div key={a.id} className="glass flex items-start gap-3 rounded-3xl p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gold/10 text-gold"><Icon size={18} /></span>
                  <div>
                    <p className="font-semibold">{tr(a.label)}</p>
                    <p className="text-sm text-muted">{tr(a.line)}</p>
                  </div>
                </div>
              )
            })}
            <div className="glass flex items-center gap-3 rounded-3xl p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-rose/10 text-rose"><Gift size={18} /></span>
              <p className="text-sm text-muted">{t.prof.perkList[1]}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Favorites */}
      <section className="mt-12">
        <h2 className="mb-4 flex items-center gap-2 font-display text-2xl"><Heart size={20} className="fill-rose text-rose" /> {t.prof.favorites}</h2>
        {favs.length === 0 ? (
          <EmptyState icon={Heart} title={t.prof.noFav} sub={t.prof.noFavSub} cta={t.cart.browse} />
        ) : (
          <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {favs.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </Page>
  )
}
