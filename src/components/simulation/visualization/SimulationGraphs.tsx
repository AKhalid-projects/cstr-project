'use client'

import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

interface SimulationGraphsProps {
  tank1Level: number
  tank2Level: number
  controllerOutput: number
  pumpFlow: number
  setpoint: number
}

const MAX_POINTS = 100

export default function SimulationGraphs({
  tank1Level,
  tank2Level,
  controllerOutput,
  pumpFlow,
  setpoint
}: SimulationGraphsProps) {
  const [time, setTime] = useState<number[]>([])
  const [tank1Data, setTank1Data] = useState<number[]>([])
  const [tank2Data, setTank2Data] = useState<number[]>([])
  const [outputData, setOutputData] = useState<number[]>([])
  const [setpointData, setSetpointData] = useState<number[]>([])
  const [pumpData, setPumpData] = useState<number[]>([])

  // Update data points
  useEffect(() => {
    const updateData = (prevData: number[], newValue: number) => {
      const newData = [...prevData, newValue]
      if (newData.length > MAX_POINTS) newData.shift()
      return newData
    }

    setTime(prev => {
      const newTime = [...prev, prev.length ? prev[prev.length - 1] + 1 : 0]
      if (newTime.length > MAX_POINTS) newTime.shift()
      return newTime
    })

    setTank1Data(prev => updateData(prev, tank1Level))
    setTank2Data(prev => updateData(prev, tank2Level))
    setOutputData(prev => updateData(prev, controllerOutput))
    setSetpointData(prev => updateData(prev, setpoint))
    setPumpData(prev => updateData(prev, pumpFlow))
  }, [tank1Level, tank2Level, controllerOutput, pumpFlow, setpoint])

  const commonOptions = {
    responsive: true,
    animation: { duration: 0 } as const,
    scales: {
      x: {
        type: 'linear' as const,
        display: true,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: 'rgba(255, 255, 255, 0.5)' }
      },
      y: {
        display: true,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: 'rgba(255, 255, 255, 0.5)' },
        max: 100,
        min: 0
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: 'rgba(255, 255, 255, 0.7)' }
      }
    }
  }

  const tankLevelsData = {
    labels: time,
    datasets: [
      {
        label: 'Tank 1 Level',
        data: tank1Data,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Tank 2 Level',
        data: tank2Data,
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4
      }
    ]
  }

  const controlSignalsData = {
    labels: time,
    datasets: [
      {
        label: 'Controller Output',
        data: outputData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Setpoint',
        data: setpointData,
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        tension: 0.4
      },
      {
        label: 'Pump Flow',
        data: pumpData,
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4
      }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/[0.05] p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
          <h3 className="text-sm font-medium text-gray-300">Tank Levels</h3>
        </div>
        <Line data={tankLevelsData} options={commonOptions} />
      </div>

      <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/[0.05] p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
          <h3 className="text-sm font-medium text-gray-300">Control Signals</h3>
        </div>
        <Line data={controlSignalsData} options={commonOptions} />
      </div>
    </div>
  )
} 