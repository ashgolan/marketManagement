import React, { useState } from "react";
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
    profit: item.profit,
    tax: item.tax,
    finalPrice: item.finalPrice,
    comment: item.comment,
  });
  const [message, setMessage] = useState({ status: false, message: null });

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
          id="finalPrice"
          type="Number"
          className="input_show_item"
          disabled={true}
          value={itemsValues.finalPrice}
          style={{ width: "10%" }}
        ></input>
        <input
          id="profit"
          type="text"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.profit}
          style={{ width: "5%" }}
          onChange={(e) => {
            setItemsValues((prev) => {
              return {
                ...prev,
                profit: e.target.value,
                finalPrice:
                  prev.price +
                  prev.price * +e.target.value +
                  (prev.price + prev.price * +e.target.value) * prev.tax,
              };
            });
          }}
        ></input>
        <input
          id="tax"
          type="text"
          className="input_show_item"
          style={{ width: "7%" }}
          disabled={changeStatus.disabled}
          value={itemsValues.tax}
          onChange={(e) => {
            setItemsValues((prev) => {
              return {
                ...prev,
                tax: e.target.value,
                finalPrice:
                  prev.price +
                  prev.price * prev.profit +
                  (prev.price + prev.price * prev.profit) * +e.target.value,
              };
            });
          }}
        ></input>
        <input
          id="price"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.price}
          style={{ width: "5%" }}
          onChange={(e) => {
            setItemsValues((prev) => {
              return {
                ...prev,
                price: +e.target.value,
                finalPrice:
                  +e.target.value +
                  +e.target.value * prev.profit +
                  (+e.target.value + +e.target.value * prev.profit) * prev.tax,
              };
            });
          }}
        ></input>
        <input
          id="amount"
          className="input_show_item"
          disabled={changeStatus.disabled}
          value={itemsValues.amount}
          style={{ width: "5%" }}
          onChange={(e) => {
            setItemsValues((prev) => {
              return { ...prev, amount: e.target.value };
            });
          }}
        ></input>
        <input
          id="category"
          className="input_show_item"
          style={{ width: "10%" }}
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
          style={{ width: "7%" }}
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
