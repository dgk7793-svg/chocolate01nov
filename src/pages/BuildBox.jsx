import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Gift, Shuffle, Trash2, Sparkles, Check, PenLine } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { boxSizes, products, ribbons } from '../data/mockData'
import ProductPhoto from '../components/ProductPhoto'
import Page, { SectionHeading } from '../components/Page'

const palette = products.filter((p) => !['giftboxes', 'bars'].includes(p.category))
const piecePrice = (p) => Math.round(p.price / 4)

function Step({ n, title, done }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold transition ${done ? 'bg-gold-gradient text-cocoa-950' : 'border border-gold/40 text-gold'}`}>
        {done ? <Check size={16} /> : n}
      </span>
      <h3 className="font-display text-xl sm:text-2xl">{title}</h3>
    </div>
  )
}

export default function BuildBox() {
  const { t, tr, money, addBoxToCart, toast } = useStore()
  const [size, setSize] = useState(boxSizes[1])
  const [items, setItems] = useState([])
  const [ribbon, setRibbon] = useState(ribbons[0])
  const [message, setMessage] = useState('')

  const full = items.length === size.slots
  const total = useMemo(() => size.price + items.reduce((s, id) => s + piecePrice(products.find((p) => p.id === id)), 0), [size, items])

  useEffect(() => {
    if (full && items.length) {
      confetti({ particleCount: 60, spread: 70, startVelocity: 30, origin: { y: 0.6 }, colors: ['#F3D58A', '#D4A24C', '#C98B7A', '#FFF4D6'], scalar: 0.8 })
    }
  }, [full, items.length])

  const pickSize = (s) => {
    setSize(s)
    setItems((it) => it.slice(0, s.slots))
  }
  const add = (id) => {
    if (full) return toast(t.build.full, 'info')
    setItems((it) => (it.length < size.slots ? [...it, id] : it))
  }
  const removeAt = (i) => setItems((it) => it.filter((_, idx) => idx !== i))
  const surprise = () => setItems((it) => [...it, ...Array.from({ length: size.slots - it.length }, () => palette[Math.floor(Math.random() * palette.length)].id)])

  const submit = () => {
    if (!full) return toast(t.build.needFull, 'error')
    addBoxToCart({
      name: { en: `${size.en} Custom Box`, ar: `علبة ${size.ar} مخصصة` },
      pieces: size.slots,
      items,
      ribbon: ribbon.id,
      ribbonColor: ribbon.color,
      message: message.trim(),
      price: total,
    })
    setItems([])
    setMessage('')
  }

  return (
    <Page>
      <SectionHeading eyebrow={t.build.eyebrow} title={t.build.title} />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Left: steps */}
        <div className="space-y-8">
          <section>
            <Step n={1} title={t.build.step1} done />
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {boxSizes.map((s) => {
                const on = s.slots === size.slots
                return (
                  <button key={s.slots} onClick={() => pickSize(s)} className={`rounded-2xl border p-3 text-center transition sm:p-4 ${on ? 'border-gold bg-gold/10 shadow-glow' : 'border-gold/15 hover:border-gold/50'}`}>
                    <div className="mx-auto mb-2 grid w-10 gap-0.5 sm:w-12" style={{ gridTemplateColumns: `repeat(${s.cols}, 1fr)` }}>
                      {Array.from({ length: s.slots }).map((_, i) => <span key={i} className={`aspect-square rounded-[2px] ${on ? 'bg-gold/70' : 'bg-muted/30'}`} />)}
                    </div>
                    <p className={`font-display text-lg ${on ? 'text-gold' : ''}`}>{s.slots}</p>
                    <p className="text-[11px] text-muted">{tr(s)}</p>
                  </button>
                )
              })}
            </div>
          </section>

          <section>
            <Step n={2} title={t.build.step2} done={full} />
            <p className="mb-4 text-sm text-muted">{t.build.tapHint}</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
              {palette.map((p) => (
                <motion.button
                  key={p.id}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => add(p.id)}
                  disabled={full}
                  className="glass group flex flex-col items-center rounded-2xl p-2 pb-3 text-center transition disabled:opacity-40"
                >
                  <ProductPhoto product={p} alt={tr(p.name)} className="mb-2 h-16 w-16 rounded-full ring-1 ring-gold/40 transition-transform duration-500 group-hover:scale-110 sm:h-20 sm:w-20" imgClassName="scale-[1.6]" />
                  <span className="line-clamp-2 text-[11px] font-medium leading-tight sm:text-xs">{tr(p.name)}</span>
                  <span className="mt-1 text-[11px] text-gold">+{money(piecePrice(p))}</span>
                </motion.button>
              ))}
            </div>
          </section>

          <section>
            <Step n={3} title={t.build.step3} done={!!message.trim()} />
            <label className="mb-2 flex items-center gap-2 text-sm font-medium"><PenLine size={15} className="text-gold" /> {t.build.message}</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value.slice(0, 160))} rows={3} placeholder={t.build.messagePh} className="input resize-none font-display text-lg italic" />
            <p className="mt-1 text-end text-xs text-muted">{message.length}/160</p>
            <p className="mb-3 mt-4 text-sm font-medium">{t.build.ribbon}</p>
            <div className="flex flex-wrap gap-3">
              {ribbons.map((r) => (
                <button key={r.id} onClick={() => setRibbon(r)} className="flex flex-col items-center gap-1.5" aria-label={tr(r)}>
                  <span className={`h-10 w-10 rounded-full ring-offset-2 ring-offset-bg transition ${ribbon.id === r.id ? 'scale-110 ring-2 ring-gold' : 'ring-1 ring-gold/20'}`} style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}cc 60%, #00000033)` }} />
                  <span className={`text-[11px] ${ribbon.id === r.id ? 'text-gold' : 'text-muted'}`}>{tr(r)}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right: the box */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass rounded-[2.5rem] p-5 sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted"><span className="font-semibold text-ink">{items.length}</span>/{size.slots} {t.build.filled}</span>
              <div className="flex gap-2">
                <button onClick={surprise} disabled={full} className="btn-ghost !px-3 !py-2 text-xs disabled:opacity-40"><Shuffle size={14} /> {t.build.random}</button>
                <button onClick={() => setItems([])} disabled={!items.length} className="btn-ghost !px-3 !py-2 text-xs disabled:opacity-40" aria-label={t.build.clear}><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-gold/10">
              <motion.div className="bg-gold-gradient h-full rounded-full" animate={{ width: `${(items.length / size.slots) * 100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
            </div>

            {/* Box */}
            <motion.div layout className="relative mx-auto max-w-md rounded-[1.75rem] bg-gradient-to-br from-cocoa-700 to-cocoa-950 p-3 shadow-[inset_0_2px_20px_rgba(0,0,0,0.6),0_30px_60px_-20px_rgba(0,0,0,0.6)] sm:p-4">
              {/* ribbon */}
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 transition-colors" style={{ background: ribbon.color }} />
              <div className="pointer-events-none absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 transition-colors" style={{ background: ribbon.color }} />
              <motion.div key={ribbon.id} initial={{ scale: 0.5, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} className="absolute -top-5 left-1/2 z-20 -translate-x-1/2">
                <svg width="72" height="46" viewBox="0 0 56 36" aria-hidden="true" className="drop-shadow-lg">
                  <path d="M28 18 C16 2 2 4 6 14 C9 22 20 20 28 18 Z" fill={ribbon.color} />
                  <path d="M28 18 C40 2 54 4 50 14 C47 22 36 20 28 18 Z" fill={ribbon.color} />
                  <path d="M28 18 L20 34 M28 18 L36 34" stroke={ribbon.color} strokeWidth="4" strokeLinecap="round" />
                  <circle cx="28" cy="18" r="5" fill="#F3D58A" />
                </svg>
              </motion.div>

              <div className="relative grid gap-1.5 rounded-2xl border border-gold/30 bg-cocoa-950/80 p-2 sm:gap-2 sm:p-3" style={{ gridTemplateColumns: `repeat(${size.cols}, 1fr)` }}>
                {Array.from({ length: size.slots }).map((_, i) => {
                  const pid = items[i]
                  const p = pid && products.find((x) => x.id === pid)
                  return (
                    <button key={i} onClick={() => p && removeAt(i)} className="relative aspect-square rounded-xl bg-[radial-gradient(circle_at_50%_40%,#2A1A11,#140B07)] shadow-[inset_0_3px_8px_rgba(0,0,0,0.7)]">
                      <AnimatePresence>
                        {p && (
                          <motion.span
                            key={`${pid}-${i}`}
                            initial={{ scale: 0, y: -50, rotate: -40, opacity: 0 }}
                            animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                            className="absolute inset-[8%]"
                          >
                            <ProductPhoto product={p} alt={tr(p.name)} className="h-full w-full rounded-full shadow-[0_6px_14px_rgba(0,0,0,0.6)] ring-1 ring-gold/30" imgClassName="scale-[1.7]" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  )
                })}
              </div>
            </motion.div>

            <AnimatePresence>
              {message.trim() && (
                <motion.div initial={{ opacity: 0, y: 10, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: -1.5 }} exit={{ opacity: 0 }} className="mx-auto -mt-3 max-w-xs rounded-lg bg-[#F5E9D7] px-5 py-4 text-center font-display text-base italic text-cocoa-800 shadow-soft">
                  “{message}”
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {full && (
                <motion.p initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-gold">
                  <Sparkles size={16} /> {t.build.full}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="gold-line my-6" />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-muted">{tr(size)} · {size.slots} {t.product.pieces}</p>
                <p className="text-gold-gradient font-display text-3xl font-semibold">{money(total)}</p>
              </div>
              <motion.button whileTap={{ scale: 0.95 }} onClick={submit} className={`btn-gold ${full ? 'melt' : 'opacity-60'}`}>
                <Gift size={18} /> {t.build.add}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
