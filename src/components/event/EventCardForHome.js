import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdStar, MdLocationOn } from "react-icons/md";
import EventCardReview from "./EventCardReview";
import moment from "moment";
const axios = require("axios").default;

function EventCardForHome(props) {
  const auth = props.auth;
  const u_id = localStorage.getItem("u_id");
  const [login, setLogin] = useState(false);
  const [events, setEvents] = useState([]);
  const [hotTags, setHotTags] = useState([]);
  const [newTags, setNewTags] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [degRank, setDegRank] = useState([]);

  //從API SERVER抓從section得到s_id的i_id資料
  async function loadEventCard() {
    let c_id = props.c_id;
    if (!props.c_id) c_id = "23,24";
    let result = await axios.get("http://localhost:8080/api/event/card", {
      params: {
        c_id: c_id,
      },
    });
    result = result.data[0];
    setEvents(result);
  }
  //抓賣最好3個
  async function loadHotTag() {
    let c_id = props.c_id;
    if (!props.c_id) c_id = "23,24";
    let hotRank = await axios.get(
      "http://localhost:8080/api/event/card/rank/hot",
      {
        params: {
          c_id: c_id,
          orderBy: "sales",
        },
      }
    );
    hotRank = hotRank.data[0];
    setHotTags(hotRank);
  }
  //抓依生成時間排序
  async function loadNewTag() {
    let c_id = props.c_id;
    if (!props.c_id) c_id = "23,24";
    let newRank = await axios.get(
      "http://localhost:8080/api/event/card/rank/new",
      {
        params: {
          c_id: c_id,
          orderBy: "created",
        },
      }
    );
    newRank = newRank.data[0];
    setNewTags(newRank);
  }
  //取使用者 deg_1~3
  async function loadUserDeg() {
    if (!auth) return "未登入";
    // let u_id = props.u_id;
    // let u_id = 1;
    let userDeg = await axios.get(
      "http://localhost:8080/api/event/card/userDeg",
      {
        params: {
          u_id: u_id,
        },
      }
    );
    userDeg = userDeg.data[0];
    setDegrees(userDeg);
  }
  function countAbs() {
    //抓出所有商品之deg及排除此頁顯示之i_id
    const eventDeg = events
      .map((item, index) => {
        return {
          i_id: item.i_id,
          deg_1: item.deg_1,
          deg_2: item.deg_2,
          deg_3: item.deg_3,
        };
      })
      .filter((item, index) => {
        return parseInt(item.i_id) !== parseInt(props.i_id);
      });
    if (degrees.length > 0) {
      const deltaDeg = eventDeg.map((degree, index) => {
        const abValue =
          Math.abs(degree.deg_1 - degrees[0].deg_1) +
          Math.abs(degree.deg_2 - degrees[0].deg_2) +
          Math.abs(degree.deg_3 - degrees[0].deg_3);
        return { i_id: degree.i_id, abValue: abValue };
      });

      //將使用者與商品之 deg_1~3 絕對值做升冪排序,取前 4
      const DegRank = deltaDeg
        .sort((a, b) => {
          if (a.abValue > b.abValue) {
            return 1;
          } else {
            return -1;
          }
        })
        .slice(0, 4)
        .map((item, index) => {
          return item.i_id;
        });

      setDegRank(DegRank);
    }
  }
  //更新Auth狀態
  function checkAuth() {
    let curAuth = props.auth;
    setLogin(curAuth);
  }

  /*eslint-disable */
  useEffect(() => {
    checkAuth();
    loadEventCard();
    loadNewTag();
    loadHotTag();
    loadUserDeg();
  }, []);

  useEffect(() => {
    loadUserDeg();
  }, [login]);

  useEffect(() => {
    countAbs();
  }, [degrees]);
  /*eslint-enable */

  // useEffect(() => {
  //   console.log(login);
  // }, [login]);
  // useEffect(() => {
  //   console.log(degRank);
  // }, [degRank]);
  // useEffect(() => {
  //   console.log(degrees);
  // }, [degrees]);

  //處理 loadNewTag 得到資料,找 7 日內 最新生成前三 i_id
  function dateDiff(date1, date2) {
    const date1utc = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const date2utc = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );
    return (date1utc - date2utc) / (1000 * 60 * 60 * 24);
  }
  const new3 = newTags.map((created, index) => {
    let today = new Date(moment().format("YYYY-MM-DD"));
    let createDate = new Date(created.created);
    return created.i_id + "," + dateDiff(today, createDate);
  });
  const new3in7 = new3
    .filter((date) => {
      return date.split(",")[1] <= 7;
    })
    .map((idAndDay) => {
      return parseInt(idAndDay.split(",")[0]);
    });
  //找 sales 排名前三 i_id
  const top3 = hotTags.map((sales, index) => {
    return sales.i_id;
  });

  //從全商品中篩選上面deg得到之前4名i_id
  const moreSuggestion = events.filter((item, index) => {
    return degRank.includes(item.i_id);
  });
  // console.log(moreSuggestion);
  //推薦卡片,沒登入:用 sales 排行做卡片 有登入:比較 deg 絕對值
  let card = [];
  if (!auth) props.suggestion ? (card = hotTags) : (card = events);
  if (auth)
    degrees.length > 0 && props.suggestion
      ? (card = moreSuggestion)
      : (card = events);
  const display = card.map((card, index) => {
    //轉換資料庫數據 level 數字 to 區域
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
    function switchTag(i_id, newRank, hotRank) {
      if (newRank.includes(i_id) === true && hotRank.includes(i_id) === true) {
        return "position-relative card-tag-hot card-tag-new";
      } else if (newRank.includes(i_id) === true) {
        return "position-relative card-tag-new";
      } else if (hotRank.includes(i_id) === true) {
        return "position-relative card-tag-hot";
      } else {
        return "position-relative";
      }
    }
    const linkTo = "/event-detail/" + card.i_id;
    return (
      <div className="col-3 m-0">
        <div className="event-card-forhome">
          <Link
            to={{
              pathname: linkTo,
              state: {
                data: card,
              },
            }}
            alt=""
            className=""
            key={card.i_id}
          >
            <div className="event-card-forhome-img">
              <img
                className="event-image img-fluid w-100 h-100"
                src={`http://localhost:8080/images/pic/event/${card.img_src}`}
                alt="活動圖片"
              />
            </div>
            <div className="container mt-2 mb-4">
              <div className="row ">
                <div className="col-auto mx-auto">
                  <div className="h2 card-title d-flex flex-column">
                    {/* 符合前三字串的就 + card tag 可以同時有 hot + new */}
                    <div className={switchTag(card.i_id, new3in7, top3)}>
                      {card.title}
                    </div>
                    <div className="card-content d-flex align-items-center">
                      <MdStar />
                      <EventCardReview i_id={card.i_id} sales={card.sales} />
                    </div>
                    <div className="card-content d-flex align-items-center">
                      <MdLocationOn />
                      <span className="event-place">
                        {switchLevel(card.level)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h4 event-price text-end">NT ${card.price}</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  });

  return <>{display}</>;
}

export default EventCardForHome;
