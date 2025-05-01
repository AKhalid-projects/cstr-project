import { ControlStrategy } from '@/lib/types/simulation';
import { GRAVITY, TIME_STEP } from '../constants/simulation';

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
 * Parameters for the PID controller
 */
export interface ControllerParams {
  kc: number        // Proportional gain (Kc)
  ti: number        // Integral time constant (τi)
  td: number        // Derivative time constant (τd)
  setpoint: number  // Target level (m)
  errorSum: number  // For integral term
  lastError: number // For derivative term
}

/**
 * System constants for the two-tank system
 */
export interface SystemConstants {
  k1: number  // 1/c1
  t1: number  // A/c1
  k2: number  // c1/c2
  t2: number  // A/c2
  k3: number  // -1/c2
  t3: number  // A/c2
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
  pidComponents?: {      // PID component values for visualization
    proportional: number
    integral: number
    derivative: number
    feedforward?: number  // Add feedforward component
  }
  inputType: 'STEP' | 'RAMP'  // New field for input type
  feedforwardModel: 'DISTURBANCE' | 'PROCESS'
}

/**
 * Calculates the feedforward term for PID with Feedforward control
 */
function calculateFeedforwardTerm(constants: SystemConstants, setpoint: number): number {
  // FF = -(k3((τ1 + τ2)s + 1))/(k1*k2*(τ3*s + 1)) * setpoint
  const { k1, k2, k3, t1, t2, t3 } = constants;
  const numerator = -(k3 * ((t1 + t2) + 1));
  const denominator = k1 * k2 * (t3 + 1);
  return (numerator / denominator) * setpoint;
}

/**
 * Calculates the control output based on the current state and control strategy.
 * Also updates controller state (errorSum and lastError) for feedback control modes.
 * 
 * @param state Current simulation state
 * @returns Updated simulation state with new controller output and state
 */
