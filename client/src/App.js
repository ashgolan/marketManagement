import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Clients from "./components/Clients/Clients";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import TransactionContainer from "./components/Clients/clientTransactions/TransactionContainer";
import AddClient from "./components/Clients/Client/AddClient";
import AddTransactionHome from "./components/Clients/clientTransactions/AddTransaction/AddTransactionHome";
import PaymentPage from "./components/Clients/clientTransactions/AddTransaction/PaymentPage";
import BuyingPage from "./components/Clients/clientTransactions/AddTransaction/BuyingPage";
import SetupPage from "./components/Setup_Components/SetupPage";
import { FetchingStatus } from "./utils/context";
function App() {
  const [clients, setClients] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [client, setClient] = useState(null);
  const [fetchingStatus, setFetchingStatus] = useState({
    loading: false,
    error: false,
    status: false,
    message: null,
  });
  useEffect(() => {
    const getClients = async () => {
      const { data } = await axios.get("http://localhost:5000/");
      setClients(data.clients);
      setTransactions(data.transaction);
    };
    getClients();
  }, []);
  return (
    <>
      <NavBar></NavBar>
      {fetchingStatus.loading && (
        <div className="loading">
          <span className="loader"></span>
        </div>
      )}
      <FetchingStatus.Provider value={[fetchingStatus, setFetchingStatus]}>
        <Routes>
          <Route path="/homepage" element={<HomePage />}></Route>
          <Route
            path="/clients"
            element={
              <Clients
                setClient={setClient}
                transactions={transactions}
                setTransactions={setTransactions}
                setClients={setClients}
                clients={clients}
              />
            }
          ></Route>
          <Route
            path="/TransactionContainer"
            element={
              <TransactionContainer
                client={client}
                transactions={transactions}
              />
            }
          ></Route>
          <Route path="/AddClient" element={<AddClient />}></Route>
          <Route
            path="/AddTransactionHome"
            element={<AddTransactionHome client={client} />}
          ></Route>
          <Route
            path="/PaymentPage"
            element={<PaymentPage client={client} />}
          ></Route>
          <Route
            path="/BuyingPage"
            element={<BuyingPage client={client} />}
          ></Route>
          <Route
            path="/SetupPage"
            element={<SetupPage client={client} />}
          ></Route>
        </Routes>
      </FetchingStatus.Provider>
    </>
  );
}

export default App;
