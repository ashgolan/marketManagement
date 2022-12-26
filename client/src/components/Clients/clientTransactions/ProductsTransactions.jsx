import React, { useState } from "react";
import { useRef } from "react";
import "./ProductTransactions.css";
export default function ProductsTransactions({ addProductsRows, transaction }) {
  const [itemsInRow, setItemsInRow] = useState({
    product: "",
    price: "",
  });
  const addProductForm = useRef();
  const checkHandler = (e) => {
    const isFilled = validation();
    if (isFilled) {
      e.target.checked
        ? localStorage.setItem(
            `${transaction._id}-${addProductsRows + 1}`,
            JSON.stringify(itemsInRow)
          )
        : localStorage.removeItem(`${transaction._id}-${addProductsRows + 1}`);
    } else {
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
      <input type="checkbox" onChange={(e) => checkHandler(e)} name="" id="" />
    </form>
  );
}
