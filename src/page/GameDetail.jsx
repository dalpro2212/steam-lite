import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Gamepad, Star } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { GameCover } from '../components/games/GameCover'
import { GameActions } from '../components/games/GameActions'
import { formatPrice } from '../utils/formatPrice'

const TABS = [
  { id: 'descripcion', label: 'Descripción' },
  { id: 'capturas', label: 'Capturas' },
  { id: 'resenas', label: 'Reseñas' },
]

const GameDetail = () => {
  const { id } = useParams()
  const { games, loading, isOwned } = useShop()
  const [tab, setTab] = useState('descripcion')

  if (loading) {
    return <p className="text-center text-slate-400 py-20">Cargando juego...</p>
  }

  const game = games.find((g) => g.id === id)

  if (!game) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 mb-4">No encontramos ese juego.</p>
        <Link to="/" className="text-cyan-400 hover:underline">Volver a la tienda</Link>
      </div>
    )
  }

  const [from, to] = game.colors

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-4 text-sm">
        <ArrowLeft size={16} /> Volver a la tienda
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="lg:col-span-2">
          <GameCover game={game} className="w-full h-64 md:h-96 rounded-2xl border border-slate-800" />

          {/* Pestañas */}
          <div className="flex gap-2 mt-6 border-b border-slate-800">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                  tab === t.id ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="py-5">
            {tab === 'descripcion' && (
              <div className="space-y-3">
                <p className="text-slate-300 leading-relaxed">{game.description}</p>
                <p className="text-sm text-slate-400 flex items-center gap-2">
                  <Gamepad size={16} className="text-cyan-400" /> Controles: {game.controls}
                </p>
              </div>
            )}

            {tab === 'capturas' && (
              <div className="grid sm:grid-cols-3 gap-4">
                {game.screenshots.map((label, i) => (
                  <figure key={label}>
                    <div
                      className="h-32 rounded-lg border border-slate-800 flex items-center justify-center text-4xl"
                      style={{ background: `linear-gradient(${135 + i * 60}deg, ${from}, ${to})` }}
                    >
                      {game.emoji}
                    </div>
                    <figcaption className="text-xs text-slate-400 mt-1 text-center">{label}</figcaption>
                  </figure>
                ))}
              </div>
            )}

            {tab === 'resenas' && (
              <ul className="space-y-3">
                {game.reviews.map((r) => (
                  <li key={r.user} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white">{r.user}</span>
                      <span className="flex gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }, (_, n) => (
                          <Star key={n} size={14} fill={n < r.rating ? 'currentColor' : 'none'} />
                        ))}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300">{r.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Panel de compra */}
        <aside className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit space-y-4 lg:sticky lg:top-24">
          <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">{game.genre}</span>
          <h1 className="text-3xl font-extrabold text-white">{game.title}</h1>
          <p className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star size={16} fill="currentColor" /> {game.rating} · {game.reviews.length} reseñas
          </p>
          <p className={`text-3xl font-extrabold ${game.price === 0 ? 'text-emerald-400' : 'text-white'}`}>
            {formatPrice(game.price)}
          </p>
          {isOwned(game.id) && (
            <p className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
              <Check size={16} /> En tu Biblioteca
            </p>
          )}
          <GameActions game={game} size="lg" />
        </aside>
      </div>
    </div>
  )
}

export default GameDetail
