import { Link } from 'react-router-dom'
import { Gift, Play, ShoppingCart } from 'lucide-react'
import { useShop } from '../../context/ShopContext'

// Botón dinámico: Comprar → En el carrito → Jugar (según localStorage)
export const GameActions = ({ game, size = 'sm' }) => {
  const { isOwned, isInCart, addToCart, claimFreeGame } = useShop()

  const sizes = size === 'lg' ? 'px-6 py-3 text-base' : 'px-3 py-1.5 text-sm'
  const btn = `inline-flex items-center gap-2 rounded-lg font-bold transition-colors whitespace-nowrap ${sizes}`

  if (isOwned(game.id)) {
    return (
      <Link to={`/play/${game.id}`} className={`${btn} bg-emerald-500 text-black hover:bg-emerald-400`}>
        <Play size={16} /> Jugar
      </Link>
    )
  }

  if (game.price === 0) {
    return (
      <button onClick={() => claimFreeGame(game.id)} className={`${btn} bg-cyan-500 text-black hover:bg-cyan-400`}>
        <Gift size={16} /> Obtener gratis
      </button>
    )
  }

  if (isInCart(game.id)) {
    return (
      <Link to="/cart" className={`${btn} bg-slate-700 text-white hover:bg-slate-600`}>
        <ShoppingCart size={16} /> En el carrito
      </Link>
    )
  }

  return (
    <button onClick={() => addToCart(game.id)} className={`${btn} bg-cyan-500 text-black hover:bg-cyan-400`}>
      <ShoppingCart size={16} /> Comprar
    </button>
  )
}
