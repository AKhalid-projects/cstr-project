import { SimulationState } from '@/lib/types/simulation'

export interface Scenario {
  name: string
  description: string
  state: Partial<SimulationState>
}

export const scenarios: Scenario[] = [
  {
    name: 'Oscillating Response',
    description: 'Aggressive controller gains cause tank levels to oscillate. High proportional gain makes the system respond quickly but overshoot.',
    state: {
      controller: {
        kp: 2.5,
        ki: 0.05,
        kd: 0.1,
        setpoint: 50
      },
      pumpFlow: 5
    }
  },
  {
    name: 'Stable Control',
    description: 'Well-tuned PID parameters provide smooth and stable response with minimal overshoot.',
    state: {
      controller: {
        kp: 1.2,
        ki: 0.1,
        kd: 0.15,
        setpoint: 60
      },
      pumpFlow: 0
    }
  },
  {
    name: 'Disturbance Rejection',
    description: 'Tests how well the controller handles sudden changes in pump flow (disturbance).',
    state: {
      controller: {
        kp: 1.5,
        ki: 0.2,
        kd: 0.1,
        setpoint: 70
      },
      pumpFlow: 8
    }
  },
  {
    name: 'Slow Response',
    description: 'Conservative gains result in slow but stable response without oscillations.',
    state: {
      controller: {
        kp: 0.5,
        ki: 0.05,
        kd: 0.05,
        setpoint: 40
      },
      pumpFlow: 2
    }
  }
] 