import { Link } from 'react-router-dom'
import { Library as LibraryIcon, Play } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { GameCover } from '../components/games/GameCover'

const Library = () => {
  const { libraryGames, loading } = useShop()

  if (loading) return <p className="text-center text-slate-400 py-20">Cargando biblioteca...</p>

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-white mb-6 flex items-center gap-3">
        <LibraryIcon className="text-cyan-400" /> Mi biblioteca
      </h1>

      {libraryGames.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-slate-400 mb-4">Aún no tienes juegos. ¡Visita la tienda!</p>
          <Link to="/" className="px-5 py-2 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400">
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {libraryGames.map((game) => (
            <article key={game.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/60 transition-colors">
              <GameCover game={game} className="w-full h-40" />
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-bold text-white truncate">{game.title}</h2>
                  <span className="text-xs text-cyan-400">{game.genre}</span>
                </div>
                <Link to={`/play/${game.id}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-black font-bold hover:bg-emerald-400">
                  <Play size={16} /> Jugar
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Library
