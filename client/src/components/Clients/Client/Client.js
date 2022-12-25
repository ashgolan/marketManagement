import React, { useEffect, useState } from "react";
import "./Client.css";

export default function Client({ client, clientTransactios }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const getTotalAmount = () => {
    let count = 0;
    clientTransactios.forEach((transaction) => {
      count += transaction.totalAmount;
    });
    console.log(client, clientTransactios);
    return count;
  };
  useEffect(() => {
    setTotalAmount(getTotalAmount());
  }, []);
  return (
    <div className="container">
      <form className="form-container">
        <label className="clientProp"> {client.firstName}</label>
        <label className="clientProp"> {client.fatherName}</label>
        <label className="clientProp"> {client.lastName}</label>
        <div className="clientProp">
          <label className="clientProp">ש"ח</label>
          <label className="clientProp"> {totalAmount}</label>
        </div>
        <label className="clientProp">
          {clientTransactios[clientTransactios.length - 1].date}
        </label>
      </form>
      <div className="edit_delete">
        <i className="fa-solid fa-chart-line"></i>
        <i className="fa-regular fa-pen-to-square"></i>
        <i className="fa-solid fa-user-xmark"></i>
      </div>
    </div>
  );
}
