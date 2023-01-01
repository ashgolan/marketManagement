import React from "react";
import { Bar } from "react-chartjs-2";
import { chart as ChartJS } from "chart.js/auto";
export default function ClientChart({ clientChartData }) {
  return <Bar data={clientChartData}></Bar>;
}
