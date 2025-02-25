'use client'

import { useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

interface GraphData {
  tank1Level: number[]
  tank2Level: number[]
  controllerOutput: number[]
  pumpFlow: number[]
  setpoint: number[]
  labels: string[]
}

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
  const [data, setData] = useState<GraphData>({
    tank1Level: [],
    tank2Level: [],
    controllerOutput: [],
    pumpFlow: [],
    setpoint: [],
    labels: []
  })

  // Update graph data
  useEffect(() => {
    setData(prev => {
      const newLabels = [...prev.labels, new Date().toLocaleTimeString()]
      if (newLabels.length > MAX_POINTS) {
        newLabels.shift()
      }

      const updateArray = (arr: number[], newValue: number) => {
        const newArr = [...arr, newValue]
        if (newArr.length > MAX_POINTS) {
          newArr.shift()
        }
        return newArr
      }

      return {
        tank1Level: updateArray(prev.tank1Level, tank1Level),
        tank2Level: updateArray(prev.tank2Level, tank2Level),
        controllerOutput: updateArray(prev.controllerOutput, controllerOutput),
        pumpFlow: updateArray(prev.pumpFlow, pumpFlow),
        setpoint: updateArray(prev.setpoint, setpoint),
        labels: newLabels
      }
    })
  }, [tank1Level, tank2Level, controllerOutput, pumpFlow, setpoint])

  const options = {
    responsive: true,
    animation: {
      duration: 0
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      },
      x: {
        display: false
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      }
    }
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Tank 1 Level',
        data: data.tank1Level,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3
      },
      {
        label: 'Tank 2 Level',
        data: data.tank2Level,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3
      },
      {
        label: 'Controller Output',
        data: data.controllerOutput,
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        tension: 0.3
      },
      {
        label: 'Pump Flow',
        data: data.pumpFlow,
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        tension: 0.3
      },
      {
        label: 'Setpoint',
        data: data.setpoint,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderDash: [5, 5],
        tension: 0.3
      }
    ]
  }

  return (
    <div className="w-full h-[400px] bg-gray-900 rounded-lg p-4">
      <Line options={options} data={chartData} />
    </div>
  )
} 