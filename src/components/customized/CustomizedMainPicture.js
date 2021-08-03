import React, { useState, useEffect } from "react";

function CustomizedMainPicture(props) {
  const {
    inputPerson,
    inputWhere,
    inputStyle,
    inputFood,
    inputItem,
    weatherPicture,
  } = props;
  const [level, setLevel] = useState("");
  const [person, setPerson] = useState("");
  const [rv, setRv] = useState("");
  const [style, setStyle] = useState("");
  const [food, setFood] = useState("");
  const [film, setFilm] = useState("");
  const [item, setItem] = useState("");
  const [weather, setWeather] = useState("");
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

    36: "http://localhost:8080/images/postcard/level/1.svg",
    37: "http://localhost:8080/images/postcard/level/2.svg",
    38: "http://localhost:8080/images/postcard/level/3.svg",
    rainy: "http://localhost:8080/images/postcard/weather/rainy.svg",
    cloudy: "http://localhost:8080/images/postcard/weather/cloudy.svg",
    sunny: "http://localhost:8080/images/postcard/weather/sunny.svg",
  };
  // 地點部分
  let setLevelPicture = () => {
    inputWhere
      ? setLevel(selectProducts[inputWhere])
      : setLevel("http://localhost:8080/images/postcard/level/1.svg");
  };
  useEffect(() => {
    setLevelPicture();
  }, [inputWhere]);
  // 人數部分
  let setPersonPicture = () => {
    if (inputPerson > 4) {
      setPerson("http://localhost:8080/images/postcard/human/5.svg");
    } else {
      setPerson(selectProducts[inputPerson]);
    }
  };
  useEffect(() => {
    setPersonPicture();
  }, [inputPerson]);
  // 帳篷樣式
  let setStylePicture = () => {
    if (inputStyle == 12) {
      setRv(selectProducts[inputStyle]);
      setStyle("");
    } else {
      setStyle(selectProducts[inputStyle]);
      setRv("");
    }
  };
  useEffect(() => {
    setStylePicture();
  }, [inputStyle]);
  // 晚餐選擇
  let setFoodPicture = () => {
    setFood(selectProducts[inputFood]);
  };
  useEffect(() => {
    setFoodPicture();
  }, [inputFood]);
  // 加購用品
  let setItemPicture = () => {
    if (inputItem == 19) {
      setFilm(selectProducts[inputItem]);
      setItem("");
    } else {
      setItem(selectProducts[inputItem]);
      setFilm("");
    }
  };
  useEffect(() => {
    setItemPicture();
  }, [inputItem]);
  // 天氣變化
  let setWeatherPicture = () => {
    if (weatherPicture == "rainy") {
      setWeather(selectProducts[weatherPicture]);
    } else if (weatherPicture == "cloudy") {
      setWeather(selectProducts[weatherPicture]);
    } else if (weatherPicture == "sunny") {
      setWeather(selectProducts[weatherPicture]);
    } else {
      setWeather("");
    }
  };
  useEffect(() => {
    setWeatherPicture();
  }, [weatherPicture]);
  return (
    <>
      <div className="cus-main-picture mt-3 p-0">
        {/* 露營地點 */}
        <img className="pic-100 cus-card-level" src={level} alt="" />
        <div className="cus-card-person">
          {/* 露營人數 */}
          <img className="h-100" src={person} alt=""></img>
        </div>
        <div className="cus-card-rv">
          {/* 帳篷樣式:露營車 */}
          <img className="h-100" src={rv} alt=""></img>
        </div>
        <div className="cus-card-style">
          {/* 帳篷樣式 */}
          <img className="h-100" src={style} alt=""></img>
        </div>
        <div className="cus-card-food">
          {/* 晚餐選擇 */}
          <img className="h-100" src={food} alt=""></img>
        </div>
        <div className="cus-card-item">
          {/* 加購 */}
          <img className="h-100" src={item} alt=""></img>
        </div>
        <div className="cus-card-film">
          {/* 加購:電影 */}
          <img className="h-100" src={film} alt=""></img>
        </div>
        <div className="cus-card-weather">
          <img className="h-100" src={weather} alt=""></img>
        </div>
      </div>
    </>
  );
}

export default CustomizedMainPicture;
