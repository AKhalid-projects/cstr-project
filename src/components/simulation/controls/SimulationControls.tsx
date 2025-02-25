'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/label'

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

  // Update parameters immediately when sliders change
  const handleTank1AreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onTank1AreaChange(value);
  };

  const handleTank2AreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onTank2AreaChange(value);
  };

  const handlePumpFlowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onPumpFlowChange(value);
  };

  const handleControllerOutputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onControllerOutputChange(value);
  };

  return (
    <Card className="bg-gray-800 border-gray-700 p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Simulation Controls</h3>

      <div className="grid grid-cols-2 gap-8">
        {/* Tank 1 Controls */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">Tank 1</h4>
          
          <div>
            <Label className="text-gray-300">Tank Area (m²)</Label>
            <input
              type="range"
              min="0.001"
              max="0.02"
              step="0.001"
              value={tank1Area}
              onChange={handleTank1AreaChange}
              disabled={disabled}
              className="w-full bg-gray-700"
            />
            <div className="text-gray-400 text-sm mt-1">
              {tank1Area.toFixed(3)} m²
            </div>
          </div>

          <div>
            <Label className="text-gray-300">Inlet Flow Control (%)</Label>
            <input
              type="range"
              min="0"
              max="100"
              value={controllerOutput}
              onChange={handleControllerOutputChange}
              disabled={disabled}
              className="w-full bg-gray-700"
            />
            <div className="text-gray-400 text-sm mt-1">
              {controllerOutput.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Tank 2 Controls */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">Tank 2</h4>
          
          <div>
            <Label className="text-gray-300">Tank Area (m²)</Label>
            <input
              type="range"
              min="0.001"
              max="0.02"
              step="0.001"
              value={tank2Area}
              onChange={handleTank2AreaChange}
              disabled={disabled}
              className="w-full bg-gray-700"
            />
            <div className="text-gray-400 text-sm mt-1">
              {tank2Area.toFixed(3)} m²
            </div>
          </div>

          <div>
            <Label className="text-gray-300">Pump Flow (L/min)</Label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={pumpFlow}
              onChange={handlePumpFlowChange}
              disabled={disabled}
              className="w-full bg-gray-700"
            />
            <div className="text-gray-400 text-sm mt-1">
              {pumpFlow.toFixed(1)} L/min
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <Button
          variant="secondary"
          onClick={handleSavePreset}
          disabled={disabled}
        >
          Save Preset
        </Button>
        <Button
          variant="secondary"
          onClick={handleLoadPreset}
          disabled={disabled}
        >
          Load Preset
        </Button>
      </div>
    </Card>
  )
} 