import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  FaRegUser,
  FaRegClock,
  FaRegTrashAlt,
  FaRegComments,
} from "react-icons/fa";

function OrderList(props) {
  const { s_id } = props;
  const { u_id } = props;
  const [orders, setOrders] = useState([]);

  //從API SERVER抓資料
  async function getUserDataFromServer(u_id, s_id) {
    const url = `http://localhost:8080/api/orders/${u_id}/${s_id}`;
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();
    setOrders(data);
  }

  async function canceleOrderFromServer(o_id) {
    const url = `http://localhost:8080/api/orders/${o_id}`;
    const request = new Request(url, {
      method: "PUT",
      // body: JSON.stringify(newData),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const msg = await response.json();
      console.log(msg);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUserDataFromServer(u_id, s_id);
  }, []);

  return orders.map((value) => {
    return (
      <Link key={value.o_id}>
        <div className="order d-flex align-self-center justify-content-between mx-auto">
          {/* 從資料庫串接圖片 */}
          <img
            className="trip-order-image"
            src="http://localhost:8080/images/postcard/level/2.svg"
            alt=""
          />
          <div className="h5 card-tag">
            <p className="h3 trip-order-title">{value.title}</p>
            <div className="h4 order-info">
              <span>
                <FaRegClock className="mb-1 mx-1" />
                {value.start}
              </span>
              {/* 資料庫欄位新增 */}

              <span>
                <FaRegUser className="mb-1 mx-1" />
                人數 X {value.person}
              </span>
            </div>
          </div>
          {value.s_id === 20 && (
            <div className="d-flex flex-column justify-content-center">
              <div>
                <Link to={`/member/comment/${value.o_id}`}>
                  <button className="trip-btn btn-outline">評論</button>
                  <FaRegComments className="icon-order m-3" size="2rem" />
                </Link>
              </div>
            </div>
          )}
          {value.s_id === 10 && (
            <div className="d-flex flex-column justify-content-center">
              <div>
                <button
                  className="trip-btn btn-outline"
                  onClick={() => {
                    canceleOrderFromServer(value.o_id);
                  }}
                >
                  取消
                </button>
                <FaRegTrashAlt
                  className="icon-order m-3"
                  size="2rem"
                  onClick={() => {
                    canceleOrderFromServer(value.o_id);
                  }}
                />
              </div>
            </div>
          )}
          {value.s_id === 99 && (
            <div className="d-flex flex-column justify-content-center"></div>
          )}
        </div>
      </Link>
    );
  });
}

export default withRouter(OrderList);
