import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { ControlStrategy } from '@/lib/types/simulation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SimulationGraphsProps {
  tank1Data: number[];
  tank2Data: number[];
  pumpFlowData: number[];
  controlOutputData: number[];
  setpoint: number;
  controlStrategy: ControlStrategy;
  pidComponents?: {
    proportional: number[];
    integral: number[];
    derivative: number[];
  };
}

const SimulationGraphs = ({
  tank1Data,
  tank2Data,
  pumpFlowData,
  controlOutputData,
  setpoint,
  controlStrategy,
  pidComponents,
}: SimulationGraphsProps) => {
  const timeLabels = Array.from({ length: tank1Data.length }, (_, i) => i.toString());

  const tankLevelsData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Tank 1 Level',
        data: tank1Data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Tank 2 Level',
        data: tank2Data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Setpoint',
        data: Array(tank1Data.length).fill(setpoint),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderDash: [5, 5],
      },
    ],
  };

  const controlOutputDataConfig = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Control Output',
        data: controlOutputData,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },
      ...(pidComponents && controlStrategy !== 'MANUAL' ? [
        {
          label: 'Proportional',
          data: pidComponents.proportional,
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
        },
        {
          label: 'Integral',
          data: pidComponents.integral,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Derivative',
          data: pidComponents.derivative,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ] : []),
    ],
  };

  const pumpFlowDataConfig = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Pump Flow',
        data: pumpFlowData,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Tank Levels',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const controlOutputOptions: ChartOptions<'line'> = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: true,
        text: 'Control Output',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const pumpFlowOptions: ChartOptions<'line'> = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: true,
        text: 'Pump Flow',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <Line options={chartOptions} data={tankLevelsData} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <Line options={controlOutputOptions} data={controlOutputDataConfig} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <Line options={pumpFlowOptions} data={pumpFlowDataConfig} />
      </div>
    </div>
  );
};

export default SimulationGraphs; 