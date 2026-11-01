import { AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight, Truck } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import CartLine from '../components/CartLine'
import OrderSummary, { FREE_DELIVERY_OVER } from '../components/OrderSummary'
import EmptyState from '../components/EmptyState'
import Page, { SectionHeading } from '../components/Page'

export default function Cart() {
  const { t, cart, cartCount, subtotal, money } = useStore()

  if (cart.length === 0) {
    return (
      <Page className="grid min-h-[70vh] place-items-center">
        <EmptyState icon={ShoppingBag} title={t.cart.empty} sub={t.cart.emptySub} cta={t.cart.browse} />
      </Page>
    )
  }

  const remaining = Math.max(0, FREE_DELIVERY_OVER - subtotal)

  return (
    <Page>
      <SectionHeading title={t.cart.title}>
        <span className="text-sm text-muted">{cartCount} {t.cart.items}</span>
      </SectionHeading>
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          <div className="glass rounded-2xl p-4 text-sm">
            <p className="flex items-center gap-2"><Truck size={16} className="text-gold" />
              {remaining > 0 ? <>{money(remaining)} → <span className="text-gold">{t.cart.free} {t.cart.delivery.toLowerCase()}</span></> : <span className="text-gold">{t.cart.free} {t.cart.delivery.toLowerCase()} ✓</span>}
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-gold/10">
              <div className="bg-gold-gradient h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_OVER) * 100)}%` }} />
            </div>
          </div>
          <AnimatePresence mode="popLayout">
            {cart.map((item) => <CartLine key={item.key} item={item} />)}
          </AnimatePresence>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <OrderSummary showDelivery={false}>
            <Link to="/checkout" className="btn-gold melt mt-4 w-full !py-4">{t.cart.checkout} <ArrowRight size={18} className="rtl:rotate-180" /></Link>
            <Link to="/shop" className="mt-2 block text-center text-sm text-muted hover:text-gold">{t.cart.continue}</Link>
          </OrderSummary>
        </div>
      </div>
    </Page>
  )
}
