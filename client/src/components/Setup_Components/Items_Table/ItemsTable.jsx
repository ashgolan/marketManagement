import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import DeleteItem from "../Delete_Item/DeleteItem";
import EditItem from "../Edit_Item/EditItem";
import "./Item_Table.css";
export default function ItemsTable({
  item,
  itemInChange,
  setItemInChange,
  inventoryProducts,
  setInventoryProducts,
}) {
  const [changeStatus, setChangeStatus] = useState({
    editText: "עריכה",
    delete: "מחיקה",
    disabled: true,
    itemId: null,
  });
  const [itemsValues, setItemsValues] = useState({
    productName: item.productName,
    serial: item.serial,
    category: item.category,
    amount: item.amount,
    price: item.price,
    comment: item.comment,
  });
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await axios.get("http://localhost:5000/inventory");
  //       console.log(data);
  //       setInventoryProducts(data);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };
  //   getData();
  // }, [inventoryProducts]);
  const [message, setMessage] = useState({ status: false, message: null });
  // useEffect(() => {
  //   const getData = () => {
  // const thisItem = inventoryProducts.find((t) => t._id === item._id);
  // setItemsValues((prev) => {
  //   return {
  //     productName: item.productName,
  //     serial: item.serial,
  //     category: item.category,
  //     amount: item.amount,
  //     price: item.price,
  //     comment: item.comment,
  //   };
  // });
  //   };
  //   getData();
  // }, [item._id, inventoryProducts]);
  return (
    <div>
      <form className="Item_form" key={`form${item.id}`}>
        <input
          id="comment"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.comment}
          onChange={(e) => {
            setItemsValues((prev) => {
              return { ...prev, comment: e.target.value };
            });
          }}
        ></input>
        <input
          id="price"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.price}
          onChange={(e) => {
            setItemsValues((prev) => {
              return { ...prev, price: e.target.value };
            });
          }}
        ></input>
        <input
          id="amount"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.amount}
          onChange={(e) => {
            setItemsValues((prev) => {
              return { ...prev, amount: e.target.value };
            });
          }}
        ></input>
        <input
          id="category"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.category}
          onChange={(e) => {
            setItemsValues((prev) => {
              return { ...prev, category: e.target.value };
            });
          }}
        ></input>
        <input
          id="serial"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.serial}
          onChange={(e) => {
            setItemsValues((prev) => {
              return { ...prev, serial: e.target.value };
            });
          }}
        ></input>
        <input
          id="productName"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.productName}
          onChange={(e) => {
            setItemsValues((prev) => {
              return { ...prev, productName: e.target.value };
            });
          }}
        ></input>
        {(!itemInChange || changeStatus.itemId === item._id) && (
          <EditItem
            setMessage={setMessage}
            itemId={item._id}
            itemInChange={itemInChange}
            setItemInChange={setItemInChange}
            changeStatus={changeStatus}
            setChangeStatus={setChangeStatus}
            itemsValues={itemsValues}
            inventoryProducts={inventoryProducts}
          ></EditItem>
        )}
        {(!itemInChange || changeStatus.itemId === item._id) && (
          <DeleteItem
            setMessage={setMessage}
            itemInChange={itemInChange}
            setItemInChange={setItemInChange}
            itemId={item._id}
            changeStatus={changeStatus}
            setChangeStatus={setChangeStatus}
            itemsValues={itemsValues}
            setItemsValues={setItemsValues}
            inventoryProducts={inventoryProducts}
            setInventoryProducts={setInventoryProducts}
          ></DeleteItem>
        )}
      </form>
      {message.status && <h5 className="message">{message.message}</h5>}
    </div>
  );
}
