import { useEffect } from 'react';
import { Events } from '../core/Constants';
import { EventBus } from '../core/EventBus';
import { useGameState } from '../core/GameState';

export const useInputSystem = () => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const { isPlaying, isPaused, isGameOver } = useGameState.getState();
      
      if (!isPlaying || isPaused || isGameOver) return;

      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          EventBus.emit(Events.INPUT_LEFT);
          break;
        case 'ArrowRight':
        case 'KeyD':
          EventBus.emit(Events.INPUT_RIGHT);
          break;
        case 'ArrowDown':
        case 'KeyS':
          EventBus.emit(Events.INPUT_DOWN);
          break;
        case 'ArrowUp':
        case 'KeyW':
          EventBus.emit(Events.INPUT_ROTATE);
          break;
        case 'Space':
          EventBus.emit(Events.INPUT_HARD_DROP);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
};
