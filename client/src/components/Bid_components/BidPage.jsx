import React, { useEffect } from "react";
import "./BidPage.css";
import { useState } from "react";
import BidRow from "./BidRow";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FetchingStatus } from "../../utils/context";
import { exportToPdf } from "../../utils/exportToPdf";
import { Api } from "../../utils/Api";
export default function BidPage({ client, message, setMessage }) {
  // eslint-disable-next-line
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  const [totalAmountOfBid, setTotalAmountOfBid] = useState(0);
  const navigate = useNavigate();
  const [numOfRows, setNumOfRows] = useState(5);
  const [inventoryData, setInventoryData] = useState([]);
  const [bid, setBid] = useState({
    clientId: client._id,
    isApproved: false,
    data: [],
    comment: "",
  });
  useEffect(() => {
    const myItem = localStorage.getItem("userID");
    localStorage.clear();
    localStorage.setItem("userID", myItem);

    // localStorage.clear();
    const getInventoryData = async () => {
      try {
        const { data } = await Api.get("/inventory");
        setInventoryData(() => data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getInventoryData();
  }, []);
  const uploadData = async (bidObj, id) => {
    try {
      setFetchingStatus({ loading: true, error: false });
      console.log(id);
      if (id === "newBid") {
        await Api.post("/bids", {
          ...bidObj,
          totalAmount: totalAmountOfBid,
        });
      } else {
        await Api.post("/transactions", {
          owner: client._id,
          type: "buying",
          data: bidObj.data,
        });
      }
      setFetchingStatus({ loading: false, error: false });
    } catch (e) {
      setFetchingStatus({ loading: false, error: true });
    }
  };

  const saveBidHandler = (e) => {
    console.log(e);
    e.preventDefault();
    const allBidRows = [];
    const ls = Object.values(localStorage);
    for (let item in ls) {
      if (localStorage.key(item) !== "userID")
        allBidRows.push(JSON.parse(ls[item]));
    }
    setBid((prev) => {
      return { ...prev, data: allBidRows };
    });
    uploadData(
      {
        clientId: bid.clientId,
        // date: bid.date,
        isApproved: bid.isApproved,
        data: allBidRows,
        comment: bid.comment,
      },
      e.target.id
    );
    const myItem = localStorage.getItem("userID");
    localStorage.clear();
    localStorage.setItem("userID", myItem);

    setMessage(true);
    setTimeout(() => {
      navigate("/clients");
    }, 1000);
  };

  return (
    <div className="bid_container" id="pdfOrder">
      {message.status && <h5 className="message">{message.message}</h5>}
      <form className="header_container">
        <img
          style={{ cursor: "pointer" }}
          onClick={() => exportToPdf("pdfOrder")}
          src="./img/savePdf.png"
          alt=""
        />
        <div className="save-pdf-data">
          <i className="fa-solid fa-square-plus"></i>
          <label
            style={{ cursor: "pointer" }}
            id="newBuying"
            onClick={(e) => saveBidHandler(e)}
          >
            שמירה כעסקה חדשה
          </label>
        </div>
        <div className="save-pdf-data">
          <i class="fa-solid fa-receipt"></i>
          <label
            style={{ cursor: "pointer" }}
            id="newBid"
            onClick={(e) => saveBidHandler(e)}
          >
            שמירה כהצעת מחיר
          </label>
        </div>
        <div
          className="save-pdf-data"
          style={{ width: "10%", backgroundColor: "rgb(170, 90, 6)" }}
        >
          <i class="fa-solid fa-sack-dollar"></i>{" "}
          <label>{totalAmountOfBid}</label>
        </div>

        <input
          className="date"
          type="text"
          placeholder="הערה"
          value={bid.comment}
          onChange={(e) => {
            setBid((prev) => {
              return { ...prev, comment: e.target.value };
            });
          }}
        />
        <div
          style={{
            width: "15%",
            display: "flex",
            justifyContent: "space-around",
            fontWeight: "bold",
          }}
        >
          <label htmlFor="">{client.lastName}</label>
          <label htmlFor="">
            {
              (client.fatherName =
                client.fatherName === "לא צויין" ? "" : client.fatherName)
            }
          </label>
          <label htmlFor="">{client.firstName}</label>
        </div>
      </form>
      {[...new Array(numOfRows)].map((row, index) => {
        return (
          <BidRow
            key={`row${index}`}
            inventoryData={inventoryData}
            numOfRow={index}
            setTotalAmountOfBid={setTotalAmountOfBid}
          ></BidRow>
        );
      })}
      <img
        src="/img/addItem.png"
        alt=""
        className="addWRow_btn"
        onClick={() => {
          setNumOfRows((prev) => prev + 1);
        }}
      />
    </div>
  );
}
