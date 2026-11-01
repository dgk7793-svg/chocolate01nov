import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Home, Store, Boxes, Gift, MapPin, User, ShoppingBag, Sun, Moon, Languages } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useStore } from '../context/StoreContext'
import Logo from './Logo'

const items = [
  { to: '/', key: 'home', icon: Home },
  { to: '/shop', key: 'shop', icon: Store },
  { to: '/build', key: 'build', icon: Boxes },
  { to: '/occasions', key: 'occasions', icon: Gift },
  { to: '/boutiques', key: 'boutiques', icon: MapPin },
  { to: '/profile', key: 'profile', icon: User },
]

function Toggles() {
  const { lang, setLang, theme, setTheme, t } = useStore()
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
        className="flex h-10 items-center gap-1.5 rounded-full border border-gold/20 px-3 text-sm font-medium transition hover:border-gold/60 hover:bg-gold/10"
        aria-label={t.a11y.lang}
      >
        <Languages size={16} className="text-gold" />
        <span className={lang === 'en' ? 'font-arabic' : ''}>{lang === 'en' ? 'عربي' : 'EN'}</span>
      </button>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-gold/20 transition hover:border-gold/60 hover:bg-gold/10"
        aria-label={t.a11y.theme}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={theme} initial={{ y: 16, opacity: 0, rotate: -90 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: -16, opacity: 0, rotate: 90 }} transition={{ duration: 0.3 }}>
            {theme === 'dark' ? <Sun size={17} className="text-gold" /> : <Moon size={17} className="text-gold" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  )
}

export function TopNav() {
  const { t, cartCount } = useStore()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong border-x-0 border-t-0 shadow-soft' : 'border-b border-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-20 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {items.slice(1).map((it) => (
            <NavLink key={it.to} to={it.to} className={({ isActive }) => `relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors lg:px-4 ${isActive ? 'text-gold' : 'text-muted hover:text-ink'}`}>
              {({ isActive }) => (
                <>
                  {t.nav[it.key]}
                  {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-gold/10 ring-1 ring-gold/30" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/boutiques" className="grid h-10 w-10 place-items-center rounded-full border border-gold/20 md:hidden" aria-label={t.nav.boutiques}>
            <MapPin size={17} className="text-gold" />
          </Link>
          <Toggles />
          <Link to="/cart" className="relative hidden h-10 w-10 place-items-center rounded-full border border-gold/20 transition hover:border-gold/60 hover:bg-gold/10 md:grid" aria-label={t.nav.cart}>
            <ShoppingBag size={17} className="text-gold" />
            <CountBadge count={cartCount} />
          </Link>
        </div>
      </div>
    </header>
  )
}

function CountBadge({ count, className = '-end-1 -top-1', dark = false }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.3, y: -6 }}
          animate={{ scale: [1.5, 1], y: 0 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          className={`absolute ${className} grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-bold ${dark ? 'bg-cocoa-950 text-gold ring-2 ring-gold' : 'bg-gold-gradient text-cocoa-950'}`}
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

export function BottomNav() {
  const { t } = useStore()
  const mobile = items.filter((i) => i.key !== 'boutiques')
  return (
    <nav className="glass-strong safe-bottom fixed inset-x-0 bottom-0 z-50 border-x-0 border-b-0 md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {mobile.map((it) => (
          <NavLink key={it.to} to={it.to} end={it.to === '/'} className={({ isActive }) => `relative flex flex-col items-center gap-1 py-2.5 text-[10.5px] font-medium ${isActive ? 'text-gold' : 'text-muted'}`}>
            {({ isActive }) => (
              <>
                {isActive && <motion.span layoutId="bottom-pill" className="absolute top-0 h-0.5 w-8 rounded-full bg-gold-gradient" />}
                <it.icon size={21} strokeWidth={isActive ? 2.2 : 1.6} />
                <span className="leading-none">{t.nav[it.key]}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export function FloatingCart() {
  const { cartCount, subtotal, money, t } = useStore()
  const { pathname } = useLocation()
  const hidden = pathname.startsWith('/cart') || pathname.startsWith('/checkout') || cartCount === 0
  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="fixed bottom-24 end-4 z-50 md:bottom-8 md:end-8">
          <Link to="/cart" className="btn-gold melt !py-3.5 !ps-4 !pe-5 shadow-[0_10px_40px_-6px_rgb(212_162_76/0.7)]" aria-label={t.nav.cart}>
            <span className="relative">
              <ShoppingBag size={20} />
              <CountBadge count={cartCount} className="-end-2.5 -top-2.5" dark />
            </span>
            <span className="text-sm">{money(subtotal)}</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
