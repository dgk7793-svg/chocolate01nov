import { Component, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AlertTriangle, Compass } from 'lucide-react'
import { useStore } from './context/StoreContext'
import { TopNav, BottomNav, FloatingCart } from './components/Navigation'
import Footer from './components/Footer'
import Toaster from './components/Toaster'
import EmptyState from './components/EmptyState'
import Page from './components/Page'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import BuildBox from './pages/BuildBox'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Occasions from './pages/Occasions'
import Boutiques from './pages/Boutiques'
import Profile from './pages/Profile'
import Credits from './pages/Credits'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function ErrorFallback({ onRetry }) {
  const { t } = useStore()
  return (
    <Page className="grid min-h-[70vh] place-items-center">
      <EmptyState icon={AlertTriangle} title={t.error.title} sub={t.error.sub} cta={t.error.retry} onClick={onRetry} />
    </Page>
  )
}

class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('Cacao Dunes error:', error, info)
  }
  render() {
    if (this.state.error) return <ErrorFallback onRetry={() => this.setState({ error: null })} />
    return this.props.children
  }
}

function NotFound() {
  const { t } = useStore()
  return (
    <Page className="grid min-h-[70vh] place-items-center">
      <EmptyState icon={Compass} title={t.error.notFound} sub={t.error.notFoundSub} cta={t.error.home} to="/" />
    </Page>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <div className="relative min-h-screen">
      <div className="ambient" />
      <div className="grain" />
      <ScrollToTop />
      <TopNav />
      <Toaster />
      <ErrorBoundary key={location.pathname}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/build" element={<BuildBox />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/occasions" element={<Occasions />} />
            <Route path="/boutiques" element={<Boutiques />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </ErrorBoundary>
      <Footer />
      <FloatingCart />
      <BottomNav />
    </div>
  )
}
