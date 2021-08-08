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
import MsgModal from "../components/event/MsgModal";
const axios = require("axios").default;

function EventDetail(props) {
  const { auth, setNewCartsNum, isDay } = props;
  const i_id = +props.match.params.i_id;
  // console.log(i_id);
  // console.log(props.location);
  const u_id = localStorage.getItem("u_id");
  const [login, setLogin] = useState(false);
  const [events, setEvents] = useState([]);
  const [load, setLoad] = useState(false);
  const [parentStar, setParentStar] = useState(0);
  const [msg, setMsg] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function loadEvent() {
    let result = await axios.get("http://localhost:8080/api/event/detail", {
      params: {
        i_id: i_id,
      },
    });
    result = result.data[0];
    document.title = `山角行 - ${result[0].title}`;
    setEvents(result);
    setLoad(true);
  }

  //登入後重新整理重抓資料
  function checkAuth() {
    let curAuth = props.auth;
    setLogin(curAuth);
  }

  function handleScrollBug() {
    $(window).on("load", function () {
      window.scrollTo(0, 0);
    });
  }

  useEffect(() => {
    checkAuth();
    loadEvent();
    handleScrollBug();
    // RWD旅客評論
    $(window).on("load resize", function () {
      if ($("body").width() <= 1043) {
        $(".rwd-review").addClass("container-fluid").removeClass("container");
      } else {
        $(".rwd-review").removeClass("container-fluid").addClass("container");
      }
    });
  }, []);

  useEffect(() => {
    loadEvent();
  }, [i_id]);

  useEffect(() => {
    handleScrollBug();
  }, [load]);

  const display = events.map((result, index) => {
    return (
      <>
        <header>
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
            level={result.level}
            title={result.title}
            subtitle={result.subtitle}
            time={result.time}
            setIsOpen={setIsOpen}
            setMsg={setMsg}
          />
          {/* 手機板快速選單 */}
          <EventDetailQuickListRWD />
          <div className="container-fluid p-0">
            {/* 手機板日曆 */}
            <EventDetailCalendarRWD
              setNewCartsNum={setNewCartsNum}
              price={result.price}
              title={result.title}
              time={result.time}
              level={result.level}
              src={result.img_src}
              i_id={i_id}
              auth={auth}
              key={index}
              setIsOpen={setIsOpen}
              setMsg={setMsg}
            />
          </div>
          <div className="container-fluid event-description">
            <section className="container">
              <div className="row justify-content-center" id="itemInfo">
                <EventDetailInfo article={result.article} />
                {/* 電腦版日曆 */}
                <EventDetailCalendar
                  setNewCartsNum={setNewCartsNum}
                  price={result.price}
                  sales={result.sales}
                  title={result.title}
                  level={result.level}
                  time={result.time}
                  src={result.img_src}
                  i_id={i_id}
                  auth={auth}
                  setParentStar={setParentStar}
                  setIsOpen={setIsOpen}
                  setMsg={setMsg}
                  key={index + 1}
                  isDay={isDay}
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
          <EventDetailReview
            i_id={i_id}
            parentStar={parentStar}
            key={i_id}
            isDay={isDay}
          />
          <EventDetailSuggestion auth={auth} i_id={i_id} />
        </main>
        <MsgModal
          modalIsOpen={modalIsOpen}
          onRequestClose={closeModal}
          text={msg}
        />
      </>
    );
  });
  return <>{display}</>;
}

export default withRouter(EventDetail);
