import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import BnBDateRangePicker from "../BnBDateRangePicker";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import $ from "jquery";
import moment from "moment";
const axios = require("axios").default;

function EventDetailCalendarRWD(props) {
  const history = useHistory();
  const auth = props.auth;
  const eventStartTime = props.time;
  const i_id = +props.match.params.i_id;
  const u_id = localStorage.getItem("u_id") || "";
  const [population, setPopulation] = useState(1);
  const [upload, setUpload] = useState(false);
  const [goCart, setGoCart] = useState(false);
  const [last_oid, setLast_oid] = useState(0);
  // 要存在 localstorage, 資料庫的資料
  const [ordered, setOrdered] = useState({
    u_id: u_id,
    i_id: i_id,
    total: 0, //props.price X quantity (從此元件拿)
    level: props.level, //props.level
    person: 0, //從此元件拿
    start: "", //從此元件拿 = ship_date
    end: "", //
    s_id: 98, //98=購物車
    prime: 4, //prime = 3 = 客製化 prime = 4 = 活動
    title: props.title, //props.title
    message: "",
  });
  const [ordered_detail, setOrdered_detail] = useState({
    o_id: 0,
    i_id: i_id,
    price: props.price,
    quantity: 0,
    person: 0,
    ship_date: "",
    eventStartTime: eventStartTime,
    title: props.title,
    prime: 4,
    total: 0,
    src: props.src,
  });
  //點擊"加入購物車", 提交表單
  function addCart() {
    let person = population;
    let startDate = moment($("#RWDdate").val()).format("YYYY-MM-DD");
    console.log(startDate);
    let total = person * props.price;
    let newOrdered = {
      ...ordered,
      person: person,
      start: startDate,
      total: total,
    };
    setOrdered(newOrdered);
    let newOrdered_detail = {
      ...ordered_detail,
      quantity: person,
      person: person,
      ship_date: startDate,
      total: total,
    };
    setOrdered_detail(newOrdered_detail);

    setUpload(!upload);
  }
  //表單送資料庫 + 拿 LAST OID
  async function afterAddCart() {
    let getTime_oid = await axios.post(
      "http://localhost:8080/api/event/addCart",
      {
        headers: { "Content-Type": "text/json" },
        data: ordered,
      }
    );
    let o_id = getTime_oid.data.o_id;
    // console.log(o_id);
    setLast_oid(o_id);
  }
  //Ordered_detail 存 localstorage
  function setLocalstorage(data) {
    let orderData = localStorage.getItem("orderData")
      ? JSON.parse(localStorage.getItem("orderData"))
      : [];

    orderData.push(data);
    localStorage.setItem("orderData", JSON.stringify(orderData));
  }
  //Ordered_detail 存 DB
  async function insertOrdered_detail_DB(data) {
    let insertDB = await axios.post(
      "http://localhost:8080/api/event/order-detail",
      {
        headers: { "Content-Type": "text/json" },
        data: data,
      }
    );
  }

  //提交表單(更新ordered)後,送資料庫
  useEffect(() => {
    // console.log(upload);
    afterAddCart();
  }, [upload]);
  useEffect(() => {
    // console.log(ordered);
  }, [ordered]);
  //登入後更新ordered內的u_id
  useEffect(() => {
    let newOrdered = {
      ...ordered,
      u_id: u_id,
    };
    setOrdered(newOrdered);
  }, [auth]);
  useEffect(() => {
    // console.log(last_oid);
    let newOrdered_detail = {
      ...ordered_detail,
      o_id: last_oid,
    };
    if (last_oid === 0) return; //防止初始化狀態輸入
    setOrdered_detail(newOrdered_detail);
    setLocalstorage(newOrdered_detail); //非useState
    insertOrdered_detail_DB(newOrdered_detail);
    if (goCart) history.push("/carts"); //立即訂購前往購物車
    if (!goCart) {
      props.setMsg("加入成功！");
      props.setIsOpen(true);
    }
  }, [last_oid]);
  useEffect(() => {
    // console.log(ordered_detail);
  }, [ordered_detail]);

  return (
    <>
      <div className="rwd-calendar">
        <form id="RWDcalendar">
          <div className="col text-center" id="checkDate">
            選擇日期
          </div>
          <div className="col d-flex justify-content-center align-items-center position-relative">
            <BnBDateRangePicker type={"RWD"} />
          </div>
          <div className="col d-flex justify-content-center align-items-center">
            <div className="position-relative">
              <span className="position-absolute user-icon my-auto">
                <BsFillPersonFill />
              </span>
              <input
                type="number"
                value={population}
                className="population"
                name="population"
                onChange={(e) => {
                  let newPopulation = e.target.value;
                  if (newPopulation < 1) newPopulation = 1;
                  setPopulation(newPopulation);
                }}
              />
              <span className="h1 position-absolute population-counter d-flex align-items-center m-0">
                <HiOutlinePlus
                  onClick={() => {
                    let newPopulation = parseInt(population + 1);
                    setPopulation(newPopulation);
                  }}
                />
                <HiOutlineMinus
                  onClick={() => {
                    let newPopulation = parseInt(population - 1);
                    if (newPopulation < 1) newPopulation = 1;
                    setPopulation(newPopulation);
                  }}
                />
              </span>
            </div>
          </div>
          <div className="col text-end ">
            <div className="position-relative price-wrapper my-2">
              <span className="price position-absolute">
                TWD ${props.price * population}
              </span>
            </div>
          </div>
          <div className="col d-flex justify-content-center align-items-center text-pri btn-calendar mt-4 pb-2">
            <div
              className="btn-outline mx-3 d-flex justify-content-center align-items-center"
              role="button"
              onClick={() => {
                addCart();
              }}
            >
              加入購物車
            </div>
            <div
              className="btn-outline mx-3 d-flex justify-content-center align-items-center"
              role="button"
              onClick={() => {
                addCart();
                setGoCart(true);
              }}
            >
              立即訂購
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default withRouter(EventDetailCalendarRWD);
