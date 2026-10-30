import { useEffect, useRef, useState } from 'react';

export const SpaceRunnerGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    const ship = { x: W / 2, y: H - 50, speed: 5 };
    const stars = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      s: Math.random() * 2 + 0.5,
    }));
    let rocks = [];
    const keys = {};
    let frame = 0;
    let shownScore = 0;
    let dead = false;
    let raf;

    const down = (e) => {
      if (e.key.startsWith('Arrow')) {
        e.preventDefault();
        keys[e.key] = true;
      }
    };
    const up = (e) => { keys[e.key] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);

    const loop = () => {
      if (dead) return;
      frame++;

      // Movimiento de la nave
      if (keys.ArrowLeft) ship.x -= ship.speed;
      if (keys.ArrowRight) ship.x += ship.speed;
      if (keys.ArrowUp) ship.y -= ship.speed;
      if (keys.ArrowDown) ship.y += ship.speed;
      ship.x = Math.max(15, Math.min(W - 15, ship.x));
      ship.y = Math.max(20, Math.min(H - 20, ship.y));

      // Meteoritos: aparecen más rápido con el tiempo
      const spawnEvery = Math.max(12, 40 - Math.floor(frame / 300));
      if (frame % spawnEvery === 0) {
        rocks.push({
          x: Math.random() * W,
          y: -20,
          r: 10 + Math.random() * 14,
          v: 2 + Math.random() * 2 + frame / 1500,
        });
      }
      rocks.forEach((r) => { r.y += r.v; });
      rocks = rocks.filter((r) => r.y < H + 30);

      // Colisión nave - meteorito
      for (const r of rocks) {
        const dist = Math.hypot(r.x - ship.x, r.y - ship.y);
        if (dist < r.r + 12) {
          dead = true;
          setGameOver(true);
          return;
        }
      }

      const currentScore = Math.floor(frame / 6);
      if (currentScore !== shownScore) {
        shownScore = currentScore;
        setScore(currentScore);
      }

      // Dibujo
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#e0e7ff';
      stars.forEach((s) => {
        s.y += s.s;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
        ctx.fillRect(s.x, s.y, s.s, s.s);
      });

      ctx.fillStyle = '#f97316';
      rocks.forEach((r) => {
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Nave (triángulo synthwave)
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.moveTo(ship.x, ship.y - 18);
      ctx.lineTo(ship.x - 15, ship.y + 16);
      ctx.lineTo(ship.x + 15, ship.y + 16);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#22d3ee';
      ctx.fillRect(ship.x - 3, ship.y - 4, 6, 10);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [runId]);

  const restart = () => {
    setScore(0);
    setGameOver(false);
    setRunId((id) => id + 1);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-pink-400">🚀 Space Runner 2099</h2>
      <p className="text-slate-400 mb-4">Mueve la nave con las flechas y esquiva los meteoritos</p>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={500}
          className="border-2 border-pink-500 rounded-lg shadow-lg shadow-pink-500/20 max-w-full"
        />
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg">
            <h3 className="text-3xl font-extrabold text-red-500 mb-2">¡GAME OVER!</h3>
            <p className="text-lg text-slate-300 mb-4">Puntaje Final: {score}</p>
            <button onClick={restart} className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
              Jugar de nuevo
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 text-xl font-semibold">
        Puntaje: <span className="text-pink-400">{score}</span>
      </div>
    </div>
  );
};
