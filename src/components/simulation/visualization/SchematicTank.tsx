'use client'

interface SchematicTankProps {
  level: number // 0-100
  maxHeight?: number
  showLevelMarkers?: boolean
}

export default function SchematicTank({ level, maxHeight = 10, showLevelMarkers = true }: SchematicTankProps) {
  // If level is > maxHeight, assume it's a percentage and convert to 0-10 scale
  const normalizedLevel = level > maxHeight ? (level / 100) * maxHeight : level;

  return (
    <div className="relative aspect-[1/1.5] w-full max-w-[200px] mx-auto">
      {/* Tank outline */}
      <div className="absolute inset-0 border-2 border-gray-700/50 rounded-lg">
        {/* Water level */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-blue-400/30 backdrop-blur-sm transition-all duration-300 rounded-b-lg"
          style={{ height: `${(normalizedLevel / maxHeight) * 100}%` }}
        >
          {/* Current level indicator */}
          <div className="absolute -right-16 top-0 flex items-center gap-2">
            <div className="w-4 h-0.5 bg-blue-400/50" />
            <span className="text-sm text-blue-400/80">
              {normalizedLevel.toFixed(2)} m
            </span>
          </div>
        </div>
        
        {/* Level markers */}
        {showLevelMarkers && (
          <div className="absolute inset-y-2 -right-12 flex flex-col justify-between">
            {[...Array(11)].map((_, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-gray-700/30" />
                <span className="text-xs text-gray-500 w-6">
                  {(maxHeight - i).toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 