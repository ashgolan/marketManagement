import React, { useState } from "react";
import ProductsTransactions from "./ProductsTransactions";
import "./Transaction.css";
export default function Transaction({ client, transaction }) {
  const [addProductsRows, setAddProductsRows] = useState(0);
  const [clientTransactionDetails, setClientTransactionDetails] = useState({
    date: "",
    time: "",
    type: "",
    data: [],
    comment: "",
    totalAmount: "",
  });
  const productsTransactions = transaction.data.map((tr) => {
    return (
      <form className="productRow">
        <input className="product" value={tr.product}></input>
        <input className="price" value={tr.price}></input>
        <input type="checkbox" name="" id="" />
      </form>
    );
  });

  return (
    <div className="transaction-container">
      <div className="person-container-header">
        <label htmlFor="">{`${client.firstName}  ${
          client.fatherName === "לא צויין" ? "" : client.fatherName
        }  ${client.lastName}`}</label>
        <i class="fa-solid fa-user"></i>
      </div>

      <form className="userTransactions-form">
        <input
          value={transaction.date}
          onChange={(e) =>
            setClientTransactionDetails((prev) => {
              return { ...prev, date: e.target.value };
            })
          }
        ></input>
        <input
          value={transaction.time}
          onChange={(e) =>
            setClientTransactionDetails((prev) => {
              return { ...prev, time: e.target.value };
            })
          }
        ></input>
        <input
          value={transaction.type}
          onChange={(e) =>
            setClientTransactionDetails((prev) => {
              return { ...prev, type: e.target.value };
            })
          }
        ></input>
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
        <input
          value={transaction.totalAmount}
          onChange={(e) =>
            setClientTransactionDetails((prev) => {
              return { ...prev, totalAmount: e.target.value };
            })
          }
          style={{
            backgroundColor: "orange",
            width: "17%",
            textAlign: "center",
            borderRadius: "0.7rem",
          }}
        ></input>
      </form>
      {productsTransactions}
      {[...new Array(addProductsRows)].map((row, index) => {
        return (
          <ProductsTransactions
            transaction={transaction}
            addProductsRows={addProductsRows}
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
