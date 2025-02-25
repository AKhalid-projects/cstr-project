'use client'

import { VisualizationProps } from '@/lib/types/simulation'

export default function LevelIndicator({ level }: Pick<VisualizationProps, 'level'>) {
  return (
    <div className="absolute left-0 bottom-0 w-2 h-full bg-gray-700">
      <div 
        className="absolute bottom-0 w-full bg-blue-500 transition-all duration-200"
        style={{ height: `${level}%` }}
      />
    </div>
  )
} 