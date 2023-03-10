import React, { useState } from "react";
import { useRef } from "react";
import "./BidRow.css";
export default function BidRow({
  setTotalAmountOfBid,
  numOfRow,
  inventoryData,
}) {
  const bidForm = useRef();
  const selectedItem = useRef();
  const [itemInRow, setItemInRow] = useState({
    productName: "",
    serial: "",
    category: "",
    quantity: "",
    finalPrice: "",
    totalAmount: "",
    comment: "",
  });
  const allItems = inventoryData.map((item, index) => {
    return <option key={`product${index}`}>{item.productName}</option>;
  });
  const setBySelectedValue = (e) => {
    const foundItem = inventoryData.find((item) => {
      return item.productName === e.target.value;
    });
    foundItem &&
      setItemInRow((prev) => {
        return {
          ...prev,
          productName: foundItem.productName,
          serial: foundItem.serial,
          category: foundItem.category,
          finalPrice: foundItem.finalPrice,
          totalAmount: foundItem.totalAmount,
          comment: foundItem.comment,
        };
      });
  };
  const checkHandler = (e) => {
    const isFilled = validation();
    if (isFilled) {
      if (e.target.checked) {
        console.log(itemInRow.totalAmount);
        localStorage.setItem(`row${numOfRow + 1}`, JSON.stringify(itemInRow));
        setTotalAmountOfBid((prev) => prev + itemInRow.totalAmount);
      } else {
        localStorage.removeItem(`row${numOfRow + 1}`);
        setTotalAmountOfBid((prev) => prev - itemInRow.totalAmount);
      }
    } else {
      e.target.checked = false;
    }
  };

  const validation = () => {
    const form = new FormData(bidForm.current);
    const data = Object.fromEntries(form);
    const vals = Object.values(data);
    for (let prop in vals) {
      if (vals[prop] === "") return false;
    }
    return true;
  };

  return (
    <form ref={bidForm} className="row">
      <input
        style={{ width: "3%", color: "red", cursor: "pointer" }}
        type="checkbox"
        onClick={(e) => checkHandler(e)}
      />
      <input
        name="comment"
        placeholder={`????????`}
        className="input_box total comment-box"
        defaultValue={itemInRow.comment}
      ></input>
      <input
        name="totalAmount"
        type="number"
        disabled
        placeholder={`????"??`}
        className="input_box total"
        defaultValue={itemInRow.totalAmount}
      ></input>
      <input
        name="quantity"
        className="input_box"
        placeholder="????????"
        defaultValue={itemInRow.quantity}
        onChange={(e) =>
          setItemInRow((prev) => {
            return {
              ...prev,
              totalAmount: prev.finalPrice
                ? +(prev.finalPrice * e.target.value).toFixed(2)
                : e.target.value,
              quantity: e.target.value,
            };
          })
        }
      ></input>
      <input
        name="price"
        className="input_box"
        placeholder="????????"
        defaultValue={itemInRow.finalPrice}
      ></input>
      <input
        name="category"
        className="input_box"
        placeholder="??????????????"
        defaultValue={itemInRow.category}
      ></input>
      <input
        name="serial"
        className="input_box"
        placeholder="??????"
        defaultValue={itemInRow.serial}
      ></input>
      <input
        type="text"
        list="products"
        name="productsList"
        className="input_box"
        defaultValue={itemInRow.productName}
        onChange={(e) => setBySelectedValue(e)}
      ></input>
      <datalist id="products" ref={selectedItem}>
        <option defaultValue="?????? ????????" disabled>
          ?????? ????????
        </option>
        {allItems}
      </datalist>
      <input disabled className="row_number" value={numOfRow + 1} />
    </form>
  );
}
