import React, { useEffect } from "react";
import "../styles/event.css";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import EventQuickList from "../components/event/EventQuickList";
import EventSection from "../components/event/EventSection";

function Event() {
  useEffect(() => {
    // jquery程式碼寫在這裡
    $(window).on("load resize", function () {
      if ($(window).width() <= 1043) {
        // 快速選單
        $(".quick-list").addClass("fixed-bottom");
      } else {
        $(".quick-list").removeClass("fixed-bottom");
      }
    });
  }, []);

  return (
    <>
      {/* <!--! header --> */}
      <header>
        {/* <!--! banner --> */}
        <div className="banner">
          <img
            className="cover-fit w-100"
            src="..//images/Illustrator/banner+footer/當地活動-日.png"
            alt=""
          />
        </div>
        <EventQuickList />
      </header>
      {/* <!--! main --> */}
      <main>
        <EventSection />
      </main>
    </>
  );
}

export default withRouter(Event);
