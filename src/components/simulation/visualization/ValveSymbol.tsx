'use client'

interface ValveSymbolProps {
  className?: string
  size?: number
}

export default function ValveSymbol({ className = '', size = 24 }: ValveSymbolProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Horizontal line */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-700/50" />
      
      {/* Triangle */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-gray-700/50"
        style={{ 
          transform: 'translate(-50%, -50%) rotate(45deg)',
          borderRadius: '2px'
        }}
      />
      
      {/* Vertical line */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 w-1 h-6 bg-gray-700/50"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
        }}
      />
    </div>
  )
} 