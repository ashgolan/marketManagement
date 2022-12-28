import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { FetchingStatus } from "../../../utils/context";
import "./Add_item.css";
export default function AddItem({ setaddItemToggle }) {
  // eslint-disable-next-line
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  const [itemsValues, setItemsValues] = useState({
    productName: "",
    serial: "",
    category: "",
    amount: "",
    price: "",
    comment: null,
  });

  const addItem = async () => {
    try {
      setFetchingStatus({ loading: true, error: false });
      const { data } = await axios.post(
        "http://localhost:5000/inventory",
        itemsValues
      );
      setFetchingStatus({ loading: false, error: false });
    } catch {
      setFetchingStatus({ loading: false, error: true });
    }
  };

  const confirmAddingItem = (e) => {
    e.preventDefault();

    setaddItemToggle({ btnVisible: true, formVisible: false });
    addItem();
  };
  const cancelAddingItem = (e) => {
    e.preventDefault();
    setaddItemToggle({ btnVisible: true, formVisible: false });
  };
  return (
    <form onSubmit={confirmAddingItem} className="addItem_form">
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <input
          id="comment"
          required
          className="add_item"
          placeholder="הערה"
          onChange={(e) =>
            setItemsValues((prev) => {
              return { ...prev, comment: e.target.value };
            })
          }
          value={itemsValues.comment}
        ></input>
        <input
          id="price"
          required
          className="add_item"
          placeholder="מחיר"
          onChange={(e) =>
            setItemsValues((prev) => {
              return { ...prev, price: e.target.value };
            })
          }
          value={itemsValues.price}
        ></input>
        <input
          id="amount"
          required
          className="add_item"
          placeholder="כמות"
          onChange={(e) =>
            setItemsValues((prev) => {
              return { ...prev, amount: e.target.value };
            })
          }
          value={itemsValues.amount}
        ></input>
        <input
          id="category"
          required
          className="add_item"
          placeholder="קטגוריה"
          onChange={(e) =>
            setItemsValues((prev) => {
              return { ...prev, category: e.target.value };
            })
          }
          value={itemsValues.category}
        ></input>
        <input
          id="serial"
          required
          className="add_item"
          placeholder="מקט"
          onChange={(e) =>
            setItemsValues((prev) => {
              return { ...prev, serial: e.target.value };
            })
          }
          value={itemsValues.serial}
        ></input>
        <input
          id="productName"
          required
          className="add_item"
          placeholder="שם המוצר"
          onChange={(e) =>
            setItemsValues((prev) => {
              return { ...prev, productName: e.target.value };
            })
          }
          value={itemsValues.productName}
        ></input>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1%" }}
      >
        <input className="confirm_addItem" type="submit" value="אישור"></input>
        <button className="remove_addItem" onClick={cancelAddingItem}>
          הסרה
        </button>
      </div>
    </form>
  );
}
