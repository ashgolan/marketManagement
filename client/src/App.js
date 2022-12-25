import axios from "axios";
import React, { useEffect, useState } from "react";
import Clients from "./components/Clients/Clients";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
function App() {
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
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/homepage" element={<HomePage />}></Route>
        <Route
          path="/clients"
          element={
            <Clients
              transactions={transactions}
              setTransactions={setTransactions}
              setClients={setClients}
              clients={clients}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
