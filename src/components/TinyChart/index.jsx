import React from 'react';
import { Bar } from 'react-chartjs-2';

const TinyBarChart = ({ data }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#4A5568', 
        },
        grid: {
          color: '#EDF2F7' 
        }
      },
      x: {
        ticks: {
          color: '#4A5568'
        },
        grid: {
          color: '#EDF2F7'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#4A5568'
        }
      }
    }
  };

    const updatedBarData = {
        ...data,
        datasets: data.datasets.map(dataset => ({
          ...dataset,
          barThickness: 10,
        })),
      };

  return (
    <div className="w-full  grow">
      <Bar data={updatedBarData} options={options} />
    </div>
  );
};

export default TinyBarChart;
