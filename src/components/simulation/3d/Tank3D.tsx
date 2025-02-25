'use client'

interface Tank3DProps {
  level: number  // Level as percentage (0-100)
}

export default function Tank3D({ level }: Tank3DProps) {
  const safeLevel = Math.max(0.1, Math.min(100, isNaN(level) ? 0 : level))
  const tankHeight = 4
  const waterHeight = (safeLevel / 100) * tankHeight

  return (
    <group>
      {/* Tank container */}
      <mesh>
        <cylinderGeometry args={[1.2, 1.2, tankHeight, 32]} />
        <meshPhongMaterial 
          color="#4b5563" 
          transparent={true} 
          opacity={0.3} 
        />
      </mesh>
      
      {/* Water */}
      <mesh position={[0, -tankHeight/2 + waterHeight/2, 0]}>
        <cylinderGeometry args={[1.1, 1.1, waterHeight, 32]} />
        <meshPhongMaterial 
          color="#3b82f6"
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </group>
  )
} 