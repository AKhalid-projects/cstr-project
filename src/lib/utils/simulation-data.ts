import { SimulationState } from '@/lib/types/simulation';

/**
 * Interface for a single data point in the simulation
 */
export interface SimulationDataPoint {
  time: number;              // Simulation time (s)
  tank1Level: number;        // Tank 1 water level (m)
  tank2Level: number;        // Tank 2 water level (m)
  controllerOutput: number;  // Controller output (0-100%)
  pumpFlow: number;          // Pump flow rate (L/min)
  setpoint: number;          // Target level (m)
  error?: number;            // Control error (m)
  pidComponents?: {          // PID component values
    proportional: number;
    integral: number;
    derivative: number;
    feedforward?: number;
  };
}

/**
 * Class to manage simulation data collection and export
 */
export class SimulationDataManager {
  private dataPoints: SimulationDataPoint[] = [];

  /**
   * Add a new data point to the collection
   */
  public addDataPoint(state: SimulationState): void {
    const dataPoint: SimulationDataPoint = {
      time: state.time,
      tank1Level: state.tank1.height,
      tank2Level: state.tank2.height,
      controllerOutput: state.controllerOutput,
      pumpFlow: state.pumpFlow,
      setpoint: state.controller.setpoint,
      pidComponents: state.pidComponents
    };

    // Calculate error if in control mode
    if (state.controlStrategy !== 'MANUAL') {
      dataPoint.error = state.controller.setpoint - state.tank2.height;
    }

    this.dataPoints.push(dataPoint);
  }

  /**
   * Clear all collected data
   */
  public clearData(): void {
    this.dataPoints = [];
  }

  /**
   * Export collected data as CSV
   */
  public exportToCSV(): string {
    if (this.dataPoints.length === 0) {
      return '';
    }

    // Define CSV headers (remove Error, Proportional, Integral, Derivative, Feedforward)
    const headers = [
      'Time (s)',
      'Tank 1 Level (m)',
      'Tank 2 Level (m)',
      'Controller Output (%)',
      'Pump Flow (L/min)',
      'Setpoint (m)'
    ].join(',');

    // Convert data points to CSV rows (remove extra columns)
    const rows = this.dataPoints.map(point => {
      const values = [
        point.time.toFixed(2),
        point.tank1Level.toFixed(3),
        point.tank2Level.toFixed(3),
        point.controllerOutput.toFixed(1),
        point.pumpFlow.toFixed(2),
        point.setpoint.toFixed(2)
      ];
      return values.join(',');
    });

    // Combine headers and rows
    return [headers, ...rows].join('\n');
  }

  /**
   * Get the number of data points collected
   */
  public getDataPointCount(): number {
    return this.dataPoints.length;
  }
} 