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
    const getData = async () => {
      try {
        const { data } = await Api.get("/inventory");
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
          <input id="comment" className="head" value="הערה" disabled></input>
          <input
            id="price"
            className="head"
            value="למכירה"
            style={{ width: "10%" }}
            disabled
          ></input>
          <input
            id="price"
            className="head"
            value="רווח"
            style={{ width: "5%" }}
            disabled
          ></input>
          <input
            id="price"
            className="head"
            value="מעמ"
            style={{ width: "7%" }}
            disabled
          ></input>
          <input
            id="price"
            className="head"
            value="נטו"
            style={{ width: "5%" }}
            disabled
          ></input>
          <input
            id="amount"
            className="head"
            value="כמות"
            style={{ width: "5%" }}
            disabled
          ></input>
          <input
            id="category"
            className="head"
            style={{ width: "10%" }}
            value="קטגוריה"
            disabled
          ></input>
          <input
            id="serial"
            className="head"
            value="מקט"
            style={{ width: "7%" }}
            disabled
          ></input>
          <input
            id="productName"
            className="head"
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
