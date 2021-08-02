import React, { useState, useEffect } from "react";
import { ReactComponent as HollowStar } from "../star_border.svg";
import { FaRegQuestionCircle } from "react-icons/fa";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import BnBDateRangePicker from "../BnBDateRangePicker";
import $ from "jquery";
const axios = require("axios").default;

function EventDetailCalendar(props) {
  const [star, setStar] = useState(0);
  const [population, setPopulation] = useState(1);

  //提交表單
  function triggerSubmit(id) {
    document.getElementById(id).submit();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
  };
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
    setStar(starAVG);
    props.setParentStar(starAVG);
  }

  useEffect(() => {
    loadStar();

    // $('#PCcalendar').on('submit', function (e) {
    //   e.preventDefault();
    // });
  }, []);

  return (
    <>
      <div className="col-xl-5 col-6 ms-auto calendar-wrapper">
        <form onSubmit={handleSubmit} id="PCcalendar">
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
                  triggerSubmit("PCcalendar");
                }}
              >
                加入購物車
              </div>
              <div
                className="btn-outline mx-3 d-flex justify-content-center align-items-center"
                role="button"
                onClick={() => {
                  triggerSubmit("PCcalendar");
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

export default EventDetailCalendar;
