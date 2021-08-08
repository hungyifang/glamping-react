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
  const [orderedDetail, setOrderedDetail] = useState([]);
  const selectProducts = {
    1: "http://localhost:8080/images/postcard/human/1.svg",
    2: "http://localhost:8080/images/postcard/human/2.svg",
    3: "http://localhost:8080/images/postcard/human/3.svg",
    4: "http://localhost:8080/images/postcard/human/4.svg",
    8: "http://localhost:8080/images/postcard/tent/yurt.svg",
    9: "http://localhost:8080/images/postcard/tent/standard.svg",
    12: "http://localhost:8080/images/postcard/tent/rv.svg",
    13: "http://localhost:8080/images/postcard/tent/indi.svg",
    14: "http://localhost:8080/images/postcard/dinner/buffet.svg",
    15: "http://localhost:8080/images/postcard/dinner/bbq.svg",
    16: "http://localhost:8080/images/postcard/dinner/oven.svg",
    17: "http://localhost:8080/images/postcard/toy/lamp.svg",
    18: "http://localhost:8080/images/postcard/toy/fire.svg",
    19: "http://localhost:8080/images/postcard/toy/film.svg",
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
  // 抓取要畫畫的資料
  async function getPictureDataFromServer() {
    // 連接的伺服器資料網址
    const url = "http://localhost:8080/api/items/orderedAndDetail";

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();
    setOrderedDetail(data);
    // console.log(orderedDetail);
    // console.log(orders);
  }
  function putPicture(value) {
    // console.log(value.o_id);
    let detailData = orderedDetail.filter((e) => e.o_id === value.o_id);
    console.log(detailData);
    const styleSelect = [];
    const foodSelect = [];
    const itemSelect = [];
    const filmSelect = [];
    for (let i = 0; i < detailData.length; i++) {
      switch (detailData[i].i_id) {
        case 8:
          styleSelect.push(
            "http://localhost:8080/images/postcard/tent/yurt.svg"
          );
          break;
        case 9:
          styleSelect.push(
            "http://localhost:8080/images/postcard/tent/standard.svg"
          );
          break;
        case 12:
          styleSelect.push("http://localhost:8080/images/postcard/tent/rv.svg");
          break;
        case 13:
          styleSelect.push(
            "http://localhost:8080/images/postcard/tent/indi.svg"
          );
          break;
        case 14:
          foodSelect.push(
            "http://localhost:8080/images/postcard/dinner/buffet.svg"
          );
          break;
        case 15:
          foodSelect.push(
            "http://localhost:8080/images/postcard/dinner/bbq.svg"
          );
          break;
        case 16:
          foodSelect.push(
            "http://localhost:8080/images/postcard/dinner/oven.svg"
          );
          break;
        case 17:
          itemSelect.push("http://localhost:8080/images/postcard/toy/lamp.svg");
          break;
        case 18:
          itemSelect.push("http://localhost:8080/images/postcard/toy/fire.svg");
          break;
        case 19:
          filmSelect.push("http://localhost:8080/images/postcard/toy/film.svg");
          break;
        default:
          console.log("");
      }
    }
    return (
      <div className="carts-order-image positionRelative">
        {/* 露營地點 */}
        <div className="reload-level">
          <img className="pic-100" src={selectProducts[value.level]} alt="" />
        </div>
        <div className="reload-person">
          {/* 露營人數 */}
          <img
            className="h-100"
            src={selectProducts[value.person]}
            alt=""
          ></img>
        </div>
        <div className="reload-style">
          {/* 帳篷樣式 */}
          <img className="h-100" src={styleSelect[0]} alt=""></img>
        </div>
        <div className="reload-food">
          {/* 晚餐選擇 */}
          <img className="h-100" src={foodSelect[0]} alt=""></img>
        </div>
        <div className="reload-item">
          {/* 加購 */}
          <img className="h-100" src={itemSelect[0]} alt=""></img>
        </div>
        <div className="reload-film">
          {/* 加購:電影 */}
          <img className="h-100" src={filmSelect[0]} alt=""></img>
        </div>
      </div>
    );
  }
  useEffect(() => {
    getItemsDataFromServer();
    getOrderedDataFromServer(u_id, s_id);
    getPictureDataFromServer();
  }, []);

  return orders.map((value) => {
    return (
      <Link key={value.o_id}>
        <div className="order d-flex align-self-center justify-content-between mx-auto">
          {/* 從資料庫串接圖片 */}
          {value.prime === 4 ? (
            <img
              className="carts-order-image"
              src={`http://localhost:8080/images/pic/event/${
                items.find((element) => element.i_id === value.i_id).img_src
              }`}
              alt=""
            />
          ) : (
            putPicture(value)
          )}

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
