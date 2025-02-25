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
    <Card className="bg-gray-800 border-gray-700 p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Simulation Controls</h3>

      <div className="grid grid-cols-2 gap-8">
        {controls.map((control, index) => (
          <ControlSlider key={index} {...control} />
        ))}
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