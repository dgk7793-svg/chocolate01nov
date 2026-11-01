import { Heart } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'

export default function WishButton({ id, className = '' }) {
  const { wishlist, toggleWish, t } = useStore()
  const active = wishlist.includes(id)
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.8 }}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWish(id) }}
      aria-pressed={active}
      aria-label={t.a11y.wish}
      className={`${className.includes('absolute') ? '' : 'relative'} z-10 grid h-10 w-10 place-items-center rounded-full glass-strong transition-colors ${className}`}
    >
      <motion.span key={String(active)} initial={{ scale: 0.4 }} animate={{ scale: [0.4, 1.35, 1] }} transition={{ duration: 0.45 }}>
        <Heart size={18} className={active ? 'fill-rose text-rose' : 'text-ink'} />
      </motion.span>
      <AnimatePresence>
        {active && (
          <motion.span
            key="burst"
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-rose"
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 1.9, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}
