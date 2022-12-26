import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Client.css";

export default function Client({ client, clientTransactios, setClient }) {
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const getTotalAmount = () => {
    let count = 0;
    clientTransactios.forEach((transaction) => {
      count += transaction.totalAmount;
    });
    return count;
  };
  useEffect(() => {
    setTotalAmount(getTotalAmount());
  }, [clientTransactios]);

  const openClientPage = () => {
    setClient(client);
    navigate("/ClientTransactions");
  };

  return (
    <div className="container">
      <form className="form-container">
        <label onClick={openClientPage} className="clientProp">
          {" "}
          {client.firstName}
        </label>
        <label className="clientProp"> {client.fatherName}</label>
        <label className="clientProp"> {client.lastName}</label>
        <label className="clientProp"> {totalAmount}</label>
        <label className="clientProp">ש"ח</label>
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
