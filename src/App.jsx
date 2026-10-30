import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import AppRoutes from './routes/AppRoutes'

function App() {
  const { pathname } = useLocation()

  // Al cambiar de ruta, volver al inicio de la página
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
