'use client'

import { Button } from '@/components/ui/Button'
import { scenarioCategories } from '@/lib/utils/simulation-scenarios'
import { SimulationState } from '@/lib/types/simulation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ScenarioSelectorProps {
  onSelect: (scenario: Partial<SimulationState>) => void
  disabled: boolean
}

export default function ScenarioSelector({ onSelect, disabled }: ScenarioSelectorProps) {
  return (
    <>
      <h3 className="text-xl font-semibold text-white mb-4">Predefined Scenarios</h3>
      <Accordion type="single" collapsible className="w-full">
        {scenarioCategories.map((category, index) => (
          <AccordionItem key={category.name} value={`item-${index}`}>
            <AccordionTrigger className="text-white hover:text-white">
              {category.name}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-gray-400 mb-4">
                {category.description}
              </p>
              <div className="space-y-4">
                {category.scenarios.map((scenario) => (
                  <div key={scenario.name} className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-purple-500/20 transition-all"
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
} 