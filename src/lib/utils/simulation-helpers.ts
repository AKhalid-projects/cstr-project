import { GRAVITY, NOISE_STD_DEV, LPM_TO_M3S, MAX_INFLOW_LPM } from '../constants/simulation';

/**
 * Adds Gaussian noise to the inflow rate using Box-Muller transform
 * @param inflow Base inflow rate in m³/s
 * @param intensity Noise intensity multiplier (0-2)
 * @returns Inflow rate with added noise in m³/s
 * 
 * Implementation matches Python code:
 * - Nominal input flow: 25 L/min = 0.4167 L/s
 * - Noise range: ±1.25 L/min
 * - Standard deviation: 1.25/3 ≈ 0.4167 L/min
 */
export function addNoiseToInflow(inflow: number, intensity: number = 1.0): number {
  // Box-Muller transform for generating normal distribution
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  
  // Convert noise to m³/s and add to inflow, scaled by intensity
  // NOISE_STD_DEV is in L/min, convert to m³/s using LPM_TO_M3S
  const noise = z0 * NOISE_STD_DEV * LPM_TO_M3S * intensity;
  
  // Ensure the total flow stays within reasonable bounds
  const noisyInflow = inflow + noise;
  return Math.max(0, Math.min(MAX_INFLOW_LPM * LPM_TO_M3S, noisyInflow));
}

/**
 * Calculates flow rate through an outlet using Torricelli's law
 * @param level Water level in meters
 * @param outletDiameter Outlet diameter in meters
 * @returns Flow rate in m³/s
 */
export function calculateFlowRate(level: number, outletDiameter: number): number {
  const area = Math.PI * Math.pow(outletDiameter / 2, 2);
  return area * Math.sqrt(2 * GRAVITY * level);
} 