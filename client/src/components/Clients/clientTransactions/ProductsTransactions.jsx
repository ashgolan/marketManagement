import React, { useState } from "react";
import "./ProductTransactions.css";
export default function ProductsTransactions({
  index,
  transaction,
  setChangeData,
  setMessage,
}) {
  const [itemsInRow, setItemsInRow] = useState({
    productName: transaction.data[index]
      ? transaction.data[index].productName
      : "",
    serial: transaction.data[index] ? transaction.data[index].serial : "",
    category: transaction.data[index] ? transaction.data[index].category : "",
    quantity: transaction.data[index] ? transaction.data[index].quantity : "",
    price: transaction.data[index] ? transaction.data[index].price : "",
    totalAmount: transaction.data[index]
      ? transaction.data[index].totalAmount
      : "",
    comment: transaction.data[index] ? transaction.data[index].comment : "",
  });

  return (
    <form className="productRow">
      <label>{index + 1}</label>
      <input
        value={itemsInRow.productName}
        name="productName"
        onChange={(e) =>
          setItemsInRow((prev) => {
            return { ...prev, productName: e.target.value };
          })
        }
        className="product"
      ></input>
      <input
        value={itemsInRow.serial}
        name="serial"
        className="price"
        onChange={(e) =>
          setItemsInRow((prev) => {
            return { ...prev, serial: e.target.value };
          })
        }
      ></input>
      <input
        value={itemsInRow.category}
        name="category"
        className="price"
        onChange={(e) =>
          setItemsInRow((prev) => {
            return { ...prev, category: e.target.value };
          })
        }
      ></input>
      <input
        value={itemsInRow.quantity}
        name="quantity"
        className="price"
        onChange={(e) =>
          setItemsInRow((prev) => {
            return { ...prev, quantity: e.target.value };
          })
        }
      ></input>
      <input
        value={itemsInRow.price}
        name="price"
        className="price"
        onChange={(e) =>
          setItemsInRow((prev) => {
            return { ...prev, price: e.target.value };
          })
        }
      ></input>
      <input
        value={itemsInRow.totalAmount}
        name="totalAmount"
        className="price"
        onChange={(e) =>
          setItemsInRow((prev) => {
            return { ...prev, totalAmount: e.target.value };
          })
        }
      ></input>
      <input
        value={itemsInRow.comment}
        name="comment"
        className="comment"
        onChange={(e) =>
          setItemsInRow((prev) => {
            return { ...prev, comment: e.target.value };
          })
        }
      ></input>
    </form>
  );
}
