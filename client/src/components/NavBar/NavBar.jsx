import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
export default function NavBar() {
  return (
    <div className="nav-container">
      <div className="nav-logo">
        <Link to="/">
          <img style={{ width: "30%" }} src="/img/logo2.png" alt="" />
        </Link>
      </div>
      <div className="nav-photos">
        <Link to="/WaitingBids">
          <img src="/img/bid11.png" alt="" />
        </Link>
        <Link to="/Clients">
          <img src="/img/clients11.png" alt="" />
        </Link>
        <Link to="/AddClient">
          <img src="/img/addClient11.png" alt="" />
        </Link>
        <Link to="/SetupPage">
          <img src="/img/inventory11.png" alt="" />
        </Link>
        <Link to="/ProfitMode">
          <img src="/img/analysis11.png" alt="" />
        </Link>
      </div>
      <div className="nav-log">
        <i className="fa-solid fa-lock"></i>
        {/* <i class="fa-solid fa-unlock"></i> */}
      </div>
    </div>
  );
}
