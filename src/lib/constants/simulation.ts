/**
 * Physical and simulation constants for the two-tank system
 */

// Physical constants
export const GRAVITY = 9.81  // Gravity acceleration (m/s²)

// Simulation parameters
export const TIME_STEP = 1 // Simulation time step (s)
export const MAX_INFLOW_LPM = 25.4 // Maximum inflow in L/min
export const NOISE_STD_DEV = 0.4167 // Standard deviation for noise in L/min (1.25/3)

// Unit conversion constants
export const LPM_TO_M3S = 1 / (60 * 1000) // Convert L/min to m³/s 