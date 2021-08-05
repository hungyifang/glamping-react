import React, { useState, useEffect } from "react";

// icon
import { MdFavorite } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

function CartsCheckbox(props) {
  const { allAgree, value, setCheck, setCheckboxArray, moreDelete } = props;
  const [agree, setAgree] = useState(false);
  // console.log(value)
  const levelPic = {
    36: "http://localhost:8080/images/postcard/level/1.svg",
    37: "http://localhost:8080/images/postcard/level/2.svg",
    38: "http://localhost:8080/images/postcard/level/3.svg",
  };
  // 設定全選
  function allCheck() {
    if (allAgree) {
      setAgree(true);
    } else {
      setAgree(false);
      setCheckboxArray([]);
    }
  }

  useEffect(() => {
    allCheck();
  }, [allAgree]);
  return (
    <>
      <div className="d-flex align-items-center mt-5">
        <input
          className="carts-input"
          type="checkbox"
          checked={agree}
          onChange={(e) => {
            setAgree(e.target.checked);
            setCheck(value.o_id);
          }}
        />
        <div className="carts-order d-flex flex-md-row justify-content-between align-items-md-stretch align-items-sm-start flex-sm-column flex-sm-wrap">
          <img
            className="carts-order-image"
            src={levelPic[value.level]}
            alt=""
          />
          <div className="d-flex flex-column justify-content-center">
            <p className="h3 carts-order-title">{value.title}</p>
            <p className="h4 carts-order-info">
              <i className="ic-clock"></i>
              {value.start}
              {" ~ "}
              {value.end}
              <i className="ic-person ms-3"></i>
              人數 X {value.person}
            </p>
          </div>
          <div className="d-flex align-items-end align-self-sm-end">
            <p className="h2 carts-order-price">TWD {value.total}</p>
          </div>
          <div className="carts-order-icon d-flex align-items-center">
            <div
              className="mx-2 carts-delete"
              onClick={() => {
                if (agree) {
                  moreDelete();
                } else {
                  alert("請勾選後才能刪除喔");
                }
              }}
            >
              <MdDeleteForever />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartsCheckbox;
