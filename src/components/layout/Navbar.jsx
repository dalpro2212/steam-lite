import { Link, NavLink } from 'react-router-dom'
import { Gamepad2, Library, ShoppingCart, Store } from 'lucide-react'
import { useShop } from '../../context/ShopContext'

const linkClass = ({ isActive }) =>
  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'bg-slate-800 text-cyan-400'
      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
  }`

export const Navbar = () => {
  const { cart, library } = useShop()

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-white">
          <Gamepad2 className="text-cyan-400" size={28} />
          Steam<span className="text-cyan-400">Lite</span>
        </Link>

        <div className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            <Store size={18} />
            <span className="hidden sm:inline">Tienda</span>
          </NavLink>

          <NavLink to="/library" className={linkClass}>
            <Library size={18} />
            <span className="hidden sm:inline">Biblioteca</span>
            {library.length > 0 && (
              <span className="bg-emerald-500 text-black text-xs font-bold rounded-full px-2 py-0.5">
                {library.length}
              </span>
            )}
          </NavLink>

          <NavLink to="/cart" className={linkClass}>
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Carrito</span>
            {cart.length > 0 && (
              <span className="bg-cyan-500 text-black text-xs font-bold rounded-full px-2 py-0.5">
                {cart.length}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
