export type ControlStrategy = 'MANUAL' | 'PID' | 'PID_FEEDFORWARD' | 'PI';
export type FeedforwardModel = 'PROCESS' | 'DISTURBANCE';

export interface SimulationState {
  tank1: {
    area: number;
    height: number;
    maxHeight: number;
    outletArea: number;
  };
  tank2: {
    area: number;
    height: number;
    maxHeight: number;
    outletArea: number;
  };
  controllerOutput: number;
  pumpFlow: number;
  time: number;
  controller: {
    kc: number;
    ti: number;
    td: number;
    setpoint: number;
    errorSum: number;
    lastError: number;
  };
  isRunning: boolean;
  controlStrategy: ControlStrategy;
  enableNoise: boolean;
  noiseIntensity: number;
  inputType: 'STEP' | 'RAMP';
  pidComponents?: {
    proportional: number;
    integral: number;
    derivative: number;
  };
  feedforwardModel?: FeedforwardModel;
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