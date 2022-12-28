import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddTransactionHome.css";
export default function AddTransactionHome({ client }) {
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className="add-transaction-container">
      <div className="payment-buying">
        <button
          className="new-transaction-btn"
          onClick={() => gotoPage("PaymentPage")}
          htmlFor=""
        >
          תשלום
        </button>
        <button
          className="new-transaction-btn"
          onClick={() => gotoPage("BuyingPage")}
          htmlFor=""
        >
          עסקה חדשה
        </button>
      </div>
      <div className="payment-buying">
        <img style={{ width: "100%" }} src="/img/client1.png" alt="" />
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <label htmlFor="">{client.lastName}</label>
          <label htmlFor="">
            {
              (client.fatherName =
                client.fatherName === "לא צויין" ? "" : client.fatherName)
            }
          </label>
          <label htmlFor="">{client.firstName}</label>
        </div>
      </div>
    </div>
  );
}
