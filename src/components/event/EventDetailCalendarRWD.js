import React, { useState } from "react";
import BnBDateRangePicker from "../BnBDateRangePicker";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";

function EventDetailCalendarRWD(props) {
  const [population, setPopulation] = useState(1);

  //提交表單
  function triggerSubmit(id) {
    document.getElementById(id).submit();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
  };
  return (
    <>
      <div className="rwd-calendar">
        <form onSubmit={handleSubmit} id="RWDcalendar">
          <div className="col text-center" id="checkDate">
            選擇日期
          </div>
          <div className="col d-flex justify-content-center align-items-center position-relative">
            <BnBDateRangePicker RWD={true} />
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
            <div className="position-relative price-wrapper">
              <span className="price position-absolute">
                TWD ${props.price * population}
              </span>
            </div>
          </div>
          <div className="col d-flex justify-content-center align-items-center text-pri btn-calendar">
            <div
              className="btn-outline mx-3 d-flex justify-content-center align-items-center"
              role="button"
              onClick={() => {
                triggerSubmit("RWDcalendar");
              }}
            >
              加入購物車
            </div>
            <div
              className="btn-outline mx-3 d-flex justify-content-center align-items-center"
              role="button"
              onClick={() => {
                triggerSubmit("RWDcalendar");
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

export default EventDetailCalendarRWD;
