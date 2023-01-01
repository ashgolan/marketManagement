import React, { useEffect } from "react";
import "./BidPage.css";
import { useState } from "react";
import BidRow from "./BidRow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FetchingStatus } from "../../utils/context";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default function BidPage({ client, message, setMessage }) {
  // eslint-disable-next-line
  const [fetchingStatus, setFetchingStatus] = useContext(FetchingStatus);
  const [totalAmountOfBid, setTotalAmountOfBid] = useState(0);
  const navigate = useNavigate();
  const [numOfRows, setNumOfRows] = useState(5);
  const [inventoryData, setInventoryData] = useState([]);
  const [bid, setBid] = useState({
    clientId: client._id,
    // date: new Date().toLocaleDateString(),
    // time: new Date().toLocaleTimeString(),
    isApproved: false,
    data: [],
    comment: "",
  });
  useEffect(() => {
    localStorage.clear();
    const getInventoryData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/inventory/");
        console.log(data);
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
        const { data } = await axios.post("http://localhost:5000/bids/", {
          ...bidObj,
          totalAmount: totalAmountOfBid,
        });
      } else {
        const { data } = await axios.post(
          "http://localhost:5000/transactions/",
          {
            owner: client._id,
            type: "buying",
            data: bidObj.data,
          }
        );
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
    localStorage.clear();
    setMessage(true);
    setTimeout(() => {
      navigate("/clients");
    }, 1000);
  };

  const exportToPdf = () => {
    const input = document.getElementById("pdfOrder");
    html2canvas(input, {
      scale: 2,
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const widthRatio = imgWidth / canvas.width;
      const heightRatio = imgHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
      const canvasWidth = canvas.width * ratio;
      const marginX = (imgWidth - canvasWidth) / 2;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", marginX, 0, imgWidth, imgHeight);
      pdf.save("order.pdf");
    });
  };
  return (
    <div className="bid_container" id="pdfOrder">
      {message.status && <h5 className="message">{message.message}</h5>}
      <form className="header_container">
        <img src="./img/sendMail.png" alt="" />
        <img
          style={{ cursor: "pointer" }}
          onClick={exportToPdf}
          src="./img/savePdf.png"
          alt=""
        />
        {/* <div className="pdf-btn save-pdf-data">
          <i class="fa-solid fa-file-pdf"></i>
          <input value="PDF" />
        </div> */}

        <div className="save-pdf-data">
          <i class="fa-solid fa-square-plus"></i>
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
        {/* <input
          required
          className="date"
          type="date"
          placeholder="תאריך"
          value={bid.date}
          onChange={(e) => {
            setBid((prev) => {
              return { ...prev, date: e.target.value };
            });
          }}
        /> */}
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
