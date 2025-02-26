'use client'

import { motion } from 'framer-motion'
import ValveSymbol from './ValveSymbol'

interface WaterFlowProps {
  isFlowing: boolean
  flowRate: number // 0-100
  height?: string // Add height prop with default value
}

export default function WaterFlow({ isFlowing, flowRate, height = 'h-12' }: WaterFlowProps) {
  return (
    <div className={`absolute left-1/2 -translate-x-1/2 w-4 ${height}`}>
      <div className="relative h-full">
        {/* Static pipe */}
        <div className="absolute inset-x-0 mx-auto w-4 h-full bg-gray-700/50 rounded-full" />
        
        {/* Valve symbol */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ValveSymbol size={32} />
        </div>
        
        {/* Animated water flow */}
        {isFlowing && (
          <motion.div
            initial={{ height: 0, top: 0 }}
            animate={{
              height: ['0%', '100%'],
              transition: {
                duration: 1,
                repeat: Infinity,
                ease: 'linear'
              }
            }}
            className="absolute inset-x-0 mx-auto w-3 rounded-full bg-gradient-to-b from-blue-500/50 to-blue-400 origin-top"
            style={{
              animationDuration: `${1 / (flowRate / 100)}s`
            }}
          />
        )}
      </div>
    </div>
  )
} 