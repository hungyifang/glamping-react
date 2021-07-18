import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "react-dates/initialize";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

function BnBDateRangePicker() {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocusedInput] = useState("");

  return (
    <>
      <DateRangePicker
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={(focusedInput) => {
          setFocusedInput(focusedInput);
        }} // PropTypes.func.isRequired,
      />
    </>
  );
}

export default BnBDateRangePicker;
