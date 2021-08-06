import React, { useState, useEffect } from "react";
import { MdLocationOn, MdRestore } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegHeart, FaHeart } from "react-icons/fa";
const axios = require("axios").default;

function EventDetailTitle(props) {
  const auth = props.auth;
  const [login, setLogin] = useState(false);
  const [fav, setFav] = useState(false);

  async function clickFav() {
    if (!auth) {
      props.setMsg("請先登入會員！");
      return props.setIsOpen(true);
    }
    let switchFav = !fav;
    let u_id = props.u_id;
    let i_id = props.i_id;
    setFav(switchFav);
    let result = await axios.get("http://localhost:8080/api/event/fav", {
      params: {
        u_id: u_id,
        i_id: i_id,
        fav: switchFav,
      },
    });
    console.log(result);
  }

  async function checkFav() {
    //有登入的話確認狀態
    // console.log(login);
    // console.log(auth);
    if (!login) return setFav(false);
    let result = await axios.get("http://localhost:8080/api/event/checkFav", {
      params: {
        i_id: props.i_id,
        u_id: props.u_id,
      },
    });
    parseInt(result.data) === 1 ? setFav(true) : setFav(false);
    console.log(result.data);
  }

  function switchLevel(value) {
    switch (value) {
      case 1:
        return "海邊區";
      case 2:
        return "草原區";
      case 3:
        return "深山區";
      default:
        return "不分區";
    }
  }

  //登入後重新整理重抓資料
  function checkAuth() {
    let curAuth = props.auth;
    setLogin(curAuth);
  }
  function recheckFav() {
    let curFav = props.fav;
    setFav(curFav);
  }

  useEffect(() => {
    checkAuth();
    checkFav();
  }, []);

  useEffect(() => {
    checkFav();
  }, [login]);

  useEffect(() => {
    if (!auth) setFav(false);
  }, [auth]);

  // useEffect(() => {
  //   console.log(login);
  // }, [login]);
  // useEffect(() => {
  //   console.log(fav);
  // }, [fav]);

  const display = (
    <div className="container rwd-title">
      <section className="event-title">
        <div className="col d-flex align-items-center">
          <div
            className={
              fav === true
                ? "d-flex align-items-end h1 event-name favorite"
                : "d-flex align-items-end h1 event-name"
            }
          >
            {props.title}
            {fav === true ? (
              <FaHeart title="取消我的最愛" onClick={() => clickFav()} />
            ) : (
              <FaRegHeart title="加入我的最愛" onClick={() => clickFav()} />
            )}
          </div>
        </div>
        <div className="col d-flex event-subtitle align-items-center h4">
          <MdLocationOn />
          <span>{switchLevel(props.level)}</span>
          <AiOutlineClockCircle />
          <span>活動時間&nbsp;{props.time}</span>
          <MdRestore />
          <span>7&nbsp;天前免費取消</span>
        </div>
        <div className="col d-flex event-title-text h4">
          <span>{props.subtitle}</span>
        </div>
      </section>
    </div>
  );
  return <>{display}</>;
}
export default EventDetailTitle;
