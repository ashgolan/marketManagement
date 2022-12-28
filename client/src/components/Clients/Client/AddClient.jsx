import axios from "axios";
import React, { useState } from "react";
import "./AddClient.css";
export default function AddClient() {
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
      console.log(newUser);
      const data = await axios.post("http://localhost:5000/clients", {
        ...newUser,
        fatherName: newUser.fatherName === "" ? "לא צויין" : newUser.fatherName,
      });
      //   newUser);
      console.log(newUser);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="addClientPage container">
      <form onSubmit={(e) => addUser(e)} className="add-client-form">
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
            <option selected defaultValue="בחר">
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
