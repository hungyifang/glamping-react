import React, { useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { addDays } from "date-fns";
import format from "date-fns/format";
import CustomizedLeft from "../components/customized/CustomizedLeft";
import CustomizedRight from "../components/customized/CustomizedRight";
import CustomizedLink from "../components/customized/CustomizedLink";
import CustomizedMainPicture from "../components/customized/CustomizedMainPicture";
import CustomizedDate from "../components/customized/CustomizedDate";
import "../styles/customized.css";

// icon
import { BsFillPersonPlusFill } from "react-icons/bs";
import { MdRoom } from "react-icons/md";
import { GiCampingTent } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { GiCampfire } from "react-icons/gi";

function Customized(props) {
  const isDay = props.isDay;
  const location = useLocation();
  const [u_id, setU_id] = useState("");
  // select狀態
  const [inputPerson, setInputPerson] = useState("1");
  const [inputWhere, setInputWhere] = useState("");
  const [inputStyle, setInputStyle] = useState("");
  const [inputStylePrice, setInputStylePrice] = useState("");
  const [inputFood, setInputFood] = useState("");
  const [inputFoodPrice, setInputFoodPrice] = useState("");
  const [inputItem, setInputItem] = useState("");
  const [inputItemPrice, setInputItemPrice] = useState("");
  // 入住天數
  const [day, setDay] = useState(1);
  // 入退房日
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  // 海邊區是否當天客滿狀態
  const [seaDisabled, setSeaDisabled] = useState("");
  // 草原區是否當天客滿狀態
  const [grassDisabled, setGrassDisabled] = useState("");
  // 山頂區是否當天客滿狀態
  const [topDisabled, setTopDisabled] = useState("");
  // 人數最大限制
  const [maxPerson, setMaxPerson] = useState("");
  // 所有item資料
  const [itemData, setItemData] = useState([]);
  // 設定天氣狀態資料
  const [weatherData, setWeatherData] = useState(["first"]);
  const [temperatureData, setTemperatureData] = useState(["first"]);
  const [weatherPicture, setWeatherPicture] = useState("");
  // 存放在localstorage
  const [ordered, setOrdered] = useState([
    {
      u_id: "",
      total: 0,
      level: 0,
      person: 0,
      start: "",
      end: "",
      s_id: 10,
      prime: 3,
      title: "",
      message: "",
    },
  ]);
  const [ordered_detail, setOrdered_detail] = useState([
    { o_id: 0, i_id: 0, price: 0, quantity: 0, ship_date: "" },
  ]);
  const [rooms, setRooms] = useState([{ level: "", occupy: "" }]);
  const [total, setTotal] = useState(0);
  // 最後一筆o_id
  const [lastO_id, setLastO_id] = useState(0);

  // 彈出的文字客製化
  const displayLevel = (
    <>
      <CustomizedLeft i_id={inputWhere} data={itemData} linkId="linkLevel" />
    </>
  );
  const displayStyle = (
    <>
      <CustomizedRight i_id={inputStyle} data={itemData} linkId="linkStyle" />
    </>
  );
  const displayFood = (
    <>
      <CustomizedLeft i_id={inputFood} data={itemData} linkId="linkFood" />
    </>
  );
  const displayItem = (
    <>
      <CustomizedRight i_id={inputItem} data={itemData} linkId="linkItem" />
    </>
  );
  // 設定u_id
  function u_idSet() {
    if (localStorage.getItem("u_id")) {
      setU_id(localStorage.getItem("u_id"));
    } else {
      setU_id("");
    }
  }
  // 設定傳給ordered的資料
  function putOrderedData() {
    // 設定title
    let levelItem = itemData.filter((e) => e.i_id == inputWhere);
    let styleItem = itemData.filter((e) => e.i_id == inputStyle);
    let foodItem = itemData.filter((e) => e.i_id == inputFood);
    let itemItem = itemData.filter((e) => e.i_id == inputItem);
    let levelTitle = inputWhere ? levelItem[0].title : "";
    let styleTitle = inputStyle ? styleItem[0].title : "";
    let foodTitle = inputFood ? foodItem[0].title : "";
    let itemTitle = inputItem ? itemItem[0].title : "";
    setOrdered([
      {
        u_id: u_id,
        total: total,
        level: inputWhere,
        person: inputPerson,
        start: startDay,
        end: endDay,
        s_id: 98,
        prime: 3,
        title: `${levelTitle} | ${styleTitle} | ${foodTitle} | ${itemTitle}`,
        message: "",
      },
    ]);
    // ${levelItem[0].title} | ${styleItem[0].title} | ${foodItem[0].title} | ${itemItem[0].title}
  }
  // 設定給ordered_detail的資料
  function putOrdered_detailData() {
    // 處理時間陣列
    let dayCount = (new Date(endDay) - new Date(startDay)) / 86400000;
    let targetDayArray = [];
    for (let i = 0; i < dayCount; i++) {
      targetDayArray.push(addDays(new Date(startDay), i));
    }
    let targetDayArrayFormat = [];
    targetDayArray.forEach((e) => {
      targetDayArrayFormat.push(format(e, "Y" + "-" + "MM" + "-" + "dd"));
    });

    // 處理item陣列
    let itemArray = [];
    itemArray.push({
      item: inputStyle,
      price: inputStylePrice,
      quantity: Math.round(inputPerson / 4),
    });
    itemArray.push({
      item: inputFood,
      price: inputFoodPrice,
      quantity: inputPerson,
    });
    itemArray.push({
      item: inputItem,
      price: inputItemPrice,
      quantity: inputPerson,
    });
    // console.log(itemArray);
    // 全部資料放進ordered_detail裡
    let ordered_detailData = [];
    for (let i = 0; i < targetDayArrayFormat.length; i++) {
      for (let j = 0; j < itemArray.length; j++) {
        ordered_detailData.push({
          i_id: itemArray[j].item,
          price: itemArray[j].price,
          quantity: itemArray[j].quantity,
          ship_date: targetDayArrayFormat[i],
        });
      }
    }
    setOrdered_detail(ordered_detailData);
  }

  // 設定給rooms的資料
  function putRoomsData() {
    // 處理時間陣列
    let dayCount = (new Date(endDay) - new Date(startDay)) / 86400000;
    let targetDayArray = [];
    for (let i = 0; i < dayCount; i++) {
      targetDayArray.push(addDays(new Date(startDay), i));
    }
    let targetDayArrayFormat = [];
    targetDayArray.forEach((e) => {
      targetDayArrayFormat.push(format(e, "Y" + "-" + "MM" + "-" + "dd"));
    });
    let roomsData = [];
    for (let i = 0; i < targetDayArrayFormat.length; i++) {
      roomsData.push({ level: inputWhere, occupy: targetDayArrayFormat[i] });
    }
    setRooms(roomsData);
  }
  // 把資料放進ordered資料表
  async function putOrderedToSever() {
    // console.log(JSON.stringify(ordered));
    const url = "http://localhost:8080/api/orders";
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(ordered),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const response = await fetch(request);
  }
  // 把orderdetail 放進 localstorage
  function putOrderedToStorage() {
    if (localStorage.getItem("orderData")) {
      let orderData = [];
      orderData = JSON.parse(localStorage.getItem("orderData"));
      let newOrdered = (ordered[0].o_id = JSON.parse(
        localStorage.getItem("lastO_id")
      ));
      orderData.push(ordered[0]);

      localStorage.setItem("orderData", JSON.stringify(orderData));
    } else {
      let orderData = [];
      let newOrdered = (ordered[0].o_id = JSON.parse(
        localStorage.getItem("lastO_id")
      ));
      orderData.push(JSON.stringify(ordered));
      localStorage.setItem("orderData", orderData);
    }
  }
  // 拿o_id
  async function getO_idFromSever() {
    const url = "http://localhost:8080/api/orders/o_id";
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
    // 暫時放在localstorage裡
    // console.log(data[0].o_id);
    await setLastO_id(data[0].o_id);
    // console.log(lastO_id);
    localStorage.setItem("lastO_id", data[0].o_id);
  }
  // 把資料放進ordere_detaild資料表
  async function putOrdered_detailToSever() {
    // 把o_id裝進去
    for (let i = 0; i < ordered_detail.length; i++) {
      ordered_detail[i].o_id = localStorage.getItem("lastO_id");
    }
    // console.log((ordered_detail));

    const url = "http://localhost:8080/api/orders/detail";
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(ordered_detail),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    // console.log(data);
  }
  // 把資料放進rooms資料表
  async function putRoomsToSever() {
    // 把o_id裝進去
    for (let i = 0; i < rooms.length; i++) {
      rooms[i].o_id = localStorage.getItem("lastO_id");
    }
    // console.log(JSON.stringify(rooms));
    const url = "http://localhost:8080/api/rooms/rooms";
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(rooms),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
  }
  // 抓取氣象局天氣狀況API
  async function getWeatherFromSever() {
    // 連接的伺服器資料網址

    const url =
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-075?Authorization=CWB-966FCCA4-3734-4551-8081-56B12F9AD20B&limit=2&elementName=Wx";
    const request = new Request(url, {
      method: "GET",
    });

    const response = await fetch(request);
    const data = await response.json();
    //處理資料
    const locationData = data.records.locations[0];
    const targetData = locationData.location[1].weatherElement[0];
    const weatherData = targetData.time;
    setWeatherData(weatherData);
  }
  // 抓取氣象局氣溫狀況API
  async function getTemperatureFromSever() {
    // 連接的伺服器資料網址

    const url =
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-075?Authorization=CWB-966FCCA4-3734-4551-8081-56B12F9AD20B&limit=2&elementName=Td";
    const request = new Request(url, {
      method: "GET",
    });

    const response = await fetch(request);
    const data = await response.json();
    //處理資料
    const locationData = data.records.locations[0];
    const targetData = locationData.location[1].weatherElement[0];
    const weatherData = targetData.time;
    setTemperatureData(weatherData);
  }

  // 抓取item資料
  async function getItemFromServer() {
    // 連接的伺服器資料網址
    const url = "http://localhost:8080/api/items/item";

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
    console.log(data);

    setItemData(data);

    // // 抓出選項的價錢
    let styleData = data.filter((e) => e.i_id === Number(inputStyle));
    let stylePrice = Number(inputStyle) ? styleData[0].price : 0;
    setInputStylePrice(stylePrice);

    let foodData = data.filter((e) => e.i_id === Number(inputFood));
    let foodPrice = Number(inputFood) ? foodData[0].price : 0;
    setInputFoodPrice(foodPrice);

    let itemData = data.filter((e) => e.i_id === Number(inputItem));
    let itemPrice = Number(inputItem) ? itemData[0].price : 0;
    setInputItemPrice(itemPrice);
    // 設定總價錢
    setTotal(
      (stylePrice * Math.ceil(inputPerson / 4) +
        (foodPrice + itemPrice) * [inputPerson]) *
        day
    );
  }
  async function getDataFromServer() {
    // 從套裝過來的o_id預設值
    // 連接的伺服器資料網址
    const url = "http://localhost:8080/api/customized";

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
    // 篩選套裝卡片的o_id
    let o_id = location.state.o_id;
    console.log(o_id);
    let selectData = data.filter((e) => e.o_id === o_id);
    // console.log(selectData)
    // 設定預設值
    setInputStyle(selectData[0].i_id);
    setInputFood(selectData[1].i_id);
    setInputItem(selectData[2].i_id);

    // 設定地區預設值
    // setInputWhere(selectData[0].level);
  }

  // 一開始就會開始載入資料
  useEffect(() => {
    document.title = "山角行 - 客製行程";
    getWeatherFromSever();
    getTemperatureFromSever();
    u_idSet();
    // 拿到item資料
    getItemFromServer();
    // 從套裝近來拿到o_id才會拿到預設值
    // console.log(location.state);

    // let o_id = location.state;
    if (location.state && location.state.o_id) {
      getDataFromServer();
    }
    if (location.state && location.state.quickPersons) {
      setInputPerson(location.state.quickPersons);
      // setStartDay(sessionStorage.getItem("quickStartDate"));
      setStartDay(addDays(new Date(), 3));
    }
  }, []);
  // 客製化選項有改動就執行價格統計
  useEffect(() => {
    getItemFromServer();
    putOrderedData();
    putOrdered_detailData();
    putRoomsData();
  }, [
    inputStyle,
    inputFood,
    inputItem,
    inputPerson,
    inputWhere,
    day,
    endDay,
    total,
  ]);

  return (
    <>
      {/* <!-- banner --> */}
      <header className="customized-banner">
        <img
          src={
            isDay
              ? "http://localhost:8080/images/banner/light/camping.svg"
              : "http://localhost:8080/images/banner/dark/camping.svg"
          }
          alt="客製化banner"
        />
      </header>

      {/* <!-- 客製化頁面 --> */}
      <div className="container-fluid p-0">
        <main className="cus-main">
          {/* <!-- 標題 --> */}
          <div className="cus-main-title">客製化行程</div>
          {/* <!-- 紙娃娃系統 --> */}
          <div className="cus-main-wrapper">
            {/* <!-- 紙娃娃介面 --> */}
            <CustomizedMainPicture
              inputPerson={inputPerson}
              inputWhere={inputWhere}
              inputStyle={inputStyle}
              inputFood={inputFood}
              inputItem={inputItem}
              weatherPicture={weatherPicture}
            />

            {/* <!-- RWD 選項介面 --> */}
            <div className="customized-rwd p-0">
              {/* <!-- 按鈕部分 --> */}
              <div className="d-flex justify-content-end">
                <div className="customized-rwd-btn">分享</div>
                <div className="customized-rwd-btn">下載</div>
              </div>
              {/* <!-- 日期選項 --> */}
              <div className="customized-rwd-date text-center my-2">
                這裡是日期系統
              </div>
              {/* <!-- 客製選項 --> */}
              <div>
                <div className="customized-rwd-option my-3">人數</div>
                <div className="customized-rwd-option my-3">地點</div>
                <div className="d-flex">
                  <div className="customized-rwd-option my-3 me-2 w-100">
                    地點
                  </div>
                  <div className="customized-rwd-option my-3 ms-2 w-100">
                    地點
                  </div>
                </div>
                <div className="customized-rwd-option my-3">餐點</div>
                <div className="customized-rwd-option my-3">露營用品</div>
              </div>
              {/* <!-- 確認按鈕 --> */}
              <div className="customized-rwd-determine">
                <p>確認</p>
              </div>
            </div>
            {/* 網頁版頁面 */}
            {/* <!-- 紙娃娃日期系統 --> */}
            <div className="ml-10 mt-3 cus-date-wrapper d-grid">
              {/* <!-- 紙娃娃月曆 --> */}
              <CustomizedDate
                weatherData={weatherData}
                temperatureData={temperatureData}
                setWeatherPicture={setWeatherPicture}
                setDay={setDay}
                day={day}
                setTopDisabled={setTopDisabled}
                setSeaDisabled={setSeaDisabled}
                setGrassDisabled={setGrassDisabled}
                setMaxPerson={setMaxPerson}
                inputWhere={inputWhere}
                setInputPerson={setInputPerson}
                setInputWhere={setInputWhere}
                setStartDay={setStartDay}
                setEndDay={setEndDay}
                quickStartDate={sessionStorage.getItem("quickStartDate")}
              />
            </div>
            {/* <!-- 客製化區 --> */}
            <div className="main-customized col mt-3">
              {/* <!-- 客製化選單 --> */}
              <div className="d-grid customized-input">
                {/* 人數 */}
                <div className="d-flex align-items-center mb-5">
                  <label>
                    <BsFillPersonPlusFill />
                  </label>
                  <input
                    className="cus-form-input col ms-3"
                    type="number"
                    max={maxPerson}
                    min="1"
                    onKeyDown="return false"
                    value={inputPerson}
                    onChange={(e) => {
                      setInputPerson(e.target.value);
                      if (inputPerson < 1) {
                        setInputPerson(1);
                      }
                    }}
                  ></input>
                </div>

                {/* 地點 */}
                <div className="d-flex align-items-center mb-5">
                  <label>
                    <MdRoom />
                  </label>
                  <select
                    className="cus-form-select col ms-3 mt-0"
                    value={inputWhere}
                    onChange={(e) => {
                      setInputWhere(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden selected>
                      選擇地區
                    </option>
                    <option value="56" disabled={seaDisabled}>
                      海邊區
                    </option>
                    <option value="57" disabled={grassDisabled}>
                      草原區
                    </option>
                    <option value="58" disabled={topDisabled}>
                      山頂區
                    </option>
                  </select>
                </div>

                {/* 帳篷樣式 */}
                <div className="d-flex align-items-center mb-5">
                  <label>
                    <GiCampingTent />
                  </label>
                  <select
                    className="cus-form-select col ms-3 mt-0"
                    value={inputStyle}
                    onChange={(e) => {
                      setInputStyle(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden selected>
                      帳篷樣式
                    </option>
                    <option value="9">標準帳</option>
                    <option value="8">蒙古包</option>
                    <option value="13">印地安帳</option>
                    <option value="12">露營車</option>
                  </select>
                </div>

                {/* 餐點 */}
                <div className="d-flex align-items-center mb-5">
                  <label>
                    <IoFastFood />
                  </label>
                  <select
                    className="cus-form-select col ms-3 mt-0"
                    value={inputFood}
                    onChange={(e) => {
                      setInputFood(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden selected>
                      美食選擇
                    </option>
                    <option value="14">自助餐</option>
                    <option value="15">BBQ</option>
                    <option value="16">炕窯</option>
                  </select>
                </div>

                {/* 加購 */}
                <div className="d-flex align-items-center mb-5">
                  <label>
                    <GiCampfire />
                  </label>

                  <select
                    className="cus-form-select col ms-3 mt-0"
                    value={inputItem}
                    onChange={(e) => {
                      setInputItem(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden selected>
                      娛樂用品
                    </option>
                    <option value="18">安全營火</option>
                    <option value="19">露天電影</option>
                    <option value="17">露營燈</option>
                  </select>
                </div>
              </div>
              <div className="cus-determine">
                <p className="cus-determine-total">總計 : {total} 元</p>
                <Link
                  onClick={async (e) => {
                    if ((startDay === endDay) | (inputWhere === "")) {
                      e.preventDefault();
                      alert("日期或地點填寫請正確喔");
                    } else {
                      localStorage.removeItem("lastO_id");
                      await putOrderedToSever();
                      await getO_idFromSever();
                      await putOrdered_detailToSever();
                      await putRoomsToSever();
                      putOrderedToStorage();
                      props.history.push({
                        pathname: "/carts",
                        state: itemData,
                      });
                    }
                  }}
                >
                  <p className="cus-determine-submit">確認</p>
                </Link>
              </div>
            </div>
          </div>
          <CustomizedLink
            inputWhere={inputWhere}
            inputStyle={inputStyle}
            inputFood={inputFood}
            inputItem={inputItem}
          />
        </main>
      </div>
      <div class="container-fluid cus-item-wrapper">
        {/* 彈出文字敘述 */}
        {inputWhere && displayLevel}
        {inputStyle && displayStyle}
        {inputFood && displayFood}
        {inputItem && displayItem}
      </div>
    </>
  );
}

export default withRouter(Customized);
