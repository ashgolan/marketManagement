import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
export default function NavBar() {
  return (
    <ul>
      <Link to="/">
        <img src="../img/bid.png"></img>
      </Link>
      <Link to="/Clients">
        <img src="../img/clients2.png"></img>
      </Link>
      <Link to="/">
        <img src="../img/addClient3.png"></img>
      </Link>
      <Link to="/">
        <img src="../img/inventory.png"></img>
      </Link>
      <Link to="/">
        <img src="../img/747668.png"></img>
      </Link>
    </ul>
  );
}
