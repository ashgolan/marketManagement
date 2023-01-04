import React from "react";
import { Bar } from "react-chartjs-2";
export default function ClientChart({ clientChartData }) {
  return <Bar data={clientChartData}></Bar>;
}
