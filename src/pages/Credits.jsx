import { ExternalLink } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { getProduct } from '../data/mockData'
import credits from '../data/photoCredits.json'
import ProductPhoto from '../components/ProductPhoto'
import Page, { SectionHeading } from '../components/Page'

export default function Credits() {
  const { t, tr } = useStore()
  return (
    <Page>
      <SectionHeading title={t.footer.credits} />
      <p className="-mt-4 mb-8 max-w-2xl text-muted">{t.footer.creditsSub}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {credits.map((c) => {
          const p = getProduct(c.productId)
          return (
            <a key={c.productId} href={c.url} target="_blank" rel="noreferrer" className="glass group flex items-center gap-4 rounded-3xl p-3 transition hover:ring-1 hover:ring-gold/40">
              <ProductPhoto product={p} className="h-16 w-16 shrink-0 rounded-2xl" />
              <div className="min-w-0 flex-1 text-sm">
                <p className="font-display text-base">{tr(p.name)}</p>
                <p className="truncate text-muted" dir="ltr">{c.artist} · {c.license}</p>
              </div>
              <ExternalLink size={15} className="shrink-0 text-muted group-hover:text-gold" />
            </a>
          )
        })}
      </div>
    </Page>
  )
}
