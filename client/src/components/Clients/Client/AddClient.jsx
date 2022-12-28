import axios from "axios";
import React, { useContext, useState } from "react";
import { FetchingStatus } from "../../../utils/context";
import "./AddClient.css";
export default function AddClient({ setMessage, message }) {
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);

  const [newUser, setNewUser] = useState({
    firstName: "",
    fatherName: "",
    lastName: "",
    phone: "",
    comment: "",
    isContractor: "",
  });
  const addUser = async (e) => {
    e.preventDefault();
    try {
      setFetchingStatus({ loading: true, error: false });
      const data = await axios.post("http://localhost:5000/clients", {
        ...newUser,
        fatherName: newUser.fatherName === "" ? "לא צויין" : newUser.fatherName,
      });
      setMessage({ status: true, message: "הקליינט נקלט בהצלחה" });
      setTimeout(() => {
        setMessage({ status: false, message: null });
        setFetchingStatus({ loading: false, error: false });
      }, 1000);
    } catch (e) {
      setFetchingStatus({ loading: false, error: true });
      setMessage({
        status: true,
        message: "תקלה בקריאת הנתונים",
      });
      setTimeout(() => {
        setMessage({ status: false, message: null });
        setFetchingStatus({ loading: false, error: false });
      }, 1000);
    }
  };
  return (
    <div className="addClientPage container">
      <form onSubmit={(e) => addUser(e)} className="add-client-form">
        {message.status && <h5 className="message">{message.message}</h5>}

        <div className="form-group">
          <label htmlFor="">שם קליינט</label>
          <input
            value={newUser.firstName}
            onChange={(e) =>
              setNewUser((prev) => {
                return { ...newUser, firstName: e.target.value };
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="">שם האב</label>
          <input
            value={newUser.fatherName}
            onChange={(e) => {
              setNewUser((prev) => {
                return {
                  ...newUser,
                  fatherName: e.target.value,
                };
              });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">משפחה</label>
          <input
            value={newUser.lastName}
            onChange={(e) =>
              setNewUser((prev) => {
                return { ...newUser, lastName: e.target.value };
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="">טלפון</label>
          <input
            value={newUser.phone}
            onChange={(e) =>
              setNewUser((prev) => {
                return { ...newUser, phone: e.target.value };
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="">הערה</label>
          <input
            value={newUser.comment}
            onChange={(e) =>
              setNewUser((prev) => {
                return { ...newUser, comment: e.target.value };
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="">קבלן</label>
          <select
            name=""
            id=""
            value={newUser.isContractor === true ? "כן" : "לא"}
            onChange={(e) => {
              setNewUser((prev) => {
                return {
                  ...newUser,
                  isContractor: e.target.value === "כן" ? true : false,
                };
              });
            }}
          >
            <option disabled selected defaultValue="בחר">
              בחר
            </option>
            <option value="כן">כן</option>
            <option value="לא">לא</option>
          </select>
        </div>
        <button className="add-client-submit">אישור</button>
      </form>
    </div>
  );
}
