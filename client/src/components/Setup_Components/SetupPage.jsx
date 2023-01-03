import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { Api } from "../../utils/Api";
import { FetchingStatus } from "../../utils/context";
import AddItem from "./Add_Item/AddItem";
import AddItemBtn from "./Add_Item/AddItemBtn";
import ItemsTable from "./Items_Table/ItemsTable";
import "./SetupPage.css";

export default function SetupPage() {
  // eslint-disable-next-line
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  const [itemInChange, setItemInChange] = useState(false);
  const [addItemToggle, setaddItemToggle] = useState({
    btnVisible: true,
    formVisible: false,
  });
  const [inventoryProducts, setInventoryProducts] = useState([]);
  useEffect(() => {
    const myItem = localStorage.getItem("userID");
    localStorage.clear();
    localStorage.setItem("userID", myItem);
    const getData = async () => {
      try {
        const { data } = await Api.get("/inventory");
        console.log(data);
        setInventoryProducts(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getData();
  }, [addItemToggle, itemInChange]);

  return (
    <div>
      {fetchingStatus.error && (
        <h5 style={{ textAlign: "center", color: "brown" }}>
          אין מוצרים .. תקלה בקריאת הנתונים
        </h5>
      )}
      <div>
        <form className="Item_form">
          <input
            id="comment"
            className="input_show_item head"
            value="הערה"
            disabled
          ></input>
          <input
            id="price"
            className="input_show_item head"
            value="מחיר"
            disabled
          ></input>
          <input
            id="amount"
            className="input_show_item head"
            value="כמות"
            disabled
          ></input>
          <input
            id="category"
            className="input_show_item head"
            value="קטגוריה"
            disabled
          ></input>
          <input
            id="serial"
            className="input_show_item head"
            value="מקט"
            disabled
          ></input>
          <input
            id="productName"
            className="input_show_item head"
            value="מוצר"
            disabled
          ></input>
          <button style={{ visibility: "hidden" }} className="edit_btn">
            edit
          </button>
          <button style={{ visibility: "hidden" }} className="delete_btn">
            delete
          </button>
        </form>
      </div>
      {(!fetchingStatus.loading || inventoryProducts.length) &&
        inventoryProducts
          // .sort((a, b) => (a.category > b.category ? 1 : -1))
          .map((item) => {
            return (
              <ItemsTable
                key={`item${item._id}`}
                item={item}
                inventoryProducts={inventoryProducts}
                itemInChange={itemInChange}
                setItemInChange={setItemInChange}
                setInventoryProducts={setInventoryProducts}
              ></ItemsTable>
            );
          })}
      {!addItemToggle.formVisible && !fetchingStatus.error && (
        <AddItemBtn setaddItemToggle={setaddItemToggle}></AddItemBtn>
      )}
      {!addItemToggle.btnVisible && (
        <AddItem
          setaddItemToggle={setaddItemToggle}
          inventoryProducts={inventoryProducts}
        ></AddItem>
      )}
    </div>
  );
}
