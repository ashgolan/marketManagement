import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Clients from "./components/Clients/Clients";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import TransactionContainer from "./components/Clients/clientTransactions/TransactionContainer";
import AddClient from "./components/Clients/Client/AddClient";
import AddTransactionHome from "./components/Clients/clientTransactions/AddTransaction/Payment";
import SetupPage from "./components/Setup_Components/SetupPage";
import { FetchingStatus } from "./utils/context";
import BidPage from "./components/Bid_components/BidPage";
function App() {
  const [message, setMessage] = useState({ status: false, message: null });
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
                setMessage={setMessage}
                message={message}
              />
            }
          ></Route>
          <Route
            path="/TransactionContainer"
            element={
              <TransactionContainer
                client={client}
                transactions={transactions}
                message={message}
                setMessage={setMessage}
              />
            }
          ></Route>
          <Route
            path="/AddClient"
            element={<AddClient message={message} setMessage={setMessage} />}
          ></Route>
          <Route
            path="/AddTransactionHome"
            element={
              <AddTransactionHome
                setMessage={setMessage}
                message={message}
                client={client}
              />
            }
          ></Route>
          <Route
            path="/SetupPage"
            element={<SetupPage client={client} />}
          ></Route>
          <Route
            path="/BidPage"
            element={
              <BidPage
                message={message}
                setMessage={setMessage}
                client={client}
              />
            }
          ></Route>
        </Routes>
      </FetchingStatus.Provider>
    </>
  );
}

export default App;
