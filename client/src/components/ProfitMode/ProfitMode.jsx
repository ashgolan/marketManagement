import React, { useState } from "react";
import { useEffect } from "react";
import BuyingChart from "./BuyingChart";
import { Api } from "../../utils/Api";
export default function ProfitMode({ clientChartData }) {
  const [transactionData, setrTransactionData] = useState([]);
  useEffect(() => {
    const myItem = localStorage.getItem("userID");
    localStorage.clear();
    localStorage.setItem("userID", myItem);
    const getTransactionData = async () => {
      try {
        const { data } = await Api.get("/transactions/");
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
