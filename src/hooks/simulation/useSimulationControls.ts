'use client'

import { useState, useCallback } from 'react'
import { calculateFlowRate, calculateNewLevel } from '@/lib/utils/simulation-calculations'

export function useSimulationControls() {
  const [lastUpdate, setLastUpdate] = useState(Date.now())
  
  const updateSimulation = useCallback((currentLevel: number, inFlowRate: number) => {
    const now = Date.now()
    const deltaTime = (now - lastUpdate) / 1000 // Convert to seconds
    setLastUpdate(now)

    const outFlowRate = calculateFlowRate(currentLevel, 0.1) // 10cm outlet diameter
    const newLevel = calculateNewLevel(
      currentLevel,
      inFlowRate,
      outFlowRate,
      1, // 1m² tank area
      deltaTime
    )

    return newLevel
  }, [lastUpdate])

  return {
    updateSimulation
  }
} 