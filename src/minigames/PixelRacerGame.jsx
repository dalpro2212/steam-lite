import { useEffect, useRef, useState } from 'react';

const LANE_W = 100;
const CAR_W = 44;
const CAR_H = 72;
const ENEMY_COLORS = ['#ef4444', '#a855f7', '#22c55e', '#f8fafc'];

export const PixelRacerGame = () => {
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
    const playerY = H - 110;

    let lane = 1;
    let enemies = [];
    let frame = 0;
    let dist = 0;
    let shownScore = 0;
    let dead = false;
    let raf;

    const laneX = (l) => l * LANE_W + (LANE_W - CAR_W) / 2;

    const onKey = (e) => {
      if (e.key.startsWith('Arrow')) e.preventDefault();
      if (e.key === 'ArrowLeft') lane = Math.max(0, lane - 1);
      if (e.key === 'ArrowRight') lane = Math.min(2, lane + 1);
    };
    window.addEventListener('keydown', onKey);

    const drawCar = (x, y, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, CAR_W, CAR_H);
      ctx.fillStyle = '#0f172a'; // ventanas
      ctx.fillRect(x + 6, y + 14, CAR_W - 12, 14);
      ctx.fillRect(x + 6, y + 44, CAR_W - 12, 10);
      ctx.fillStyle = '#111827'; // ruedas
      ctx.fillRect(x - 4, y + 8, 4, 16);
      ctx.fillRect(x + CAR_W, y + 8, 4, 16);
      ctx.fillRect(x - 4, y + 48, 4, 16);
      ctx.fillRect(x + CAR_W, y + 48, 4, 16);
    };

    const loop = () => {
      if (dead) return;
      frame++;
      const speed = 4 + dist / 1200;
      dist += speed;

      // Tráfico enemigo
      const spawnEvery = Math.max(30, 75 - Math.floor(dist / 400));
      if (frame % spawnEvery === 0) {
        enemies.push({
          lane: Math.floor(Math.random() * 3),
          y: -CAR_H,
          color: ENEMY_COLORS[Math.floor(Math.random() * ENEMY_COLORS.length)],
        });
      }
      enemies.forEach((en) => { en.y += speed * 0.85; });
      enemies = enemies.filter((en) => en.y < H + CAR_H);

      // Colisión
      for (const en of enemies) {
        if (en.lane === lane && en.y + CAR_H > playerY && en.y < playerY + CAR_H) {
          dead = true;
          setGameOver(true);
          return;
        }
      }

      const currentScore = Math.floor(dist / 10);
      if (currentScore !== shownScore) {
        shownScore = currentScore;
        setScore(currentScore);
      }

      // Dibujo: carretera
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#f59e0b';
      const offset = dist % 40;
      for (let l = 1; l < 3; l++) {
        for (let y = -40 + offset; y < H; y += 40) {
          ctx.fillRect(l * LANE_W - 2, y, 4, 22);
        }
      }

      enemies.forEach((en) => drawCar(laneX(en.lane), en.y, en.color));
      drawCar(laneX(lane), playerY, '#06b6d4');

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
    };
  }, [runId]);

  const restart = () => {
    setScore(0);
    setGameOver(false);
    setRunId((id) => id + 1);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-amber-400">🏎️ Retro Pixel Racer</h2>
      <p className="text-slate-400 mb-4">Usa ← y → para cambiar de carril y esquivar el tráfico</p>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={300}
          height={480}
          className="border-2 border-amber-500 rounded-lg shadow-lg shadow-amber-500/20 max-w-full"
        />
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg">
            <h3 className="text-3xl font-extrabold text-red-500 mb-2">¡CHOQUE!</h3>
            <p className="text-lg text-slate-300 mb-4">Distancia: {score} m</p>
            <button onClick={restart} className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
              Jugar de nuevo
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 text-xl font-semibold">
        Distancia: <span className="text-amber-400">{score} m</span>
      </div>
    </div>
  );
};
