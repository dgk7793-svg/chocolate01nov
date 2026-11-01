import { useId } from 'react'

// Lighten (amt > 0) or darken (amt < 0) a hex colour
const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16)
  const c = (v) => Math.max(0, Math.min(255, Math.round(v + (amt > 0 ? (255 - v) * amt : v * amt))))
  const r = c((n >> 16) & 255), g = c((n >> 8) & 255), b = c(n & 255)
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

// Deterministic scatter so dusting looks the same every render
const scatter = (count, seed, box) => {
  let s = seed
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  return Array.from({ length: count }, () => ({ x: box.x + rnd() * box.w, y: box.y + rnd() * box.h, r: 0.8 + rnd() * 2.2, o: 0.4 + rnd() * 0.6 }))
}

const SHAPES = {
  dome: 'M40 128 C40 70 68 52 100 52 C132 52 160 70 160 128 C160 140 140 146 100 146 C60 146 40 140 40 128 Z',
  truffle: 'M100 40 C138 40 162 66 162 100 C162 136 136 160 100 160 C64 160 38 136 38 100 C38 64 62 40 100 40 Z',
  square: 'M52 46 H148 Q158 46 158 56 V144 Q158 154 148 154 H52 Q42 154 42 144 V56 Q42 46 52 46 Z',
  heart: 'M100 158 C60 128 34 106 34 76 C34 56 50 42 68 42 C82 42 94 50 100 62 C106 50 118 42 132 42 C150 42 166 56 166 76 C166 106 140 128 100 158 Z',
  date: 'M44 112 C40 82 70 56 108 54 C146 52 164 74 160 96 C156 126 124 146 90 146 C64 146 46 132 44 112 Z',
  bar: 'M36 54 H164 Q172 54 172 62 V138 Q172 146 164 146 H36 Q28 146 28 138 V62 Q28 54 36 54 Z',
}

export default function ChocolateArt({ art, className = '', glow = true }) {
  const uid = useId().replace(/:/g, '')
  const { shape = 'dome', shell = '#3B2015', accent = '#D4A24C', pattern } = art || {}
  const light = shade(shell, 0.35)
  const dark = shade(shell, -0.45)
  const isBox = shape === 'box'
  const path = SHAPES[shape]

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-hidden="true">
      <defs>
        <radialGradient id={`body-${uid}`} cx="35%" cy="28%" r="80%">
          <stop offset="0" stopColor={light} />
          <stop offset="0.45" stopColor={shell} />
          <stop offset="1" stopColor={dark} />
        </radialGradient>
        <linearGradient id={`gold-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7E1A1" />
          <stop offset="0.5" stopColor="#D4A24C" />
          <stop offset="1" stopColor="#C98B7A" />
        </linearGradient>
        <radialGradient id={`glow-${uid}`} cx="50%" cy="55%" r="50%">
          <stop offset="0" stopColor={accent} stopOpacity="0.45" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`shine-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {path && <clipPath id={`clip-${uid}`}><path d={path} /></clipPath>}
      </defs>

      {glow && <circle cx="100" cy="110" r="95" fill={`url(#glow-${uid})`} />}
      <ellipse cx="100" cy="166" rx={isBox ? 70 : 56} ry="8" fill="#000" opacity="0.35" />

      {isBox ? (
        <Box uid={uid} shell={shell} accent={accent} light={light} dark={dark} />
      ) : (
        <g>
          <path d={path} fill={`url(#body-${uid})`} />
          <g clipPath={`url(#clip-${uid})`}>
            <Pattern pattern={pattern} accent={accent} uid={uid} shape={shape} shell={shell} />
          </g>
          {/* specular highlight */}
          <ellipse cx="78" cy={shape === 'bar' ? 66 : 70} rx={shape === 'bar' ? 40 : 24} ry="8" fill={`url(#shine-${uid})`} opacity="0.55" transform="rotate(-18 78 70)" />
          <path d={path} fill="none" stroke={shade(shell, 0.5)} strokeOpacity="0.25" strokeWidth="1.2" />
        </g>
      )}
    </svg>
  )
}

