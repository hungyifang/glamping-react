import React from "react";
import "../styles/home.css";
import lottie from "lottie-web";
import { FaSearch } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { GoFlame } from "react-icons/go";

function Home() {
  let animationContainer = React.createRef();

  React.useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/home.json", // JSON文件路徑
    });
    anim.setSpeed(0.8);
    anim.playSegments([150, 450], false);
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
          卡片
        </section>
        <section id="wizard">
          <div className="row wizard-banner">
            <figure className="col-4">
              <img src="" alt="" />
            </figure>
            <div className="col-8 d-flex justify-content-center align-items-center">
              <div className="text-center">
                <h3 className="h3 mb-3">
                  露營不知道何從下手，美好的露營自己選擇
                </h3>
                <h2 className="h2">快來測試屬於你最適合的露營</h2>
              </div>
            </div>
          </div>

          <div className="wizard-form">
            <div className="wizard-text d-flex align-items-center">
              <label for="customRange3" class="form-label">
                Example range
              </label>
              <input
                type="range"
                class="form-range"
                min="0"
                max="5"
                step="0.5"
                id="customRange3"
              />
            </div>
            <div className="wizard-tips d-flex justify-content-center align-items-end">
              <h3 className="h2">
                不是你喜歡的結果？試試<a href="/">量身打造自己的行程</a>
              </h3>
            </div>
          </div>
        </section>

        <section id="museum" className="bg-pri">
          <h1 className="title">客製化分享區</h1>
        </section>
      </main>
    </>
  );
}

export default Home;
