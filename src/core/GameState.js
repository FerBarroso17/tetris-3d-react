import { create } from 'zustand';
import { Constants } from './Constants';

const createEmptyBoard = () => 
  Array.from({ length: Constants.BOARD_HEIGHT }, () => 
    Array(Constants.BOARD_WIDTH).fill(null)
  );

export const useGameState = create((set, get) => ({
  // Core State
  board: createEmptyBoard(),
  activePiece: null, // { type: 'T', shape: [[]], x: 3, y: 0 }
  nextPiece: null,
  
  // Progression
  score: 0,
  level: 1,
  lines: 0,
  
  // Game Flow
  isPlaying: false,
  isGameOver: false,
  isPaused: false,

  // Actions
  startGame: () => set({
    board: createEmptyBoard(),
    score: 0,
    level: 1,
    lines: 0,
    isPlaying: true,
    isGameOver: false,
    isPaused: false,
    activePiece: null,
    nextPiece: null
  }),

  setGameOver: () => set({ isPlaying: false, isGameOver: true }),
  
  setPaused: (paused) => set({ isPaused: paused }),

  updateBoard: (newBoard) => set({ board: newBoard }),
  
  setActivePiece: (piece) => set({ activePiece: piece }),
  
  setNextPiece: (piece) => set({ nextPiece: piece }),

  addScore: (linesCleared) => {
    const { level, score, lines } = get();
    // Classic scoring: 40, 100, 300, 1200 * level
    const lineScores = [0, 40, 100, 300, 1200];
    const points = lineScores[linesCleared] * level;
    const newLines = lines + linesCleared;
    const newLevel = Math.floor(newLines / Constants.LINES_PER_LEVEL) + 1;
    
    set({
      score: score + points,
      lines: newLines,
      level: newLevel
    });
  },

  reset: () => set({
    board: createEmptyBoard(),
    activePiece: null,
    nextPiece: null,
    score: 0,
    level: 1,
    lines: 0,
    isPlaying: false,
    isGameOver: false,
    isPaused: false
  })
}));
