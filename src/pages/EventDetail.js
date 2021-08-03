import React, { useState, useEffect } from "react";
import "../styles/event-detail.css";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import EventCarousel from "../components/event/EventCarousel";
import EventDetailTitle from "../components/event/EventDetailTitle";
import EventDetailInfo from "../components/event/EventDetailInfo";
import EventDetailCalendar from "../components/event/EventDetailCalendar";
import EventDetailCalendarRWD from "../components/event/EventDetailCalendarRWD";
import EventDetailQuickListRWD from "../components/event/EventDetailQuickListRWD";
import EventDetailReview from "../components/event/EventDetailReview";
import EventDetailSuggestion from "../components/event/EventDetailSuggestion";
const axios = require("axios").default;

function EventDetail(props) {
  const auth = props.auth;
  const [login, setLogin] = useState(false);
  const [events, setEvents] = useState([]);
  const [fav, setFav] = useState(false);
  const [parentStar, setParentStar] = useState(0);
  const i_id = +props.match.params.i_id;
  const u_id = localStorage.getItem("u_id");
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.target);
  // };

  async function loadEvent() {
    let result = await axios.get("http://localhost:8080/api/event/detail", {
      params: {
        i_id: i_id,
      },
    });
    result = result.data[0];
    setEvents(result);
  }

  //登入後重新整理重抓資料
  function checkAuth() {
    let curAuth = props.auth;
    setLogin(curAuth);
  }

  useEffect(() => {
    checkAuth();
    loadEvent();

    // RWD旅客評論
    $(window).on("load resize", function () {
      if ($("body").width() <= 1043) {
        $(".rwd-review").addClass("container-fluid").removeClass("container");
      } else {
        $(".rwd-review").removeClass("container-fluid").addClass("container");
      }
    });
  }, []);

  // useEffect(() => {
  //   console.log(login);
  //   checkFav();
  // }, [login]);
  // useEffect(() => {
  //   console.log(fav);
  // }, [fav]);

  const display = events.map((result, index) => {
    return (
      <>
        <header key={i_id}>
          <div className="banner-carousel">
            <div className="h3 banner-title col-auto">{result.title}</div>
            <EventCarousel i_id={i_id} />
          </div>
        </header>

        <main>
          <EventDetailTitle
            auth={auth}
            i_id={i_id}
            u_id={u_id}
            fav={fav}
            level={result.level}
            title={result.title}
            subtitle={result.subtitle}
            key={i_id}
          />
          {/* 手機板快速選單 */}
          <EventDetailQuickListRWD />
          <div className="container-fluid p-0">
            {/* 手機板日曆 */}
            <EventDetailCalendarRWD price={result.price} />
          </div>
          <div className="container-fluid event-description">
            <section className="container">
              <div className="row justify-content-center" id="itemInfo">
                <EventDetailInfo article={result.article} />
                {/* 電腦版日曆 */}
                <EventDetailCalendar
                  price={result.price}
                  sales={result.sales}
                  i_id={i_id}
                  setParentStar={setParentStar}
                />
              </div>
              <div className="row" id="warning">
                <div className="col description-warning">
                  <ul className="event-description-content p-0 warning">
                    <li className="h3 description-subtitle">－ 注意事項 －</li>
                    <li>滿 4 人才出團</li>
                    <li>遇豪大雨或打雷取消</li>
                    <li>前一日天氣不佳可能取消</li>
                    <li>請聽從領隊及教練指揮</li>
                    <li>活動中因個人因素無法參與整個行程將不令予退費</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
          {/* 評論小卡 */}
          <EventDetailReview i_id={i_id} parentStar={parentStar} />
          <EventDetailSuggestion auth={auth} i_id={i_id} />
        </main>
      </>
    );
  });
  return <>{display}</>;
}

export default withRouter(EventDetail);
