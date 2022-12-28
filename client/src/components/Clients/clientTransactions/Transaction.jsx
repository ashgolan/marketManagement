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
