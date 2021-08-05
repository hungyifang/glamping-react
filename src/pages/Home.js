import React, { createRef, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import lottie from "lottie-web";
import BnBDateRangePicker from "../components/BnBDateRangePicker";
import EventCardForHome from "../components/event/EventCardForHome";
import Wizard from "../components/home/Wizard";
import "../styles/home.css";
import { FaRegCalendarAlt, FaSearch } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { GoFlame } from "react-icons/go";
import { HiOutlineMinus, HiOutlinePlus, HiUsers } from "react-icons/hi";

function Home(props) {
  const { auth } = props;
  const [persons, setPersons] = useState(1);

  let animationContainer = createRef();

  useEffect(() => {
    const hero = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/home.json", // JSON文件路徑
    });
    hero.setSpeed(0.8);
    hero.playSegments([150, 450], false);
  }, []);

  return (
    <>
      <main className="container-fluid p-0">
        <section className="hero bg-deep">
          <div ref={animationContainer}>
            <div className="rwd-calendar home-search d-flex align-items-center justify-content-center row m-0 p-0">
              <FaRegCalendarAlt className="col px-2" size="2rem" />
              <div className="col-5 m-0 p-0 pe-2">
                <BnBDateRangePicker type={"home"} />
              </div>
              <HiUsers className="col p-0" size="2rem" />
              <div className="col-5 m-0 p-0 pe-2">
                <input
                  className="home-input h4"
                  placeholder="人數"
                  min="1"
                  max="8"
                  type="number"
                  value={persons}
                  onChange={(e) => {
                    setPersons(e.target.value);
                  }}
                />
              </div>
              <FaSearch
                className="search-icon col m-0"
                size="1.5rem"
                onClick={() => {
                  props.history.push({
                    pathname: "/customized",
                    state: { quickPersons: persons },
                  });
                }}
              />
            </div>
          </div>
        </section>

        <section id="trending">
          <div className="row section-title m-0">
            <div className="col-4">
              <h1 className="title">熱門</h1>
            </div>
            <div className="col-4 row tabs">
              <a className="col tabs-item" href="/">
                <AiOutlineSchedule size="2rem" className="me-2" />
                套裝行程
              </a>
              <a className="col tabs-item" href="/">
                <GoFlame size="2rem" className="me-2" />
                當地活動
              </a>
            </div>
            <div className="col-4"></div>
          </div>
          <div className="d-flex suggest-card-wrapper-forhome row mx-1 mb-5">
            <EventCardForHome auth={false} suggestion={true} />
          </div>
        </section>

        <section id="wizard">
          <Wizard auth={auth} />
        </section>

        {/* <section id="museum" className="bg-pri">
          <h1 className="title">客製化分享區</h1>
        </section> */}
      </main>
    </>
  );
}

export default withRouter(Home);