export function calculateControlOutput(state: SimulationState): SimulationState {
  const constants = calculateSystemConstants(state.tank1, state.tank2);
  let output = 0;
  let newErrorSum = state.controller.errorSum;
  let newLastError = state.controller.lastError;
  let pidComponents = {
    proportional: 0,
    integral: 0,
    derivative: 0,
    feedforward: 0
  };
  
  switch (state.controlStrategy) {
    case 'MANUAL':
      return {
        ...state,
        controllerOutput: state.controllerOutput,
        pidComponents: undefined
      };
      
    case 'PID': {
      // Calculate error directly from tank level
      const error = state.controller.setpoint - state.tank2.height;
      
      // Update controller state
      newErrorSum = state.controller.errorSum + error * TIME_STEP;
      newLastError = error;
      
      // PID controller: K * Error * (1 + 1/(τI*s) + τD*s)
      const proportionalTerm = state.controller.kc * error;
      const integralTerm = state.controller.kc * newErrorSum / state.controller.ti;
      const derivativeTerm = state.controller.kc * state.controller.td * ((error - (state.controller.lastError || 0)) / TIME_STEP);
      
      pidComponents = {
        proportional: proportionalTerm,
        integral: integralTerm,
        derivative: derivativeTerm,
        feedforward: 0  // No feedforward in regular PID
      };
      
      output = proportionalTerm + integralTerm + derivativeTerm;
      break;
    }
      
    case 'PID_FEEDFORWARD': {
      // Calculate error directly from tank level
      const error = state.controller.setpoint - state.tank2.height;
      
      // Update controller state
      newErrorSum = state.controller.errorSum + error * TIME_STEP;
      newLastError = error;
      
      // Calculate feedforward term
      const feedforward = calculateFeedforwardTerm(constants, state.controller.setpoint);
      
      // PID controller with feedforward: K * Error * (1 + 1/(τI*s) + τD*s) + FF * D
      const proportionalTerm = state.controller.kc * error;
      const integralTerm = state.controller.kc * newErrorSum / state.controller.ti;
      const derivativeTerm = state.controller.kc * state.controller.td * ((error - (state.controller.lastError || 0)) / TIME_STEP);
      
      pidComponents = {
        proportional: proportionalTerm,
        integral: integralTerm,
        derivative: derivativeTerm,
        feedforward: feedforward * state.pumpFlow  // Store feedforward term for visualization
      };
      
      // Add feedforward term multiplied by disturbance (pump flow)
      output = proportionalTerm + integralTerm + derivativeTerm + (feedforward * state.pumpFlow);
      break;
    }
      
    case 'PI': {
      // Calculate error directly from tank level
      const error = state.controller.setpoint - state.tank2.height;
      
      // Update controller state
      newErrorSum = state.controller.errorSum + error * TIME_STEP;
      newLastError = error;
      
      // PI controller: K * Error * (1 + 1/(τI*s))
      const proportionalTerm = state.controller.kc * error;
      const integralTerm = state.controller.kc * newErrorSum / state.controller.ti;
      
      pidComponents = {
        proportional: proportionalTerm,
        integral: integralTerm,
        derivative: 0,
        feedforward: 0  // No feedforward in PI control
      };
      
      output = proportionalTerm + integralTerm;
      break;
    }
  }

  // Clamp output between 0% and 100%
  return {
    ...state,
    controllerOutput: Math.max(0, Math.min(100, output)),
    controller: {
      ...state.controller,
      errorSum: newErrorSum,
      lastError: newLastError
    },
    pidComponents: ['PID', 'PID_FEEDFORWARD', 'PI'].includes(state.controlStrategy) ? pidComponents : undefined
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
  
  // Add noise to inlet flow if enabled (±1.25 L/min)
  let noisy_Qi = Qi;
  if (state.enableNoise) {
    const noiseRange = 1.25; // ±1.25 L/min noise range
    const noise = (Math.random() - 0.5) * 2 * noiseRange * state.noiseIntensity;
    noisy_Qi += noise;
  }

  // Convert noisy Qi to m³/s (Qi*)
  const Qi_star = noisy_Qi * (1/6000);
  
  // Calculate constants for tank outflows
  const c1 = state.tank1.outletArea * Math.sqrt(2 * GRAVITY) / Math.sqrt(state.tank1.height);
  const c2 = state.tank2.outletArea * Math.sqrt(2 * GRAVITY) / Math.sqrt(state.tank2.height);
  
  // Calculate tank outflows (Q1* and Q2*)
  const Q1_star = c1 * state.tank1.height;
  const Q2_star = c2 * state.tank2.height;
  
  // Convert pump flow (D) from L/min to m³/s (D*)
  const D_star = Math.min(10, Math.max(0, state.pumpFlow)) * (1/6000);
  
  // Calculate rate of change for both tanks
  const dh1_dt = (Qi_star - Q1_star) / state.tank1.area;
  const dh2_dt = (Q1_star - Q2_star - D_star) / state.tank2.area;
  
  // Update tank levels using Euler's method
  const newH1 = state.tank1.height + (dh1_dt * TIME_STEP);
  const newH2 = state.tank2.height + (dh2_dt * TIME_STEP);
  
  // Calculate control output and update controller state
  const newState = calculateControlOutput(state);
  
  // Update heights with bounds checking (0 to 10m)
  return {
    ...newState,
    tank1: { 
      ...state.tank1,
      height: Math.max(0, Math.min(10, newH1))
    },
    tank2: { 
      ...state.tank2,
      height: Math.max(0, Math.min(10, newH2))
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
    height: 5,         // Initial height 5m
    maxHeight: 10,     // Maximum height 10m
    outletArea: 0.0002 // 2 cm² outlet
  },
  tank2: {
    area: 0.028,       // 280 cm²
    height: 5,         // Initial height 5m
    maxHeight: 10,     // Maximum height 10m
    outletArea: 0.0002 // 2 cm² outlet
  },
  controllerOutput: 50, // Initial controller output 50%
  pumpFlow: 5,         // Initial pump flow 5 L/min
  time: 0,
  controller: {
    kc: 2.5,           // Proportional gain (Kc)
    ti: 0.05,          // Integral time constant (τi)
    td: 0.1,           // Derivative time constant (τd)
    setpoint: 5,       // Target level (5 m)
    errorSum: 0,
    lastError: 0
  },
  isRunning: false,
  controlStrategy: 'MANUAL',
  enableNoise: true,   // Enable noise by default
  noiseIntensity: 1.0, // Default noise intensity
  inputType: 'STEP',   // Default to step input
  feedforwardModel: 'PROCESS'
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

/**
 * Calculates system constants based on tank parameters
 */
export function calculateSystemConstants(tank1: TankParams, tank2: TankParams): SystemConstants {
  const c1 = tank1.outletArea * Math.sqrt(2 * GRAVITY) / Math.sqrt(tank1.height);
  const c2 = tank2.outletArea * Math.sqrt(2 * GRAVITY) / Math.sqrt(tank2.height);
  
  return {
    k1: 1 / c1,
    t1: tank1.area / c1,
    k2: c1 / c2,
    t2: tank2.area / c2,
    k3: -1 / c2,
    t3: tank2.area / c2
  };
} 