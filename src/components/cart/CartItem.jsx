import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { GameCover } from '../games/GameCover'
import { formatPrice } from '../../utils/formatPrice'

export const CartItem = ({ game, onRemove }) => (
  <li className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl p-3">
    <GameCover game={game} className="w-24 h-16 rounded-lg shrink-0 !text-3xl" />
    <div className="flex-1 min-w-0">
      <Link to={`/game/${game.id}`} className="font-bold text-white hover:text-cyan-400 truncate block">
        {game.title}
      </Link>
      <span className="text-xs text-cyan-400">{game.genre}</span>
    </div>
    <span className="font-bold text-white">{formatPrice(game.price)}</span>
    <button
      onClick={() => onRemove(game.id)}
      aria-label={`Quitar ${game.title} del carrito`}
      className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
    >
      <Trash2 size={18} />
    </button>
  </li>
)
