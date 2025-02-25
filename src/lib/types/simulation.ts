import { TankParams } from '@/lib/utils/simulation-calculations';

export type ControlStrategy = 'PID' | 'PID_FEEDFORWARD' | 'PI';

export interface SimulationState {
  tank1: TankParams
  tank2: TankParams
  controllerOutput: number
  pumpFlow: number
  time: number
  controller: {
    kp: number
    ki: number
    kd: number
    setpoint: number
    errorSum: number
    lastError: number
  }
  isRunning: boolean
  controlStrategy: ControlStrategy
}

// Remove duplicate interfaces and consolidate props
export interface VisualizationProps {
  level: number
  width?: number
  height?: number
  depth?: number
}

export interface ControlProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
} 