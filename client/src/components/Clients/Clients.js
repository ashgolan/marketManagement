import axios from "axios";
import React, { useEffect, useState } from "react";
import Client from "./Client/Client";
export default function Clients() {
  const [Clients, setClients] = useState([]);
  useEffect(() => {
    const getClients = async () => {
      const { data } = await axios.get("http://localhost:5000/clients");
      setClients(data);
    };
    getClients();
  }, []);
  return (
    <div>
      {Clients.map((client, index) => {
        return <Client key={`client${index}`} client={client}></Client>;
      })}
    </div>
  );
}
