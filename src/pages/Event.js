import React, { useEffect, useState } from "react";
import "../styles/event.css";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import EventQuickList from "../components/event/EventQuickList";
import EventSection from "../components/event/EventSection";

function Event(props) {
  const newLoad = false;
  const isDay = props.isDay;
  const [load, setLoad] = useState(newLoad);

  function loadPage() {
    setLoad(true);
  }

  useEffect(() => {
    document.title = "山角行 - 當地活動";
    loadPage();
  }, []);

  useEffect(() => {
    document.title = "山角行 - 當地活動";
    // jquery程式碼寫在這裡
    // $(window).on("load resize", function () {
    if ($(window).width() <= 1047) {
      // 快速選單
      $(".quick-list").addClass("fixed-bottom");
    } else {
      $(".quick-list").removeClass("fixed-bottom");
    }
    // });
    console.log(load);
  }, [load]);

  return (
    <>
      {/* <!--! header --> */}
      <header>
        {/* <!--! banner --> */}
        <div className="banner">
          <img
            className="cover-fit w-100"
            src={
              isDay
                ? "http://localhost:8080/images/banner/light/event.png"
                : "http://localhost:8080/images/banner/dark/event.png"
            }
            alt=""
          />
        </div>
        <EventQuickList />
      </header>
      {/* <!--! main --> */}
      <main>
        <EventSection auth={props.auth} />
      </main>
    </>
  );
}

export default withRouter(Event);
