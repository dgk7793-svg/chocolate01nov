import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { dict } from '../data/i18n'
import { getProduct, priceFor } from '../data/mockData'

const StoreContext = createContext(null)

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable (private mode); state still works in memory */
  }
}

function usePersisted(key, fallback) {
  const [value, setValue] = useState(() => load(key, fallback))
  useEffect(() => save(key, value), [key, value])
  return [value, setValue]
}

export function StoreProvider({ children }) {
  const [lang, setLang] = usePersisted('cd-lang', 'en')
  const [theme, setTheme] = usePersisted('cd-theme', 'dark')
  const [cart, setCart] = usePersisted('cd-cart', [])
  const [wishlist, setWishlist] = usePersisted('cd-wishlist', [])
  const [orders, setOrders] = usePersisted('cd-orders', [])
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = lang === 'ar' ? 'rtl' : 'ltr'
    html.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#140B07' : '#F8F0E4')
  }, [lang, theme])

  const t = dict[lang]
  const isRTL = lang === 'ar'
  const tr = useCallback((obj) => (obj ? obj[lang] ?? obj.en : ''), [lang])
  const money = useCallback(
    (n) => {
      const v = Number(n).toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })
      return lang === 'ar' ? `${v} د.إ` : `AED ${v}`
    },
    [lang]
  )

  const toast = useCallback((message, kind = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((ts) => [...ts.slice(-2), { id, message, kind }])
    setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 2800)
  }, [])

  const addToCart = useCallback(
    (productId, pieces = 4, qty = 1, { silent } = {}) => {
      const product = getProduct(productId)
      if (!product) return toast(dict[lang].error.title, 'error')
      const key = `${productId}-${pieces}`
      setCart((c) => {
        const found = c.find((i) => i.key === key)
        if (found) return c.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
        return [...c, { key, type: 'product', productId, pieces, qty, price: priceFor(product, pieces) }]
      })
      if (!silent) toast(`${product.name[lang]} ${dict[lang].toast.cartAdd}`)
    },
    [lang, setCart, toast]
  )

  const addBoxToCart = useCallback(
    (box) => {
      const key = `box-${Date.now()}`
      setCart((c) => [...c, { key, type: 'box', qty: 1, ...box }])
      toast(dict[lang].toast.boxAdd)
    },
    [lang, setCart, toast]
  )

  const updateQty = useCallback(
    (key, delta) => setCart((c) => c.flatMap((i) => (i.key !== key ? [i] : i.qty + delta <= 0 ? [] : [{ ...i, qty: i.qty + delta }]))),
    [setCart]
  )
  const removeFromCart = useCallback(
    (key) => {
      setCart((c) => c.filter((i) => i.key !== key))
      toast(dict[lang].toast.removed, 'info')
    },
    [lang, setCart, toast]
  )
  const clearCart = useCallback(() => setCart([]), [setCart])

  const toggleWish = useCallback(
    (id) => {
      const has = wishlist.includes(id)
      setWishlist((w) => (has ? w.filter((x) => x !== id) : [...w, id]))
      toast(has ? dict[lang].toast.wishRemove : dict[lang].toast.wishAdd, has ? 'info' : 'love')
    },
    [lang, wishlist, setWishlist, toast]
  )

  const placeOrder = useCallback(
    (details) => {
      const id = `CD-${Math.floor(21000 + Math.random() * 8999)}`
      const order = { id, date: new Date().toISOString().slice(0, 10), status: 'processing', items: cart, ...details }
      setOrders((o) => [order, ...o])
      setCart([])
      return order
    },
    [cart, setCart, setOrders]
  )

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const value = useMemo(
    () => ({
      lang, setLang, theme, setTheme, t, tr, isRTL, money,
      cart, cartCount, subtotal, addToCart, addBoxToCart, updateQty, removeFromCart, clearCart,
      wishlist, toggleWish, orders, placeOrder, toasts, toast,
    }),
    [lang, setLang, theme, setTheme, t, tr, isRTL, money, cart, cartCount, subtotal, addToCart, addBoxToCart, updateQty, removeFromCart, clearCart, wishlist, toggleWish, orders, placeOrder, toasts, toast]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
