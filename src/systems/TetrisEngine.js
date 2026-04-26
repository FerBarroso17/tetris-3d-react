import { useGameState } from '../core/GameState';
import { checkCollision, rotateShape, lockPiece, clearLines, getRandomPiece } from '../gameplay/TetrisLogic';
import { EventBus } from '../core/EventBus';
import { Events } from '../core/Constants';

// SOLID: SRP - Este servicio es el único responsable de aplicar las reglas de negocio y mutar el estado.
export class TetrisEngine {
  static moveLeft() {
    const { activePiece, board, setActivePiece } = useGameState.getState();
    if (activePiece && !checkCollision(activePiece, board, -1, 0)) {
      setActivePiece({ ...activePiece, x: activePiece.x - 1 });
    }
  }

  static moveRight() {
    const { activePiece, board, setActivePiece } = useGameState.getState();
    if (activePiece && !checkCollision(activePiece, board, 1, 0)) {
      setActivePiece({ ...activePiece, x: activePiece.x + 1 });
    }
  }

  static moveDown(resetTimerCallback) {
    const { activePiece, board, setActivePiece } = useGameState.getState();
    if (activePiece && !checkCollision(activePiece, board, 0, 1)) {
      setActivePiece({ ...activePiece, y: activePiece.y + 1 });
      if (resetTimerCallback) resetTimerCallback();
    }
  }

  static rotate() {
    const { activePiece, board, setActivePiece } = useGameState.getState();
    if (!activePiece) return;

    const newShape = rotateShape(activePiece.shape);
    let dx = 0;
    
    if (checkCollision(activePiece, board, 0, 0, newShape)) {
      if (!checkCollision(activePiece, board, -1, 0, newShape)) dx = -1;
      else if (!checkCollision(activePiece, board, 1, 0, newShape)) dx = 1;
      else if (!checkCollision(activePiece, board, -2, 0, newShape)) dx = -2;
      else if (!checkCollision(activePiece, board, 2, 0, newShape)) dx = 2;
      else return; // Rotación fallida
    }
    
    setActivePiece({ ...activePiece, shape: newShape, x: activePiece.x + dx });
  }

  static hardDrop(forceTickCallback) {
    const { activePiece, board, setActivePiece } = useGameState.getState();
    if (!activePiece) return;

    let dy = 0;
    while (!checkCollision(activePiece, board, 0, dy + 1)) {
      dy++;
    }
    setActivePiece({ ...activePiece, y: activePiece.y + dy });
    if (forceTickCallback) forceTickCallback();
  }

  static executeTick() {
    const state = useGameState.getState();
    const { activePiece, board, nextPiece, setActivePiece, setNextPiece, updateBoard, setGameOver, addScore } = state;

    if (!activePiece) return;

    if (!checkCollision(activePiece, board, 0, 1)) {
      setActivePiece({ ...activePiece, y: activePiece.y + 1 });
    } else {
      const { newBoard, isGameOver: gameLost } = lockPiece(activePiece, board);
      
      if (gameLost) {
        setGameOver();
      } else {
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        updateBoard(clearedBoard);
        
        if (linesCleared > 0) {
          addScore(linesCleared);
          EventBus.emit(Events.LINE_CLEARED, { count: linesCleared });
        }

        setActivePiece(nextPiece);
        setNextPiece(getRandomPiece());
      }
    }
  }

  static spawnInitialPieces() {
    const { setActivePiece, setNextPiece } = useGameState.getState();
    setActivePiece(getRandomPiece());
    setNextPiece(getRandomPiece());
  }
}
