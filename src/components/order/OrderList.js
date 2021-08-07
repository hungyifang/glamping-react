import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  FaRegUser,
  FaRegClock,
  FaRegTrashAlt,
  FaRegComments,
} from "react-icons/fa";

function OrderList(props) {
  const { u_id, s_id } = props;
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const levelPic = {
    56: "http://localhost:8080/images/postcard/level/1.svg",
    57: "http://localhost:8080/images/postcard/level/2.svg",
    58: "http://localhost:8080/images/postcard/level/3.svg",
  };

  //從API SERVER抓資料
  async function getItemsDataFromServer() {
    const url = `http://localhost:8080/api/items`;
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    setItems(data);
  }

  async function getOrderedDataFromServer(u_id, s_id) {
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
    getItemsDataFromServer();
    getOrderedDataFromServer(u_id, s_id);
  }, []);

  return orders.map((value) => {
    return (
      <Link key={value.o_id}>
        <div className="order d-flex align-self-center justify-content-between mx-auto">
          {/* 從資料庫串接圖片 */}
          <img
            className="trip-order-image"
            src={
              value.prime === 4
                ? `http://localhost:8080/images/pic/event/${
                    items.find((element) => element.i_id === value.i_id).img_src
                  }`
                : levelPic[value.level]
            }
            alt=""
          />
          <div className="h5 card-tag">
            <p className="h3 trip-order-title">{value.title}</p>
            <div className="h4 order-info">
              <span>
                <FaRegClock className="mb-1 mx-1" />
                {value.start}
              </span>

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
