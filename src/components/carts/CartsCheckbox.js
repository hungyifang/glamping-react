import React, { useState, useEffect } from "react";

// icon
import { MdFavorite } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

function CartsCheckbox(props) {
  const { allAgree, value, setCheck, setCheckboxArray, moreDelete } = props;
  const [agree, setAgree] = useState(false);
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
            src="http://localhost:8080/images/postcard/level/1.svg"
            alt=""
          />
          <div className="d-flex flex-column justify-content-center">
            <p className="h3 carts-order-title">{value.title}</p>
            <p className="h4 carts-order-info d-flex align-items-center">
              <BsClock />
              <span>
                {value.prime === 4
                  ? value.ship_date + "     時間:" + value.eventStartTime
                  : value.start + " ~ " + value.end}
              </span>
              <FaUser />
              <span>人數 X {value.person}</span>
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
