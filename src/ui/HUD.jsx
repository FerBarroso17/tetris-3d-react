import { useEffect } from 'react';
import { useGameState } from '../core/GameState';
import { useMarketData } from './useMarketData';
import './HUD.css';

// SRP: Componente exclusivo para la puntuación
const ScorePanel = () => {
  // ISP: Solo depende de la puntuación, nivel y líneas
  const score = useGameState(state => state.score);
  const level = useGameState(state => state.level);
  const lines = useGameState(state => state.lines);

  return (
    <div className="glass-panel hud-box pointer-auto">
      <h2>TETRIS 3D</h2>
      <p>PUNTOS <span>{score}</span></p>
      <p>NIVEL <span>{level}</span></p>
      <p>LÍNEAS <span>{lines}</span></p>
    </div>
  );
};

// SRP: Componente exclusivo para la ayuda visual de controles
const ControlsPanel = () => {
  // No tiene dependencias de estado (ISP: segregación completa)
  return (
    <div className="glass-panel hud-box text-right pointer-auto">
      <p className="controls-title">Controles:</p>
      <p>WASD / Flechas para Mover</p>
      <p>W / Arriba para Rotar</p>
      <p>Espacio para Caída Rápida</p>
    </div>
  );
};

// SRP: Componente exclusivo para los modales de juego
const GameModal = () => {
  // ISP: Solo depende del estado de juego y la acción de inicio
  const isPlaying = useGameState(state => state.isPlaying);
  const isGameOver = useGameState(state => state.isGameOver);
  const score = useGameState(state => state.score);
  const startGame = useGameState(state => state.startGame);

  if (isPlaying && !isGameOver) return null;

  return (
    <div className="hud-center pointer-auto">
      {!isPlaying && !isGameOver && (
        <div className="glass-panel hud-modal animate-float">
          <h1 className="text-gradient">¿Listo?</h1>
          <button className="btn-primary w-full" onClick={startGame}>
            JUGAR AHORA
          </button>
        </div>
      )}

      {isGameOver && (
        <div className="glass-panel hud-modal animate-float">
          <h1 className="text-accent">FIN DEL JUEGO</h1>
          <p className="final-score">Puntos Totales: {score}</p>
          <button className="btn-primary w-full" onClick={startGame}>
            JUGAR DE NUEVO
          </button>
        </div>
      )}
    </div>
  );
};

// SRP: Componente exclusivo para el ticker financiero
const MarketFooter = () => {
  const { quotes, isLoading, error, fetchData } = useMarketData();

  useEffect(() => {
    fetchData();
    // Actualizar cada 2 minutos
    const interval = setInterval(fetchData, 120000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (isLoading || error || quotes.length === 0) return null;

  return (
    <div className="market-footer">
      <div className="marquee-container">
        {quotes.map((quote, index) => {
          const isUp = quote['class-variacion'] === 'up';
          return (
            <div key={index} className="market-item">
              <strong>{quote.nombre}:</strong>
              <span className="market-value">${quote.venta || quote.valor}</span>
              <span className={`market-var ${isUp ? 'var-up' : 'var-down'}`}>
                {isUp ? '▲' : '▼'} {quote.variacion}
              </span>
            </div>
          );
        })}
        {/* Duplicamos para efecto infinito en el marquee continuo */}
        {quotes.map((quote, index) => {
          const isUp = quote['class-variacion'] === 'up';
          return (
            <div key={`dup-${index}`} className="market-item">
              <strong>{quote.nombre}:</strong>
              <span className="market-value">${quote.venta || quote.valor}</span>
              <span className={`market-var ${isUp ? 'var-up' : 'var-down'}`}>
                {isUp ? '▲' : '▼'} {quote.variacion}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// SRP: El componente HUD ahora solo se encarga de organizar el layout
export const HUD = () => {
  return (
    <div className="hud-container">
      <div className="hud-top">
        <ScorePanel />
        <ControlsPanel />
      </div>
      <GameModal />
      <MarketFooter />
    </div>
  );
};

