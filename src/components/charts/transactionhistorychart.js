import React, { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';

const TransactionHistoryChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const areaData = {
      labels: ["Paypal", "Stripe", "Cash"],
      datasets: [
        {
          data: [55, 25, 20],
          backgroundColor: ["#111111", "#00d25b", "#ffab00"],
        },
      ],
    };

    const areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        cutout: (context) => {
          // Dynamically calculate the cutout based on the canvas size
          const chart = context.chart;
          const width = chart.width;
          const height = chart.height;
          const outerRadius = Math.min(width, height) / 2; // Chart outer radius
          const bandThickness = 25; // Desired band thickness
          return ((outerRadius - bandThickness) / outerRadius) * 100 + "%";
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
      };
  

    const transactionhistoryChartPlugins = [
      {
        id: "customText",
        beforeDraw: (chart) => {
          const { width, height, ctx } = chart;
          ctx.save();

          // Draw the primary text
          ctx.font = "1rem sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#ffffff";
          const text = "$1200";
          ctx.fillText(text, width / 2, height / 2.4);

          // Draw the secondary text
          ctx.font = "0.75rem sans-serif";
          ctx.fillStyle = "#6c7293";
          const subText = "Total";
          ctx.fillText(subText, width / 2, height / 1.7);

          ctx.restore();
        },
      },
    ];

    const chartInstance = new Chart(canvasRef.current, {
      type: "doughnut",
      data: areaData,
      options: areaOptions,
      plugins: transactionhistoryChartPlugins,
    });

    return () => {
      // Cleanup to destroy the chart instance
      chartInstance.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} className="transaction-chart" />;
};

export default TransactionHistoryChart;
