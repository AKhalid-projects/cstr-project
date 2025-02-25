'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

interface SceneProps {
  children: React.ReactNode
}

export default function Scene({ children }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [10, 5, 10], fov: 45 }}
      style={{ background: '#1f2937' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <group position={[0, 0, 0]}>
        {/* Tank container (static) */}
        <mesh>
          <cylinderGeometry args={[2.2, 2.2, 5.2, 32]} />
          <meshPhongMaterial 
            color="#4b5563" 
            transparent={true} 
            opacity={0.3} 
          />
        </mesh>
        {children}
      </group>
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
} 