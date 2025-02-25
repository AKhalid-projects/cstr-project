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
}

export function calculatePIDOutput(state: SimulationState, tank1Level: number): number {
  const error = state.controller.setpoint - tank1Level
  const deltaError = error - (state.controller.lastError || 0)
  
  // Update integral and derivative terms
  const integral = (state.controller.errorSum || 0) + error * TIME_STEP
  const derivative = deltaError / TIME_STEP

  // Calculate PID output with proper scaling
  const output = state.controller.kp * error + 
                state.controller.ki * integral + 
                state.controller.kd * derivative

  // Limit output to 0-100%
  return Math.max(0, Math.min(100, output))
}

export function calculateTankLevels(state: SimulationState): SimulationState {
  // Convert heights to percentages for PID control
  const tank1LevelPercent = (state.tank1.height / state.tank1.maxHeight) * 100
  
  // Only calculate new controller output if simulation is running
  const newControllerOutput = state.isRunning 
    ? calculatePIDOutput(state, tank1LevelPercent)
    : state.controllerOutput // Keep manual control value when not running

  // Convert controller output (%) to inlet flow rate (m³/s)
  const maxFlow = 10 / (60 * 1000) // 10 L/min to m³/s
  const qi = (newControllerOutput / 100) * maxFlow

  // Tank 1 calculations
  const h1 = Math.max(0.01, state.tank1.height) // Prevent division by zero
  const C1 = state.tank1.outletArea * Math.sqrt(2 * G)
  const q1_out = C1 * Math.sqrt(h1)
  const dH1 = ((qi - q1_out) / state.tank1.area) * TIME_STEP
  const newH1 = Math.max(0, Math.min(state.tank1.maxHeight, state.tank1.height + dH1))

  // Tank 2 calculations
  const h2 = Math.max(0.01, state.tank2.height)
  const C2 = state.tank2.outletArea * Math.sqrt(2 * G)
  const q2_out = C2 * Math.sqrt(h2)
  const qp = state.pumpFlow / (60 * 1000) // L/min to m³/s
  const dH2 = ((q1_out - q2_out - qp) / state.tank2.area) * TIME_STEP
  const newH2 = Math.max(0, Math.min(state.tank2.maxHeight, state.tank2.height + dH2))

  // Only update heights if simulation is running
  return {
    ...state,
    tank1: { 
      ...state.tank1, 
      height: state.isRunning ? newH1 : state.tank1.height 
    },
    tank2: { 
      ...state.tank2, 
      height: state.isRunning ? newH2 : state.tank2.height 
    },
    controllerOutput: newControllerOutput,
    time: state.isRunning ? state.time + TIME_STEP : state.time,
    controller: {
      ...state.controller,
      errorSum: state.isRunning 
        ? state.controller.errorSum + (state.controller.setpoint - tank1LevelPercent) * TIME_STEP 
        : state.controller.errorSum,
      lastError: state.isRunning 
        ? state.controller.setpoint - tank1LevelPercent 
        : state.controller.lastError
    }
  }
}

// Initial state setup
export const initialState: SimulationState = {
  tank1: {
    area: 0.01,        // 100 cm²
    height: 0,         // Empty initially
    maxHeight: 0.5,    // 50 cm max height
    outletArea: 0.0001 // 1 cm² outlet
  },
  tank2: {
    area: 0.01,        // 100 cm²
    height: 0,         // Empty initially
    maxHeight: 0.5,    // 50 cm max height
    outletArea: 0.0001 // 1 cm² outlet
  },
  controllerOutput: 50, // Start at 50% flow
  pumpFlow: 0,         // No initial pump disturbance
  time: 0,             // Start time at 0
  controller: {
    kp: 1,
    ki: 0,
    kd: 0,
    setpoint: 50,
    errorSum: 0,
    lastError: 0
  },
  isRunning: false
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