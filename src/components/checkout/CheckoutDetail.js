import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BsClock } from "react-icons/bs";

function CheckoutDetail(props) {
  const { element } = props;
  const [style, setStyle] = useState("");
  const [food, setFood] = useState("");
  const [film, setFilm] = useState("");
  const [item, setItem] = useState("");
  const selectProducts = {
    1: "http://localhost:8080/images/postcard/human/1.svg",
    2: "http://localhost:8080/images/postcard/human/2.svg",
    3: "http://localhost:8080/images/postcard/human/3.svg",
    4: "http://localhost:8080/images/postcard/human/4.svg",
    8: "http://localhost:8080/images/postcard/tent/yurt.svg",
    9: "http://localhost:8080/images/postcard/tent/standard.svg",
    12: "http://localhost:8080/images/postcard/tent/rv.svg",
    13: "http://localhost:8080/images/postcard/tent/indi.svg",
    14: "http://localhost:8080/images/postcard/dinner/buffet.svg",
    15: "http://localhost:8080/images/postcard/dinner/bbq.svg",
    16: "http://localhost:8080/images/postcard/dinner/oven.svg",
    17: "http://localhost:8080/images/postcard/toy/lamp.svg",
    18: "http://localhost:8080/images/postcard/toy/fire.svg",
    19: "http://localhost:8080/images/postcard/toy/film.svg",

    56: "http://localhost:8080/images/postcard/level/1.svg",
    57: "http://localhost:8080/images/postcard/level/2.svg",
    58: "http://localhost:8080/images/postcard/level/3.svg",
    rainy: "http://localhost:8080/images/postcard/weather/rainy.svg",
    cloudy: "http://localhost:8080/images/postcard/weather/cloudy.svg",
    sunny: "http://localhost:8080/images/postcard/weather/sunny.svg",
  };
  // 抓取要畫畫的資料
  async function getPictureDataFromServer() {
    // 連接的伺服器資料網址
    const url = "http://localhost:8080/api/items/orderedAndDetail";

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
    // console.log(data);
    let detailData = data.filter((e) => e.o_id === element.o_id);
    console.log(detailData);
    for (let i = 0; i < detailData.length; i++) {
      switch (detailData[i].i_id) {
        case 8:
          setStyle("http://localhost:8080/images/postcard/tent/yurt.svg");
          break;
        case 9:
          setStyle("http://localhost:8080/images/postcard/tent/standard.svg");
          break;
        case 12:
          setStyle("http://localhost:8080/images/postcard/tent/rv.svg");
          break;
        case 13:
          setStyle("http://localhost:8080/images/postcard/tent/indi.svg");
          break;
        case 14:
          setFood("http://localhost:8080/images/postcard/dinner/buffet.svg");
          break;
        case 15:
          setFood("http://localhost:8080/images/postcard/dinner/bbq.svg");
          break;
        case 16:
          setFood("http://localhost:8080/images/postcard/dinner/oven.svg");
          break;
        case 17:
          setItem("http://localhost:8080/images/postcard/toy/lamp.svg");
          break;
        case 18:
          setItem("http://localhost:8080/images/postcard/toy/fire.svg");
          break;
        case 19:
          setFilm("http://localhost:8080/images/postcard/toy/film.svg");
          break;
        default:
          console.log("沒料");
      }
    }
  }
  useEffect(() => {
    getPictureDataFromServer();
  }, []);
  return (
    <>
      <div className="check-order d-flex mt-4 align-items-center">
        {element.prime === 4 ? (
          <img
            className="check-order-image"
            src={`http://localhost:8080/images/pic/event/${element.img_src}`}
            alt=""
          />
        ) : (
          <div className="check-order-image  positionRelative">
            {/* 露營地點 */}
            <div className="reload-level">
              <img
                className="pic-100"
                src={selectProducts[element.level]}
                alt=""
              />
            </div>
            <div className="reload-person">
              {/* 露營人數 */}
              <img
                className="h-100"
                src={selectProducts[element.person]}
                alt=""
              ></img>
            </div>
            <div className="reload-style">
              {/* 帳篷樣式 */}
              <img className="h-100" src={style} alt=""></img>
            </div>
            <div className="reload-food">
              {/* 晚餐選擇 */}
              <img className="h-100" src={food} alt=""></img>
            </div>
            <div className="reload-item">
              {/* 加購 */}
              <img className="h-100" src={item} alt=""></img>
            </div>
            <div className="reload-film">
              {/* 加購:電影 */}
              <img className="h-100" src={film} alt=""></img>
            </div>
          </div>
        )}

        <div className="d-flex flex-column align-items-start justify-content-center align-self-sm-center ">
          <p className="h3 check-order-title m-0">
            {element.prime === 4
              ? "當地活動 | " + element.title
              : element.title}
          </p>
          <p className="h4 check-order-info d-flex flex-column flex-xxl-row align-items-xxl-center justify-content-center">
            <div className="my-2">
              <BsClock />
              <span className="mx-2">
                {element.prime === 4
                  ? element.ship_date + "     時間:" + element.eventStartTime
                  : element.start + " ~ " + element.end}
              </span>
            </div>
            <div className="my-2">
              <FaUser />
              <span className="mx-2">人數 X {element.person}</span>
            </div>
          </p>
          {/* <BsClock /> */}
          {/* <span>
            {element.prime === 4
              ? element.ship_date + "     時間:" + element.eventStartTime
              : element.start + " ~ " + element.end}
          </span>
          <FaUser />
          <span>人數 X {element.person}</span> */}
        </div>
      </div>
    </>
  );
}

export default CheckoutDetail;
