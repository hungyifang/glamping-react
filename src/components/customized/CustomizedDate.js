import { addDays } from "date-fns";
import format from "date-fns/format";
import { zhTW } from "date-fns/locale";
import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

// icon
import { FaTemperatureHigh } from "react-icons/fa";

function CustomizedDate(props) {
  const {
    weatherData,
    temperatureData,
    setWeatherPicture,
    setDay,
    day,
    setTopDisabled,
    setGrassDisabled,
    setSeaDisabled,
    setMaxPerson,
    inputWhere,
    setInputPerson,
    setInputWhere,
    setStartDay,
    setEndDay,
    quickStartDate,
  } = props;

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [weatherState, setWeatherState] = useState("");
  const [temperatureState, setTemperatureState] = useState("");
  const [maxRoom, setMaxRoom] = useState([]);
  const [maxSeaDayArray, setMaxSeaDayArray] = useState([]);
  const [maxGrassDayArray, setGrassTopDayArray] = useState([]);
  const [maxTopDayArray, setMaxTopDayArray] = useState([]);

  const [state, setState] = useState([
    {
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  // display元素
  const icon = (
    <>
      <FaTemperatureHigh />
    </>
  );
  const displayDay = <>&nbsp;共{day}天</>;

  // 拿客滿資訊
  async function maxRoomFromServer() {
    // 連接的伺服器資料網址
    const url = "http://localhost:8080/api/rooms";

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    let maxDay = data.filter((e) => e.count === 6);
    let blockedDay = [];
    for (let i = 0; i < maxDay.length; i++) {
      blockedDay.push(maxDay[i].occupy);
    }
    // console.log(blockedDay);
    setMaxRoom(blockedDay);
  }
  // 拿海邊訂房資訊
  async function seaRoomFromServer() {
    // 連接的伺服器資料網址
    const url = "http://localhost:8080/api/rooms/sea";

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    // console.log(data);
    // 處理當天level已經客滿狀況
    let maxSea = data.filter((e) => e.count === 2);
    let maxSeaArray = [];
    for (let i = 0; i < maxSea.length; i++) {
      maxSeaArray.push(maxSea[i].occupy);
    }
    // 設定月曆block
    setMaxSeaDayArray(maxSeaArray);
    let startDay = format(state[0].startDate, "Y" + "-" + "MM" + "-" + "dd");
    let endDay = format(state[0].endDate, "Y" + "-" + "MM" + "-" + "dd");
    let dayCount = (new Date(endDay) - new Date(startDay)) / 86400000;
    let targetDayArray = [];
    for (let i = 0; i < dayCount; i++) {
      targetDayArray.push(addDays(new Date(startDay), i));
    }
    let targetDayArrayFormat = [];
    targetDayArray.forEach((e) => {
      targetDayArrayFormat.push(format(e, "Y" + "-" + "MM" + "-" + "dd"));
    });

    for (let i = 0; i < targetDayArrayFormat.length; i++) {
      if (maxSeaArray.includes(targetDayArrayFormat[i])) {
        if (inputWhere === "36") {
          setInputWhere("");
        }
        setSeaDisabled("disabled");
        break;
      } else if (i === targetDayArrayFormat.length - 1) {
        setSeaDisabled("");
      } else {
        continue;
      }
    }

    // 處理當天租走一塊營地
    let one = data.filter((e) => e.count === 1);
    let oneArray = [];
    for (let i = 0; i < one.length; i++) {
      oneArray.push(one[i].occupy);
    }
    // 變動是海邊才設定
    if (inputWhere === "36") {
      for (let i = 0; i < targetDayArrayFormat.length; i++) {
        if (oneArray.includes(targetDayArrayFormat[i]) && inputWhere === "36") {
          setMaxPerson("4");
          setInputPerson("1");
          break;
        } else if (i === targetDayArrayFormat.length - 1) {
          setMaxPerson("8");
        } else {
          continue;
        }
      }
    }
  }
  // 拿草原訂房資訊
  async function grassRoomFromServer() {
    // 連接的伺服器資料網址
    const url = "http://localhost:8080/api/rooms/grass";

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    // console.log(data);
    // 處理當天level已經客滿狀況
    let maxGrass = data.filter((e) => e.count === 2);
    let maxGrassArray = [];
    for (let i = 0; i < maxGrass.length; i++) {
      maxGrassArray.push(maxGrass[i].occupy);
    }
    // 設定月曆block
    setGrassTopDayArray(maxGrassArray);
    let startDay = format(state[0].startDate, "Y" + "-" + "MM" + "-" + "dd");
    let endDay = format(state[0].endDate, "Y" + "-" + "MM" + "-" + "dd");
    let dayCount = (new Date(endDay) - new Date(startDay)) / 86400000;
    let targetDayArray = [];
    for (let i = 0; i < dayCount; i++) {
      targetDayArray.push(addDays(new Date(startDay), i));
    }
    let targetDayArrayFormat = [];
    targetDayArray.forEach((e) => {
      targetDayArrayFormat.push(format(e, "Y" + "-" + "MM" + "-" + "dd"));
    });

    for (let i = 0; i < targetDayArrayFormat.length; i++) {
      if (maxGrassArray.includes(targetDayArrayFormat[i])) {
        if (inputWhere === "37") {
          setInputWhere("");
        }
        setGrassDisabled("disabled");
        break;
      } else if (i === targetDayArrayFormat.length - 1) {
        setGrassDisabled("");
      } else {
        continue;
      }
    }

    // 處理當天租走一塊營地
    let one = data.filter((e) => e.count === 1);
    let oneArray = [];
    for (let i = 0; i < one.length; i++) {
      oneArray.push(one[i].occupy);
    }
    // 變動是草原才設定
    if (inputWhere === "37") {
      for (let i = 0; i < targetDayArrayFormat.length; i++) {
        if (oneArray.includes(targetDayArrayFormat[i]) && inputWhere === "37") {
          setMaxPerson("4");
          setInputPerson("1");
          break;
        } else if (i === targetDayArrayFormat.length - 1) {
          setMaxPerson("8");
        } else {
          continue;
        }
      }
    }
  }
  // 拿山頂訂房資訊
  async function topRoomFromServer() {
    // 連接的伺服器資料網址
    const url = "http://localhost:8080/api/rooms/top";

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    // 處理當天level已經客滿狀況
    let maxTop = data.filter((e) => e.count === 2);
    let maxTopArray = [];
    for (let i = 0; i < maxTop.length; i++) {
      maxTopArray.push(maxTop[i].occupy);
    }
    // 設定月曆block
    setMaxTopDayArray(maxTopArray);
    let startDay = format(state[0].startDate, "Y" + "-" + "MM" + "-" + "dd");
    let endDay = format(state[0].endDate, "Y" + "-" + "MM" + "-" + "dd");
    let dayCount = (new Date(endDay) - new Date(startDay)) / 86400000;
    let targetDayArray = [];
    for (let i = 0; i < dayCount; i++) {
      targetDayArray.push(addDays(new Date(startDay), i));
    }
    let targetDayArrayFormat = [];
    targetDayArray.forEach((e) => {
      targetDayArrayFormat.push(format(e, "Y" + "-" + "MM" + "-" + "dd"));
    });

    for (let i = 0; i < targetDayArrayFormat.length; i++) {
      if (maxTopArray.includes(targetDayArrayFormat[i])) {
        if (inputWhere === "38") {
          setInputWhere("");
        }
        setTopDisabled("disabled");
        break;
      } else if (i === targetDayArrayFormat.length - 1) {
        setTopDisabled("");
      } else {
        continue;
      }
    }

    // // 處理當天租走一塊營地
    let one = data.filter((e) => e.count === 1);
    let oneArray = [];
    for (let i = 0; i < one.length; i++) {
      oneArray.push(one[i].occupy);
    }
    // 變動是山頂才設定
    if (inputWhere === "38") {
      for (let i = 0; i < targetDayArrayFormat.length; i++) {
        if (oneArray.includes(targetDayArrayFormat[i]) && inputWhere === "38") {
          setMaxPerson("4");
          setInputPerson("1");
          break;
        } else if (i === targetDayArrayFormat.length - 1) {
          setMaxPerson("8");
        } else {
          continue;
        }
      }
    }
  }
  // 設定氣象局API天氣文字敘述
  let setWeather = function () {
    // 第一次設定空值
    if (weatherData[0] == "first") {
      setWeatherState("");
    } else {
      // 檢查是否一星期內;
      if (addDays(new Date(), 6) > state[0].startDate) {
        let start = state[0].startDate;
        let startTime = format(start, "Y" + "-" + "MM" + "-" + "dd" + " ");
        let time = "06:00:00";
        let targetTime = startTime + time;
        let weatherArray = weatherData.filter((e) => e.startTime == targetTime);
        let temperatureArray = temperatureData.filter(
          (e) => e.startTime == targetTime
        );
        setTemperatureState(temperatureArray[0].elementValue[0].value);
        setWeatherState("入住當天 :" + weatherArray[0].elementValue[0].value);
        let weatherPictureArray = weatherArray[0].elementValue[0].value;
        // 設定天氣圖片狀態給父母元件

        if (weatherPictureArray.includes("多雲時陰")) {
          setWeatherPicture("cloudy");
        } else if (weatherPictureArray.includes("雷雨")) {
          setWeatherPicture("rainy");
        } else if (weatherPictureArray.includes("晴")) {
          setWeatherPicture("sunny");
        }
      } else {
        setWeatherState("遙遠的未來無法預測天氣喔!!");
        setTemperatureState("");
        setWeatherPicture("");
      }
    }
    // console.log(weatherData);
  };
  // 處理客滿日期
  let levelBlock = function () {
    if (inputWhere === "38") {
      setMaxRoom(maxTopDayArray);
    } else if (inputWhere === "37") {
      setMaxRoom(maxGrassDayArray);
    } else if (inputWhere === "36") {
      setMaxRoom(maxSeaDayArray);
    }
  };

  const dayArray = [];

  maxRoom.forEach((e) => {
    dayArray.push(new Date(e));
  });
  // 設定入退房日期文字敘述
  let dateText = function () {
    if (weatherData[0] == "first") {
      setStart("");
      setEnd("");
    } else {
      let start = state[0].startDate;
      if (state[0].endDate) {
        let end = state[0].endDate;
        setEnd(format(end, "Y" + "年" + "M" + "月" + "d" + "日"));
      } else {
        setEnd(format(start, "Y" + "年" + "M" + "月" + "d" + "日"));
      }
      setStart(format(start, "Y" + "年" + "M" + "月" + "d" + "日"));
      // 算出天數

      let startDay = format(state[0].startDate, "Y" + "-" + "MM" + "-" + "dd");
      let endDay = format(state[0].endDate, "Y" + "-" + "MM" + "-" + "dd");

      if ((new Date(endDay) - new Date(startDay)) / 86400000 === 0) {
        setDay(1);
      } else {
        setDay((new Date(endDay) - new Date(startDay)) / 86400000);
      }
    }
  };
  function putOrderedData() {
    let start = state[0].startDate;
    let end = state[0].endDate;
    setStartDay(format(start, "Y" + "-" + "MM" + "-" + "dd"));
    setEndDay(format(end, "Y" + "-" + "MM" + "-" + "dd"));
  }
  // 一開始載入住房資訊
  useEffect(() => {
    maxRoomFromServer();
    if (quickStartDate) {
      setState([
        {
          startDate: new Date(quickStartDate),
          endDate: addDays(new Date(quickStartDate), 1),
          key: "selection",
        },
      ]);
      sessionStorage.removeItem("quickStartDate");
    }
  }, []);

  useEffect(() => {
    setWeather();
    seaRoomFromServer();
    grassRoomFromServer();
    topRoomFromServer();
    dateText();
    levelBlock();
    putOrderedData();
  }, [state, inputWhere]);
  return (
    <>
      <div className="cus-main-date">
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          minDate={addDays(new Date(), 1)}
          maxDate={addDays(new Date(), 30)}
          disabledDates={dayArray}
          scroll={{ enabled: true }}
          locale={zhTW}
        />
      </div>
      <div className="cus-main-date-text ms-3">
        <p>
          入住時間 :{start}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="cus-weather">
            {temperatureState && icon} {temperatureState}{" "}
          </span>
        </p>
        <p className="cus-weather">{weatherState}</p>

        <p>
          退房時間 : {end} {end && displayDay}
        </p>
      </div>
    </>
  );
}

export default CustomizedDate;
