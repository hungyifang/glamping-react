import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../../index.css";
import "../../styles/home.css";

function Wizard(props) {
  const { auth } = props;
  const u_id = localStorage.getItem("u_id");
  const [isResult, setIsResult] = useState(false);
  const [qa1, setQa1] = useState(5);
  const [qa2, setQa2] = useState(5);
  const [qa3, setQa3] = useState(5);
  const [qa4, setQa4] = useState(5);

  function calcUsersChoice() {
    let deg1 = +qa1;
    let deg2 = +qa4;
    let deg3 = (+qa2 + +qa3) / 2;
    // deg1 舒適、deg2 預算、deg3 氣氛
    let choices = [deg1, deg2, deg3];
    console.log(choices);
    setIsResult(true);
    if (auth) {
      saveUsersChoiceToServer(choices);
    }
  }

  async function saveUsersChoiceToServer(choices) {
    const url = `http://localhost:8080/api/users/choices/${u_id}`;
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify({ choices: choices }),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const msg = await response.json();
      console.log(msg);
    } catch (err) {
      console.error(err);
    }
  }

  const aPlane = (
    <>
      <div className="wizard-result-card mx-3 my-4 row">
        <div className="col-12">
          <h3 className="quiz-text text-start m-2 ms-5 mt-3 h1">
            答案揭曉，你的...
          </h3>
        </div>
        <div className="col row d-flex justify-content-center">
          <h4 className="quiz-text col-12 text-center wizard-number">{qa1}</h4>
          <h4 className="quiz-text col-12 text-center h2">舒適指數</h4>
        </div>
        <div className="col row d-flex justify-content-center">
          <h4 className="quiz-text col-12 text-center wizard-number">{qa4}</h4>
          <h4 className="quiz-text col-12 text-center h2">預算指數</h4>
        </div>
        <div className="col row d-flex justify-content-center">
          <h4 className="quiz-text col-12 text-center wizard-number">
            {(+qa2 + +qa3) / 2}
          </h4>
          <h4 className="quiz-text col-12 text-center h2">氣氛指數</h4>
        </div>
        <div className="col">a</div>
      </div>
      <div className="wizard-tips d-flex justify-content-center align-items-center">
        <h3 className="h2">
          不是你喜歡的結果？試試
          <Link to="/customized" className="">
            量身打造自己的行程
          </Link>
          或
          <Link
            onClick={(e) => {
              e.preventDefault();
              setQa1(5);
              setQa2(5);
              setQa3(5);
              setQa4(5);
              setIsResult(false);
            }}
          >
            再玩一次
          </Link>
        </h3>
      </div>
    </>
  );

  const qPlane = (
    <>
      <Carousel
        className="wizard-carousel px-3 py-4"
        infiniteLoop={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        swipeable={false}
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              className="btn-outline wizard-btn"
            >
              下一題
            </button>
          )
        }
      >
        {/* {quests.map((value, index) => {
      return <WizardQuest quest={value} key={index} />;
    })} */}
        {/* Q1 */}
        <div className="wizard-form">
          <h3 className="quiz-text text-start m-2 ms-5 mt-3">
            你出遊時是要睡到飽，還是行程重要？
          </h3>
          <div className="wizard-form-control row p-0 m-0">
            <div className="col-3">
              <img
                className="p-4"
                src="http://localhost:8080/images/scale/sleep.svg"
                alt="眼罩圖案"
                title="眼罩"
              />
            </div>
            <div className="wizard-form-range col-6 d-flex align-items-center">
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={qa1}
                onChange={(e) => setQa1(e.target.value)}
              />
            </div>
            <div className="col-3">
              <img
                className="p-4"
                src="http://localhost:8080/images/scale/treasure.svg"
                alt="地圖圖案"
                title="地圖"
              />
            </div>
          </div>
          <div className="row p-0 m-0">
            <div className="col-3 quiz-text">
              <h4>睡到飽</h4>
            </div>
            <div className="col-6"></div>
            <div className="col-3 quiz-text">
              <h4>玩到掛</h4>
            </div>
          </div>
        </div>
        {/* Q2 */}
        <div className="wizard-form">
          <h3 className="quiz-text text-start m-2 ms-5 mt-3">
            生病時你要打針還是吃藥？
          </h3>
          <div className="wizard-form-control row p-0 m-0">
            <div className="col-3">
              <img
                className="p-4"
                src="http://localhost:8080/images/scale/az.svg"
                alt="眼罩圖案"
                title="眼罩"
              />
            </div>
            <div className="wizard-form-range col-6 d-flex align-items-center">
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={qa2}
                onChange={(e) => setQa2(e.target.value)}
              />
            </div>
            <div className="col-3">
              <img
                className="p-4"
                src="http://localhost:8080/images/scale/dose.svg"
                alt="地圖圖案"
                title="地圖"
              />
            </div>
          </div>
          <div className="row p-0 m-0">
            <div className="col-3 quiz-text">
              <h4>打針</h4>
            </div>
            <div className="col-6"></div>
            <div className="col-3 quiz-text">
              <h4>吃藥</h4>
            </div>
          </div>
        </div>
        {/* Q3 */}
        <div className="wizard-form">
          <h3 className="quiz-text text-start m-2 ms-5 mt-3">
            平時你喜歡吹自然風，還是電風扇？
          </h3>
          <div className="wizard-form-control row p-0 m-0">
            <div className="col-3">
              <img
                className="p-4"
                src="http://localhost:8080/images/scale/wind.svg"
                alt="眼罩圖案"
                title="眼罩"
              />
            </div>
            <div className="wizard-form-range col-6 d-flex align-items-center">
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={qa3}
                onChange={(e) => setQa3(e.target.value)}
              />
            </div>
            <div className="col-3">
              <img
                className="p-4"
                src="http://localhost:8080/images/scale/fan.svg"
                alt="地圖圖案"
                title="地圖"
              />
            </div>
          </div>
          <div className="row p-0 m-0">
            <div className="col-3 quiz-text">
              <h4>自然風</h4>
            </div>
            <div className="col-6"></div>
            <div className="col-3 quiz-text">
              <h4>電風扇</h4>
            </div>
          </div>
        </div>
        {/* Q4 */}
        <div className="wizard-form">
          <h3 className="quiz-text text-start m-2 ms-5 mt-3">
            你的預算是多少？
          </h3>
          <div className="wizard-form-control row p-0 m-0">
            <div className="col-3">
              <img
                className="p-4"
                src="http://localhost:8080/images/scale/4000.svg"
                alt="眼罩圖案"
                title="眼罩"
              />
            </div>
            <div className="wizard-form-range col-6 d-flex align-items-center">
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={qa4}
                onChange={(e) => setQa4(e.target.value)}
              />
            </div>
            <div className="col-3">
              <img
                className="p-4"
                src="http://localhost:8080/images/scale/8000.svg"
                alt="地圖圖案"
                title="地圖"
              />
            </div>
          </div>
          <div className="row p-0 m-0">
            <div className="col-3 quiz-text">
              <h4>4000 元</h4>
            </div>
            <div className="col-6">
              <button
                className="btn-outline wizard-btn"
                onClick={() => calcUsersChoice()}
              >
                看結果
              </button>
            </div>
            <div className="col-3 quiz-text">
              <h4>8000 元</h4>
            </div>
          </div>
        </div>
      </Carousel>
      <div className="wizard-tips d-flex justify-content-center align-items-center">
        <h3 className="h2">
          不是你喜歡的結果？試試
          <Link to="/customized">量身打造自己的行程</Link>
        </h3>
      </div>
    </>
  );

  return (
    <>
      <div className="row wizard-banner">
        <figure className="col-4 d-flex px-2">
          <img
            src="http://localhost:8080/images/banner/light/scale.svg"
            alt="小測驗橫幅"
            title="風光明媚的營地"
          />
        </figure>
        <div className="col-8 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h3 className="h3 mb-3">
              露營不知道何從下手？美好的露營自己選擇！
            </h3>
            <h2 className="h2">快來找出最適合你的露營</h2>
          </div>
        </div>
      </div>
      <div className="wizard-wizard">{isResult ? aPlane : qPlane}</div>
      {/* <div className="wizard-tips d-flex justify-content-center align-items-center">
        <h3 className="h2">
          不是你喜歡的結果？試試
          <Link to="/customized">量身打造自己的行程</Link>
        </h3>
      </div> */}
    </>
  );
}

export default Wizard;
