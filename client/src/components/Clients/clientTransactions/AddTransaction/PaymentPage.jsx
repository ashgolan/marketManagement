import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchingStatus } from "../../../../utils/context";

export default function PaymentPage({ message, setMessage, client }) {
  const navigate = useNavigate();
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);

  const [newPayment, setNewPayment] = useState({
    owner: "",
    totalAmount: 0,
    comment: "",
    type: "payment",
  });
  const addPayment = async (e) => {
    e.preventDefault();
    try {
      setFetchingStatus({ loading: true, error: false });
      const data = await axios.post("http://localhost:5000/transactions", {
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
      setMessage({
        status: true,
        message: "תקלה בקריאת הנתונים",
      });
    }
  };
  return (
    <div className="addClientPage container">
      <form onSubmit={(e) => addPayment(e)} className="add-client-form">
        {message.status && <h5 className="message">{message.message}</h5>}

        <label style={{ textAlign: "center", fontWeight: "bold" }} htmlFor="">
          {client.firstName + " " + client.fatherName + " " + client.lastName}
        </label>
        <div className="form-group">
          <label htmlFor="">סכום</label>
          <input
            required
            type="number"
            min={0}
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
            width: "100%",
            padding: "5%",
          }}
        >
          אישור
        </button>
      </form>
    </div>
  );
}
