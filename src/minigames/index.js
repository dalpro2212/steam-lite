import { SnakeGame } from './SnakeGame'
import { MemoryGame } from './MemoryGame'
import { SpaceRunnerGame } from './SpaceRunnerGame'
import { PixelRacerGame } from './PixelRacerGame'
import { TicTacToeGame } from './TicTacToeGame'
import { BugHunterGame } from './BugHunterGame'

// id del juego (games.json) -> componente del mini-juego
export const MINIGAMES = {
  'snake-classic': SnakeGame,
  'cyber-memory': MemoryGame,
  'space-runner': SpaceRunnerGame,
  'pixel-racer': PixelRacerGame,
  'neon-tictactoe': TicTacToeGame,
  'bug-hunter': BugHunterGame,
}
