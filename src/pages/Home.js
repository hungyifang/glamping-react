import React, { createRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import lottie from "lottie-web";
import Slot from "../components/home/Slot";
import EventCardForHome from "../components/event/EventCardForHome";
import Wizard from "../components/home/Wizard";
import "../styles/home.css";
import { AiOutlineSchedule } from "react-icons/ai";
import { GoFlame } from "react-icons/go";

function Home(props) {
  const { auth, isDay, virgin, setVirgin } = props;

  const virginAnimationContainer = createRef();
  const dayHeroAnimationContainer = createRef();
  const nightHeroAnimationContainer = createRef();

  const home = (
    <main className="container-fluid p-0">
      <section className="hero bg-deep">
        <Slot />
        <div ref={dayHeroAnimationContainer} className="hero-ani-day"></div>
        <div ref={nightHeroAnimationContainer} className="hero-ani-night"></div>
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
        <Wizard auth={auth} isDay={isDay} />
      </section>

      {/* <section id="museum" className="bg-pri">
      <h1 className="title">客製化分享區</h1>
    </section> */}
    </main>
  );
  const splashing = (
    <div ref={virginAnimationContainer} className="splashing"></div>
  );

  useEffect(() => {
    document.title = "山角行";

    if (virgin) {
      const splashing = lottie.loadAnimation({
        container: virginAnimationContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "/animations/splashing.json",
      });
      splashing.setSpeed(0.8);
      splashing.addEventListener("complete", () => {
        splashing.destroy();
        setVirgin(false);
        sessionStorage.setItem("virgin", false);
      });
    } else if (isDay) {
      const hero = lottie.loadAnimation({
        container: dayHeroAnimationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/animations/hero_day.json",
      });
      hero.setSpeed(0.8);
      hero.playSegments([150, 450], false);
    } else {
      const hero = lottie.loadAnimation({
        container: nightHeroAnimationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/animations/hero_night.json",
      });
      hero.setSpeed(0.8);
      hero.playSegments([150, 450], false);
    }
  }, [
    isDay,
    virgin,
    setVirgin,
    virginAnimationContainer,
    dayHeroAnimationContainer,
    nightHeroAnimationContainer,
  ]);

  return virgin ? splashing : home;
}

export default withRouter(Home);
