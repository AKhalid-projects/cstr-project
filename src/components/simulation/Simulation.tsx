'use client'

import Scene from './3d/Scene'
import Tank3D from './3d/Tank3D'
import LevelIndicator from './visualization/LevelIndicator'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Target } from 'lucide-react'
import WaterFlow from './visualization/WaterFlow'
import OutletFlow from './visualization/OutletFlow'
import SchematicTank from './visualization/SchematicTank'
import ValveSymbol from './visualization/ValveSymbol'

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
  const tank1LevelPercent = (systemParameters.tank1.height / systemParameters.tank1.maxHeight) * 100
  const tank2LevelPercent = (systemParameters.tank2.height / systemParameters.tank2.maxHeight) * 100

  return (
    <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm overflow-hidden">
      <div className="space-y-8 p-6">
        {/* 3D Visualization */}
        <div className="grid grid-cols-1 gap-1">
          {/* Upper Tank */}
          <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/[0.05] p-6 w-[300px] mx-auto">
            <SchematicTank level={tank1LevelPercent} />
          </div>

          {/* Water Flow with Valve */}
          <div className="h-16 w-[300px] mx-auto">
            <WaterFlow 
              isFlowing={tank1LevelPercent > 0}
              flowRate={systemParameters.controllerOutput}
              height="h-16"
            />
          </div>

          {/* Lower Tank */}
          <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/[0.05] p-6 w-[300px] mx-auto">
            <SchematicTank level={tank2LevelPercent} />
          </div>
        </div>

        {/* Status Display */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 gap-4 bg-gray-900/50 p-4 rounded-lg backdrop-blur-sm border border-gray-700/50"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-300">
              <Target className="w-4 h-4 text-blue-400" />
              <span>Target: {controlParameters.setpoint.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Tank 1: {tank1LevelPercent.toFixed(1)}%</span>
              <span>Tank 2: {tank2LevelPercent.toFixed(1)}%</span>
            </div>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Kp:</span>
              <span className="font-mono text-blue-400">{controlParameters.kp.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Ki:</span>
              <span className="font-mono text-purple-400">{controlParameters.ki.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Kd:</span>
              <span className="font-mono text-green-400">{controlParameters.kd.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Card>
  )
} 