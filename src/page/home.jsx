import { useMemo, useState } from 'react'
import { useShop } from '../context/ShopContext'
import { HeroBanner } from '../components/games/HeroBanner'
import { GameFilters } from '../components/games/GameFilters'
import { GameGrid } from '../components/games/GameGrid'

const Home = () => {
  const { games, loading } = useShop()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('Todos')

  const genres = useMemo(() => [...new Set(games.map((g) => g.genre))], [games])
  const featured = useMemo(() => games.filter((g) => g.featured), [games])

  const filtered = useMemo(
    () =>
      games.filter((g) => {
        const matchGenre = selectedGenre === 'Todos' || g.genre === selectedGenre
        const matchSearch = g.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
        return matchGenre && matchSearch
      }),
    [games, searchTerm, selectedGenre],
  )

  const isFiltering = searchTerm.trim() !== '' || selectedGenre !== 'Todos'

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3 text-slate-400">
        <div className="w-10 h-10 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin" />
        Cargando catálogo...
      </div>
    )
  }

  return (
    <>
      <HeroBanner games={featured} />

      <GameFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={genres}
      />

      {isFiltering ? (
        filtered.length > 0 ? (
          <GameGrid games={filtered} />
        ) : (
          <p className="text-center text-slate-400 py-16">
            No se encontraron juegos con esos filtros 😕
          </p>
        )
      ) : (
        // Catálogo organizado por categorías
        genres.map((genre) => (
          <section key={genre} className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-cyan-500 rounded" />
              {genre}
            </h2>
            <GameGrid games={games.filter((g) => g.genre === genre)} />
          </section>
        ))
      )}
    </>
  )
}

export default Home
