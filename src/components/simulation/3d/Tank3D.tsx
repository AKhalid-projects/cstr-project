'use client'

import { useEffect, useRef } from 'react'
import { Mesh, CylinderGeometry, MeshPhongMaterial, Color } from 'three'

interface Tank3DProps {
  level: number  // Level as percentage (0-100)
}

export default function Tank3D({ level }: Tank3DProps) {
  const meshRef = useRef<Mesh>(null)

  useEffect(() => {
    if (!meshRef.current) return

    // Ensure level is within bounds and not NaN
    const safeLevel = Math.max(0.1, Math.min(100, isNaN(level) ? 0 : level))
    
    // Convert percentage to actual height (assuming tank is 5 units tall)
    const tankHeight = 5
    const waterHeight = (safeLevel / 100) * tankHeight

    // Update geometry
    const geometry = new CylinderGeometry(
      2,  // radiusTop
      2,  // radiusBottom
      waterHeight, // height
      32, // radialSegments
      1,  // heightSegments
      false // openEnded
    )

    // Update mesh
    if (meshRef.current) {
      meshRef.current.geometry.dispose() // Clean up old geometry
      meshRef.current.geometry = geometry
      meshRef.current.position.y = waterHeight / 2 - tankHeight / 2 // Center the water level
    }
  }, [level])

  return (
    <mesh ref={meshRef}>
      <meshPhongMaterial 
        color={new Color(0x3b82f6)} // Blue color
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  )
} 