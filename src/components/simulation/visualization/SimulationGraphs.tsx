'use client'

import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { TooltipItem } from 'chart.js'

interface SimulationGraphsProps {
  tank1Level: number
  tank2Level: number
  controllerOutput: number
  pumpFlow: number
  setpoint: number
}

export default function SimulationGraphs({
  tank1Level,
  tank2Level,
  controllerOutput,
  pumpFlow,
  setpoint
}: SimulationGraphsProps) {
  const [time, setTime] = useState<number[]>([0])
  const [tank1Data, setTank1Data] = useState<number[]>([tank1Level])
  const [tank2Data, setTank2Data] = useState<number[]>([tank2Level])
  const [outputData, setOutputData] = useState<number[]>([controllerOutput])
  const [setpointData, setSetpointData] = useState<number[]>([setpoint])
  const [pumpData, setPumpData] = useState<number[]>([pumpFlow])

  // Update data points
  useEffect(() => {
    const updateData = (prevData: number[], newValue: number) => {
      return [...prevData, newValue];
    }

    setTime(prev => {
      return [...prev, prev[prev.length - 1] + 1];
    })

    setTank1Data(prev => updateData(prev, tank1Level))
    setTank2Data(prev => updateData(prev, tank2Level))
    setOutputData(prev => updateData(prev, controllerOutput))
    setSetpointData(prev => updateData(prev, setpoint))
    setPumpData(prev => updateData(prev, pumpFlow))
  }, [tank1Level, tank2Level, controllerOutput, pumpFlow, setpoint])

  const createChartOptions = (yMax: number) => ({
    responsive: true,
    animation: { duration: 0 } as const,
    maintainAspectRatio: false,
    aspectRatio: 2,
    elements: {
      line: { 
        borderWidth: 2,
        tension: 0.4 
      },
      point: { 
        radius: 0 
      }
    },
    layout: {
      padding: {
        left: 25,
        right: 25,
        top: 25,
        bottom: 25
      }
    },
    scales: {
      x: {
        type: 'linear' as const,
        display: true,
        grid: { 
          color: 'rgba(255,255,255,0.05)', 
          lineWidth: 1 
        },
        ticks: { 
          color: 'rgba(255,255,255,0.25)', 
          font: { size: 12 },
          stepSize: 60,
          maxRotation: 0
        },
        border: {
          width: 2,
          color: 'rgba(255,255,255,0.1)'
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        grid: { 
          color: 'rgba(255,255,255,0.05)', 
          lineWidth: 1,
          drawTicks: true
        },
        ticks: { 
          color: 'rgba(255,255,255,0.25)', 
          font: { size: 12 },
          padding: 15,
          callback: function(tickValue: number | string) {
            if (typeof tickValue !== 'number') return tickValue;
            return yMax <= 10 ? tickValue.toFixed(1) : tickValue.toFixed(0);
          },
          stepSize: yMax <= 10 ? 0.5 : 5,
          autoSkip: false,
          maxTicksLimit: yMax <= 10 ? 21 : 21,
          maxRotation: 0
        },
        border: {
          width: 2,
          color: 'rgba(255,255,255,0.1)'
        },
        min: 0,
        max: yMax,
        beginAtZero: true,
        position: 'left' as const
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: { 
          color: 'rgba(255,255,255,0.7)', 
          font: { size: 14 },
          usePointStyle: true,
          pointStyle: 'line',
          padding: 20
        },
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
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(tooltipItem: TooltipItem<"line">) {
            return `${tooltipItem.dataset.label || ''}: ${tooltipItem.parsed.y.toFixed(2)}`;
          }
        }
      }
    }
  })

  const tankLevelsData = {
    labels: time,
    datasets: [
      {
        label: 'Tank 1 Level',
        data: tank1Data,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Tank 2 Level',
        data: tank2Data,
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Setpoint',
        data: setpointData,
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        tension: 0.4,
        borderDash: [5, 5],
        fill: false
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
        tension: 0.4,
        fill: false
      },
      {
        label: 'Pump Flow',
        data: pumpData,
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        fill: false
      }
    ]
  }

  return (
    <div className="space-y-12 w-full max-w-none px-4">
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/[0.05] p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
          <h3 className="text-sm font-medium text-gray-300">Tank Levels</h3>
        </div>
        <div className="h-[1600px]">
          <Line 
            data={tankLevelsData} 
            options={createChartOptions(10)}
          />
        </div>
      </div>

      <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/[0.05] p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
          <h3 className="text-sm font-medium text-gray-300">Control Signals</h3>
        </div>
        <div className="h-[1600px]">
          <Line 
            data={controlSignalsData} 
            options={createChartOptions(100)}
          />
        </div>
      </div>
    </div>
  )
} 