import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BadgeCheck, CalendarCheck, Minus, Plus, ShoppingBag, Sparkles, AlertCircle, Truck } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { allergenLabels, flavors, getProduct, priceFor, products, sizes, tagLabels } from '../data/mockData'
import ProductPhoto from '../components/ProductPhoto'
import WishButton from '../components/WishButton'
import Rating from '../components/Rating'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'
import Page from '../components/Page'

export default function ProductDetail() {
  const { id } = useParams()
  const { t, tr, money, addToCart } = useStore()
  const product = getProduct(id)
  const [pieces, setPieces] = useState(9)
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <Page className="grid min-h-[60vh] place-items-center">
        <EmptyState icon={AlertCircle} title={t.product.notFound} sub={t.product.notFoundSub} cta={t.product.back} to="/shop" />
      </Page>
    )
  }

  const price = priceFor(product, pieces)
  const related = products.filter((p) => p.id !== product.id && (p.category === product.category || p.flavors.some((f) => product.flavors.includes(f)))).slice(0, 4)

  return (
    <Page>
      <Link to="/shop" className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-gold">
        <ArrowLeft size={16} className="rtl:rotate-180" /> {t.product.back}
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Visual */}
        <div className="glass relative aspect-square overflow-hidden rounded-[2.5rem] lg:sticky lg:top-28 lg:self-start">
          <motion.div initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }} className="h-full w-full">
              <ProductPhoto product={product} alt={tr(product.name)} className="h-full w-full" />
            </motion.div>
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa-950/75 via-transparent to-cocoa-950/30" />
          <WishButton id={product.id} className="absolute end-5 top-5 !h-12 !w-12" />
          {product.tag && <span className="absolute start-5 top-5 rounded-full bg-cocoa-950/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold backdrop-blur">{tr(tagLabels[product.tag])}</span>}
          <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2">
            <span className="glass-strong inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-emerald-400"><BadgeCheck size={15} /> {t.product.halal}</span>
            <span className="glass-strong inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-gold"><CalendarCheck size={15} /> {t.product.fresh}</span>
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex flex-wrap gap-2">
            {product.flavors.map((f) => {
              const fl = flavors.find((x) => x.id === f)
              return (
                <span key={f} className="chip !cursor-default !py-1 text-xs">
                  <span className="h-2 w-2 rounded-full" style={{ background: fl.color }} /> {tr(fl)}
                </span>
              )
            })}
          </div>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{tr(product.name)}</h1>
          <div className="mt-3"><Rating value={product.rating} reviews={product.reviews} label={t.product.reviews} size={16} /></div>
          <p className="mt-6 text-lg leading-relaxed text-muted">{tr(product.description)}</p>

          <div className="gold-line my-8" />

          <p className="mb-3 text-sm font-semibold">{t.product.size}</p>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {sizes.map((s) => {
              const on = s.pieces === pieces
              return (
                <motion.button key={s.pieces} whileTap={{ scale: 0.95 }} onClick={() => setPieces(s.pieces)} className={`relative overflow-hidden rounded-2xl border px-2 py-4 text-center transition ${on ? 'border-gold bg-gold/10 shadow-glow' : 'border-gold/15 hover:border-gold/50'}`}>
                  {on && <motion.span layoutId="size-pill" className="absolute inset-0 -z-10 bg-gold/5" />}
                  <span className={`block font-display text-2xl ${on ? 'text-gold' : ''}`}>{s.pieces}</span>
                  <span className="block text-[11px] text-muted">{t.product.pieces}</span>
                  <span className="mt-1 block text-xs font-semibold">{money(priceFor(product, s.pieces))}</span>
                </motion.button>
              )
            })}
          </div>

          <div className="glass mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-4 sm:p-5">
            <div>
              <p className="text-xs text-muted">{pieces} {t.product.pieces} × {qty}</p>
              <div className="h-10 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p key={price * qty} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} className="text-gold-gradient font-display text-3xl font-semibold">
                    {money(price * qty)}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-full border border-gold/20" aria-label={t.product.qty}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center text-muted hover:text-gold"><Minus size={16} /></button>
                <span className="w-6 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(20, q + 1))} className="grid h-11 w-11 place-items-center text-muted hover:text-gold"><Plus size={16} /></button>
              </div>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => addToCart(product.id, pieces, qty)} className="btn-gold melt !py-3.5">
                <ShoppingBag size={18} /> {t.product.add}
              </motion.button>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted"><Truck size={14} className="text-gold" /> {t.promise[2].d}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-3xl p-5">
              <h3 className="mb-2 flex items-center gap-2 font-display text-lg"><Sparkles size={16} className="text-gold" /> {t.product.ingredients}</h3>
              <p className="text-sm leading-relaxed text-muted">{tr(product.ingredients)}</p>
            </div>
            <div className="glass rounded-3xl p-5">
              <h3 className="mb-3 flex items-center gap-2 font-display text-lg"><AlertCircle size={16} className="text-rose" /> {t.product.allergens}</h3>
              <div className="flex flex-wrap gap-2">
                {product.allergens.length === 0 ? (
                  <span className="text-sm text-muted">{t.product.none}</span>
                ) : (
                  product.allergens.map((a) => <span key={a} className="rounded-full bg-rose/10 px-3 py-1 text-xs font-medium text-rose">{tr(allergenLabels[a])}</span>)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-display text-3xl">{t.product.related}</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </Page>
  )
}
