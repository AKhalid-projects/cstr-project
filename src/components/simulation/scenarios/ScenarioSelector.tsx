'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { scenarios } from '@/lib/utils/simulation-scenarios'
import { SimulationState } from '@/lib/types/simulation'

interface ScenarioSelectorProps {
  onSelect: (scenario: Partial<SimulationState>) => void
  disabled: boolean
}

export default function ScenarioSelector({ onSelect, disabled }: ScenarioSelectorProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Predefined Scenarios</h3>
      <div className="grid grid-cols-1 gap-4">
        {scenarios.map((scenario) => (
          <div key={scenario.name} className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => onSelect(scenario.state)}
              disabled={disabled}
            >
              {scenario.name}
            </Button>
            <p className="text-sm text-gray-400 px-2">
              {scenario.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
} 