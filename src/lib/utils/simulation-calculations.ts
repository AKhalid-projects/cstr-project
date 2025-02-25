import { ControlStrategy } from '@/lib/types/simulation';

// Constants
const G = 9.81  // Gravity acceleration (m/s²)
const TIME_STEP = 0.1 // Simulation time step (s)

export interface TankParams {
  area: number      // Tank cross-sectional area (m²)
  height: number    // Current water level (m)
  maxHeight: number // Maximum tank height (m)
  outletArea: number // Area of outlet hole (m²)
}

export interface SimulationState {
  tank1: TankParams
  tank2: TankParams
  controllerOutput: number // Inlet flow control (0-100%)
  pumpFlow: number        // Disturbance pump flow (L/min)
  time: number           // Simulation time (s)
  controller: {
    kp: number
    ki: number
    kd: number
    setpoint: number
    errorSum: number     // For integral term
    lastError: number    // For derivative term
  }
  isRunning: boolean
  controlStrategy: ControlStrategy
}

export function calculateControlOutput(state: SimulationState, tank1Level: number): number {
  const error = state.controller.setpoint - tank1Level;
  const deltaError = error - (state.controller.lastError || 0);
  const integral = (state.controller.errorSum || 0) + error * TIME_STEP;
  
  let output = 0;
  
  switch (state.controlStrategy) {
    case 'PID':
      output = state.controller.kp * error + 
               state.controller.ki * integral + 
               state.controller.kd * (deltaError / TIME_STEP);
      break;
      
    case 'PID_FEEDFORWARD':
      const feedforward = 0.1 * state.pumpFlow; // Scale pump flow disturbance
      output = state.controller.kp * error + 
               state.controller.ki * integral + 
               state.controller.kd * (deltaError / TIME_STEP) + 
               feedforward;
      break;
      
    case 'PI':
      output = state.controller.kp * error + 
               state.controller.ki * integral;
      break;
  }

  return Math.max(0, Math.min(100, output));
}

export function calculateTankLevels(state: SimulationState): SimulationState {
  // Convert controller output (%) to inlet flow rate (m³/s)
  const maxInFlow = 10 / (60 * 1000); // Convert 10 L/min to m³/s
  const inFlow = (state.controllerOutput / 100) * maxInFlow;
  
  // Tank dynamics
  const tank1OutFlow = state.tank1.outletArea * Math.sqrt(2 * G * state.tank1.height);
  const tank2OutFlow = state.tank2.outletArea * Math.sqrt(2 * G * state.tank2.height);
  const pumpFlow = state.pumpFlow / (60 * 1000); // L/min to m³/s

  // Height changes
  const dH1 = ((inFlow - tank1OutFlow) / state.tank1.area) * TIME_STEP;
  const dH2 = ((tank1OutFlow - tank2OutFlow - pumpFlow) / state.tank2.area) * TIME_STEP;

  // Update heights
  return {
    ...state,
    tank1: { 
      ...state.tank1,
      height: Math.max(0, Math.min(state.tank1.maxHeight, state.tank1.height + dH1))
    },
    tank2: { 
      ...state.tank2,
      height: Math.max(0, Math.min(state.tank2.maxHeight, state.tank2.height + dH2))
    }
  };
}

// Initial state setup
export const initialState: SimulationState = {
  tank1: {
    area: 0.01,        // 100 cm²
    height: 0,         // Empty initially
    maxHeight: 0.5,    // 50 cm max height
    outletArea: 0.0002 // Larger outlet (2 cm²) - causes faster dynamics
  },
  tank2: {
    area: 0.01,
    height: 0,
    maxHeight: 0.5,
    outletArea: 0.0002
  },
  controllerOutput: 50,
  pumpFlow: 5,         // Add disturbance pump flow
  time: 0,
  controller: {
    kp: 2.5,           // Aggressive proportional gain
    ki: 0.05,          // Small integral gain
    kd: 0.1,           // Small derivative gain
    setpoint: 50,      // Target level 50%
    errorSum: 0,
    lastError: 0
  },
  isRunning: false,
  controlStrategy: 'PID'
}

export function calculateFlowRate(level: number, outletDiameter: number): number {
  // Torricelli's law for gravity-driven flow
  const gravity = 9.81 // m/s²
  const height = level / 100 // convert percentage to meters
  const area = Math.PI * Math.pow(outletDiameter / 2, 2)
  
  return area * Math.sqrt(2 * gravity * height)
}

export function calculateNewLevel(
  currentLevel: number,
  inFlow: number,
  outFlow: number,
  tankArea: number,
  deltaTime: number
): number {
  // Mass balance equation
  const volumeChange = (inFlow - outFlow) * deltaTime
  const levelChange = (volumeChange / tankArea) * 100 // convert to percentage
  
  return Math.max(0, Math.min(100, currentLevel + levelChange))
} 