function Pattern({ pattern, accent, uid, shape, shell }) {
  const gold = `url(#gold-${uid})`
  switch (pattern) {
    case 'threads':
      return (
        <g stroke={accent} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.95">
          <path d="M84 70 q8 6 4 16" /><path d="M100 64 q-6 10 2 18" /><path d="M112 72 q6 6 0 14" /><path d="M94 80 q10 2 14 10" />
        </g>
      )
    case 'dust':
      return (
        <g>
          {scatter(140, 7, { x: 36, y: 38, w: 128, h: 124 }).map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r * 0.7} fill={i % 3 ? shade(shell, 0.25) : accent} opacity={d.o * 0.6} />
          ))}
        </g>
      )
    case 'crumble':
      return (
        <g>
          {scatter(70, 13, { x: 40, y: 40, w: 120, h: 70 }).map((d, i) => (
            <rect key={i} x={d.x} y={d.y} width={d.r * 1.8} height={d.r * 1.4} rx="0.8" fill={i % 4 ? accent : '#E59AAE'} opacity={d.o} transform={`rotate(${i * 37} ${d.x} ${d.y})`} />
          ))}
        </g>
      )
    case 'grid':
      return shape === 'bar' ? (
        <g stroke={shade(shell, -0.5)} strokeWidth="2" opacity="0.7">
          {[60, 92, 124].map((x) => <line key={x} x1={x + 8} y1="54" x2={x + 8} y2="146" />)}
          <line x1="28" y1="100" x2="172" y2="100" />
          <g stroke={shade(shell, 0.45)} strokeWidth="1" opacity="0.6">
            {[60, 92, 124].map((x) => <line key={x} x1={x + 10} y1="54" x2={x + 10} y2="146" />)}
            <line x1="28" y1="102" x2="172" y2="102" />
          </g>
          <path d="M150 54 L172 54 L172 80 Z" fill={accent} stroke="none" opacity="0.9" />
        </g>
      ) : null
    case 'petals':
      return (
        <g fill={accent} opacity="0.85">
          {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="100" cy="82" rx="5" ry="10" transform={`rotate(${a} 100 92)`} />)}
          <circle cx="100" cy="92" r="4" fill={gold} />
        </g>
      )
    case 'swirl':
      return <path d="M58 96 C78 70 100 120 122 92 S150 84 146 104" stroke={accent} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.9" />
    case 'dune':
      return (
        <g fill="none" strokeLinecap="round">
          <path d="M40 104 Q70 86 100 102 T160 98" stroke={gold} strokeWidth="3" />
          <path d="M46 120 Q76 104 104 118 T160 114" stroke={gold} strokeWidth="2" opacity="0.7" />
          <path d="M60 86 Q84 72 104 84 T150 82" stroke={gold} strokeWidth="1.6" opacity="0.5" />
        </g>
      )
    case 'drizzle':
      return <path d="M52 80 L72 112 L86 70 L102 116 L118 66 L132 110 L150 76" stroke={accent} strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />
    case 'dots':
      return (
        <g fill={accent}>
          <circle cx="82" cy="100" r="5" /><circle cx="100" cy="100" r="5" /><circle cx="118" cy="100" r="5" />
        </g>
      )
    case 'gold':
      return <path d="M96 66 L110 70 L114 82 L104 90 L92 86 L88 74 Z" fill={gold} opacity="0.95" />
    default:
      return null
  }
}

function Box({ uid, shell, accent, light, dark }) {
  const gold = `url(#gold-${uid})`
  return (
    <g>
      {/* base */}
      <path d="M34 92 L166 92 L160 156 Q160 162 154 162 L46 162 Q40 162 40 156 Z" fill={dark} />
      {/* lid */}
      <rect x="26" y="62" width="148" height="38" rx="8" fill={`url(#body-${uid})`} />
      <rect x="26" y="62" width="148" height="38" rx="8" fill="none" stroke={gold} strokeOpacity="0.6" strokeWidth="1.5" />
      {/* ribbons */}
      <rect x="92" y="62" width="16" height="100" fill={accent} />
      <rect x="92" y="62" width="4" height="100" fill="#fff" opacity="0.18" />
      <rect x="40" y="122" width="120" height="12" fill={accent} opacity="0.9" />
      {/* bow */}
      <path d="M100 60 C80 34 58 40 66 56 C72 66 88 64 100 60 Z" fill={accent} />
      <path d="M100 60 C120 34 142 40 134 56 C128 66 112 64 100 60 Z" fill={accent} />
      <path d="M100 60 C86 50 72 52 72 56" stroke="#000" strokeOpacity="0.15" fill="none" />
      <circle cx="100" cy="60" r="7" fill={gold} />
      {/* monogram */}
      <text x="56" y="88" fontFamily="Playfair Display, serif" fontSize="14" fontStyle="italic" fill={gold}>CD</text>
      <ellipse cx="70" cy="70" rx="30" ry="4" fill="#fff" opacity="0.12" />
      <rect x="40" y="100" width="120" height="3" fill={light} opacity="0.12" />
    </g>
  )
}
