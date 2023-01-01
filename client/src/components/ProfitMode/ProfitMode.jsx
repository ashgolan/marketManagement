import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import BuyingChart from "./BuyingChart";
export default function ProfitMode({ clientChartData }) {
  const [transactionData, setrTransactionData] = useState([]);
  useEffect(() => {
    const getTransactionData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/transactions/");
        setrTransactionData(data);
      } catch (e) {
        console.log(e);
      }
    };
    getTransactionData();
  }, []);
  const buyingData = transactionData.filter((transaction) => {
    return transaction.type === "buying";
  });
  return <BuyingChart buyingData={buyingData}></BuyingChart>;
}
