import React, { useState, useEffect } from "react";
import "react-dates/initialize";
import moment from "moment";
import { SingleDatePicker, DayPickerRangeController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "../styles/custom_datepicker.css";

function BnBDateRangePicker(props) {
  const { type } = props;
  const [focused, setFocused] = useState(false);
  const [date, setDate] = useState(moment());

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocusedInput] = useState("startDate");
  // useEffect(() => {
  //   console.log(startDate);
  // }, [startDate]);
  // useEffect(() => {
  //   console.log(date);
  // }, [date]);

  //內建用來禁止今日以前的日期被選
  function isBeforeDay(a, b) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;

    const aYear = a.year();
    const aMonth = a.month();

    const bYear = b.year();
    const bMonth = b.month();

    const isSameYear = aYear === bYear;
    const isSameMonth = aMonth === bMonth;

    if (isSameYear && isSameMonth) return a.date() < b.date();
    if (isSameYear) return aMonth < bMonth;
    return aYear < bYear;
  }
  //內建用來禁止今日以前的日期被選
  function isInclusivelyAfterDay(a, b) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
    return !isBeforeDay(a, b);
  }

  let display;
  switch (type) {
    case "RWD":
      display = (
        <SingleDatePicker
          date={date} // momentPropTypes.momentObj or null
          onDateChange={(date) => setDate(date)} // PropTypes.func.isRequired
          focused={focused} // PropTypes.bool
          onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
          id="RWDdate" // PropTypes.string.isRequired,
          openDirection="up"
          numberOfMonths={1}
          showDefaultInputIcon
          hideKeyboardShortcutsPanel={true}
          block
          noBorder
        />
      );
      break;
    case "home":
      display = (
        <SingleDatePicker
          date={date} // momentPropTypes.momentObj or null
          onDateChange={(date) => {
            setDate(date);
            sessionStorage.setItem(
              "quickStartDate",
              moment(date).format("YYYY-MM-DD")
            );
          }} // PropTypes.func.isRequired
          focused={focused} // PropTypes.bool
          onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
          id="RWDdate" // PropTypes.string.isRequired,
          name="quickdate"
          openDirection="up"
          numberOfMonths={1}
          // showDefaultInputIcon
          hideKeyboardShortcutsPanel={true}
          block
          noBorder
        />
      );
      break;
    default:
      display = (
        <>
          <DayPickerRangeController
            startDate={startDate} // momentPropTypes.momentObj or null,
            endDate={endDate} // momentPropTypes.momentObj or null,
            onDatesChange={({ startDate, endDate }) => {
              setStartDate(startDate);
              setEndDate(endDate);
            }} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={(focusedInput) => {
              setFocusedInput(focusedInput);
            }} // PropTypes.func.isRequired,
            initialVisibleMonth={() => moment()} // PropTypes.func or null,
            numberOfMonths={1}
            endDateOffset={(day) => day}
            daySize={50}
            hideKeyboardShortcutsPanel={true}
            showInput
            isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
          />
          <input
            type="text"
            value={moment(startDate).format("YYYY-MM-DD")}
            onDatesChange={({ startDate }) => {
              setStartDate(startDate);
            }}
            name="PCdate"
            readOnly
            className="d-none"
          />
        </>
      );
  }

  // const display = RWD ? (
  //   <SingleDatePicker
  //     date={date} // momentPropTypes.momentObj or null
  //     onDateChange={(date) => setDate(date)} // PropTypes.func.isRequired
  //     focused={focused} // PropTypes.bool
  //     onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
  //     id="RWDdate" // PropTypes.string.isRequired,
  //     name="RWDdate"
  //     openDirection="up"
  //     numberOfMonths={1}
  //     showDefaultInputIcon
  //     hideKeyboardShortcutsPanel={true}
  //     block
  //     noBorder
  //   />
  // ) : (
  //   <>
  //     <DayPickerRangeController
  //       startDate={startDate} // momentPropTypes.momentObj or null,
  //       endDate={endDate} // momentPropTypes.momentObj or null,
  //       onDatesChange={({ startDate, endDate }) => {
  //         setStartDate(startDate);
  //         setEndDate(endDate);
  //       }} // PropTypes.func.isRequired,
  //       focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
  //       onFocusChange={(focusedInput) => {
  //         setFocusedInput(focusedInput);
  //       }} // PropTypes.func.isRequired,
  //       initialVisibleMonth={() => moment()} // PropTypes.func or null,
  //       numberOfMonths={1}
  //       endDateOffset={(day) => day}
  //       daySize={50}
  //       hideKeyboardShortcutsPanel={true}
  //       showInput
  //       isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
  //     />
  //     <input
  //       type="text"
  //       value={moment(startDate).format("YYYY/MM/DD")}
  //       onDatesChange={({ startDate }) => {
  //         setStartDate(startDate);
  //       }}
  //       name="PCdate"
  //       readOnly
  //       className="d-none"
  //     />
  //   </>
  // );

  return <>{display}</>;
}
export default BnBDateRangePicker;
