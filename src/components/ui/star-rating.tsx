'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

export function StarRating({ value, onChange, className }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const star = e.currentTarget
    const rect = star.getBoundingClientRect()
    const isLeftHalf = e.clientX - rect.left < rect.width / 2
    const newValue = index + (isLeftHalf ? 0.5 : 1)
    setHoverValue(newValue)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setHoverValue(null)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const star = e.currentTarget
    const rect = star.getBoundingClientRect()
    const isLeftHalf = e.clientX - rect.left < rect.width / 2
    const newValue = index + (isLeftHalf ? 0.5 : 1)
    onChange(newValue)
  }

  const displayValue = isHovering ? hoverValue : value

  return (
    <div 
      className={cn("flex gap-1", className)}
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1
        const isHalfStar = displayValue === index + 0.5
        const isFullStar = displayValue !== null && displayValue >= starValue

        return (
          <div
            key={index}
            className="relative w-6 h-6 cursor-pointer"
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseEnter={handleMouseEnter}
            onClick={(e) => handleClick(e, index)}
          >
            {/* Empty star background */}
            <Star className="w-6 h-6 text-yellow-500 absolute" />
            
            {/* Half star */}
            {isHalfStar && (
              <div className="overflow-hidden w-[50%] absolute">
                <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
              </div>
            )}
            
            {/* Full star */}
            {isFullStar && (
              <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
            )}
          </div>
        )
      })}
    </div>
  )
} 