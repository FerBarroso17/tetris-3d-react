import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { GameBoard } from './components/GameBoard';
import { GameManager } from './components/GameManager';
import { useInputSystem } from './systems/InputSystem';
import { HUD } from './ui/HUD';
import './App.css';

// Input hook wrapper
const InputController = () => {
  useInputSystem();
  return null;
};

function App() {
  return (
    <div className="w-full h-screen relative bg-slate-900 overflow-hidden" style={{ width: '100vw', height: '100vh', backgroundColor: '#0f172a' }}>
      <HUD />
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        {/* Environment and Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <spotLight position={[0, 20, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
        
        {/* Core Game Systems */}
        <GameManager />
        <InputController />
        
        {/* Visuals */}
        <GameBoard />
        
        {/* Optional: Add orbit controls for debugging if needed, but for gameplay we want a fixed camera */}
        {/* <OrbitControls enablePan={false} /> */}
      </Canvas>
    </div>
  );
}

export default App;
