'use client';

import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  labels: string[];
  data: number[];
}

export default function RadarChart({ labels, data }: RadarChartProps) {
  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <Radar
        data={{
          labels,
          datasets: [
            {
              label: 'PM 역량 레이더',
              data,
              backgroundColor: 'rgba(250, 204, 21, 0.3)', // 연노란색
              borderColor: '#facc15', // 노란색
              borderWidth: 2,
              pointBackgroundColor: '#facc15',
            },
          ],
        }}
        options={{
          scales: {
            r: {
              angleLines: { display: true },
              suggestedMin: 0,
              suggestedMax: 5,
              ticks: {
                color: '#d1d5db', // 눈금 색
                backdropColor: 'transparent',
              },
              grid: {
                color: '#374151', // 격자선 색
              },
              pointLabels: {
                color: '#d1d5db', // 라벨 색
              },
            },
          },
          plugins: {
            legend: { display: false },
          },
        }}
      />
    </div>
  );
}
