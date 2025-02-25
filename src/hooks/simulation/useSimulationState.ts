'use client'

import { useState, useCallback } from 'react'
import { SimulationState, initialState } from '@/lib/utils/simulation-calculations'

interface UseSimulationStateReturn {
  state: SimulationState
  startSimulation: () => void
  stopSimulation: () => void
  updateState: (updates: Partial<SimulationState>) => void
  updateControlParams: (params: { controller: Partial<SimulationState['controller']> }) => void
  isRunning: boolean
}

export function useSimulationState(): UseSimulationStateReturn {
  const [state, setState] = useState<SimulationState>(initialState)
  const [isRunning, setIsRunning] = useState(false)

  const startSimulation = useCallback(() => {
    setIsRunning(true)
    setState(current => ({ ...current, isRunning: true }))
  }, [])

  const stopSimulation = useCallback(() => {
    setIsRunning(false)
    setState(current => ({ ...current, isRunning: false }))
  }, [])

  const updateState = useCallback((updates: Partial<SimulationState>) => {
    setState(current => ({
        ...current,
        ...updates,
        isRunning: updates.isRunning ?? current.isRunning // Preserve running state
    }))
  }, [])

  const updateControlParams = useCallback((params: { controller: Partial<SimulationState['controller']> }) => {
    setState(current => ({
      ...current,
      controller: {
        ...current.controller,
        ...params.controller,
        errorSum: 0,    // Reset integral term when parameters change
        lastError: 0    // Reset derivative term when parameters change
      }
    }))
  }, [])

  return {
    state,
    startSimulation,
    stopSimulation,
    updateState,
    updateControlParams,
    isRunning
  }
} 