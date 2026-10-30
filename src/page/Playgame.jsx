import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { MINIGAMES } from '../minigames'

const PlayGame = () => {
  const { id } = useParams()
  const { games, loading, isOwned } = useShop()

  if (loading) return <p className="text-center text-slate-400 py-20">Cargando juego...</p>

  const game = games.find((g) => g.id === id)
  if (!game) return <Navigate to="/" replace />

  // Solo se puede jugar si el juego está en la biblioteca
  if (!isOwned(id)) return <Navigate to={`/game/${id}`} replace />

  const GameComponent = MINIGAMES[id]

  return (
    <div>
      <Link to="/library" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-4 text-sm">
        <ArrowLeft size={16} /> Volver a la biblioteca
      </Link>
      {GameComponent ? (
        <GameComponent />
      ) : (
        <p className="text-center text-slate-400 py-16">Este juego aún no está disponible.</p>
      )}
    </div>
  )
}

export default PlayGame
