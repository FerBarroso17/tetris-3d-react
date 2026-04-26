import { Constants } from '../core/Constants';

export const getRandomPiece = () => {
  const pieces = Object.keys(Constants.SHAPES);
  const type = pieces[Math.floor(Math.random() * pieces.length)];
  return {
    type,
    shape: Constants.SHAPES[type],
    x: Math.floor(Constants.BOARD_WIDTH / 2) - Math.floor(Constants.SHAPES[type][0].length / 2),
    y: 0
  };
};

export const checkCollision = (piece, board, dx = 0, dy = 0, newShape = null) => {
  const shape = newShape || piece.shape;
  
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newX = piece.x + x + dx;
        const newY = piece.y + y + dy;

        // Check boundaries
        if (newX < 0 || newX >= Constants.BOARD_WIDTH || newY >= Constants.BOARD_HEIGHT) {
          return true;
        }

        // Check board collision (only if newY is positive, to allow pieces to spawn slightly above)
        if (newY >= 0 && board[newY][newX]) {
          return true;
        }
      }
    }
  }
  return false;
};

export const rotateShape = (shape) => {
  // Transpose then reverse each row (rotate 90deg clockwise)
  const rows = shape.length;
  const cols = shape[0].length;
  const newShape = Array.from({ length: cols }, () => Array(rows).fill(0));
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      newShape[x][rows - 1 - y] = shape[y][x];
    }
  }
  return newShape;
};

export const clearLines = (board) => {
  let linesCleared = 0;
  const newBoard = board.filter(row => {
    const isLineFull = row.every(cell => cell !== null);
    if (isLineFull) linesCleared++;
    return !isLineFull;
  });

  // Add empty lines at the top
  while (newBoard.length < Constants.BOARD_HEIGHT) {
    newBoard.unshift(Array(Constants.BOARD_WIDTH).fill(null));
  }

  return { newBoard, linesCleared };
};

export const lockPiece = (piece, board) => {
  const newBoard = board.map(row => [...row]);
  let isGameOver = false;

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.y + y;
        const boardX = piece.x + x;
        
        if (boardY < 0) {
          isGameOver = true;
        } else if (boardY < Constants.BOARD_HEIGHT) {
          newBoard[boardY][boardX] = piece.type;
        }
      }
    }
  }

  return { newBoard, isGameOver };
};
