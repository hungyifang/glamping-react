import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BsClock } from "react-icons/bs";

function OrdersDetail(props) {
  const { element } = props;
  const levelPic = {
    56: "http://localhost:8080/images/postcard/level/1.svg",
    57: "http://localhost:8080/images/postcard/level/2.svg",
    58: "http://localhost:8080/images/postcard/level/3.svg",
  };
  return (
    <>
      <div className="check-order d-flex mt-4 align-items-center">
        <img
          className="check-order-image"
          src={
            element.prime === 4
              ? `http://localhost:8080/images/pic/event/${element.src}`
              : levelPic[element.level]
          }
          alt=""
        />
        <div className="d-flex flex-column align-items-start justify-content-center align-self-sm-start mt-sm-3">
          <p className="h3 check-order-title">
            {element.prime === 4
              ? "當地活動 | " + element.title
              : element.title}
          </p>
          <p className="h4 check-order-info d-flex align-items-center justify-content-center h-100">
            <div>
              <BsClock />
              <span className="mx-2">
                {element.prime === 4
                  ? element.ship_date + "     時間:" + element.eventStartTime
                  : element.start + " ~ " + element.end}
              </span>
            </div>
            <div>
              <FaUser />
              <span className="mx-2">人數 X {element.person}</span>
            </div>
          </p>
          {/* <BsClock /> */}
          {/* <span>
            {element.prime === 4
              ? element.ship_date + "     時間:" + element.eventStartTime
              : element.start + " ~ " + element.end}
          </span>
          <FaUser />
          <span>人數 X {element.person}</span> */}
        </div>
      </div>
    </>
  );
}

export default OrdersDetail;
