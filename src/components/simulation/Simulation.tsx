'use client'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Target } from 'lucide-react'
import WaterFlow from './visualization/WaterFlow'
import SchematicTank from './visualization/SchematicTank'
import { SimulationState } from '@/lib/types/simulation'

interface SimulationProps {
  controlParameters: {
    kc: number;
    ti: number;
    td: number;
    setpoint: number;
  };
  systemParameters: SimulationState;
  controlStrategy: 'MANUAL' | 'PID' | 'PI' | 'PID_FEEDFORWARD';
}

export default function Simulation({ controlParameters, systemParameters, controlStrategy }: SimulationProps) {
  const tank1LevelPercent = (systemParameters.tank1.height / systemParameters.tank1.maxHeight) * 100
  const tank2LevelPercent = (systemParameters.tank2.height / systemParameters.tank2.maxHeight) * 100

  return (
    <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm overflow-hidden">
      <div className="space-y-8 p-6">
        {/* Tank Visualization */}
        <div className="grid grid-cols-1 gap-4">
          {/* Tank 1 */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-sm font-medium text-gray-300">Tank 1</h3>
            <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/[0.05] p-6 w-[300px]">
              <SchematicTank level={tank1LevelPercent} />
            </div>
          </div>

          {/* Water Flow with Valve */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-sm font-medium text-gray-300">Flow Control</h3>
            <div className="h-16 w-[300px] relative">
              <WaterFlow 
                isFlowing={tank1LevelPercent > 0}
                flowRate={systemParameters.controllerOutput}
                height="h-16"
              />
            </div>
            <div className="text-sm text-gray-400">{systemParameters.controllerOutput.toFixed(1)}%</div>
          </div>

          {/* Tank 2 */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-sm font-medium text-gray-300">Tank 2</h3>
            <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/[0.05] p-6 w-[300px]">
              <SchematicTank level={tank2LevelPercent} />
            </div>
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
              <span>Setpoint: {controlParameters.setpoint.toFixed(1)} m</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Tank 1: {tank1LevelPercent.toFixed(1)}%</span>
              <span>Tank 2: {tank2LevelPercent.toFixed(1)}%</span>
            </div>
          </div>
          {controlStrategy !== 'MANUAL' && (
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Kc:</span>
                <span className="font-mono text-blue-400">{controlParameters.kc.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Ti:</span>
                <span className="font-mono text-purple-400">{controlParameters.ti.toFixed(2)}</span>
              </div>
              {controlStrategy !== 'PI' && (
                <div className="flex justify-between text-gray-300">
                  <span>Td:</span>
                  <span className="font-mono text-green-400">{controlParameters.td.toFixed(2)}</span>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </Card>
  )
} 