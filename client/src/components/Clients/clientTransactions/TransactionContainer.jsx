import axios from "axios";
import React, { useEffect, useState } from "react";
import "./TransactionContainer.css";
import Transaction from "./Transaction";
export default function TransactionContainer({ client, transactions }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const clientTransactions = transactions.filter(
    (transaction) => transaction.owner === client._id
  );
  console.log(client._id);
  const getTotalAmount = () => {
    let count = 0;
    clientTransactions.forEach((transaction) => {
      count += transaction.totalAmount;
    });
    return count;
  };
  useEffect(() => {
    setTotalAmount(getTotalAmount());
  }, [clientTransactions]);
  return (
    <div style={{ minHeight: "77vh" }}>
      <div className="total-header">
        <label htmlFor="">ש"ח</label>
        <label htmlFor="">{totalAmount}</label>
        <label htmlFor="">:</label>
        <label htmlFor="">{`יתרה`}</label>
        <i class="fa-solid fa-money-check-dollar"></i>{" "}
      </div>
      {clientTransactions.map((transaction) => {
        return (
          <Transaction client={client} transaction={transaction}></Transaction>
        );
      })}
    </div>
  );
}
