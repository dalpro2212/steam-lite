import { useEffect, useState } from 'react';

const GAME_TIME = 30;

export const BugHunterGame = () => {
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [score, setScore] = useState(0);
  const [active, setActive] = useState(null); // hoyo donde está el bug

  const playing = running && timeLeft > 0;
  const finished = running && timeLeft <= 0;

  useEffect(() => {
    if (!playing) return;
    const tick = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    const spawn = setInterval(() => setActive(Math.floor(Math.random() * 9)), 700);
    return () => {
      clearInterval(tick);
      clearInterval(spawn);
    };
  }, [playing]);

  const start = () => {
    setScore(0);
    setTimeLeft(GAME_TIME);
    setActive(null);
    setRunning(true);
  };

  const hit = (i) => {
    if (!playing || i !== active) return;
    setScore((s) => s + 10);
    setActive(null);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-green-400">🐛 Bug Hunter</h2>
      <p className="text-slate-400 mb-4">Atrapa los bugs antes de que desaparezcan</p>

      <div className="flex gap-6 mb-4 text-lg font-semibold">
        <span>Puntos: <span className="text-green-400">{score}</span></span>
        <span>Tiempo: <span className="text-cyan-400">{timeLeft}s</span></span>
      </div>

      <div className="grid grid-cols-3 gap-3 w-64">
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i}
            onClick={() => hit(i)}
            aria-label={i === active && playing ? 'Bug' : 'Hoyo vacío'}
            className="aspect-square rounded-full bg-slate-950 border-2 border-slate-700 text-4xl flex items-center justify-center hover:border-green-500 transition-colors"
          >
            {playing && i === active ? '🐛' : ''}
          </button>
        ))}
      </div>

      {finished && (
        <p className="mt-5 text-2xl font-extrabold text-emerald-400">
          ⏱️ ¡Tiempo! Puntaje final: {score}
        </p>
      )}

      {!playing && (
        <button onClick={start} className="mt-5 px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
          {finished ? 'Jugar de nuevo' : 'Empezar'}
        </button>
      )}
    </div>
  );
};
