import { useEffect, useState } from 'react';

const SYMBOLS = ['🤖', '👾', '🚀', '🧠', '💾', '🔮', '⚡', '🎮'];

const buildDeck = () =>
  [...SYMBOLS, ...SYMBOLS]
    .map((symbol, id) => ({ id, symbol }))
    .sort(() => Math.random() - 0.5);

export const MemoryGame = () => {
  const [cards, setCards] = useState(buildDeck);
  const [flipped, setFlipped] = useState([]); // ids volteadas en este turno
  const [matched, setMatched] = useState([]); // ids ya emparejadas
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [locked, setLocked] = useState(false);

  const won = matched.length === cards.length;
  const started = moves > 0;

  // Cronómetro: corre desde el primer movimiento hasta ganar
  useEffect(() => {
    if (!started || won) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [started, won]);

  const handleFlip = (card) => {
    if (locked || flipped.includes(card.id) || matched.includes(card.id)) return;

    const next = [...flipped, card.id];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [a, b] = next.map((id) => cards.find((c) => c.id === id));
      const isMatch = a.symbol === b.symbol;

      setTimeout(() => {
        if (isMatch) setMatched((m) => [...m, a.id, b.id]);
        setFlipped([]);
        setLocked(false);
      }, isMatch ? 400 : 800);
    }
  };

  const restart = () => {
    setCards(buildDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setSeconds(0);
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-purple-400">🧠 Cyber Memory</h2>
      <p className="text-slate-400 mb-4">Encuentra todas las parejas</p>

      <div className="flex gap-6 mb-4 text-lg font-semibold">
        <span>Movimientos: <span className="text-cyan-400">{moves}</span></span>
        <span>Tiempo: <span className="text-cyan-400">{seconds}s</span></span>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
        {cards.map((card) => {
          const visible = flipped.includes(card.id) || matched.includes(card.id);
          return (
            <button
              key={card.id}
              onClick={() => handleFlip(card)}
              aria-label={visible ? card.symbol : 'Carta oculta'}
              className={`aspect-square rounded-xl text-3xl flex items-center justify-center border-2 transition-all duration-200 ${
                matched.includes(card.id)
                  ? 'bg-emerald-500/20 border-emerald-500'
                  : visible
                    ? 'bg-slate-800 border-cyan-500'
                    : 'bg-slate-950 border-slate-700 hover:border-purple-500'
              }`}
            >
              {visible ? card.symbol : '❔'}
            </button>
          );
        })}
      </div>

      {won && (
        <div className="mt-5 text-center">
          <p className="text-2xl font-extrabold text-emerald-400">🎉 ¡Ganaste!</p>
          <p className="text-slate-300 mb-3">{moves} movimientos en {seconds} segundos</p>
        </div>
      )}

      <button
        onClick={restart}
        className="mt-5 px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
      >
        Reiniciar
      </button>
    </div>
  );
};
