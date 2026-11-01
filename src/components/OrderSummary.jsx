import { useStore } from '../context/StoreContext'
import { VAT_RATE } from '../data/mockData'

export const FREE_DELIVERY_OVER = 200

export function computeTotals(subtotal, deliveryFee = 0) {
  const delivery = subtotal >= FREE_DELIVERY_OVER ? 0 : deliveryFee
  const vat = Math.round((subtotal + delivery) * VAT_RATE * 100) / 100
  return { subtotal, delivery, vat, total: Math.round((subtotal + delivery + vat) * 100) / 100 }
}

export default function OrderSummary({ deliveryFee = 0, showDelivery = true, children }) {
  const { t, money, subtotal } = useStore()
  const tot = computeTotals(subtotal, deliveryFee)
  const Row = ({ label, value, strong }) => (
    <div className={`flex items-center justify-between ${strong ? 'text-lg font-semibold' : 'text-sm text-muted'}`}>
      <span>{label}</span>
      <span className={strong ? 'text-gold-gradient font-display text-2xl' : 'text-ink'}>{value}</span>
    </div>
  )
  return (
    <div className="glass space-y-3 rounded-[2rem] p-6">
      <h3 className="mb-2 font-display text-2xl">{t.cart.summary}</h3>
      <Row label={t.cart.subtotal} value={money(tot.subtotal)} />
      {showDelivery && <Row label={t.cart.delivery} value={tot.delivery === 0 ? t.cart.free : money(tot.delivery)} />}
      <Row label={t.cart.vat} value={money(tot.vat)} />
      <div className="gold-line !my-4" />
      <Row label={t.cart.total} value={money(tot.total)} strong />
      {children}
    </div>
  )
}
