<div align="center">
  <h1>🟩 Tetris 3D React</h1>
  <p>Una reimaginación moderna e inmersiva del clásico juego de puzzle, construida con React Three Fiber.</p>
</div>

---

## 🌟 Sobre el Proyecto

**Tetris 3D React** no es solo un clon de Tetris; es una demostración técnica de cómo estructurar un videojuego escalable en el ecosistema moderno de React. Utilizando principios de diseño **SOLID** y una arquitectura orientada a eventos (Event-Driven), el juego separa por completo la lógica de negocio del renderizado 3D y la interfaz de usuario.

El resultado es un código ultra limpio, un rendimiento fluido (gracias al loop nativo de React Three Fiber) y un *Game Feel* pulido con animaciones reactivas y estética de neón.

## 🛠️ Tecnologías Utilizadas

* **Framework Base:** React + Vite
* **Renderizado 3D:** Three.js + React Three Fiber (`@react-three/fiber`)
* **Gestión de Estado Centralizada:** Zustand
* **Animaciones y Física "Juice":** React Spring (`@react-spring/three`)
* **Diseño UI:** CSS Moderno (Glassmorphism, Google Fonts)

## 🏗️ Arquitectura de Software (SOLID)

Este proyecto fue construido priorizando la mantenibilidad y el bajo acoplamiento:

* **Single Responsibility (SRP):** Interfaces segregadas (`ScorePanel`, `GameModal`). Un motor de juego (`TetrisEngine`) totalmente abstraído que contiene las reglas, separado del orquestador (`GameManager`).
* **Dependency Inversion (DIP):** El ciclo de vida de React no gestiona los cálculos; el sistema escucha eventos (`EventBus`) desacoplados provenientes de entradas de teclado.
* **Componentización:** Modelos 3D reutilizables y jerarquía visual estrictamente separada de la capa matemática.

## 🚀 Instalación y Uso

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/FerBarroso17/tetris-3d-react.git
   cd tetris-3d-react
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abre en tu navegador:**
   Navega a `http://localhost:5173` para jugar.

## 🎮 Controles

| Acción | Tecla Primaria | Tecla Secundaria |
| :--- | :--- | :--- |
| **Mover Izquierda** | `A` | `Flecha Izquierda` |
| **Mover Derecha** | `D` | `Flecha Derecha` |
| **Bajar / Acelerar** | `S` | `Flecha Abajo` |
| **Rotar Pieza** | `W` | `Flecha Arriba` |
| **Caída Rápida (Drop)** | `Espacio` | - |

## 🔮 Próximos Pasos

- Implementación del sistema de "Super Rotation System" (SRS).
- Agregado de partículas 3D tras limpiar múltiples líneas.
- Efectos de sonido reactivos usando prefabs de `react-three-game`.

---
<div align="center">
  <small>Desarrollado con 💻 y mucha lógica por FerBarroso17.</small>
</div>
