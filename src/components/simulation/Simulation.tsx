'use client'

import Scene from './3d/Scene'
import Tank3D from './3d/Tank3D'
import LevelIndicator from './visualization/LevelIndicator'
import { Card } from '@/components/ui/Card'

interface SimulationProps {
  controlParameters: {
    kp: number;
    ki: number;
    kd: number;
    setpoint: number;
  };
  systemParameters: {
    tank1: {
      height: number;
      maxHeight: number;
    };
    tank2: {
      height: number;
      maxHeight: number;
    };
    controllerOutput: number;
    pumpFlow: number;
  };
}

export default function Simulation({ controlParameters, systemParameters }: SimulationProps) {
  // Convert heights to percentages for visualization
  const tank1LevelPercent = (systemParameters.tank1.height / systemParameters.tank1.maxHeight) * 100
  const tank2LevelPercent = (systemParameters.tank2.height / systemParameters.tank2.maxHeight) * 100

  return (
    <Card className="bg-gray-800 border-gray-700 p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Gravity Tanks Simulation</h2>

      <div className="space-y-8">
        {/* 3D Visualization */}
        <div className="grid grid-cols-2 gap-8">
          {/* Upper Tank */}
          <div className="aspect-square relative">
            <Scene>
              <Tank3D level={tank1LevelPercent} />
            </Scene>
            <LevelIndicator level={tank1LevelPercent} />
          </div>

          {/* Lower Tank */}
          <div className="aspect-square relative">
            <Scene>
              <Tank3D level={tank2LevelPercent} />
            </Scene>
            <LevelIndicator level={tank2LevelPercent} />
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-4">
        <div className="flex justify-between text-gray-300">
          <span>Setpoint: {controlParameters.setpoint}%</span>
          <span>Tank 1 Level: {tank1LevelPercent.toFixed(1)}%</span>
          <span>Tank 2 Level: {tank2LevelPercent.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Kp: {controlParameters.kp}</span>
          <span>Ki: {controlParameters.ki}</span>
          <span>Kd: {controlParameters.kd}</span>
        </div>
      </div>
    </Card>
  )
} 