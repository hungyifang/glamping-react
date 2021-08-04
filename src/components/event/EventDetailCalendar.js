import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { ReactComponent as HollowStar } from "../star_border.svg";
import { FaRegQuestionCircle } from "react-icons/fa";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import BnBDateRangePicker from "../BnBDateRangePicker";
import $ from "jquery";
const axios = require("axios").default;

function EventDetailCalendar(props) {
  const auth = props.auth;
  const i_id = +props.match.params.i_id;
  const u_id = localStorage.getItem("u_id") || "";
  const [star, setStar] = useState(0);
  const [population, setPopulation] = useState(1);
  const [upload, setUpload] = useState(false);
  // 要存在 localstorage, 資料庫的資料
  const [ordered, setOrdered] = useState({
    u_id: u_id,
    i_id: i_id,
    total: 0, //props.price X quantity (從此元件拿)
    level: props.level, //props.level
    person: 0, //從此元件拿
    start: "", //從此元件拿 = ship_date
    end: props.end, //props.end
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
    ship_date: "",
  });

  //點擊"加入購物車", 提交表單
  function addCart() {
    let person = population;
    let startDtate = $("input[name='PCdate']").val();
    let total = person * props.price;
    let newOrdered = {
      ...ordered,
      person: person,
      start: startDtate,
      total: total,
    };
    setOrdered(newOrdered);
    setUpload(!upload);
  }
  //表單送資料庫
  async function afterAddCart() {
    let getTime_oid = await axios.post(
      "http://localhost:8080/api/event/addCart",
      {
        headers: { "Content-Type": "text/json" },
        data: ordered,
      }
    );
    console.log(getTime_oid);
  }
  // function triggerSubmit(id) {
  //   document.getElementById(id).submit();
  // }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.target);
  // };
  //算星星
  async function loadStar() {
    let result = await axios.get("http://localhost:8080/api/event/review", {
      params: {
        i_id: props.i_id,
      },
    });

    result = result.data[0];
    const stars = result
      .map((review, index) => {
        return review.score;
      })
      .reduce((accu, cur) => {
        return accu + cur;
      }, 0);
    let starAVG = stars / result.length || 0;
    if (Number.isInteger(starAVG) && starAVG !== 0) {
      starAVG = starAVG + ".0";
    }
    starAVG = starAVG.toFixed(1);
    setStar(starAVG);
    props.setParentStar(starAVG);
  }

  useEffect(() => {
    loadStar();
    // $('#PCcalendar').on('submit', function (e) {
    //   e.preventDefault();
    // });
  }, []);
  useEffect(() => {
    loadStar();
  }, [i_id]);
  //提交表單(更新ordered)後,送資料庫
  useEffect(() => {
    afterAddCart();
  }, [upload]);
  useEffect(() => {
    console.log(ordered);
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
    console.log(ordered_detail);
  }, [ordered_detail]);

  return (
    <>
      <div className="col-xl-5 col-6 ms-auto calendar-wrapper">
        <form id="PCcalendar">
          <div className="calendar w-100 mx-auto py-1 pb-4">
            <div className="datePicker">
              <BnBDateRangePicker RWD={false} />
            </div>
            <div className="col d-flex justify-content-center align-items-center my-3 text-pri position-relative">
              <span className="h3 position-absolute d-flex align-items-center population">
                人數
              </span>
              <span className="h1 position-absolute population-counter d-flex align-items-center">
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
              <input
                type="number"
                name="population"
                className="input-population text-pri h3"
                value={population}
                onChange={(e) => {
                  let newPopulation = e.target.value;
                  if (newPopulation < 1) newPopulation = 1;
                  setPopulation(newPopulation);
                }}
              ></input>
            </div>
            <div className="h1 col text-pri price m-0 my-3">
              TWD $ {props.price * population}
            </div>
            <div className="col review d-flex align-items-end text-pri mb-4">
              <span className="h2 m-0 me-2 fw-bold">
                {star === 0 ? <FaRegQuestionCircle /> : star}
              </span>
              <div
                className="star-rate-bg h5 d-block m-0"
                style={{
                  background: `linear-gradient(to right, var(--c-pri) ${
                    star * 20
                  }%, transparent ${star * 20}%)`,
                }}
              >
                <HollowStar />
                <HollowStar />
                <HollowStar />
                <HollowStar />
                <HollowStar />
              </div>
              <span className="h4 m-0 mx-1 align-self-center">
                &nbsp;|&nbsp;&nbsp;已售出&nbsp;&nbsp;{props.sales}
              </span>
            </div>
            <div className="col d-flex justify-content-center align-items-center text-pri btn-calendar">
              <div
                className="btn-outline mx-3 d-flex justify-content-center align-items-center"
                role="button"
                onClick={() => {
                  // triggerSubmit("PCcalendar");
                  addCart();
                }}
              >
                加入購物車
              </div>
              <div
                className="btn-outline mx-3 d-flex justify-content-center align-items-center"
                role="button"
                onClick={() => {
                  // triggerSubmit("PCcalendar");
                }}
              >
                立即訂購
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default withRouter(EventDetailCalendar);
