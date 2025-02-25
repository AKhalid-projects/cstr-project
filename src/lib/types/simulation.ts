export interface SimulationState {
  flowRate: number
  tankLevel: number
  isRunning: boolean
  time: number
}

export interface SimulationControls {
  flowRate: number
  tankLevel: number
  presets: {
    flowRate: number
    tankLevel: number
  }
}

export interface Tank3DProps {
  level: number
  width?: number
  height?: number
  depth?: number
}

export interface ControlSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
} 