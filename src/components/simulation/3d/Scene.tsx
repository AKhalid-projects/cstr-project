'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

interface SceneProps {
  children: React.ReactNode
  className?: string
}

export default function Scene({ children, className = '' }: SceneProps) {
  return (
    <div className={`w-full h-full min-h-[400px] bg-gray-900 rounded-lg ${className}`}>
      <Canvas
        camera={{ position: [4, 0, 4], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        {children}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 0.65}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  )
} 