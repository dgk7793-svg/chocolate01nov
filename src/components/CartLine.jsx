import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, Gift } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { getProduct } from '../data/mockData'
import ProductPhoto from './ProductPhoto'

export function BoxThumb({ item, className = 'h-20 w-20' }) {
  const cols = Math.sqrt(item.pieces)
  return (
    <div className={`relative grid shrink-0 gap-px overflow-hidden rounded-xl bg-cocoa-950 p-1 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {item.items.map((id, i) => <ProductPhoto key={i} product={getProduct(id)} className="aspect-square h-full w-full rounded-full" imgClassName="scale-[1.7]" />)}
      <span className="pointer-events-none absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 opacity-80" style={{ background: item.ribbonColor }} />
      <span className="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 opacity-80" style={{ background: item.ribbonColor }} />
    </div>
  )
}

const CartLine = forwardRef(function CartLine({ item, compact }, ref) {
  const { t, tr, money, updateQty, removeFromCart } = useStore()
  const product = item.type === 'product' ? getProduct(item.productId) : null
  const name = product ? tr(product.name) : tr(item.name)

  return (
    <motion.div ref={ref} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40, transition: { duration: 0.25 } }} className={`glass flex items-center gap-4 rounded-3xl ${compact ? 'p-3' : 'p-3 sm:p-4'}`}>
      {product ? (
        <Link to={`/product/${product.id}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-gold/20">
          <ProductPhoto product={product} alt={name} className="h-full w-full" />
        </Link>
      ) : (
        <BoxThumb item={item} />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-lg leading-tight">{name}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
          {!product && <Gift size={12} className="text-gold" />}
          {item.pieces} {t.product.pieces}
          {item.message ? ` · “${item.message.slice(0, 24)}${item.message.length > 24 ? '…' : ''}”` : ''}
        </p>
        <p className="mt-1 font-semibold text-gold">{money(item.price * item.qty)}</p>
      </div>
      {!compact && (
        <div className="flex flex-col items-end gap-2">
          <button onClick={() => removeFromCart(item.key)} className="text-muted transition hover:text-rose" aria-label={t.cart.remove}><Trash2 size={16} /></button>
          <div className="flex items-center rounded-full border border-gold/20">
            <button onClick={() => updateQty(item.key, -1)} className="grid h-8 w-8 place-items-center text-muted hover:text-gold" aria-label="-"><Minus size={14} /></button>
            <span className="w-5 text-center text-sm font-semibold">{item.qty}</span>
            <button onClick={() => updateQty(item.key, 1)} className="grid h-8 w-8 place-items-center text-muted hover:text-gold" aria-label="+"><Plus size={14} /></button>
          </div>
        </div>
      )}
      {compact && <span className="text-sm text-muted">×{item.qty}</span>}
    </motion.div>
  )
})

export default CartLine
