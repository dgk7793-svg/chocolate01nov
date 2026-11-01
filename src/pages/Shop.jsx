import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { Search, SearchX, X, SlidersHorizontal } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { categories, flavors, products } from '../data/mockData'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'
import Page, { SectionHeading } from '../components/Page'

export default function Shop() {
  const { t, tr } = useStore()
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'all'
  const activeFlavors = params.get('flavor')?.split(',').filter(Boolean) || []
  const q = params.get('q') || ''

  const update = (next) => {
    const p = new URLSearchParams(params)
    Object.entries(next).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)))
    setParams(p, { replace: true })
  }
  const toggleFlavor = (id) => {
    const set = activeFlavors.includes(id) ? activeFlavors.filter((f) => f !== id) : [...activeFlavors, id]
    update({ flavor: set.join(',') })
  }

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (activeFlavors.length === 0 || activeFlavors.some((f) => p.flavors.includes(f))) &&
        (!needle || p.name.en.toLowerCase().includes(needle) || p.name.ar.includes(needle))
    )
  }, [category, activeFlavors, q])

  const hasFilters = category !== 'all' || activeFlavors.length > 0 || q

  return (
    <Page>
      <SectionHeading eyebrow={t.shop.eyebrow} title={t.shop.title}>
        <div className="relative w-full sm:w-72">
          <Search size={17} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => update({ q: e.target.value })} placeholder={t.shop.search} className="input !rounded-full !ps-11" />
        </div>
      </SectionHeading>

      <div className="glass sticky top-[4.5rem] z-30 -mx-4 mb-8 space-y-3 rounded-none border-x-0 px-4 py-4 sm:mx-0 sm:rounded-3xl sm:border-x sm:px-5 md:top-24">
        <div className="flex items-center gap-3">
          <span className="hidden w-20 shrink-0 text-xs font-semibold uppercase tracking-widest text-muted sm:block">{t.shop.category}</span>
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            {categories.map((c) => (
              <button key={c.id} onClick={() => update({ category: c.id === 'all' ? '' : c.id })} className={`chip ${category === c.id ? 'chip-active' : ''}`}>
                {tr(c)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden w-20 shrink-0 text-xs font-semibold uppercase tracking-widest text-muted sm:block">{t.shop.flavor}</span>
          <SlidersHorizontal size={16} className="shrink-0 text-gold sm:hidden" />
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            {flavors.map((f) => {
              const on = activeFlavors.includes(f.id)
              return (
                <button key={f.id} onClick={() => toggleFlavor(f.id)} className={`chip !py-1.5 ${on ? 'chip-active' : ''}`} aria-pressed={on}>
                  <span className="h-2.5 w-2.5 rounded-full ring-1 ring-black/10" style={{ background: f.color }} />
                  {tr(f)}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between text-sm text-muted">
        <span><span className="font-semibold text-ink">{list.length}</span> {t.shop.results}</span>
        {hasFilters && (
          <button onClick={() => setParams({}, { replace: true })} className="flex items-center gap-1 text-gold hover:underline">
            <X size={14} /> {t.shop.clear}
          </button>
        )}
      </div>

      {list.length === 0 ? (
        <EmptyState icon={SearchX} title={t.shop.empty} sub={t.shop.emptySub} cta={t.shop.clear} onClick={() => setParams({}, { replace: true })} />
      ) : (
        <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </AnimatePresence>
        </motion.div>
      )}
    </Page>
  )
}
