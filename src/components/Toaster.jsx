import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Heart, Info, AlertTriangle } from 'lucide-react'
import { useStore } from '../context/StoreContext'

const icons = { success: CheckCircle2, love: Heart, info: Info, error: AlertTriangle }

export default function Toaster() {
  const { toasts } = useStore()
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4" aria-live="polite">
      <AnimatePresence>
        {toasts.map((x) => {
          const Icon = icons[x.kind] || Info
          return (
            <motion.div
              key={x.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="glass-strong pointer-events-auto flex max-w-sm items-center gap-3 rounded-full py-2.5 pe-5 ps-3 shadow-soft"
            >
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${x.kind === 'error' ? 'bg-red-500/15 text-red-400' : x.kind === 'love' ? 'bg-rose/15 text-rose' : 'bg-gold/15 text-gold'}`}>
                <Icon size={16} className={x.kind === 'love' ? 'fill-rose' : ''} />
              </span>
              <span className="text-sm font-medium">{x.message}</span>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
