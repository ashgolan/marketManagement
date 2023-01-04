import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../utils/Api";
import { FetchingStatus } from "../../../utils/context";

import "./Client.css";
import ClientChart from "./ClientChart";

export default function Client({
  client,
  clientTransactions,
  setClient,
  setMessage,
  setJustForRender,
}) {
  const [showClientChart, setShowClientChart] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  const [action, setAction] = useState("makeIsActive");
  const [isChanged, setIsChanged] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [clientDetails, setClientDetails] = useState({});
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [clientChartData, setClientChartData] = useState({
    labels: clientTransactions.map((transaction) => transaction.date),
    datasets: [
      {
        label: "מצב תנועות",
        data: clientTransactions.map((transaction) => transaction.totalAmount),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "#EA8164",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });
  const getTotalAmount = () => {
    let count = 0;
    clientTransactions.forEach((transaction) => {
      count += transaction.totalAmount;
    });
    return count.toFixed(2);
  };
  useEffect(() => {
    setClientDetails({
      firstName: client.firstName,
      fatherName: client.fatherName,
      lastName: client.lastName,
      isActive: client.isActive,
    });
    setTotalAmount(getTotalAmount());
  }, [clientTransactions, totalAmount]);

  const openClientPage = () => {
    setClient(client);
    navigate("/TransactionContainer");
  };
  const openBidtPage = () => {
    setClient(client);
    navigate("/BidPage");
  };
  const openTransactionHome = () => {
    setClient(client);
    navigate("/AddTransactionHome");
  };
  const saveDeleteOrUpdate = async (stateOfAction) => {
    try {
      setFetchingStatus({ loading: true, error: false });
      if (stateOfAction === "update") {
        const { data } = await Api.patch("/clients/", {
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
        setMessage({ status: true, message: "הפרטים עודכנו בהצלחה" });
      } else if (stateOfAction === "makeNotActive") {
        await Api.patch("/clients/", {
          isActive: false,
          _id: client._id,
        });

        setMessage({ status: true, message: "תיק של הקליינט מושבט כרגע " });
      } else if (stateOfAction === "makeIsActive") {
        await Api.patch("/clients/", {
          isActive: true,
          _id: client._id,
        });
        setMessage({ status: true, message: "תיק של קליינט הופעל מחדש" });
      } else if (stateOfAction === "sendMail") {
        await Api.post("/sendMail/", {
          mail: client.email,
          name: client.firstName,
          amount: totalAmount,
        });
        setMessage({ status: true, message: "תזכורת לקליינט נשלחה בהצלחה" });
      }
      setTimeout(() => {
        setMessage({ status: false, message: null });
        setFetchingStatus({ loading: false, error: false });
      }, 1000);
      setJustForRender((prev) => !prev);
    } catch (e) {
      setFetchingStatus({ loading: false, error: true });
      setMessage({
        status: true,
        message: "תקלה בקריאת הנתונים",
      });
    }
  };
  return (
    <div className="client-container">
      <form className="form-container">
        <input
          disabled={isDisabled}
          value={clientDetails.firstName}
          onChange={(e) =>
            setClientDetails((prev) => {
              return { ...prev, firstName: e.target.value };
            })
          }
          style={{ color: clientDetails.isActive ? "white" : "gray" }}
          className="clientProp"
        ></input>
        <i
          style={{ visibility: client.isActive ? "hidden" : "visible" }}
          className="fa-regular fa-lightbulb"
          onClick={(e) => {
            e.preventDefault();
            setAction(() => "makeIsActive");
            saveDeleteOrUpdate("makeIsActive");
          }}
        ></i>

        <input
          disabled={isDisabled}
          value={clientDetails.fatherName}
          onChange={(e) =>
            setClientDetails((prev) => {
              return { ...prev, fatherName: e.target.value };
            })
          }
          style={{ color: client.isActive ? "white" : "gray" }}
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
          style={{ color: clientDetails.isActive ? "white" : "gray" }}
          className="clientProp"
        />
        <label
          style={{ color: clientDetails.isActive ? "white" : "gray" }}
          className="clientProp"
        >
          {" "}
          {totalAmount && Number(totalAmount).toFixed(1)}
        </label>
        <label
          className="clientProp"
          style={{ color: clientDetails.isActive ? "white" : "gray" }}
        >
          ש"ח
        </label>
        <label
          className="clientProp"
          style={{ color: clientDetails.isActive ? "white" : "gray" }}
        >
          {clientTransactions.length &&
            clientTransactions[clientTransactions.length - 1].date}
        </label>
      </form>
      {clientDetails.isActive && (
        <div className="client_actions">
          <div className="save-actions">
            {isChanged && (
              <button
                className="confirm"
                onClick={() => {
                  setIsDisabled(true);
                  setIsChanged(false);
                  saveDeleteOrUpdate(action);
                }}
              >
                אישור
              </button>
            )}
            {isChanged && (
              <button
                className="cancel"
                onClick={() => {
                  setIsDisabled(true);
                  setIsChanged(false);
                }}
              >
                ביטול
              </button>
            )}
          </div>
          <div className="actions">
            <img
              onClick={() => setShowClientChart((prev) => !prev)}
              style={{ width: "10%", cursor: "pointer" }}
              src="/img/clientChart.png"
              alt=""
            />
            <i
              onClick={openTransactionHome}
              className="fa-regular fa-credit-card"
            ></i>
            <i
              onClick={() => {
                setIsDisabled(false);
                setIsChanged(true);
                setAction(() => "sendMail");
              }}
              className="fa-solid fa-envelope"
            ></i>
            <i onClick={openBidtPage} className="fa-solid fa-receipt"></i>
            <i onClick={openClientPage} className="fa-solid fa-chart-line"></i>
            <i
              onClick={() => {
                setIsDisabled(false);
                setIsChanged(true);
                setAction(() => "update");
              }}
              className="fa-regular fa-pen-to-square"
            ></i>
            <i
              onClick={() => {
                setIsChanged(true);
                setAction(() => "makeNotActive");
              }}
              className="fa-solid fa-user-xmark"
            ></i>
          </div>
        </div>
      )}
      {showClientChart && (
        <div style={{ width: "50%" }}>
          <ClientChart clientChartData={clientChartData} />
        </div>
      )}
    </div>
  );
}
