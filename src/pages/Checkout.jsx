import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, Navigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { Truck, Store, MapPin, Clock, Calendar, Loader2, CheckCircle2, PartyPopper, Info, AlertCircle } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { boutiques, deliveryAreas, timeSlots } from '../data/mockData'
import CartLine from '../components/CartLine'
import OrderSummary, { computeTotals } from '../components/OrderSummary'
import Page, { SectionHeading } from '../components/Page'

const goldBurst = () => {
  const colors = ['#F7E1A1', '#F3D58A', '#D4A24C', '#C98B7A', '#FFF8E6']
  const defaults = { colors, ticks: 220, gravity: 0.8, decay: 0.93, startVelocity: 38, scalar: 1.1 }
  confetti({ ...defaults, particleCount: 120, spread: 100, origin: { y: 0.55 } })
  confetti({ ...defaults, particleCount: 40, spread: 360, shapes: ['star'], scalar: 1.4, origin: { y: 0.4 } })
  const end = Date.now() + 1600
  ;(function frame() {
    confetti({ ...defaults, particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } })
    confetti({ ...defaults, particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1.5 flex items-center gap-1 text-xs text-rose">
            <AlertCircle size={12} /> {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}

export default function Checkout() {
  const { t, tr, money, cart, subtotal, placeOrder, toast } = useStore()
  const [method, setMethod] = useState('delivery')
  const [area, setArea] = useState(null)
  const [day, setDay] = useState('today')
  const [slot, setSlot] = useState(null)
  const [boutique, setBoutique] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', address: '', message: '' })
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)
  const [done, setDone] = useState(null)

  if (cart.length === 0 && !done) return <Navigate to="/cart" replace />

  const areaObj = deliveryAreas.find((a) => a.id === area)
  const fee = method === 'delivery' ? areaObj?.fee ?? 0 : 0

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = t.cart.errName
    if (!/^(?:\+?971|00971|0)?5\d{8}$/.test(form.phone.replace(/[\s-]/g, ''))) e.phone = t.cart.errPhone
    if (method === 'delivery') {
      if (!area) e.area = t.cart.errArea
      if (form.address.trim().length < 4) e.address = t.cart.errAddress
    } else if (!boutique) e.boutique = t.cart.errBoutique
    if (!slot) e.slot = t.cart.errSlot
    setErrors(e)
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) return toast(Object.values(e)[0], 'error')
    setPlacing(true)
    const totals = computeTotals(subtotal, fee)
    setTimeout(() => {
      const order = placeOrder({ method, area, boutique, day, slot, ...form, totals })
      setPlacing(false)
      setDone(order)
      goldBurst()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1300)
  }
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  if (done) {
    return (
      <Page className="grid min-h-[75vh] place-items-center">
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 160, damping: 18 }} className="glass relative max-w-lg overflow-hidden rounded-[2.5rem] p-8 text-center sm:p-12">
          <div className="absolute inset-x-0 -top-24 mx-auto h-48 w-48 rounded-full bg-gold/30 blur-3xl" />
          <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', delay: 0.2, stiffness: 200, damping: 12 }} className="bg-gold-gradient melt relative mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full shadow-glow">
            <PartyPopper size={40} className="text-cocoa-950" />
          </motion.div>
          <h1 className="text-gold-gradient font-display text-4xl sm:text-5xl">{t.cart.success}</h1>
          <p className="mt-3 text-muted">{t.cart.successSub}</p>
          <div className="mx-auto mt-6 inline-flex flex-col rounded-2xl border border-gold/20 bg-gold/5 px-6 py-3">
            <span className="text-xs uppercase tracking-widest text-muted">{t.cart.orderNo}</span>
            <span className="font-display text-2xl text-gold" dir="ltr">{done.id}</span>
          </div>
          <p className="mt-4 text-sm text-muted">
            {t.cart.total}: <span className="font-semibold text-ink">{money(done.totals.total)}</span> · {done.day === 'today' ? t.cart.today : t.cart.tomorrow}, <span dir="ltr">{done.slot}</span>
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/shop" className="btn-gold">{t.cart.continue}</Link>
            <Link to="/profile" className="btn-ghost">{t.cart.track}</Link>
          </div>
        </motion.div>
      </Page>
    )
  }

  return (
    <Page>
      <SectionHeading title={t.cart.checkout} />
      <form onSubmit={submit} noValidate className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {/* Method */}
          <section className="glass rounded-[2rem] p-5 sm:p-6">
            <h3 className="mb-4 font-display text-xl">{t.cart.method}</h3>
            <div className="relative grid grid-cols-2 gap-2 rounded-full border border-gold/20 p-1">
              {[{ id: 'delivery', icon: Truck, label: t.cart.deliveryOpt }, { id: 'pickup', icon: Store, label: t.cart.pickupOpt }].map((m) => (
                <button type="button" key={m.id} onClick={() => { setMethod(m.id); setErrors({}) }} className={`relative z-10 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-colors ${method === m.id ? 'text-cocoa-950' : 'text-muted'}`}>
                  {method === m.id && <motion.span layoutId="method-pill" className="bg-gold-gradient absolute inset-0 -z-10 rounded-full" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                  <m.icon size={17} /> {m.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {method === 'delivery' ? (
                <motion.div key="d" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-6">
                  <p className="mb-3 flex items-center gap-2 text-sm font-medium"><MapPin size={15} className="text-gold" /> {t.cart.area}</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {deliveryAreas.map((a) => (
                      <button type="button" key={a.id} onClick={() => { setArea(a.id); setErrors((x) => ({ ...x, area: undefined })) }} className={`rounded-2xl border p-3 text-start transition ${area === a.id ? 'border-gold bg-gold/10' : 'border-gold/15 hover:border-gold/50'}`}>
                        <p className="text-sm font-semibold">{tr(a)}</p>
                        <p className="mt-0.5 text-xs text-muted">{money(a.fee)} · <span dir="ltr">{a.eta}</span> {t.cart.mins}</p>
                      </button>
                    ))}
                  </div>
                  {errors.area && <p className="mt-2 flex items-center gap-1 text-xs text-rose"><AlertCircle size={12} /> {errors.area}</p>}
                </motion.div>
              ) : (
                <motion.div key="p" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-6">
                  <p className="mb-3 flex items-center gap-2 text-sm font-medium"><Store size={15} className="text-gold" /> {t.cart.boutique}</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {boutiques.map((b) => (
                      <button type="button" key={b.id} onClick={() => { setBoutique(b.id); setErrors((x) => ({ ...x, boutique: undefined })) }} className={`rounded-2xl border p-3 text-start transition ${boutique === b.id ? 'border-gold bg-gold/10' : 'border-gold/15 hover:border-gold/50'}`}>
                        <p className="text-sm font-semibold">{tr(b.name)}</p>
                        <p className="mt-0.5 text-xs text-muted">{tr(b.hours)}</p>
                      </button>
                    ))}
                  </div>
                  {errors.boutique && <p className="mt-2 flex items-center gap-1 text-xs text-rose"><AlertCircle size={12} /> {errors.boutique}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mb-3 mt-6 flex items-center gap-2 text-sm font-medium"><Calendar size={15} className="text-gold" /> {t.cart.date}</p>
            <div className="flex gap-2">
              {['today', 'tomorrow'].map((d) => (
                <button type="button" key={d} onClick={() => setDay(d)} className={`chip ${day === d ? 'chip-active' : ''}`}>{t.cart[d]}</button>
              ))}
            </div>
            <p className="mb-3 mt-6 flex items-center gap-2 text-sm font-medium"><Clock size={15} className="text-gold" /> {t.cart.slot}</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {timeSlots.map((s) => (
                <button type="button" key={s} onClick={() => { setSlot(s); setErrors((x) => ({ ...x, slot: undefined })) }} className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${slot === s ? 'border-gold bg-gold/10 text-gold' : 'border-gold/15 text-muted hover:border-gold/50'}`} dir="ltr">
                  {s}
                </button>
              ))}
            </div>
            {errors.slot && <p className="mt-2 flex items-center gap-1 text-xs text-rose"><AlertCircle size={12} /> {errors.slot}</p>}
          </section>

          {/* Details */}
          <section className="glass space-y-4 rounded-[2rem] p-5 sm:p-6">
            <h3 className="font-display text-xl">{t.cart.details}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t.cart.name} error={errors.name}>
                <input className="input" value={form.name} onChange={set('name')} autoComplete="name" placeholder="Mariam Al Mansoori" />
              </Field>
              <Field label={t.cart.phone} error={errors.phone}>
                <input className="input" value={form.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" placeholder="050 123 4567" dir="ltr" />
              </Field>
            </div>
            {method === 'delivery' && (
              <Field label={t.cart.address} error={errors.address}>
                <input className="input" value={form.address} onChange={set('address')} autoComplete="street-address" />
              </Field>
            )}
            <Field label={t.cart.message}>
              <textarea className="input resize-none font-display italic" rows={2} value={form.message} onChange={set('message')} placeholder={t.build.messagePh} />
            </Field>
          </section>
        </div>

        {/* Summary */}
        <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="space-y-2">
            {cart.map((item) => <CartLine key={item.key} item={item} compact />)}
          </div>
          <OrderSummary deliveryFee={fee} showDelivery={method === 'delivery'}>
            <button type="submit" disabled={placing} className="btn-gold melt mt-4 w-full !py-4 disabled:opacity-80">
              {placing ? <><Loader2 size={18} className="animate-spin" /> {t.cart.placing}</> : <><CheckCircle2 size={18} /> {t.cart.place}</>}
            </button>
            <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-xs text-muted"><Info size={12} /> {t.cart.mock}</p>
            <p className="text-center text-xs text-muted">{t.cart.payOnDelivery}</p>
          </OrderSummary>
        </div>
      </form>
    </Page>
  )
}
