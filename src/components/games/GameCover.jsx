import { useState } from 'react'

// Muestra la portada del juego; si no hay imagen (o falla la carga)
// usa un degradado con el emoji del juego.
export const GameCover = ({ game, className = '' }) => {
  const [failed, setFailed] = useState(false)
  const [from, to] = game.colors

  if (game.cover && !failed) {
    return (
      <img
        src={game.cover}
        alt={game.title}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`object-cover ${className}`}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={game.title}
      className={`flex items-center justify-center text-6xl ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {game.emoji}
    </div>
  )
}
