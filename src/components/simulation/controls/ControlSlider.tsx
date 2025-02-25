'use client'

import type { ControlSliderProps } from '@/lib/types/simulation'

export default function ControlSlider({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  disabled = false 
}: ControlSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-white">{label}</label>
        <span className="text-gray-400">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  )
} 