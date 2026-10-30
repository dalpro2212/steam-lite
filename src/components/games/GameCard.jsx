import { Link } from 'react-router-dom'
import { Check, Star } from 'lucide-react'
import { GameCover } from './GameCover'
import { GameActions } from './GameActions'
import { useShop } from '../../context/ShopContext'
import { formatPrice } from '../../utils/formatPrice'

export const GameCard = ({ game }) => {
  const { isOwned } = useShop()
  const owned = isOwned(game.id)

  return (
    <article className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col hover:border-cyan-500/60 hover:-translate-y-1 transition-all">
      <Link to={`/game/${game.id}`} className="relative block">
        <GameCover game={game} className="w-full h-44" />
        {owned && (
          <span className="absolute top-2 left-2 flex items-center gap-1 bg-emerald-500 text-black text-xs font-bold px-2 py-1 rounded-md">
            <Check size={14} /> En tu Biblioteca
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
              {game.genre}
            </span>
            <span className="flex items-center gap-1 text-sm text-amber-400">
              <Star size={14} fill="currentColor" /> {game.rating}
            </span>
          </div>
          <Link to={`/game/${game.id}`} className="text-lg font-bold text-white hover:text-cyan-400 transition-colors">
            {game.title}
          </Link>
        </div>

        <p className="text-sm text-slate-400 line-clamp-2">{game.description}</p>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className={`font-bold ${game.price === 0 ? 'text-emerald-400' : 'text-white'}`}>
            {formatPrice(game.price)}
          </span>
          <GameActions game={game} />
        </div>
      </div>
    </article>
  )
}
