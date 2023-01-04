import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
export default function HomePage({ loginState, setLoginState }) {
  return (
    <div className="homepage-container">
      <img className="home-icon" src="/img/robic.png" alt="" />
      <label htmlFor="">מנוהל</label>
      <label style={{ fontSize: "2rem" }} htmlFor="">
        לניהול מושלם
      </label>
      {(!localStorage.getItem("userID") ||
        localStorage.getItem("userID") === "null" ||
        loginState) && (
        <Link to="/login">
          <button onClick={() => setLoginState(true)} className="home-log-btn">
            כניסה
          </button>
        </Link>
      )}
      {localStorage.getItem("userID") &&
        localStorage.getItem("userID") !== "null" && (
          <label style={{ fontSize: "1rem", color: "brown" }} htmlFor="">
            המערכת פתוחה לשימוש חופשי
          </label>
        )}
    </div>
  );
}
