import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchingStatus } from "../../../utils/context";

import "./Client.css";

export default function Client({
  client,
  clientTransactios: clientTransactions,
  setClient,
  setMessage,
  setClients,
  setAfterSave,
}) {
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  const [save, setSave] = useState({
    update: false,
    delete: false,
  });
  const [isChanged, setIsChanged] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [clientDetails, setClientDetails] = useState({
    firstName: client.firstName,
    fatherName: client.fatherName,
    lastName: client.lastName,
  });
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const getTotalAmount = () => {
    let count = 0;
    clientTransactions.forEach((transaction) => {
      count += transaction.totalAmount;
    });
    return count;
  };
  useEffect(() => {
    setTotalAmount(getTotalAmount());
  }, [clientTransactions, totalAmount]);

  const openClientPage = () => {
    setClient(client);
    navigate("/TransactionContainer");
  };
  const openTransactionHome = () => {
    setClient(client);
    navigate("/AddTransactionHome");
  };
  const saveDeleteOrUpdate = async () => {
    try {
      setFetchingStatus({ loading: true, error: false });
      if (save.update) {
        const { data } = await axios.patch("http://localhost:5000/clients/", {
          ...clientDetails,
          _id: client._id,
        });
        setClientDetails((prev) => {
          return {
            ...prev,
            firstName: data.firstName,
            fatherName: data.fatherName,
            lastName: data.lastName,
          };
        });
      } else {
        const { data } = await axios.delete("http://localhost:5000/clients/", {
          data: { _id: client._id },
        });
        setAfterSave(true);
        setClient(() => null);
      }
      // delete client and render
      setMessage({ status: true, message: "הפרטים עודכנו בהצלחה" });
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
    }
  };
  return (
    <div className="container">
      <form className="form-container">
        <input
          disabled={isDisabled}
          value={clientDetails.firstName}
          onChange={(e) =>
            setClientDetails((prev) => {
              return { ...prev, firstName: e.target.value };
            })
          }
          className="clientProp"
        />

        <input
          disabled={isDisabled}
          value={clientDetails.fatherName}
          onChange={(e) =>
            setClientDetails((prev) => {
              return { ...prev, fatherName: e.target.value };
            })
          }
          className="clientProp"
        />
        <input
          disabled={isDisabled}
          value={clientDetails.lastName}
          onChange={(e) =>
            setClientDetails((prev) => {
              return { ...prev, lastName: e.target.value };
            })
          }
          className="clientProp"
        />
        <label className="clientProp"> {totalAmount && totalAmount}</label>
        <label className="clientProp">ש"ח</label>
        <label className="clientProp">
          {clientTransactions.length &&
            clientTransactions[clientTransactions.length - 1].date}
        </label>
      </form>
      <div className="edit_delete">
        <i onClick={openTransactionHome} className="fa-solid fa-plus"></i>
        <i className="fa-solid fa-receipt"></i>
        <i onClick={openClientPage} className="fa-solid fa-chart-line"></i>
        {isChanged && (
          <i
            onClick={() => {
              setIsDisabled(true);
              setIsChanged(false);
              saveDeleteOrUpdate();
            }}
            class="fa-regular fa-floppy-disk"
          ></i>
        )}
        <i
          onClick={() => {
            setIsDisabled(false);
            setIsChanged(true);
            setSave({ delete: false, update: true });
          }}
          className="fa-regular fa-pen-to-square"
        ></i>
        <i
          onClick={() => {
            setIsChanged(true);
            setSave({ delete: true, update: false });
          }}
          className="fa-solid fa-user-xmark"
        ></i>
      </div>
    </div>
  );
}
