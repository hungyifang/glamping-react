import React, { createRef, useEffect } from "react";
import lottie from "lottie-web";
import EventCardForHome from "../components/event/EventCardForHome";
import Wizard from "../components/home/Wizard";
import "../styles/home.css";
import { FaSearch } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { GoFlame } from "react-icons/go";

function Home(props) {
  const { auth } = props;
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
            <div className="home-search d-flex align-items-center justify-content-center">
              <input className="home-input h4" placeholder="日期" />
              <input className="home-input h4" placeholder="人數" />
              <FaSearch className="search-icon" size="1.5rem" />
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

        <section id="museum" className="bg-pri">
          <h1 className="title">客製化分享區</h1>
        </section>
      </main>
    </>
  );
}

export default Home;
