import { Link, Route, Routes } from 'react-router-dom'
import Home from '../page/home'
import GameDetail from '../page/GameDetail'
import CartCheckout from '../page/CartCheckout'
import Library from '../page/library'
import PlayGame from '../page/Playgame'

const NotFound = () => (
  <div className="text-center py-20">
    <h1 className="text-5xl font-extrabold text-cyan-400 mb-2">404</h1>
    <p className="text-slate-400 mb-6">Esta página no existe.</p>
    <Link to="/" className="px-5 py-2 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400">
      Volver a la tienda
    </Link>
  </div>
)

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/game/:id" element={<GameDetail />} />
    <Route path="/cart" element={<CartCheckout />} />
    <Route path="/library" element={<Library />} />
    <Route path="/play/:id" element={<PlayGame />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default AppRoutes
