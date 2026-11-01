import { Star } from 'lucide-react'

export default function Rating({ value, reviews, label, size = 14 }) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-muted">
      <Star size={size} className="fill-gold text-gold" />
      <span className="font-semibold text-ink">{value.toFixed(1)}</span>
      {reviews != null && <span>({reviews}{label ? ` ${label}` : ''})</span>}
    </div>
  )
}
