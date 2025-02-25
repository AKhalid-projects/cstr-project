import { SimulationState } from '@/lib/types/simulation'

export interface ScenarioCategory {
  name: string
  description: string
  scenarios: Scenario[]
}

export interface Scenario {
  name: string
  description: string
  state: Partial<SimulationState>
}

export const scenarioCategories: ScenarioCategory[] = [
  {
    name: 'PI Control',
    description: 'Scenarios demonstrating PI control behavior without derivative action',
    scenarios: [
      {
        name: 'Basic PI Control',
        description: 'Standard PI control with moderate gains for smooth response.',
        state: {
          controlStrategy: 'PI',
          controller: {
            kp: 1.0,
            ki: 0.15,
            kd: 0,
            setpoint: 50
          },
          pumpFlow: 0
        }
      },
      {
        name: 'Slow PI Response',
        description: 'Conservative PI tuning with minimal overshoot but slower response.',
        state: {
          controlStrategy: 'PI',
          controller: {
            kp: 0.5,
            ki: 0.08,
            kd: 0,
            setpoint: 60
          },
          pumpFlow: 2
        }
      }
    ]
  },
  {
    name: 'PID Control',
    description: 'Classic PID control scenarios with different tuning approaches',
    scenarios: [
      {
        name: 'Aggressive PID',
        description: 'Fast response with overshoot due to high proportional gain.',
        state: {
          controlStrategy: 'PID',
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
        name: 'Balanced PID',
        description: 'Well-tuned PID with good balance between speed and stability.',
        state: {
          controlStrategy: 'PID',
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
        name: 'Robust PID',
        description: 'Emphasis on disturbance rejection with stronger integral action.',
        state: {
          controlStrategy: 'PID',
          controller: {
            kp: 1.5,
            ki: 0.2,
            kd: 0.1,
            setpoint: 70
          },
          pumpFlow: 8
        }
      }
    ]
  },
  {
    name: 'PID with Feedforward',
    description: 'Advanced control using PID with feedforward compensation',
    scenarios: [
      {
        name: 'Basic Feedforward',
        description: 'PID with feedforward for improved disturbance rejection.',
        state: {
          controlStrategy: 'PID_FEEDFORWARD',
          controller: {
            kp: 1.0,
            ki: 0.1,
            kd: 0.05,
            setpoint: 55
          },
          pumpFlow: 6
        }
      },
      {
        name: 'Aggressive Feedforward',
        description: 'Fast response using feedforward with higher gains.',
        state: {
          controlStrategy: 'PID_FEEDFORWARD',
          controller: {
            kp: 1.8,
            ki: 0.15,
            kd: 0.12,
            setpoint: 65
          },
          pumpFlow: 8
        }
      },
      {
        name: 'Disturbance Focus',
        description: 'Optimized for handling large pump flow variations.',
        state: {
          controlStrategy: 'PID_FEEDFORWARD',
          controller: {
            kp: 1.3,
            ki: 0.18,
            kd: 0.08,
            setpoint: 45
          },
          pumpFlow: 10
        }
      }
    ]
  }
] 