import { useRef } from 'react';
import { useGameState } from '../core/GameState';
import { Constants } from '../core/Constants';
import { useSpring, animated } from '@react-spring/three';

// Single block component with some "juice" (from game-designer skill)
const Block = ({ position, color, isGhost = false }) => {
  // Simple spawn animation for new blocks
  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { tension: 300, friction: 15 }
  });

  return (
    <animated.mesh position={position} scale={scale}>
      <boxGeometry args={[0.95, 0.95, 0.95]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={isGhost ? 0.1 : 0.5}
        transparent={isGhost}
        opacity={isGhost ? 0.3 : 1}
        roughness={0.2}
        metalness={0.8}
      />
    </animated.mesh>
  );
};

export const GameBoard = () => {
  const { board, activePiece } = useGameState();
  
  // Center board
  const offsetX = -Constants.BOARD_WIDTH / 2 + 0.5;
  const offsetY = Constants.BOARD_HEIGHT / 2 - 0.5;

  // Render locked blocks
  const lockedBlocks = [];
  board.forEach((row, y) => {
    row.forEach((type, x) => {
      if (type) {
        lockedBlocks.push(
          <Block 
            key={`locked-${x}-${y}`} 
            position={[x + offsetX, -y + offsetY, 0]} 
            color={Constants.COLORS[type]} 
          />
        );
      }
    });
  });

  // Render active piece
  const activeBlocks = [];
  if (activePiece) {
    activePiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          activeBlocks.push(
            <Block 
              key={`active-${x}-${y}`} 
              position={[activePiece.x + x + offsetX, -(activePiece.y + y) + offsetY, 0]} 
              color={Constants.COLORS[activePiece.type]} 
            />
          );
        }
      });
    });
  }

  // Board Backing Grid (visuals)
  const gridLines = [];
  for (let i = 0; i <= Constants.BOARD_WIDTH; i++) {
    gridLines.push(
      <mesh key={`v-${i}`} position={[i + offsetX - 0.5, 0, -0.5]}>
        <boxGeometry args={[0.02, Constants.BOARD_HEIGHT, 0.02]} />
        <meshBasicMaterial color={Constants.COLORS.GRID_LINE} transparent opacity={0.3} />
      </mesh>
    );
  }
  for (let i = 0; i <= Constants.BOARD_HEIGHT; i++) {
    gridLines.push(
      <mesh key={`h-${i}`} position={[0, i - Constants.BOARD_HEIGHT / 2 - 0.5, -0.5]}>
        <boxGeometry args={[Constants.BOARD_WIDTH, 0.02, 0.02]} />
        <meshBasicMaterial color={Constants.COLORS.GRID_LINE} transparent opacity={0.3} />
      </mesh>
    );
  }

  return (
    <group>
      {/* Background Panel */}
      <mesh position={[0, 0, -0.6]}>
        <boxGeometry args={[Constants.BOARD_WIDTH, Constants.BOARD_HEIGHT, 0.1]} />
        <meshStandardMaterial color={Constants.COLORS.BOARD_BG} roughness={0.9} />
      </mesh>
      
      {/* Grid Lines */}
      {gridLines}

      {/* Blocks */}
      {lockedBlocks}
      {activeBlocks}
    </group>
  );
};
