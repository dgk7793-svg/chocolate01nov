import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'

const split = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000))
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), mins: Math.floor((s % 3600) / 60), secs: s % 60 }
}

export default function Countdown({ date }) {
  const { t } = useStore()
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const parts = split(new Date(date).getTime() - now)
  return (
    <div className="flex gap-2 sm:gap-3" dir="ltr">
      {['days', 'hours', 'mins', 'secs'].map((k) => (
        <div key={k} className="glass flex w-[4.25rem] flex-col items-center rounded-2xl py-3 sm:w-20">
          <div className="relative h-9 overflow-hidden font-display text-3xl font-semibold sm:h-11 sm:text-4xl">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={parts[k]} className="text-gold-gradient block" initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} transition={{ duration: 0.35 }}>
                {String(parts[k]).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="mt-1 text-[10px] uppercase tracking-widest text-muted">{t.occ[k]}</span>
        </div>
      ))}
    </div>
  )
}
