'use client'

import { Label } from '@/components/ui/label'
import { ControlProps } from '@/lib/types/simulation'

export default function ControlSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false
}: ControlProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value))
  }

  const displayValue = step >= 1 ? value.toFixed(0) : value.toFixed(3)
  const unit = label.match(/\((.*?)\)/)?.[1] || ''

  return (
    <div className="space-y-2">
      <Label className="text-gray-300">{label}</Label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className="w-full bg-gray-700"
      />
      <div className="text-gray-400 text-sm">
        {displayValue} {unit}
      </div>
    </div>
  )
} 