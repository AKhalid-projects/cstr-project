'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ControlProps } from '@/lib/types/simulation'
import ControlSlider from './ControlSlider'

interface SimulationControlsProps {
  controllerOutput: number
  onControllerOutputChange: (value: number) => void
  pumpFlow: number
  onPumpFlowChange: (value: number) => void
  disabled: boolean
}

interface Presets {
  controllerOutput: number
  pumpFlow: number
}

export default function SimulationControls({
  controllerOutput,
  onControllerOutputChange,
  pumpFlow,
  onPumpFlowChange,
  disabled
}: SimulationControlsProps) {
  const [presets, setPresets] = useState<Presets>({
    controllerOutput,
    pumpFlow
  })

  const handleSavePreset = () => {
    setPresets({
      controllerOutput,
      pumpFlow
    })
  }

  const handleLoadPreset = () => {
    onControllerOutputChange(presets.controllerOutput)
    onPumpFlowChange(presets.pumpFlow)
  }

  const controls: ControlProps[] = [
    {
      label: 'Controller Output (%)',
      value: controllerOutput,
      onChange: onControllerOutputChange,
      min: 0,
      max: 100,
      step: 1,
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
    <div className="space-y-4">
      <div className="grid gap-4">
        {controls.map((control, index) => (
          <ControlSlider key={index} {...control} />
        ))}
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSavePreset}
          disabled={disabled}
          className="flex-1"
        >
          Save Preset
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLoadPreset}
          disabled={disabled}
          className="flex-1"
        >
          Load Preset
        </Button>
      </div>
    </div>
  )
} 