import React, { useState, useEffect } from "react";

function OrdersDetail(props) {
  const { element } = props;
  const levelPic = {
    56: "http://localhost:8080/images/postcard/level/1.svg",
    57: "http://localhost:8080/images/postcard/level/2.svg",
    58: "http://localhost:8080/images/postcard/level/3.svg",
  };
  return (
    <>
      <div className="check-order d-flex mt-4">
        <img
          className="check-order-image"
          src={levelPic[element.level]}
          alt=""
        />
        <div className="d-flex flex-column align-items-start justify-content-center align-self-sm-start mt-sm-3">
          <p className="h3 check-order-title">{element.title}</p>
          <p className="h4 check-order-info">
            <i className="ic-clock"></i>
            {element.start} ~ {element.end}
            <i className="ic-person ms-5"></i>
            人數 X {element.person}
          </p>
        </div>
      </div>
    </>
  );
}

export default OrdersDetail;
