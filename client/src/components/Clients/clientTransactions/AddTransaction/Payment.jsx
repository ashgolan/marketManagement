import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../../utils/Api";
import { FetchingStatus } from "../../../../utils/context";
import "./Payment.css";
export default function AddTransactionHome({ client, setMessage, message }) {
  const navigate = useNavigate();
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);

  const [newPayment, setNewPayment] = useState({
    owner: "",
    totalAmount: 1,
    comment: "",
    type: "payment",
  });
  const addPayment = async (e) => {
    e.preventDefault();
    try {
      setFetchingStatus({ loading: true, error: false });
      const data = await Api.post("/transactions", {
        ...newPayment,
        owner: client._id,
        totalAmount: newPayment.totalAmount * -1,
      });
      setMessage({ status: true, message: "התשלום בוצע בהצלחה" });
      setTimeout(() => {
        setMessage({ status: false, message: null });
        setFetchingStatus({ loading: false, error: false });
      }, 1000);
      navigate("/clients");
    } catch (e) {
      setFetchingStatus({ loading: false, error: true });
      setMessage({ status: true, message: "תקלה בקריאת הנתונים" });
      setTimeout(() => {
        setMessage({ status: false, message: null });
        setFetchingStatus({ loading: false, error: true });
      }, 1000);
    }
  };
  return (
    <div className="add-transaction-container">
      <form onSubmit={(e) => addPayment(e)} className="add-client-form">
        {message.status && <h5 className="message">{message.message}</h5>}
        <div className="fullName-payment">
          <label htmlFor="">{client.lastName}</label>
          <label htmlFor="">
            {
              (client.fatherName =
                client.fatherName === "לא צויין" ? "" : client.fatherName)
            }
          </label>
          <label htmlFor="">{client.firstName}</label>
        </div>
        <div className="form-group">
          <label htmlFor="">סכום</label>
          <input
            required
            type="number"
            min={1}
            value={newPayment.totalAmount}
            onChange={(e) =>
              setNewPayment((prev) => {
                return { ...prev, totalAmount: e.target.value };
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="">הערה</label>
          <input
            value={newPayment.comment}
            onChange={(e) => {
              setNewPayment((prev) => {
                return {
                  ...prev,
                  comment: e.target.value,
                };
              });
            }}
          />
        </div>
        <button
          style={{
            border: "none",
            backgroundColor: "gold",
            borderRadius: "1rem",
            width: "70%",
            padding: "1% 5%",
            margin: "auto",
          }}
        >
          אישור תשלום/זיכוי
        </button>
      </form>
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
