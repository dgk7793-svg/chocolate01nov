import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function EmptyState({ icon: Icon, title, sub, cta, to = '/shop', onClick }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass mx-auto flex max-w-md flex-col items-center rounded-[2rem] px-8 py-14 text-center">
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }} className="relative mb-6 grid h-20 w-20 place-items-center rounded-full bg-gold/10">
        <div className="absolute inset-0 rounded-full shadow-glow" />
        <Icon size={34} className="text-gold" strokeWidth={1.4} />
      </motion.div>
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="mt-2 text-muted">{sub}</p>
      {cta && (onClick ? (
        <button onClick={onClick} className="btn-gold mt-7">{cta}</button>
      ) : (
        <Link to={to} className="btn-gold mt-7">{cta}</Link>
      ))}
    </motion.div>
  )
}
