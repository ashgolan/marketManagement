import axios from "axios";
import React, { useState } from "react";

export default function PaymentPage({ client }) {
  const [newPayment, setNewPayment] = useState({
    owner: "",
    totalAmount: 0,
    comment: "",
    type: "payment",
  });
  const addPayment = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:5000/transactions", {
        ...newPayment,
        owner: client._id,
        totalAmount: newPayment.totalAmount * -1,
      });

      console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="addClientPage container">
      <form onSubmit={(e) => addPayment(e)} className="add-client-form">
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
        <button>אישור</button>
      </form>
    </div>
  );
}
