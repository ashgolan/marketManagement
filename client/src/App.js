import React, { useEffect, useState } from "react";
import Clients from "./components/Clients/Clients";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import TransactionContainer from "./components/Clients/clientTransactions/TransactionContainer";
import AddClient from "./components/Clients/Client/AddClient";
import AddTransactionHome from "./components/Clients/clientTransactions/AddTransaction/Payment";
import SetupPage from "./components/Setup_Components/SetupPage";
import { FetchingStatus } from "./utils/context";
import BidPage from "./components/Bid_components/BidPage";
import WaitingBids from "./components/Bid_components/WaitingBids";
import ProfitMode from "./components/ProfitMode/ProfitMode";
import { Api } from "./utils/Api";
import Login from "./components/Login/Login";
function App() {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(false);
  const [message, setMessage] = useState({ status: false, message: null });
  const [clients, setClients] = useState([]);
  const [bids, SetBids] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [client, setClient] = useState(null);
  const [fetchingStatus, setFetchingStatus] = useState({
    loading: false,
    error: false,
    status: false,
    message: null,
  });
  useEffect(() => {
    const myItem = localStorage.getItem("userID");
    localStorage.clear();
    localStorage.setItem("userID", myItem);
    const getClients = async () => {
      try {
        const { data } = await Api.get("/");
        setClients(data.clients);
        SetBids(data.bids);
        setTransactions(data.transaction);
      } catch (e) {
        console.log(e.message);
      }
    };
    if (
      localStorage.getItem("userID") &&
      localStorage.getItem("userID") !== "null"
    ) {
      navigate("/");
      getClients();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <NavBar setLoginState={setLoginState}></NavBar>
      {fetchingStatus.loading && (
        <div className="loading">
          <span className="loader"></span>
        </div>
      )}
      <FetchingStatus.Provider value={[fetchingStatus, setFetchingStatus]}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage loginState={loginState} setLoginState={setLoginState} />
            }
          ></Route>
          <Route
            path="/Login"
            element={<Login setLoginState={setLoginState} />}
          ></Route>
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
          <Route
            path="/WaitingBids"
            element={<WaitingBids message={message} setMessage={setMessage} />}
          ></Route>
          <Route
            path="/ProfitMode"
            element={<ProfitMode message={message} setMessage={setMessage} />}
          ></Route>
        </Routes>
      </FetchingStatus.Provider>
    </>
  );
}

export default App;
