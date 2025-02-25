'use client'

import { motion } from 'framer-motion'

interface LevelIndicatorProps {
  level: number
}

export default function LevelIndicator({ level }: LevelIndicatorProps) {
  return (
    <div className="absolute right-4 top-4 bottom-4 w-12 bg-gray-700/50 rounded-full">
      <motion.div
        className="absolute bottom-0 w-full bg-blue-500 rounded-full"
        initial={{ height: '0%' }}
        animate={{ height: `${level}%` }}
        transition={{ type: "spring", stiffness: 100 }}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-2 text-white text-sm">
        <span>100%</span>
        <span>50%</span>
        <span>0%</span>
      </div>
    </div>
  )
} 