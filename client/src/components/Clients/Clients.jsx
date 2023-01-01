import axios from "axios";
import React, { useEffect, useState } from "react";
import Client from "./Client/Client";
import "./Clients.css";
export default function Clients({ setClient, setMessage, message }) {
  const [clients, setClients] = useState([]);
  const [toggleActiveClients, setToggleClients] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [justForRender, setJustForRender] = useState(false);
  useEffect(() => {
    const getClients = async () => {
      const { data } = await axios.get("http://localhost:5000/");
      setClients(data.clients);
      setToggleClients(data.clients);
      setTransactions(data.transaction);
    };
    getClients();
  }, [justForRender]);

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
      <div className="range-active-notActive">
        רק הקלינטים הפעילים
        <input
          onChange={(e) => {
            if (e.target.value === "1") {
              const activeClients = clients.filter((client) => client.isActive);
              console.log(activeClients);
              setToggleClients(() => activeClients);
            } else {
              setToggleClients(() => clients);
              console.log(clients);
            }
          }}
          type="range"
          min={1}
          max={2}
        />
        כל הקליינטים
      </div>
      <form className="clients-form-container">
        <div className="headerProps">
          <div className="updownSort">
            <i className="fa-solid fa-sort-up"></i>
            <i className="fa-solid fa-sort-down"></i>
          </div>
          <label
            id="firstName"
            onClick={(e) => {
              sortClients(e);
            }}
          >
            שם קליינט
          </label>
        </div>
        <i style={{ visibility: "hidden" }} class="fa-regular fa-lightbulb"></i>
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
      {/* {message.status && <h5 className="message">{message.message}</h5>} */}
      {toggleActiveClients.map((client, index) => {
        const clientTransactions = [];
        transactions.forEach((transaction) => {
          if (transaction.owner === client._id) {
            clientTransactions.push(transaction);
          }
        });
        return (
          <Client
            key={`client${index}`}
            client={client}
            clientTransactions={clientTransactions}
            setClient={setClient}
            setMessage={setMessage}
            message={message}
            setClients={setClients}
            setJustForRender={setJustForRender}
          ></Client>
          // )
        );
      })}
    </div>
  );
}
