'use client'

import { motion } from 'framer-motion'

interface OutletFlowProps {
  isFlowing: boolean
  flowRate: number
}

export default function OutletFlow({ isFlowing, flowRate }: OutletFlowProps) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-4 h-16">
      <div className="relative w-full h-full">
        {/* Vertical static pipe */}
        <div className="absolute inset-x-0 mx-auto w-4 h-8 bg-gray-700/50 rounded-full" />
        
        {/* Horizontal static pipe */}
        <div className="absolute bottom-0 left-0 h-4 w-16 bg-gray-700/50 rounded-full translate-x-full" />
        
        {/* Animated water flow */}
        {isFlowing && (
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: ['0%', '100%'],
              transition: {
                duration: 1,
                repeat: Infinity,
                ease: 'linear'
              }
            }}
            className="absolute bottom-0.5 left-0 h-3 w-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-500/50 origin-left translate-x-full"
            style={{
              animationDuration: `${1 / (flowRate / 100)}s`
            }}
          />
        )}
      </div>
    </div>
  )
} 