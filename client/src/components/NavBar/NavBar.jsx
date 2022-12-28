import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
export default function NavBar() {
  return (
    <ul>
      <Link to="/">
        <img className="nav-image" src="../img/bid.png"></img>
      </Link>
      <Link to="/Clients">
        <img className="nav-image" src="../img/clients2.png"></img>
      </Link>
      <Link to="/AddClient">
        <img className="nav-image" src="../img/addClient3.png"></img>
      </Link>
      <Link to="/SetupPage">
        <img className="nav-image" src="../img/inventory.png"></img>
      </Link>
      <Link to="/">
        <img className="nav-image" src="../img/747668.png"></img>
      </Link>
      <i className="fa-solid fa-lock"></i>
      {/* <i class="fa-solid fa-unlock"></i> */}
    </ul>
  );
}
