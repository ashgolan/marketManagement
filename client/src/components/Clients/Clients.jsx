import axios from "axios";
import React, { useEffect, useState } from "react";
import Client from "./Client/Client";
import "./Clients.css";
export default function Clients({ setClient }) {
  const [clients, setClients] = useState([]);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const getClients = async () => {
      const { data } = await axios.get("http://localhost:5000/");
      console.log(data);
      setClients(data.clients);
      setTransactions(data.transaction);
    };
    getClients();
  }, []);

  const sortClients = (e) => {
    e.preventDefault();

    const id = e.target.id;
    let sortedArr = [];
    sortedArr = clients.sort((a, b) => {
      const nameA = a[id].toUpperCase();
      const nameB = b[id].toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setClients(() => {
      return [...sortedArr];
    });
  };
  return (
    <div className="container">
      <form className="clients-form-container">
        <div className="headerProps">
          <div className="updownSort">
            <i className="fa-solid fa-sort-up"></i>
            <i className="fa-solid fa-sort-down"></i>
          </div>
          <label
            id="firstName"
            onClick={(e) => {
              console.log(e);
              sortClients(e);
            }}
          >
            שם קליינט
          </label>
        </div>
        <div className="headerProps">
          <div className="updownSort">
            <i className="fa-solid fa-sort-up"></i>
            <i className="fa-solid fa-sort-down"></i>
          </div>
          <label id="fatherName" onClick={(e) => sortClients(e)}>
            שם האב
          </label>
        </div>
        <div className="headerProps">
          <div className="updownSort">
            <i className="fa-solid fa-sort-up"></i>
            <i className="fa-solid fa-sort-down"></i>
          </div>
          <label id="lastName" onClick={(e) => sortClients(e)}>
            משפחה
          </label>
        </div>

        <div className="headerProps">
          <div className="updownSort">
            <i className="fa-solid fa-sort-up"></i>
            <i className="fa-solid fa-sort-down"></i>
          </div>
          <label id="totalAmount" onClick={(e) => sortClients(e)}>
            חוב
          </label>
        </div>
        <div className="headerProps">
          <div className="updownSort">
            <i className="fa-solid fa-sort-up"></i>
            <i className="fa-solid fa-sort-down"></i>
          </div>
          <label id="currency" onClick={(e) => sortClients(e)}>
            מטבע
          </label>
        </div>
        <div className="headerProps">
          <div className="updownSort">
            <i className="fa-solid fa-sort-up"></i>
            <i className="fa-solid fa-sort-down"></i>
          </div>
          <label id="date" onClick={(e) => sortClients(e)}>
            ע. אחרון
          </label>
        </div>
      </form>
      {clients.map((client, index) => {
        const clientTransactions = [];
        transactions.forEach((transaction) => {
          if (transaction.owner === client._id) {
            clientTransactions.push(transaction);
          }
        });
        return (
          clientTransactions.length > 0 && (
            <Client
              key={`client${index}`}
              client={client}
              clientTransactios={clientTransactions}
              setClient={setClient}
            ></Client>
          )
        );
      })}
    </div>
  );
}
