import { useEffect, useRef, useState } from 'react';

export const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [runId, setRunId] = useState(0); // cambia para reiniciar la partida

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 1;
    let dy = 0;
    let currentScore = 0;
    let isDead = false;

    // Control por teclado
    const handleKeyDown = (e) => {
      if (e.key.startsWith('Arrow')) e.preventDefault(); // evita que la página haga scroll
      switch (e.key) {
        case 'ArrowUp':
          if (dy === 0) { dx = 0; dy = -1; }
          break;
        case 'ArrowDown':
          if (dy === 0) { dx = 0; dy = 1; }
          break;
        case 'ArrowLeft':
          if (dx === 0) { dx = -1; dy = 0; }
          break;
        case 'ArrowRight':
          if (dx === 0) { dx = 1; dy = 0; }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // La manzana nunca aparece encima de la serpiente
    const spawnFood = () => {
      let pos;
      do {
        pos = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount),
        };
      } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
      return pos;
    };

    // Bucle principal del juego
    const gameInterval = setInterval(() => {
      if (isDead) return;

      // Mover cabeza
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      // Colisión con bordes
      if (
        head.x < 0 ||
        head.x >= tileCount ||
        head.y < 0 ||
        head.y >= tileCount
      ) {
        isDead = true;
        setGameOver(true);
        return;
      }

      // Colisión con el propio cuerpo
      for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
          isDead = true;
          setGameOver(true);
          return;
        }
      }

      snake.unshift(head);

      // Comer manzana
      if (head.x === food.x && head.y === food.y) {
        currentScore += 10;
        setScore(currentScore);
        food = spawnFood();
      } else {
        snake.pop();
      }

      // Renderizado en Canvas
      ctx.fillStyle = '#0f172a'; // Fondo
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dibujar manzana
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

      // Dibujar serpiente
      ctx.fillStyle = '#06b6d4';
      snake.forEach((segment) => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
      });
    }, 100);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [runId]);

  // Reinicia la partida sin recargar toda la página
  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    setRunId((id) => id + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-cyan-400">🐍 Snake Arcade</h2>
      <p className="text-slate-400 mb-4">Usa las flechas del teclado para jugar</p>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-2 border-cyan-500 rounded-lg bg-slate-950 shadow-lg shadow-cyan-500/20 max-w-full"
        />
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg">
            <h3 className="text-3xl font-extrabold text-red-500 mb-2">¡GAME OVER!</h3>
            <p className="text-lg text-slate-300 mb-4">Puntaje Final: {score}</p>
            <button
              onClick={restartGame}
              className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Jugar de nuevo
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 text-xl font-semibold">
        Puntaje: <span className="text-cyan-400">{score}</span>
      </div>
    </div>
  );
};
