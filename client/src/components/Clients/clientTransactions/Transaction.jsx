import React, { useState } from "react";
import ProductsTransactions from "./ProductsTransactions";
import "./Transaction.css";
export default function Transaction({ client, transaction, setMessage }) {
  const [changeData, setChangeData] = useState(false);
  const [addProductsRows, setAddProductsRows] = useState(
    transaction.data.length
  );
  const [clientTransactionDetails, setClientTransactionDetails] = useState({
    data: [],
    comment: "",
  });

  return (
    <div className="transaction-container">
      <div className="person-container-header">
        {changeData && <i class="fa-regular fa-floppy-disk"></i>}
        <label htmlFor="">{`${client.firstName}  ${
          client.fatherName === "לא צויין" ? "" : client.fatherName
        }  ${client.lastName}`}</label>
        <i class="fa-solid fa-user"></i>
      </div>

      <form className="userTransactions-form">
        <label>{transaction.date}</label>
        <label>{transaction.time}</label>
        <label>{transaction.type}</label>
        <input
          value={transaction.comment}
          onChange={(e) =>
            setClientTransactionDetails((prev) => {
              return { ...prev, comment: e.target.value };
            })
          }
          style={{
            backgroundColor: "rgb(0, 225, 255)",
            width: "30%",
            textAlign: "center",
            borderRadius: "0.7rem",
          }}
        ></input>
        <label
          style={{
            backgroundColor: "orange",
            width: "17%",
            textAlign: "center",
            borderRadius: "0.7rem",
          }}
        >
          {transaction.totalAmount}
        </label>
      </form>
      <form className="productRow">
        <label style={{ visibility: "hidden" }}>1</label>
        <input
          style={{ backgroundColor: "rgb(238, 238, 133)" }}
          defaultValue="שם המוצר"
          name="productName"
          className="product"
        ></input>
        <input
          style={{ backgroundColor: "rgb(238, 238, 133)" }}
          defaultValue="מקט"
          name="serial"
          className="price"
        ></input>
        <input
          style={{ backgroundColor: "rgb(238, 238, 133)" }}
          defaultValue="קטגוריה"
          name="category"
          className="price"
        ></input>
        <input
          style={{ backgroundColor: "rgb(238, 238, 133)" }}
          defaultValue="כמות"
          name="quantity"
          className="price"
        ></input>
        <input
          style={{ backgroundColor: "rgb(238, 238, 133)" }}
          defaultValue="מחיר"
          name="price"
          className="price"
        ></input>
        <input
          style={{ backgroundColor: "rgb(238, 238, 133)" }}
          defaultValue='סה"כ'
          name="totalAmount"
          className="price"
        ></input>
        <input
          style={{ backgroundColor: "rgb(238, 238, 133)" }}
          defaultValue="הערה"
          name="comment"
          className="comment"
        ></input>
        <input style={{ visibility: "hidden" }} type="checkbox" />
      </form>
      {[...new Array(addProductsRows)].map((row, index) => {
        return (
          <ProductsTransactions
            setMessage={setMessage}
            index={index}
            transaction={transaction}
            addProductsRows={addProductsRows}
            setChangeData={setChangeData}
          ></ProductsTransactions>
        );
      })}
      <div className="edit-delete-transaction">
        <i className="fa-regular fa-pen-to-square"></i>

        <img
          onClick={() => setAddProductsRows((prev) => prev + 1)}
          className="addProducts"
          src="/img/addItem.png"
        ></img>
        <i class="fa-solid fa-trash-can"></i>
      </div>
    </div>
  );
}
