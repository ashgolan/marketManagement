import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Api } from "../../utils/Api";
import { FetchingStatus } from "../../utils/context";
import "./WaitingBids.css";
export default function WaitingBids({ setMessage, message }) {
  const [selectedOption, setSelectedOption] = useState({
    bidId: "",
    clientId: "",
  });
  const [allData, setAllData] = useState([]);
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  useEffect(() => {
    const myItem = localStorage.getItem("userID");
    localStorage.clear();
    localStorage.setItem("userID", myItem);
    const getBids = async () => {
      try {
        const { data } = await Api.get("/");
        setAllData(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getBids();
  }, []);
  const deleteOrApproveBid = async (choice) => {
    try {
      setFetchingStatus({ loading: true, error: false });

      if (choice === "delete") {
        const { data } = await Api.delete("/bids", {
          data: { _id: selectedOption.bidId },
        });
        setMessage({ status: true, message: "ההצעה נמחקה" });
      } else {
        const { data } = Api.patch("/bids", {
          isApproved: true,
          _id: selectedOption.bidId,
        });

        await Api.post("/transactions/", {
          owner: selectedOption.clientId,
          type: "buying",
          data: foundBid.data,
        });
        setMessage({ status: false, message: "ההצעה נקלטה בהצלחה" });
      }
      setTimeout(() => {
        setFetchingStatus({ loading: false, error: false });
      }, 1000);
    } catch (e) {
      setTimeout(() => {
        setMessage({ status: false, message: null });
        setFetchingStatus({ loading: false, error: true });
      }, 1000);
      console.log(e.message);
    }
  };
  const bidData =
    allData.bids &&
    allData.bids.map((bid, index) => {
      const foundClient =
        allData.clients &&
        allData.clients.find(
          (client) => client._id === bid.clientId && !bid.isApproved
        );
      if (foundClient)
        return (
          <option value={foundClient._id} id={bid._id} key={`bidName${index}`}>
            {foundClient.firstName} {` `}
            {foundClient.lastName} {`-`} {bid.date}
          </option>
        );
    });

  const foundBid =
    allData.bids &&
    allData.bids.find((bid) => {
      return bid._id === selectedOption.bidId;
    });
  const customBid =
    foundBid &&
    foundBid.data.map((bidRow, index) => {
      return (
        <form key={`bidRow${index}`} className="orderRow">
          <div>{bidRow.comment}</div>
          <div>{bidRow.totalAmount}</div>
          <div>{bidRow.price}</div>
          <div>{bidRow.quantity}</div>
          <div>{bidRow.category}</div>
          <div>{bidRow.serial}</div>
          <div>{bidRow.productName}</div>
          <div>{index + 1}</div>
        </form>
      );
    });
  return (
    <div>
      <form className="bid-container">
        <button
          onClick={() => deleteOrApproveBid("approve")}
          className="save-delete-bid-btn"
        >
          שמור כעסקה חדשה
        </button>
        <button
          onClick={() => deleteOrApproveBid("delete")}
          className="save-delete-bid-btn"
          style={{ backgroundColor: "brown" }}
        >
          מחיקת הצעה
        </button>
        <label
          className="save-delete-bid-btn"
          style={{ backgroundColor: "rgb(170, 90, 6)", width: "10%" }}
          htmlFor=""
        >
          {foundBid && foundBid.totalAmount}
        </label>
        <select
          className="order-selection"
          onChange={(e) => {
            // console.log(e.target.selectedOptions[0].value);
            setSelectedOption({
              bidId: e.target.selectedOptions[0].id,
              clientId: e.target.selectedOptions[0].value,
            });
          }}
          name=""
          defaultValue="בחר הצעה"
        >
          <option value="בחר הצעה">בחר הצעה</option>
          {bidData}
        </select>
      </form>
      <form className="orderRow titles">
        <div>הערה</div>
        <div>סהכ</div>
        <div>מחיר</div>
        <div>כמות</div>
        <div>קטגוריה</div>
        <div>מקט</div>
        <div>מוצר</div>
        <div>מספר</div>
      </form>
      {customBid}
    </div>
  );
}
