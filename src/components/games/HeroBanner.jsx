import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { GameCover } from './GameCover'
import { GameActions } from './GameActions'
import { formatPrice } from '../../utils/formatPrice'

// Carrusel de juegos destacados
export const HeroBanner = ({ games }) => {
  const [current, setCurrent] = useState(0)
  const total = games.length

  // Cambio automático cada 5 segundos
  useEffect(() => {
    if (total < 2) return
    const timer = setInterval(() => setCurrent((c) => (c + 1) % total), 5000)
    return () => clearInterval(timer)
  }, [total, current])

  if (total === 0) return null

  const game = games[current % total]
  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  return (
    <section className="relative rounded-2xl overflow-hidden border border-slate-800 mb-8">
      <GameCover game={game} className="w-full h-72 md:h-96 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 flex flex-col gap-3">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Destacado</span>
        <Link to={`/game/${game.id}`} className="text-3xl md:text-5xl font-extrabold text-white hover:text-cyan-400 transition-colors">
          {game.title}
        </Link>
        <p className="text-slate-300 max-w-2xl line-clamp-2">{game.description}</p>
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star size={16} fill="currentColor" /> {game.rating}
          </span>
          <span className="text-lg font-bold text-white">{formatPrice(game.price)}</span>
          <GameActions game={game} size="lg" />
        </div>
      </div>

      {total > 1 && (
        <>
          <button onClick={prev} aria-label="Anterior" className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-800 p-2 rounded-full text-white">
            <ChevronLeft />
          </button>
          <button onClick={next} aria-label="Siguiente" className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-800 p-2 rounded-full text-white">
            <ChevronRight />
          </button>
          <div className="absolute top-4 right-4 flex gap-2">
            {games.map((g, i) => (
              <button
                key={g.id}
                onClick={() => setCurrent(i)}
                aria-label={`Ir a ${g.title}`}
                className={`h-2 rounded-full transition-all ${i === current % total ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-500'}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
