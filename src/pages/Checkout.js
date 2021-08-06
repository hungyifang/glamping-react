import React, { useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";

import OrdersDetail from "../components/checkout/CheckoutDetail";
import "../styles/checkout.css";

function Checkout(props) {
  const orderedData = JSON.parse(localStorage.getItem("orderData"));
  console.log(orderedData);
  // 訂購人資料
  const [inputTextFirst, setInputTextFirst] = useState("");
  const [inputTextLast, setInputTextLast] = useState("");
  const [inputTextNumber, setInputTextNumber] = useState("");
  const [inputTextMail, setInputTextMail] = useState("");
  // 旅客代表資料
  const [inputTextFirstOther, setInputTextFirstOther] = useState("");
  const [inputTextLastOther, setInputTextLastOther] = useState("");
  const [inputTextNumberOther, setInputTextNumberOther] = useState("");
  const [inputTextMailOther, setInputTextMailOther] = useState("");

  const [checkSame, setCheckSame] = useState(false);
  const [textArea, setTextArea] = useState("");
  let resultTotal = 0;
  for (let i = 0; i < orderedData.length; i++) {
    resultTotal += orderedData[i].total;
    // console.log(result)
  }
  const [allTotal, setAllTotal] = useState(0);

  const [newTotal, setNewTotal] = useState(resultTotal);
  const [points, setPoints] = useState(0);
  const [pointGet, setPointGet] = useState(0);
  const [o_idArray, setO_idArray] = useState([]);

  // const [orderedData, setOrderedData] = useState([]);

  // 抓取localstorage o_id資料
  function setO_id() {
    let result = [];
    orderedData.forEach((e) => {
      result.push(e.o_id);
    });
    setO_idArray(result);
    console.log(result)
  }
  // 拿到點數
  async function pointGetFromSever() {
    const url = "http://localhost:8080/api/users";
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
    let userData = data.filter(
      (e) => e.u_id === parseInt(localStorage.getItem("u_id"))
    );
    setPoints(userData[0].points);
    // console.log(points);
  }
  // 設定得到點數
  function pointGetFrom() {
    let result = Math.floor(resultTotal / 100);
    setPointGet(result);
  }
  // 設定總價

  function total() {
    let result = 0;

    for (let i = 0; i < orderedData.length; i++) {
      result += orderedData[i].total;
      setAllTotal(result);
    }
  }
  // 獲得新點數
  function newPoints() {
    setPointGet(Math.floor(newTotal / 100));
  }
  // 更改ordered資料表s_id to 10  及 u_id
  async function changeS_idToSever() {
    let objData = [];
    for (let i = 0; i < o_idArray.length; i++) {
      objData.push({
        o_id: o_idArray[i],
        u_id: parseInt(localStorage.getItem("u_id")),
      });
    }
    console.log(objData);
    const url = "http://localhost:8080/api/rooms/orders/established";
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "PUT",
      body: JSON.stringify(objData),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
  }
  // 更改rooms資料表stay to 1
  async function changeStayToSever() {
    let objData = [];
    for (let i = 0; i < o_idArray.length; i++) {
      objData.push({ o_id: o_idArray[i] });
    }
    console.log(objData);
    const url = "http://localhost:8080/api/rooms/established";
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "PUT",
      body: JSON.stringify(objData),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
  }
  // 更改user資料表point
  async function pointsUpdateToSever() {
    let objData = [
      { u_id: localStorage.getItem("u_id"), points: pointGet + points },
    ];

    console.log(objData);
    const url = "http://localhost:8080/api/points/pointUpdate";
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "PUT",
      body: JSON.stringify(objData),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
  }
  // 清除localstorage
  function clearStorage() {
    localStorage.removeItem("orderData");
  }
  useEffect(() => {
    pointGetFromSever();
    pointGetFrom();
    total();
    setO_id();
  }, []);
  useEffect(() => {
    newPoints();
  }, [newTotal]);

  // console.log(o_idArray);
  return (
    <>
      {/* <!-- RWD標題 --> */}
      <div className="container-fluid g-0">
        <div className="check-rwd-title d-flex justify-content-center align-items-center">
          <p className="h1 check-title-text">確認訂單</p>
        </div>
      </div>
      {/* <!-- 訂單 --> */}
      <div className="container-fluid d-flex flex-column">
        <div className="h3 check-breadcrumb">付款 / 訂購完成</div>
        <div className="check-user-info">
          <p className="h1 check-form-title">訂購人資料</p>
          <form action="" className="check-order-form h4">
            <div className="row check-form-input">
              <div className="col-3 mb-5 mb-sm-3 me-4 d-flex flex-column">
                <label for="" className="check-label-text">
                  姓氏
                </label>
                <input
                  className="checkout-input"
                  type="text"
                  placeholder=" 姓氏"
                  aria-label="First name"
                  name="First name"
                  value={inputTextFirst}
                  onChange={(e) => {
                    setInputTextFirst(e.target.value);
                  }}
                />
              </div>
              <div className="col-3 mb-sm-3 mb-5 d-flex flex-column">
                <label for="" className="check-label-text">
                  名字
                </label>
                <input
                  className="checkout-input"
                  type="text"
                  placeholder=" 名字"
                  aria-label="Last name"
                  name="Last name"
                  value={inputTextLast}
                  onChange={(e) => {
                    setInputTextLast(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row check-form-input">
              <div className="col-3 mb-5 mb-sm-3 me-4">
                <label for="" className="check-label-text">
                  連絡電話
                </label>
                <input
                  className="checkout-input"
                  type="text"
                  placeholder=" 連絡電話"
                  aria-label="tel"
                  name="tel"
                  value={inputTextNumber}
                  onChange={(e) => {
                    setInputTextNumber(e.target.value);
                  }}
                />
              </div>
              <div className="col-3 mb-5 mb-sm-3">
                <label for="" className="check-label-text">
                  電子郵件
                </label>
                <input
                  className="check-input-mail"
                  type="text"
                  placeholder=" 電子郵件"
                  aria-label="mail"
                  name="mail"
                  value={inputTextMail}
                  onChange={(e) => {
                    setInputTextMail(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="check-user-info">
          <p className="h1 check-form-title">旅客資料</p>
          {/* <OrdersDetail /> */}
          <p className="h3 check-deputy-title">旅客代表人</p>
          <form action="" className="check-order-form h4">
            <div className="row check-form-input">
              <div className="col-3 mb-5 mb-sm-3 me-4 d-flex flex-column mt-sm-3">
                <label for="" className="check-label-text">
                  姓氏
                </label>
                <input
                  className="checkout-input"
                  type="text"
                  placeholder=" 姓氏"
                  aria-label="First name"
                  name="First name"
                  value={inputTextFirstOther}
                  onChange={(e) => {
                    setInputTextFirstOther(e.target.value);
                  }}
                />
              </div>
              <div className="col-3 mb-sm-3 mb-5 d-flex flex-column">
                <label for="" className="check-label-text">
                  名字
                </label>
                <input
                  className="checkout-input"
                  type="text"
                  placeholder=" 名字"
                  aria-label="Last name"
                  name="Last name"
                  value={inputTextLastOther}
                  onChange={(e) => {
                    setInputTextLastOther(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row check-form-input">
              <div className="col-3 mb-5 mb-sm-3 me-4">
                <label for="" className="check-label-text">
                  連絡電話
                </label>
                <input
                  className="checkout-input"
                  type="text"
                  placeholder=" 連絡電話"
                  aria-label="tel"
                  name="tel"
                  value={inputTextNumberOther}
                  onChange={(e) => {
                    setInputTextNumberOther(e.target.value);
                  }}
                />
              </div>
              <div className="col-3 mb-5 mb-sm-3">
                <label for="" className="check-label-text">
                  電子郵件
                </label>
                <input
                  className="check-input-mail"
                  type="text"
                  placeholder=" 電子郵件"
                  aria-label="mail"
                  name="mail"
                  value={inputTextMailOther}
                  onChange={(e) => {
                    setInputTextMailOther(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row">
              <label className="check-check-label" for="">
                <input
                  type="checkbox"
                  checked={checkSame}
                  onChange={(event) => {
                    setCheckSame(event.target.checked);
                    if (!checkSame) {
                      setInputTextFirstOther(inputTextFirst);
                      setInputTextLastOther(inputTextLast);
                      setInputTextNumberOther(inputTextNumber);
                      setInputTextMailOther(inputTextMail);
                    } else {
                      setInputTextFirstOther("");
                      setInputTextLastOther("");
                      setInputTextNumberOther("");
                      setInputTextMailOther("");
                    }
                  }}
                />
                <span>與訂購人相同</span>
              </label>
              <div className="col d-flex justify-content-between mb-5">
                <div className="d-flex flex-column">
                  <label for="" className="">
                    備註
                  </label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    // style="overflow:auto"
                    className="check-comment"
                    value={textArea}
                    onChange={(event) => {
                      setTextArea(event.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="d-flex align-items-end">
                  {/* <button type="submit" className="btn-outline btn-continue">
                    繼續
                  </button> */}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="check-user-info">
          <p className="h1 check-form-title">付款明細</p>
          {orderedData.map((element) => (
            <OrdersDetail key={element.o_id} element={element} />
          ))}

          {/* <!-- 付款 --> */}
          <div className="d-flex justify-content-between flex-md-row flex-sm-column">
            <div className="d-flex flex-sm-column">
              {/* <label for="" className="h3 payment">
                付款方式
              </label>
              <div className="form-check h4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="pay"
                  id=""
                />
                <label className="" for="">
                  信用卡
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="pay"
                  id=""
                />
                <label className="" for="">
                  ATM 轉帳
                </label>
              </div> */}
            </div>
            <div className="d-flex flex-column">
              {/* <label for="" className="h3 payment">
                電子發票、收據
              </label>
              <div className="form-check h4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="receipt"
                  id=""
                />
                <label className="" for="">
                  電子發票
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="receipt"
                  id=""
                />
                <label className="" for="">
                  開立統編 / 抬頭
                </label>
              </div> */}
            </div>
            <div className="d-sm-flex justify-content-sm-between">
              <div className="d-flex flex-column">
                <p className="h3 check-total-info ms-sm-5">總金額</p>
                <p className="h3 check-point-info ms-sm-5">
                  擁有點數({points})
                </p>
              </div>
              <div className="d-flex flex-column d-sm-inline-flex ">
                <p className="h3 check-total-info">TWD {allTotal}</p>
                <button
                  type="submit"
                  className="btn-outline check-btn-userpoint"
                  onClick={() => {
                    if (points !== 0) {
                      setNewTotal(resultTotal - points);
                      setPoints(0);
                    }
                  }}
                >
                  使用點數折抵
                </button>
              </div>
            </div>
          </div>
          <div className="check-line"></div>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column h2">
              <p className="check-subtotal">支付金額</p>
              <p className="check-subtotal">可獲得點數</p>
            </div>
            <div className="d-flex flex-column h2">
              <p className="check-subtotal">TWD {newTotal}</p>
              <p className="check-subtotal">{pointGet}點</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-md-end justify-content-sm-center">
          <p className="check-total h2">{orderedData.length} 件商品合計</p>
          <p className="check-sum h1">TWD {newTotal}</p>
          <button
            type="submit"
            className="btn-action check-btn-checktotal"
            onClick={async () => {
              await changeS_idToSever();
              await changeStayToSever();
              await pointsUpdateToSever();
              await clearStorage();
              props.history.push({
                pathname: "/member/order",
              });
            }}
          >
            確認
          </button>
        </div>
      </div>
    </>
  );
}

export default withRouter(Checkout);
