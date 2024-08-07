import React from 'react';
import { Pie, Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, Filler, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';

// Register components to ChartJS
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Filler);

const ChartComponent = (participants) => {
  // Data for the Bar chart

 
  const bronzeParticipants = participants.participants?.filter(participant => participant.awardLevel == "Bronze") || [];
  const silverParticipants = participants.participants?.filter(participant => participant.awardLevel == "Silver") || [];
  const goldParticipants = participants.participants?.filter(participant => participant.awardLevel === "Gold") || [];
  const barData = {
    labels: ["Bronze", "Silver", "Gold"],
    datasets: [
      {
        label: 'Highest Participants per Award Level',
        data: [bronzeParticipants.length, silverParticipants.length, goldParticipants.length],
        backgroundColor: [
          'rgba(205, 127, 50, 0.2)', // Bronze color
          'rgba(192, 192, 192, 0.2)', // Silver color
          'rgba(255, 215, 0, 0.2)' // Gold color
        ],
        borderColor: [
          'rgba(205, 127, 50, 1)', // Bronze color
          'rgba(192, 192, 192, 1)', // Silver color
          'rgba(255, 215, 0, 1)' // Gold color
        ],
        borderWidth: 1
      }
    ]
  };
 

  // Data for the Line chart
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Participants',
        data: [30, 45, 28, 50, 62, 33, 44, 56, 67, 78, 54, 40],
        fill: true, // Fill the area below the line
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light green color for the fill
        borderColor: 'rgba(75, 192, 192, 1)', // Dark green color for the line
        tension: 0.4 // Increased tension for a smoother line
      }
    ]
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-1  items-center gap-2   mt-10 w-full  mx-auto">
      <div
        className="bg-white p-1 rounded-lg  w-auto h-full"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)",
        }}>
        <h2 className="text-2xl font-bold mb-4">Award Levels Summary</h2>
        <div className="min-h-[100]">
          <Bar
            data={barData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: "#4A5568",
                  },
                  grid: {
                    color: "#EDF2F7",
                  },
                },
                x: {
                  ticks: {
                    color: "#4A5568",
                  },
                  grid: {
                    color: "#EDF2F7",
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                  labels: {
                    color: "#4A5568",
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <div
        className="bg-white p-3 rounded-lg w-auto h-full"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)",
        }}>
        <h2 className="text-2xl font-bold mb-4">Participation Summary</h2>
        <div className=" h-auto">
          <Line
            data={lineData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: "#4A5568",
                  },
                  grid: {
                    color: "#EDF2F7",
                  },
                },
                x: {
                  ticks: {
                    color: "#4A5568",
                  },
                  grid: {
                    color: "#EDF2F7",
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                  labels: {
                    color: "#4A5568", // Gray-700
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
