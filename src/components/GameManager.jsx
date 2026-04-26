import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Constants, Events } from '../core/Constants';
import { EventBus } from '../core/EventBus';
import { useGameState } from '../core/GameState';
import { TetrisEngine } from '../systems/TetrisEngine';

// SOLID: SRP - GameManager ahora SOLO orquesta el loop de renderizado (useFrame) y los enlaces de eventos.
// Las reglas de negocio (DIP) se delegan al TetrisEngine.
export const GameManager = () => {
  // ISP: Solo nos suscribimos a los valores del estado necesarios para el loop y control
  const isPlaying = useGameState(state => state.isPlaying);
  const isPaused = useGameState(state => state.isPaused);
  const activePiece = useGameState(state => state.activePiece);
  const level = useGameState(state => state.level);

  const dropTimer = useRef(0);

  // Inicializar el tablero
  useEffect(() => {
    if (isPlaying && !activePiece) {
      TetrisEngine.spawnInitialPieces();
    }
  }, [isPlaying, activePiece]);

  // Manejo de Eventos (Inversión de dependencias)
  useEffect(() => {
    const resetTimer = () => { dropTimer.current = 0; };
    const forceTick = () => { dropTimer.current = 9999; };

    const unsubs = [
      EventBus.on(Events.INPUT_LEFT, TetrisEngine.moveLeft),
      EventBus.on(Events.INPUT_RIGHT, TetrisEngine.moveRight),
      EventBus.on(Events.INPUT_DOWN, () => TetrisEngine.moveDown(resetTimer)),
      EventBus.on(Events.INPUT_ROTATE, TetrisEngine.rotate),
      EventBus.on(Events.INPUT_HARD_DROP, () => TetrisEngine.hardDrop(forceTick)),
    ];

    return () => unsubs.forEach(unsub => unsub());
  }, []);

  // Loop Principal (Delta-time tick)
  useFrame((state, delta) => {
    if (!isPlaying || isPaused || !activePiece) return;

    const dropInterval = Math.max(
      Constants.MIN_DROP_INTERVAL,
      Constants.INITIAL_DROP_INTERVAL * Math.pow(Constants.SPEED_MULTIPLIER, level - 1)
    ) / 1000;

    dropTimer.current += delta;

    if (dropTimer.current >= dropInterval) {
      dropTimer.current = 0;
      TetrisEngine.executeTick();
    }
  });

  return null; // El Orquestador no renderiza componentes visuales
};
