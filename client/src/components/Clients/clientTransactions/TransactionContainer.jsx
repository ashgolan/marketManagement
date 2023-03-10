import React, { useContext, useEffect, useState } from "react";
import "./TransactionContainer.css";
import Transaction from "./Transaction";
import { FetchingStatus } from "../../../utils/context";
import { Api } from "../../../utils/Api";
export default function TransactionContainer({ setMessage, message, client }) {
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  const [totalAmount, setTotalAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const { data } = await Api.get("/transactions");
        const clientTransactions = data.filter(
          (transaction) => transaction.owner === client._id
        );
        console.log(clientTransactions);
        setTransactions(clientTransactions);
        let count = 0;
        clientTransactions.forEach((transaction) => {
          count += transaction.totalAmount;
        });
        setTotalAmount(() => count);
        setMessage({ status: true, message: "... תנועות התיק של הקליינט" });
        setTimeout(() => {
          setMessage({ status: false, message: null });
          setFetchingStatus({ loading: false, error: false });
        }, 1000);
      } catch (e) {
        setMessage({ status: true, message: "... תקלה בקריאת הנתונים" });
        setTimeout(() => {
          setMessage({ status: false, message: null });
          setFetchingStatus({ loading: false, error: false });
        }, 1000);
      }
    };
    getTransactions();
  }, []);

  return (
    <div style={{ minHeight: "77vh" }}>
      <div className="total-header">
        <label htmlFor="">ש"ח</label>
        <label htmlFor="">{totalAmount}</label>
        <label htmlFor="">:</label>
        <label htmlFor="">{`יתרה`}</label>
        <i class="fa-solid fa-money-check-dollar"></i>{" "}
      </div>
      {transactions.map((transaction) => {
        return (
          <Transaction
            setMessage={setMessage}
            client={client}
            transaction={transaction}
          ></Transaction>
        );
      })}
    </div>
  );
}
