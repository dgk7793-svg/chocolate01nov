import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { boutiques } from '../data/mockData'
import Logo from './Logo'

export default function Footer() {
  const { t, tr, toast } = useStore()
  const [email, setEmail] = useState('')

  const subscribe = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast(t.footer.errEmail, 'error')
    toast(t.footer.thanks)
    setEmail('')
  }

  return (
    <footer className="relative z-10 mt-10 border-t border-gold/10 pb-28 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t.bout.quote}</p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Mail, Phone].map((Icon, i) => (
              <a key={i} href="#" onClick={(e) => e.preventDefault()} className="grid h-10 w-10 place-items-center rounded-full border border-gold/20 text-gold transition hover:bg-gold/10" aria-label="social">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="eyebrow mb-4">{t.footer.explore}</h4>
          <ul className="space-y-2.5 text-sm text-muted">
            {['shop', 'build', 'occasions', 'boutiques', 'profile'].map((k) => (
              <li key={k}><Link className="transition hover:text-gold" to={`/${k}`}>{t.nav[k]}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-4">{t.footer.visit}</h4>
          <ul className="space-y-2.5 text-sm text-muted">
            {boutiques.slice(0, 3).map((b) => (
              <li key={b.id} className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0 text-gold" />{tr(b.name)}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-4">{t.footer.newsletter}</h4>
          <form onSubmit={subscribe} className="flex gap-2">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={t.footer.emailPh} className="input !rounded-full !py-2.5" />
            <button className="btn-gold shrink-0 !px-4 !py-2.5" aria-label={t.footer.subscribe}><Sparkles size={16} /></button>
          </form>
        </div>
      </div>
      <div className="gold-line mx-auto max-w-7xl" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} {t.brand} · {t.tagline}. {t.footer.rights}</p>
        <p className="flex items-center gap-3">{t.footer.made} <Link to="/credits" className="underline decoration-gold/40 underline-offset-4 hover:text-gold">{t.footer.credits}</Link></p>
      </div>
    </footer>
  )
}
