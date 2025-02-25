'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/label'
import { ControlProps } from '@/lib/types/simulation'
import ControlSlider from './ControlSlider'

interface SimulationControlsProps {
  // Tank 1 controls
  tank1Area: number
  onTank1AreaChange: (value: number) => void
  controllerOutput: number
  onControllerOutputChange: (value: number) => void
  
  // Tank 2 controls
  tank2Area: number
  onTank2AreaChange: (value: number) => void
  pumpFlow: number
  onPumpFlowChange: (value: number) => void
  
  disabled: boolean
}

interface Presets {
  tank1Area: number
  tank2Area: number
  controllerOutput: number
  pumpFlow: number
}

export default function SimulationControls({
  tank1Area,
  onTank1AreaChange,
  controllerOutput,
  onControllerOutputChange,
  tank2Area,
  onTank2AreaChange,
  pumpFlow,
  onPumpFlowChange,
  disabled
}: SimulationControlsProps) {
  const [presets, setPresets] = useState<Presets>({
    tank1Area,
    tank2Area,
    controllerOutput,
    pumpFlow
  })

  const handleSavePreset = () => {
    setPresets({
      tank1Area,
      tank2Area,
      controllerOutput,
      pumpFlow
    })
  }

  const handleLoadPreset = () => {
    onTank1AreaChange(presets.tank1Area)
    onTank2AreaChange(presets.tank2Area)
    onControllerOutputChange(presets.controllerOutput)
    onPumpFlowChange(presets.pumpFlow)
  }

  const controls: ControlProps[] = [
    {
      label: 'Tank 1 Area (m²)',
      value: tank1Area,
      onChange: onTank1AreaChange,
      min: 0.001,
      max: 0.02,
      step: 0.001,
      disabled
    },
    {
      label: 'Inlet Flow Control (%)',
      value: controllerOutput,
      onChange: onControllerOutputChange,
      min: 0,
      max: 100,
      step: 1,
      disabled
    },
    {
      label: 'Tank 2 Area (m²)',
      value: tank2Area,
      onChange: onTank2AreaChange,
      min: 0.001,
      max: 0.02,
      step: 0.001,
      disabled
    },
    {
      label: 'Pump Flow (L/min)',
      value: pumpFlow,
      onChange: onPumpFlowChange,
      min: 0,
      max: 10,
      step: 0.1,
      disabled
    }
  ]

  return (
    <div className="space-y-8">
      {/* Main Controls Section */}
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/[0.05] shadow-2xl">
        <div className="p-6 border-b border-white/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            <h2 className="text-xl font-semibold text-white">Simulation Controls</h2>
          </div>
          <span className="text-sm text-gray-400 bg-white/[0.05] px-3 py-1 rounded-full">
            Real-time Adjustment
          </span>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Tank 1 Parameters */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                <h3 className="text-sm font-medium text-gray-300">Tank 1 Parameters</h3>
              </div>
              <div className="space-y-6">
                {controls.slice(0, 2).map((control, index) => (
                  <div key={index} className="space-y-3">
                    <ControlSlider 
                      {...control}
                      className="bg-white/[0.03] hover:bg-white/[0.05] transition-colors rounded-lg p-3"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tank 2 Parameters */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                <h3 className="text-sm font-medium text-gray-300">Tank 2 Parameters</h3>
              </div>
              <div className="space-y-6">
                {controls.slice(2).map((control, index) => (
                  <div key={index} className="space-y-3">
                    <ControlSlider 
                      {...control}
                      className="bg-white/[0.03] hover:bg-white/[0.05] transition-colors rounded-lg p-3"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/[0.05] p-4">
          <div className="text-sm text-gray-400">Controller Output</div>
          <div className="text-2xl font-semibold text-white mt-1">
            {controllerOutput.toFixed(1)}%
          </div>
          <div className="mt-2 h-1 bg-white/[0.05] rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${controllerOutput}%` }}
            />
          </div>
        </div>
        <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/[0.05] p-4">
          <div className="text-sm text-gray-400">Pump Flow</div>
          <div className="text-2xl font-semibold text-white mt-1">
            {pumpFlow.toFixed(1)}%
          </div>
          <div className="mt-2 h-1 bg-white/[0.05] rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${pumpFlow}%` }}
            />
          </div>
        </div>
      </div>

      {/* Configuration Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
          <h3 className="text-sm font-medium text-gray-300">Configuration Presets</h3>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handleSavePreset}
            disabled={disabled}
            className="flex-1 bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.05] text-gray-300"
          >
            Save Configuration
          </Button>
          <Button
            onClick={handleLoadPreset}
            disabled={disabled}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-purple-500/20"
          >
            Load Configuration
          </Button>
        </div>
      </div>
    </div>
  )
} 