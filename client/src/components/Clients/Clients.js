import React, { useState } from "react";
import Client from "./Client/Client";
import "./Clients.css";
export default function Clients({ clients, transactions,setClientId }) {
  const [sortedClients, setSortedClients] = useState(clients);
  // const [clientData,setClientData] = useState({
  //   firstName : '' ,
  //   fatherName : '' ,
  //   lastName : '' ,
  //   totalAmount : 0 ,
  //   date : ''
  // }) ;
  const sortClients = (e) => {
    e.preventDefault();
    const id = e.target.id;
    let sortedArr = [];
    // if (id === "totalAmount") {
    //   sortedArr = transactions.sort((a, b) => a[id] - b[id]);
    // } else if (id === "date") {
    //   sortedArr = transactions.sort(
    //     (a, b) => new Date(a[id]) - new Date(b[id])
    //   );
    // } else {
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
    // }
    setSortedClients(() => {
      return [...sortedArr];
    });
  };
  return (
    <div className="container">
      <form className="clients-form-container">
        <div
          className="headerProps"
          id="firstName"
          onClick={(e) => sortClients(e)}
        >
          <div className="updownSort">
            <i class="fa-solid fa-sort-up"></i>
            <i class="fa-solid fa-sort-down"></i>
          </div>
          <label> שם קליינט</label>
        </div>
        <div
          className="headerProps"
          id="fatherName"
          onClick={(e) => sortClients(e)}
        >
          <div className="updownSort">
            <i class="fa-solid fa-sort-up"></i>
            <i class="fa-solid fa-sort-down"></i>
          </div>
          <label>שם האב</label>
        </div>
        <div
          className="headerProps"
          id="lastName"
          onClick={(e) => sortClients(e)}
        >
          <div className="updownSort">
            <i class="fa-solid fa-sort-up"></i>
            <i class="fa-solid fa-sort-down"></i>
          </div>
          <label>משפחה</label>
        </div>

        <div
          className="headerProps"
          id="totalAmount"
          onClick={(e) => sortClients(e)}
        >
          <div className="updownSort">
            <i class="fa-solid fa-sort-up"></i>
            <i class="fa-solid fa-sort-down"></i>
          </div>
          <label>חוב</label>
        </div>
        <div
          className="headerProps"
          id="currency"
          onClick={(e) => sortClients(e)}
        >
          <div className="updownSort">
            <i class="fa-solid fa-sort-up"></i>
            <i class="fa-solid fa-sort-down"></i>
          </div>
          <label>מטבע</label>
        </div>
        <div className="headerProps" id="date" onClick={(e) => sortClients(e)}>
          <div className="updownSort">
            <i class="fa-solid fa-sort-up"></i>
            <i class="fa-solid fa-sort-down"></i>
          </div>
          <label>ע. אחרון</label>
        </div>
      </form>
      {sortedClients.map((client, index) => {
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
              setClientId={setClientId}
            ></Client>
          )
        );
      })}
    </div>
  );
}
