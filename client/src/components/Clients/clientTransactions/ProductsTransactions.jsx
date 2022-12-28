import React, { useState } from "react";
import { useRef } from "react";
import "./ProductTransactions.css";
export default function ProductsTransactions({
  index,
  transaction,
  setChangeData,
  setMessage,
}) {
  const [itemsInRow, setItemsInRow] = useState({
    product: transaction.data[index] ? transaction.data[index].product : "",
    price: transaction.data[index] ? transaction.data[index].price : "",
  });
  const addProductForm = useRef();
  const checkHandler = (e) => {
    const isFilled = validation();
    setChangeData((prev) => !prev);
    if (isFilled) {
      e.target.checked
        ? localStorage.setItem(
            `${transaction._id}-${index + 1}`,
            JSON.stringify(itemsInRow)
          )
        : localStorage.removeItem(`${transaction._id}-${index + 1}`);
    } else {
      setChangeData((prev) => !prev);
      e.target.checked = false;
    }
  };

  const validation = () => {
    const form = new FormData(addProductForm.current);
    const data = Object.fromEntries(form);
    const vals = Object.values(data);
    for (let prop in vals) {
      if (vals[prop] === "") return false;
    }
    return true;
  };

  return (
    <form ref={addProductForm} className="productRow">
      <label>{index + 1}</label>
      <input
        value={itemsInRow.product}
        name="product"
        onChange={(e) =>
          setItemsInRow((prev) => {
            return { ...prev, product: e.target.value };
          })
        }
        className="product"
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
      <input type="checkbox" onChange={(e) => checkHandler(e)} />
    </form>
  );
}
