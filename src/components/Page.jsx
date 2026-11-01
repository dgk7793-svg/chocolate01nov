import { motion } from 'framer-motion'

export default function Page({ children, className = '' }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative z-10 mx-auto w-full max-w-7xl px-4 pb-32 pt-6 sm:px-6 md:pb-20 lg:px-8 ${className}`}
    >
      {children}
    </motion.main>
  )
}

export function SectionHeading({ eyebrow, title, children, center }) {
  return (
    <div className={`mb-8 flex flex-col gap-3 ${center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
      <div>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      </div>
      {children}
    </div>
  )
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }),
}
