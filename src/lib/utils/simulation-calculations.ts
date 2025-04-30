import { ControlStrategy } from '@/lib/types/simulation';
import { GRAVITY, TIME_STEP, MAX_INFLOW_LPM, LPM_TO_M3S } from '../constants/simulation';
import { addNoiseToInflow } from './simulation-helpers';

/**
 * Parameters defining a tank's physical properties and current state
 */
export interface TankParams {
  area: number      // Tank cross-sectional area (m²)
  height: number    // Current water level (m)
  maxHeight: number // Maximum tank height (m)
  outletArea: number // Area of outlet hole (m²)
}

/**
 * Parameters for the PID/PI controller
 */
export interface ControllerParams {
  kp: number        // Proportional gain
  ki: number        // Integral gain
  kd: number        // Derivative gain
  setpoint: number  // Target level (m)
  errorSum: number  // For integral term
  lastError: number // For derivative term
}

/**
 * Complete state of the two-tank simulation system
 */
export interface SimulationState {
  tank1: TankParams
  tank2: TankParams
  controllerOutput: number // Inlet flow control (0-100%)
  pumpFlow: number        // Disturbance pump flow (L/min)
  time: number           // Simulation time (s)
  controller: ControllerParams
  isRunning: boolean
  controlStrategy: ControlStrategy
  enableNoise: boolean   // Whether to add noise to inflow
  noiseIntensity: number // Noise intensity multiplier (0-2)
}

/**
 * Calculates the control output based on the current state and control strategy.
 * Also updates controller state (errorSum and lastError) for feedback control modes.
 * 
 * @param state Current simulation state
 * @param tank1Level Current water level in tank 1 (m)
 * @returns Updated simulation state with new controller output and state
 */
export function calculateControlOutput(state: SimulationState, tank1Level: number): SimulationState {
  const error = state.controller.setpoint - tank1Level;
  const deltaError = error - (state.controller.lastError || 0);
  
  let output = 0;
  let newErrorSum = state.controller.errorSum;
  let newLastError = state.controller.lastError;
  
  switch (state.controlStrategy) {
    case 'MANUAL':
      // In manual mode, just return the manual control value without updating controller state
      return {
        ...state,
        controllerOutput: state.controllerOutput
      };
      
    case 'PID':
      // Update controller state for PID control
      newErrorSum = state.controller.errorSum + error * TIME_STEP;
      newLastError = error;
      output = state.controller.kp * error + 
               state.controller.ki * newErrorSum + 
               state.controller.kd * (deltaError / TIME_STEP);
      break;
      
    case 'PID_FEEDFORWARD':
      // Update controller state for PID with feedforward
      newErrorSum = state.controller.errorSum + error * TIME_STEP;
      newLastError = error;
      const feedforward = 0.1 * (state.pumpFlow / 10);
      output = state.controller.kp * error + 
               state.controller.ki * newErrorSum + 
               state.controller.kd * (deltaError / TIME_STEP) + 
               feedforward;
      break;
      
    case 'PI':
      // Update controller state for PI control
      newErrorSum = state.controller.errorSum + error * TIME_STEP;
      newLastError = error;
      output = state.controller.kp * error + 
               state.controller.ki * newErrorSum;
      break;
  }

  // Clamp output between 0% and 100%
  return {
    ...state,
    controllerOutput: Math.max(0, Math.min(100, output)),
    controller: {
      ...state.controller,
      errorSum: newErrorSum,
      lastError: newLastError
    }
  };
}

/**
 * Calculates new tank levels based on current state and physics.
 * This function only updates tank heights and time, not controller state.
 * 
 * @param state Current simulation state
 * @returns Updated simulation state with new tank levels
 */
export function calculateTankLevels(state: SimulationState): SimulationState {
  // Calculate inlet flow rate (Qi) in L/min based on controller output
  const Qi = 25.4 * (state.controllerOutput / 100);
  
  // Convert Qi to m³/s (Qi*)
  const Qi_star = Qi * (1/6000);
  
  // Calculate constants for tank outflows
  const c1 = state.tank1.outletArea * Math.sqrt(2 * GRAVITY) / Math.sqrt(state.tank1.height);
  const c2 = state.tank2.outletArea * Math.sqrt(2 * GRAVITY) / Math.sqrt(state.tank2.height);
  
  // Calculate tank outflows (Q1* and Q2*)
  const Q1_star = c1 * state.tank1.height;
  const Q2_star = c2 * state.tank2.height;
  
  // Convert pump flow (D) from L/min to m³/s (D*)
  const D_star = state.pumpFlow * (1/6000);
  
  // Calculate rate of change for both tanks
  const dh1_dt = (Qi_star - Q1_star) / state.tank1.area;
  const dh2_dt = (Q1_star - Q2_star - D_star) / state.tank2.area;
  
  // Update tank levels using Euler's method
  const newH1 = state.tank1.height + (dh1_dt * TIME_STEP);
  const newH2 = state.tank2.height + (dh2_dt * TIME_STEP);
  
  // Update heights with bounds checking (0 to 8.5m)
  return {
    ...state,
    tank1: { 
      ...state.tank1,
      height: Math.max(0, Math.min(8.5, newH1))
    },
    tank2: { 
      ...state.tank2,
      height: Math.max(0, Math.min(8.5, newH2))
    },
    time: state.time + TIME_STEP
  };
}

/**
 * Initial state for the two-tank simulation system
 */
export const initialState: SimulationState = {
  tank1: {
    area: 0.028,       // 280 cm²
    height: 4,         // Initial height 4m
    maxHeight: 8.5,    // Maximum height 8.5m
    outletArea: 0.0002 // 2 cm² outlet
  },
  tank2: {
    area: 0.028,       // 280 cm²
    height: 4,         // Initial height 4m
    maxHeight: 8.5,    // Maximum height 8.5m
    outletArea: 0.0002 // 2 cm² outlet
  },
  controllerOutput: 50, // Initial controller output 50%
  pumpFlow: 5,         // Initial pump flow 5 L/min
  time: 0,
  controller: {
    kp: 2.5,           // Proportional gain
    ki: 0.05,          // Integral gain
    kd: 0.1,           // Derivative gain
    setpoint: 4,       // Target level (4 m)
    errorSum: 0,
    lastError: 0
  },
  isRunning: false,
  controlStrategy: 'MANUAL', // Default to manual mode
  enableNoise: false,
  noiseIntensity: 1.0  // Default noise intensity
}

/**
 * Calculates flow rate through an outlet using Torricelli's law
 */
export function calculateFlowRate(level: number, outletDiameter: number): number {
  const area = Math.PI * Math.pow(outletDiameter / 2, 2);
  return area * Math.sqrt(2 * GRAVITY * level);
}

/**
 * Calculates new tank level based on mass balance
 */
export function calculateNewLevel(
  currentLevel: number,
  inFlow: number,
  outFlow: number,
  tankArea: number,
  deltaTime: number
): number {
  const volumeChange = (inFlow - outFlow) * deltaTime;
  const levelChange = volumeChange / tankArea;
  return Math.max(0, Math.min(currentLevel + levelChange, currentLevel));
} 