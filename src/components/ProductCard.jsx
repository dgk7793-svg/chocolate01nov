import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag, Plus } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { flavors, tagLabels } from '../data/mockData'
import ProductPhoto from './ProductPhoto'
import WishButton from './WishButton'
import Rating from './Rating'

const ProductCard = forwardRef(function ProductCard({ product, index = 0 }, ref) {
  const { tr, t, money, addToCart } = useStore()

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="glass group relative flex flex-col overflow-hidden rounded-[1.75rem] transition-shadow duration-500 hover:shadow-glow"
    >
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden" aria-label={tr(product.name)}>
        <ProductPhoto product={product} alt={tr(product.name)} className="h-full w-full" imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa-950/70 via-transparent to-cocoa-950/20" />
        <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px gold-line opacity-60" />
        {product.tag && (
          <span className="absolute start-3 top-3 rounded-full bg-cocoa-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold backdrop-blur">
            {tr(tagLabels[product.tag])}
          </span>
        )}
      </Link>
      <WishButton id={product.id} className="absolute end-3 top-3" />

      <div className="flex flex-1 flex-col gap-2 p-4 pt-3 sm:p-5 sm:pt-4">
        <div className="flex flex-wrap gap-1">
          {product.flavors.slice(0, 2).map((f) => {
            const fl = flavors.find((x) => x.id === f)
            return (
              <span key={f} className="flex items-center gap-1 text-[11px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: fl.color }} />
                {tr(fl)}
              </span>
            )
          })}
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg leading-snug transition-colors group-hover:text-gold sm:text-xl">{tr(product.name)}</h3>
        </Link>
        <Rating value={product.rating} reviews={product.reviews} size={13} />
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div>
            <p className="text-[11px] text-muted">{t.product.from} · 4 {t.product.pieces}</p>
            <p className="font-semibold text-gold">{money(product.price)}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => addToCart(product.id, 4)}
            className="btn-gold !px-3 !py-2.5 text-sm sm:!px-4"
            aria-label={`${t.product.add}: ${tr(product.name)}`}
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">{t.product.add}</span>
            <Plus size={14} className="sm:hidden" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
})

export default ProductCard
