import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Client.css";

export default function Client({ client, clientTransactios, setClient }) {
  const [isChanged, setIsChanged] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [clientDetails, setClientDetails] = useState({
    firstName: "",
    fatherName: "",
    lastName: "",
  });
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const getTotalAmount = () => {
    let count = 0;
    clientTransactios.forEach((transaction) => {
      count += transaction.totalAmount;
    });
    return count;
  };
  useEffect(() => {
    setTotalAmount(getTotalAmount());
  }, [clientTransactios]);

  const openClientPage = () => {
    setClient(client);
    navigate("/TransactionContainer");
  };
  const openTransactionHome = () => {
    setClient(client);
    navigate("/AddTransactionHome");
  };

  return (
    <div className="container">
      <form className="form-container">
        <input
          disabled={isDisabled}
          defaultValue={client.firstName}
          onChange={(e) =>
            setClientDetails((prev) => {
              return { ...prev, firstName: e.target.value };
            })
          }
          className="clientProp"
        />

        <input
          disabled={isDisabled}
          defaultValue={client.fatherName}
          onChange={(e) =>
            setClientDetails((prev) => {
              return { ...prev, fatherName: e.target.value };
            })
          }
          className="clientProp"
        />
        <input
          disabled={isDisabled}
          defaultValue={client.lastName}
          onChange={(e) =>
            setClientDetails((prev) => {
              return { ...prev, lastName: e.target.value };
            })
          }
          className="clientProp"
        />
        <label className="clientProp"> {totalAmount}</label>
        <label className="clientProp">ש"ח</label>
        <label className="clientProp">
          {clientTransactios[clientTransactios.length - 1].date}
        </label>
      </form>
      <div className="edit_delete">
        <i onClick={openTransactionHome} class="fa-solid fa-plus"></i>
        <i onClick={openClientPage} className="fa-solid fa-chart-line"></i>
        {isChanged && (
          <i
            onClick={() => {
              setIsDisabled(true);
              setIsChanged(false);
            }}
            class="fa-regular fa-floppy-disk"
          ></i>
        )}
        <i
          onClick={() => {
            setIsDisabled(false);
            setIsChanged(true);
          }}
          className="fa-regular fa-pen-to-square"
        ></i>
        <i className="fa-solid fa-user-xmark"></i>
      </div>
    </div>
  );
}
