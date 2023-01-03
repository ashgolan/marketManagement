import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import "./Delete_Item.css";
import { FetchingStatus } from "../../../utils/context";
import { Api } from "../../../utils/Api";
export default function DeleteItem({
  itemInChange,
  setItemInChange,
  itemId,
  changeStatus,
  setChangeStatus,
  setItemsValues,
  setMessage,
  setInventoryProducts,
}) {
  // eslint-disable-next-line
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/inventory");
        console.log(data);
        setInventoryProducts(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getData();
  }, []);
  const deleteData = async () => {
    try {
      setFetchingStatus({ loading: true, error: false });
      const res = await Api.delete(`/inventory`, {
        data: { _id: itemId },
      });
      setMessage({ status: true, message: "המוצר נמחק בהצלחה" });
      setTimeout(() => {
        setMessage({ status: false, message: null });
        setFetchingStatus({ loading: false, error: false });
      }, 1000);
    } catch (e) {
      setFetchingStatus({ loading: false, error: true });
      setMessage({
        status: true,
        message: "המוצר לא נמצא .. תקלה בקריאת הנתונים",
      });
    }
  };

  const deleteHandler = (e) => {
    e.preventDefault();

    setChangeStatus((prev) => {
      return {
        editText: prev.delete === "מחיקה" ? "ביטול" : "עריכה",
        delete: prev.delete === "מחיקה" ? "אישור" : "מחיקה",
        disabled: true,
        itemId: prev.delete === "מחיקה" ? itemId : null,
      };
    });
    if (changeStatus.delete === "ביטול") {
      const getTempObjFromLs = JSON.parse(localStorage.getItem("itemData"));
      setItemsValues(getTempObjFromLs);
      setMessage({ status: false, message: null });
      localStorage.removeItem("itemData");
    }
    if (changeStatus.delete === "אישור") {
      deleteData();
    }
    setItemInChange(!itemInChange);
  };
  return (
    <button className="delete_btn" onClick={(e) => deleteHandler(e)}>
      {changeStatus.delete}
    </button>
  );
}
