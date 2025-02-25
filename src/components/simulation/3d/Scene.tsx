'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

interface SceneProps {
  children?: React.ReactNode;
  parameters?: {
    tank1: { height: number; maxHeight: number; };
    tank2: { height: number; maxHeight: number; };
    controllerOutput: number;
    pumpFlow: number;
  };
}

export default function Scene({ children, parameters }: SceneProps) {
  return (
    <div className="w-full h-full min-h-[400px] bg-gray-900 rounded-lg">
      <Canvas camera={{ position: [4, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        {children}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
} 