'use client'

import { useEffect, useState, useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/Card'

interface DataPoint {
  time: number
  tank1Level: number
  tank2Level: number
  controllerOutput: number
  pumpFlow: number
  setpoint: number  // Added setpoint to show target level
}

interface SimulationGraphsProps {
  tank1Level: number
  tank2Level: number
  controllerOutput: number
  pumpFlow: number
  setpoint: number
  timeStep?: number
  maxPoints?: number
}

export default function SimulationGraphs({ 
  tank1Level, 
  tank2Level, 
  controllerOutput,
  pumpFlow,
  setpoint,
  timeStep = 0.1,
  maxPoints = 100
}: SimulationGraphsProps) {
  const [data, setData] = useState<DataPoint[]>([])

  const addDataPoint = useCallback(() => {
    setData(prevData => {
      const newPoint: DataPoint = {
        time: prevData.length * timeStep,
        tank1Level,
        tank2Level,
        controllerOutput,
        pumpFlow,
        setpoint
      }

      const updatedData = [...prevData, newPoint]
      return updatedData.length > maxPoints ? updatedData.slice(-maxPoints) : updatedData
    })
  }, [tank1Level, tank2Level, controllerOutput, pumpFlow, setpoint, timeStep, maxPoints])

  useEffect(() => {
    addDataPoint()
  }, [addDataPoint])

  const commonAxisProps = {
    stroke: "#9CA3AF",
    tick: { fill: "#9CA3AF" }
  }

  const commonTooltipProps = {
    contentStyle: { backgroundColor: '#1F2937', borderColor: '#374151', color: '#9CA3AF' },
    labelStyle: { color: '#9CA3AF' },
    itemStyle: { color: '#9CA3AF' }
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      {/* System Response Graph */}
      <Card className="bg-gray-800 border-gray-700 p-4">
        <h3 className="text-lg font-medium text-white mb-4">System Response</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                {...commonAxisProps}
                dataKey="time" 
                label={{ value: 'Time (s)', position: 'bottom', fill: '#9CA3AF' }}
              />
              <YAxis 
                {...commonAxisProps}
                label={{ value: 'Level (%)', angle: -90, position: 'left', fill: '#9CA3AF' }}
                domain={[0, 100]}
              />
              <Tooltip {...commonTooltipProps} />
              <Legend wrapperStyle={{ color: '#9CA3AF' }} />
              <Line 
                type="monotone" 
                dataKey="setpoint"
                stroke="#EF4444"
                name="Setpoint"
                strokeDasharray="5 5"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="tank1Level" 
                stroke="#10B981" 
                name="Tank 1 Level"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="tank2Level" 
                stroke="#F59E0B" 
                name="Tank 2 Level"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Control Signals Graph */}
      <Card className="bg-gray-800 border-gray-700 p-4">
        <h3 className="text-lg font-medium text-white mb-4">Control Signals</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                {...commonAxisProps}
                dataKey="time" 
                label={{ value: 'Time (s)', position: 'bottom', fill: '#9CA3AF' }}
              />
              <YAxis 
                {...commonAxisProps}
                label={{ value: 'Value', angle: -90, position: 'left', fill: '#9CA3AF' }}
                domain={[0, 100]}
              />
              <Tooltip {...commonTooltipProps} />
              <Legend wrapperStyle={{ color: '#9CA3AF' }} />
              <Line 
                type="monotone" 
                dataKey="controllerOutput" 
                stroke="#3B82F6" 
                name="Controller Output"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="pumpFlow" 
                stroke="#8B5CF6" 
                name="Pump Flow"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
} 