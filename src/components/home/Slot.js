import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { HiUsers } from "react-icons/hi";
import { FaRegCalendarAlt, FaSearch } from "react-icons/fa";
import BnBDateRangePicker from "../BnBDateRangePicker";

function Slot(props) {
  const [persons, setPersons] = useState(1);

  return (
    <div className="rwd-calendar home-search d-flex align-items-center justify-content-center row m-0 p-0">
      <FaRegCalendarAlt className="col px-2" size="2rem" />
      <div className="col-5 m-0 p-0 pe-2">
        <BnBDateRangePicker type={"home"} />
      </div>
      <HiUsers className="col p-0" size="2rem" />
      <div className="col-5 m-0 p-0 pe-2">
        <input
          className="home-input h4 ps-3"
          placeholder="人數"
          min="1"
          max="8"
          type="number"
          value={persons}
          onChange={(e) => {
            setPersons(e.target.value);
          }}
        />
      </div>
      <FaSearch
        className="search-icon col m-0"
        size="1.5rem"
        onClick={() => {
          props.history.push({
            pathname: "/customized",
            state: { quickPersons: persons },
          });
        }}
      />
    </div>
  );
}

export default withRouter(Slot);
