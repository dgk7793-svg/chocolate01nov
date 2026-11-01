import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7E1A1" /><stop offset=".55" stopColor="#D4A24C" /><stop offset="1" stopColor="#C98B7A" />
        </linearGradient>
        <linearGradient id="lm-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7A4A2E" /><stop offset="1" stopColor="#24130B" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#lm-g)" strokeWidth="1.5" opacity=".7" />
      <ellipse cx="32" cy="32" rx="13" ry="20" transform="rotate(30 32 32)" fill="url(#lm-b)" stroke="url(#lm-g)" strokeWidth="2" />
      <path d="M25 45 C30 36 34 28 39 19" fill="none" stroke="url(#lm-g)" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 50 Q20 42 32 48 T56 46" fill="none" stroke="url(#lm-g)" strokeWidth="1.5" strokeLinecap="round" opacity=".8" />
    </svg>
  )
}

export default function Logo({ compact = false }) {
  const { t, isRTL } = useStore()
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label={t.brand}>
      <LogoMark className="h-9 w-9 transition-transform duration-700 group-hover:rotate-[20deg]" />
      <span className="flex flex-col leading-none">
        <span className={`text-gold-gradient font-display text-xl font-semibold ${isRTL ? '' : 'tracking-wide'} sm:text-2xl`}>
          {isRTL ? t.brand : <>Cacao <em className="font-normal">Dunes</em></>}
        </span>
        {!compact && <span className="mt-1 hidden text-[10px] uppercase tracking-[0.3em] text-muted sm:block">{t.tagline}</span>}
      </span>
    </Link>
  )
}
