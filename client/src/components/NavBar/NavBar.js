import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
export default function NavBar() {
  return (
    <ul>
      <li>הצעת מחיר</li>
      <Link to="/Clients">
        <li>הצגת כל הקליינטים</li>
      </Link>
      <li>הוספת קליינט</li>
      <li>עדכון פרטיים</li>
      <li>מחיקת קליינט</li>
      <li>ניהול מחסן</li>
    </ul>
  );
}
