import { useState } from 'react';

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const getWinner = (b) => {
  for (const [a, c, d] of LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return null;
};

// La CPU intenta ganar, luego bloquear, luego el centro y si no, al azar
const cpuMove = (b) => {
  const empty = b.map((v, i) => (v ? null : i)).filter((i) => i !== null);
  const findWinning = (mark) =>
    empty.find((i) => {
      const t = [...b];
      t[i] = mark;
      return getWinner(t) === mark;
    });
  const win = findWinning('O');
  if (win !== undefined) return win;
  const block = findWinning('X');
  if (block !== undefined) return block;
  if (!b[4]) return 4;
  return empty[Math.floor(Math.random() * empty.length)];
};

export const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [thinking, setThinking] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });

  const winner = getWinner(board);
  const isDraw = !winner && board.every(Boolean);
  const finished = Boolean(winner) || isDraw;

  const addScore = (key) => setScores((s) => ({ ...s, [key]: s[key] + 1 }));

  const handleClick = (i) => {
    if (board[i] || finished || thinking) return;

    const next = [...board];
    next[i] = 'X';
    setBoard(next);

    if (getWinner(next)) return addScore('X');
    if (next.every(Boolean)) return addScore('draw');

    setThinking(true);
    setTimeout(() => {
      const after = [...next];
      after[cpuMove(next)] = 'O';
      setBoard(after);
      setThinking(false);
      if (getWinner(after)) addScore('O');
      else if (after.every(Boolean)) addScore('draw');
    }, 450);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setThinking(false);
  };

  const message = winner
    ? winner === 'X' ? '🎉 ¡Ganaste!' : '🤖 Ganó la CPU'
    : isDraw ? '🤝 ¡Empate!' : thinking ? 'La CPU está pensando...' : 'Tu turno (X)';

  return (
    <div className="flex flex-col items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-cyan-400">⭕ Neon Tic-Tac-Toe</h2>
      <p className="text-slate-300 mb-4 h-6">{message}</p>

      <div className="grid grid-cols-3 gap-2 w-64">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            aria-label={`Casilla ${i + 1}`}
            className={`aspect-square rounded-lg bg-slate-950 border-2 border-slate-700 hover:border-cyan-500 text-5xl font-extrabold transition-colors ${
              cell === 'X' ? 'text-cyan-400' : 'text-pink-400'
            }`}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="flex gap-6 mt-5 text-sm text-slate-300">
        <span>Tú: <b className="text-cyan-400">{scores.X}</b></span>
        <span>Empates: <b>{scores.draw}</b></span>
        <span>CPU: <b className="text-pink-400">{scores.O}</b></span>
      </div>

      <button onClick={reset} className="mt-5 px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
        Nueva partida
      </button>
    </div>
  );
};
