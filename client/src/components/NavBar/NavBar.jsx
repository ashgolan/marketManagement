import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../../utils/Api";
import "./NavBar.css";
export default function NavBar({ setLoginState }) {
  const navigate = useNavigate();
  const logout = async (e) => {
    e.preventDefault();
    try {
      await Api.get("/logout");
      localStorage.removeItem("userID");
      setLoginState((prev) => !prev);
      navigate("/");
    } catch {
      console.log("error");
    }
  };
  return (
    <div className="nav-container">
      <div className="nav-logo">
        <Link to="/">
          <img style={{ width: "40%" }} src="/img/logo3.png" alt="" />
        </Link>
      </div>
      <div className="nav-photos">
        <Link
          to={
            localStorage.getItem("userID") &&
            localStorage.getItem("userID") !== "null" &&
            "/WaitingBids"
          }
        >
          <img src="/img/bid11.png" alt="" />
        </Link>
        <Link
          to={
            localStorage.getItem("userID") &&
            localStorage.getItem("userID") !== "null" &&
            "/Clients"
          }
        >
          <img src="/img/clients11.png" alt="" />
        </Link>
        <Link
          to={
            localStorage.getItem("userID") &&
            localStorage.getItem("userID") !== "null" &&
            "/AddClient"
          }
        >
          <img src="/img/addClient11.png" alt="" />
        </Link>
        <Link
          to={
            localStorage.getItem("userID") &&
            localStorage.getItem("userID") !== "null" &&
            "/SetupPage"
          }
        >
          <img src="/img/inventory11.png" alt="" />
        </Link>
        <Link
          to={
            localStorage.getItem("userID") &&
            localStorage.getItem("userID") !== "null" &&
            "/ProfitMode"
          }
        >
          {<img src="/img/analysis11.png" alt="" />}
        </Link>
      </div>

      <Link className="nav-logout">
        <img
          style={{
            width: "20%",
            visibility:
              localStorage.getItem("userID") &&
              localStorage.getItem("userID") !== "null"
                ? "visible"
                : "hidden",
          }}
          src="/img/logout2.png"
          onClick={logout}
        />
      </Link>
    </div>
  );
}
