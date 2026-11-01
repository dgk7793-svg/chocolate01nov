import { useState } from 'react'
import ChocolateArt from './ChocolateArt'

// Real product photo with a graceful fallback to the illustrated piece if the image is missing.
// variant: 'cover' fills its box; 'medallion' is a round, gold-rimmed piece for floating/decorative use.
export default function ProductPhoto({ product, className = '', imgClassName = '', variant = 'cover', alt }) {
  const [failed, setFailed] = useState(false)
  if (!product) return null
  const label = alt ?? product.name?.en ?? ''

  if (failed) return <ChocolateArt art={product.art} glow={false} className={`${className} ${imgClassName}`} />

  const img = (
    <img
      src={`/images/products/${product.id}.jpg`}
      alt={label}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${imgClassName}`}
    />
  )

  if (variant === 'medallion') {
    return (
      <div className={`relative aspect-square overflow-hidden rounded-full p-[3px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65)] ${className}`} style={{ background: 'linear-gradient(135deg,#F7E1A1,#D4A24C 45%,#C98B7A)' }}>
        <div className="h-full w-full overflow-hidden rounded-full">{img}</div>
        <span className="pointer-events-none absolute inset-[3px] rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.25),transparent_45%)]" />
      </div>
    )
  }

  return <div className={`overflow-hidden ${className}`}>{img}</div>
}
