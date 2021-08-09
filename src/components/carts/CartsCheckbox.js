import React, { useState, useEffect } from "react";

// icon
import { MdFavorite } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import { FaUser, FaRegTrashAlt } from "react-icons/fa";

function CartsCheckbox(props) {
  const { allAgree, value, setCheck, setCheckboxArray, moreDelete } = props;
  const [agree, setAgree] = useState(false);
  // console.log(value)

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
  // 設定全選
  function allCheck() {
    if (allAgree) {
      setAgree(true);
    } else {
      setAgree(false);
      setCheckboxArray([]);
    }
  }
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
    let detailData = data.filter((e) => e.o_id === value.o_id);
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

  useEffect(() => {
    allCheck();
  }, [allAgree]);
  return (
    <>
      <div className="d-flex align-items-center mt-5">
        <input
          className="carts-input"
          type="checkbox"
          checked={agree}
          onChange={(e) => {
            setAgree(e.target.checked);
            setCheck(value.o_id);
          }}
        />
        <div className="carts-order d-flex flex-md-row justify-content-between align-items-md-stretch align-items-sm-start flex-sm-column flex-sm-wrap">
          {value.prime === 4 ? (
            <img
              className="carts-order-image"
              src={`http://localhost:8080/images/pic/event/${value.img_src}`}
              alt=""
            />
          ) : (
            <div className="carts-order-image positionRelative">
              {/* 露營地點 */}
              <div className="reload-level">
                <img
                  className="pic-100"
                  src={selectProducts[value.level]}
                  alt=""
                />
              </div>
              <div className="reload-person">
                {/* 露營人數 */}
                <img
                  className="h-100"
                  src={selectProducts[value.person]}
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
          <div className="d-flex flex-column justify-content-center">
            <p className="h3 carts-order-title">
              {value.prime === 4 ? "當地活動 | " + value.title : value.title}
            </p>
            <p className="h4 carts-order-info d-flex align-items-center">
              <BsClock />
              <span>
                {value.prime === 4
                  ? value.ship_date + "     時間:" + value.eventStartTime
                  : value.start + " ~ " + value.end}
              </span>
              <FaUser />
              <span>人數 X {value.person}</span>
            </p>
          </div>
          <div className="d-flex align-items-end align-self-sm-end">
            <p className="h2 carts-order-price">TWD {value.total}</p>
          </div>
          <div className="carts-order-icon d-flex align-items-center">
            <div
              className="mx-2 carts-delete"
              onClick={() => {
                if (agree) {
                  moreDelete();
                } else {
                  // alert("請勾選後才能刪除喔");
                  props.setMsg("請勾選後才能刪除喔！");
                  props.setIsOpen(true);
                }
              }}
            >
              <FaRegTrashAlt />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartsCheckbox;
