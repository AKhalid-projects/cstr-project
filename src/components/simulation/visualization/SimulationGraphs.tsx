'use client'

import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { ControlStrategy } from '@/lib/types'

interface SimulationGraphsProps {
  tank1Level: number
  tank2Level: number
  controllerOutput: number
  pumpFlow: number
  setpoint: number
  controlStrategy: ControlStrategy
  pidComponents?: {
    proportional: number
    integral: number
    derivative: number
    feedforward?: number
  }
}

export default function SimulationGraphs({
  tank1Level,
  tank2Level,
  controllerOutput,
  pumpFlow,
  setpoint,
  controlStrategy,
  pidComponents
}: SimulationGraphsProps) {
  const [time, setTime] = useState<number[]>([])
  const [tank1Data, setTank1Data] = useState<number[]>([])
  const [tank2Data, setTank2Data] = useState<number[]>([])
  const [outputData, setOutputData] = useState<number[]>([])
  const [setpointData, setSetpointData] = useState<number[]>([])
  const [pumpData, setPumpData] = useState<number[]>([])
  const [proportionalData, setProportionalData] = useState<number[]>([])
  const [integralData, setIntegralData] = useState<number[]>([])
  const [derivativeData, setDerivativeData] = useState<number[]>([])
  const [feedforwardData, setFeedforwardData] = useState<number[]>([])

  // Update data points
  useEffect(() => {
    const updateData = (prevData: number[], newValue: number) => {
      // No truncation, just accumulate
      return [...prevData, newValue]
    }

    setTime(prev => {
      // No truncation, just accumulate
      return [...prev, prev.length ? prev[prev.length - 1] + 1 : 0]
    })

    setTank1Data(prev => updateData(prev, tank1Level))
    setTank2Data(prev => updateData(prev, tank2Level))
    setOutputData(prev => updateData(prev, controllerOutput))
    setSetpointData(prev => updateData(prev, setpoint))
    setPumpData(prev => updateData(prev, pumpFlow))

    if (pidComponents) {
      setProportionalData(prev => updateData(prev, pidComponents.proportional))
      setIntegralData(prev => updateData(prev, pidComponents.integral))
      setDerivativeData(prev => updateData(prev, pidComponents.derivative))
      if (pidComponents.feedforward !== undefined) {
        setFeedforwardData(prev => updateData(prev, pidComponents.feedforward!))
      }
    }
  }, [tank1Level, tank2Level, controllerOutput, pumpFlow, setpoint, pidComponents])

  const minimalisticOptions = {
    responsive: true,
    animation: { duration: 0 } as const,
    elements: {
      line: { borderWidth: 2 },
      point: { radius: 0 }
    },
    scales: {
      x: {
        type: 'linear' as const,
        display: true,
        grid: { color: 'rgba(255,255,255,0.05)', lineWidth: 1 },
        ticks: { color: 'rgba(255,255,255,0.25)', font: { size: 10 } }
      },
      y: {
        display: true,
        grid: { color: 'rgba(255,255,255,0.05)', lineWidth: 1 },
        ticks: { color: 'rgba(255,255,255,0.25)', font: { size: 10 } },
        min: 0,
        max: 10
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: { color: 'rgba(255,255,255,0.7)', font: { size: 12 } },
        position: 'top' as const,
      },
      title: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(30,30,30,0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1
      }
    }
  }

  // Minimalistic options for Control Signals graph (0-100 y-axis)
  const controlSignalsOptions = {
    ...minimalisticOptions,
    scales: {
      ...minimalisticOptions.scales,
      y: {
        ...minimalisticOptions.scales.y,
        min: 0,
        max: 100
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
      },
      {
        label: 'Setpoint',
        data: setpointData,
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        tension: 0.4,
        borderDash: [5, 5]
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
        <Line data={tankLevelsData} options={minimalisticOptions} />
      </div>

      <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/[0.05] p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
          <h3 className="text-sm font-medium text-gray-300">Control Signals</h3>
        </div>
        <Line data={controlSignalsData} options={controlSignalsOptions} />
      </div>
    </div>
  )
} 