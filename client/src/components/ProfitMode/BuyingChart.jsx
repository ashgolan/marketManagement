import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { chart as ChartJS } from "chart.js/auto";
import "./ProfitMode.css";
import { useEffect } from "react";

export default function BuyingChart({ buyingData }) {
  console.log(buyingData);
  const [buyingChartData, setBuyingChartData] = useState({
    labels: "",
    datasets: [
      {
        label: "מצב תנועות",
        data: "",
      },
    ],
  });
  useEffect(() => {
    {
      setBuyingChartData({
        labels: buyingData.map((transaction) => transaction.date),
        datasets: [
          {
            label: "מצב תנועות",
            data: buyingData.map((transaction) => transaction.totalAmount),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
              "#EA8164",
              "#EA64B8",
            ],
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [buyingData]);

  return (
    <div className="buyingChart">
      <Bar data={buyingChartData}></Bar>
    </div>
  );
}
