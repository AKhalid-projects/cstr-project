'use client'

interface SchematicTankProps {
  level: number // 0-100
  maxHeight?: number
  showLevelMarkers?: boolean
}

export default function SchematicTank({ level, maxHeight = 100, showLevelMarkers = true }: SchematicTankProps) {
  return (
    <div className="relative aspect-[1/2] w-full max-w-[150px] mx-auto">
      {/* Tank outline */}
      <div className="absolute inset-0 border-2 border-gray-700/50 rounded-lg">
        {/* Water level */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-blue-400/30 transition-all duration-300 rounded-b-lg"
          style={{ height: `${level}%` }}
        />
        
        {/* Level markers */}
        {showLevelMarkers && (
          <div className="absolute inset-y-2 right-0 flex flex-col justify-between">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-4 h-0.5 bg-gray-700/30" />
                <span className="text-xs text-gray-500">
                  {maxHeight - (i * (maxHeight / 10))}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 