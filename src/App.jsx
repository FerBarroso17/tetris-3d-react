import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="container">
      <nav className="navbar">
        <div className="logo">Vite + React</div>
        <div className="nav-links">
          <span>Inicio</span>
          <span>Características</span>
          <span>Documentación</span>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title animate-float">
            Eleva tu Desarrollo <br />
            <span className="text-gradient">con Velocidad</span>
          </h1>
          <p className="hero-subtitle">
            Una base sólida y moderna preparada para tus ideas más ambiciosas. 
            Experimenta el rendimiento de Vite con la flexibilidad de React.
          </p>
          
          <div className="card glass-panel">
            <h3>Contador Interactivo</h3>
            <p>Prueba la reactividad instantánea:</p>
            <button className="btn-primary" onClick={() => setCount((count) => count + 1)}>
              El valor es {count}
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="glow-sphere"></div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 Proyecto Vite Premium. Preparado con ❤️ por Antigravity.</p>
      </footer>
    </main>
  )
}

export default App
