
export const GameFilters = ({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  genres,
}) => {
  return (
    <div className="bg-slate-900 p-4 rounded-xl mb-6 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Buscador en tiempo real */}
      <div className="w-full md:w-1/2">
        <input
          type="text"
          placeholder="🔍 Buscar juego por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-950 text-white placeholder-slate-400 px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>

      {/* Filtro por Géneros */}
      <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
        <button
          onClick={() => setSelectedGenre('Todos')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            selectedGenre === 'Todos'
              ? 'bg-cyan-500 text-black font-bold'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Todos
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedGenre === genre
                ? 'bg-cyan-500 text-black font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};