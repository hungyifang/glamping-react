import React from "react";
import { FaRegUser } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

function OrderCard(props) {
  const { orders } = props;
  return (
    <>
      <aside className="comment-left-aside">
        {/* ==!資料庫連結到圖片 */}
        <img
          className="history-image"
          src={`http://localhost:8080/images/pic/event/${orders.img_src}`}
          alt=""
        />
        <p className="h2 history-title">{orders.title}</p>
        <p className="h4 history-info">訂單明細</p>
        <p className="h4 history-info">
          <FaRegClock className="mb-1 mx-1" />
          {orders.start}
          <FaRegUser className="mb-1 ms-3 me-1" />
          人數 X {orders.person}
        </p>
        <div className="d-flex justify-content-between">
          <p className="h4 history-price">總金額</p>
          <p className="h3 history-price">TWD {orders.total}</p>
        </div>
        {/* ==!連結到訂單頁面 */}
        <div className="d-flex justify-content-center">
          <button className="cardorder-btn btn-outline">查看訂單</button>
        </div>
      </aside>
    </>
  );
}

export default OrderCard;
