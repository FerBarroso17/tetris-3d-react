export const Constants = {
  BOARD_WIDTH: 10,
  BOARD_HEIGHT: 20,
  INITIAL_DROP_INTERVAL: 1000,
  MIN_DROP_INTERVAL: 100,
  SPEED_MULTIPLIER: 0.85, // 15% faster per level
  LINES_PER_LEVEL: 10,

  COLORS: {
    I: '#00ffff', // Cyan
    J: '#0000ff', // Blue
    L: '#ff7f00', // Orange
    O: '#ffff00', // Yellow
    S: '#00ff00', // Green
    T: '#800080', // Purple
    Z: '#ff0000', // Red
    GHOST: 'rgba(255, 255, 255, 0.2)',
    BOARD_BG: '#0f172a',
    GRID_LINE: '#1e293b'
  },

  SHAPES: {
    I: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    J: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    L: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    O: [
      [1, 1],
      [1, 1]
    ],
    S: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    T: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    Z: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ]
  }
};

export const Events = {
  // Input
  INPUT_LEFT: 'input:left',
  INPUT_RIGHT: 'input:right',
  INPUT_DOWN: 'input:down',
  INPUT_HARD_DROP: 'input:hard_drop',
  INPUT_ROTATE: 'input:rotate',

  // Game Flow
  GAME_START: 'game:start',
  GAME_OVER: 'game:over',
  GAME_PAUSED: 'game:paused',
  GAME_RESUMED: 'game:resumed',
  GAME_RESTART: 'game:restart',

  // Mechanics
  PIECE_SPAWNED: 'piece:spawned',
  PIECE_LOCKED: 'piece:locked',
  LINE_CLEARED: 'line:cleared',
  LEVEL_UP: 'level:up',
  SCORE_UPDATED: 'score:updated'
};
