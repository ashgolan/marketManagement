import React, { useEffect, useState } from "react";
import Client from "./Client/Client";
import "./Clients.css";
export default function Clients({ clients, transactions }) {
  const [sortedClients, setSortedClients] = useState(clients);
  const [clientTransactions, setClientTransactions] = useState([]);
  const sortClients = (e) => {
    e.preventDefault();
    const id = e.target.id;
    let sortedArr = [];
    if (id === "totalAmount") {
      sortedArr = clients.sort((a, b) => a[id] - b[id]);
      console.log(sortedArr);
    } else {
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
    }
    setSortedClients(() => {
      return [...sortedArr];
    });
  };
  return (
    <div className="container">
      <form className="clients-form-container">
        <label
          className="headerProps"
          id="firstName"
          onClick={(e) => sortClients(e)}
        >
          שם קליינט
        </label>
        <label
          className="headerProps"
          id="fatherName"
          onClick={(e) => sortClients(e)}
        >
          שם האב
        </label>
        <label
          className="headerProps"
          id="lastName"
          onClick={(e) => sortClients(e)}
        >
          משפחה
        </label>
        <div className="headerProps">
          <label className="headerProps">מטבע</label>
          <label
            className="headerProps"
            id="totalAmount"
            onClick={(e) => sortClients(e)}
          >
            חוב
          </label>
        </div>
        <label className="headerProps">תאריך קנייה אחרון</label>
      </form>
      {sortedClients.map((client, index) => {
        const clientTransactios = [];
        transactions.forEach((transaction) => {
          if (transaction.owner === client._id) {
            console.log(transaction.totalAmount);
            clientTransactios.push(transaction);
          }
        });
        return (
          clientTransactios.length > 0 && (
            <Client
              key={`client${index}`}
              client={client}
              clientTransactios={clientTransactios}
            ></Client>
          )
        );
      })}
    </div>
  );
}
