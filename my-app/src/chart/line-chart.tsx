import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generateRandomPrices = (min: number, max: number, months: number): number[] => {
  return Array.from({ length: months }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

interface DataType {
  labels: string[],
  datasets: { 
    label: string,
    data: number[],
    borderColor:string,
    backgroundColor: string,
    tension: number
  }[]
}

const LineChart: React.FC = () => {
  // Define months and price data
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [data, setData] = useState<DataType | null>(null);
  // Define chart data and options

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Price Changes Over the Past Months',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 20000,
        max: 50000,
      },
    },
  };

  useEffect(() => {
    const priceData = generateRandomPrices(20000, 50000, 12);
    setData({
      labels: months,
      datasets: [
        {
          label: 'Price in USD',
          data: priceData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4, // Smooth the line
        },
      ],
    });
  }, [])
  return data && <Line data={data} options={options} />;
};

export default LineChart;
