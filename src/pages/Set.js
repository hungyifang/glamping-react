import React, { useState, useEffect } from "react";
import "../index.css";
import "../styles/set.css";
import SetCard from "../components/set/SetCard";
//  滑動效果
import SwipeableViews from "react-swipeable-views";
import { FaCrown } from "react-icons/fa";
import { MdCheckBox } from "react-icons/md";
import { FaMountain } from "react-icons/fa";
import { MdToys } from "react-icons/md";

function Set(props) {
  const isDay = props.isDay;
  // 設定套裝資料
  const [prodcuts, setProducts] = useState([[], [], [], [], []]);

  // 抓取資料
  async function getItemFromServer() {
    // 連接的伺服器資料網址
    const url = "http://localhost:8080/api/items";

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();
    // 篩選奢華露營
    let luxurious = data.filter((e) => e.c_id === 3);
    // 篩選超值露營
    let CostEffective = data.filter((e) => e.c_id === 4);
    // 篩選深度露營
    let deep = data.filter((e) => e.c_id === 6);
    // 篩選限定露營
    let limited = data.filter((e) => e.c_id === 7);

    // 設定資料
    let product = [luxurious, CostEffective, deep, limited];

    setProducts(product);
    // console.log(product);
  }
  // 一開始就會開始載入資料
  useEffect(() => {
    document.title = `山角行 - 套裝行程`;
    getItemFromServer();
  }, []);

  return (
    <>
      {/* <!-- banner --> */}
      <header>
        <img
          src={
            isDay
              ? "http://localhost:8080/images/banner/light/trip.svg"
              : "http://localhost:8080/images/banner/dark/trip.svg"
          }
          alt="套裝行程banner"
        />
      </header>
      {/* <!-- 快速選單 --> */}
      <div className="d-flex ">
        <ul className="set-select d-flex p-0 align-items-center container-fluid justify-content-center">
          <a href="#select-1">
            <li className="set-select-li">
              <div>
                {/* <i className="ic-crown"></i> */}
                <FaCrown size="1.7rem" className="me-2" />
              </div>
              <div>奢華露營</div>
            </li>
          </a>
          <a href="#select-2">
            <li className="set-select-li">
              <div>
                {/* <i className="ic-flower"></i> */}
                <MdCheckBox size="1.7rem" className="me-2" />
              </div>
              <div>超值露營</div>
            </li>
          </a>
          <a href="#select-3">
            <li className="set-select-li">
              <div>
                {/* <i className="ic-diving"></i> */}
                <FaMountain size="1.7rem" className="me-2" />
              </div>
              <div>深度露營</div>
            </li>
          </a>
          <a href="#select-4">
            <li className="set-select-li">
              <div>
                {/* <i className="ic-maple"></i> */}
                <MdToys size="1.7rem" className="me-2" />
              </div>
              <div>季節限定</div>
            </li>
          </a>
        </ul>
      </div>

      {/* <!-- 行程卡片組 --> */}
      <article className="set-article">
        <main className="container-fluid set-man-box">
          <div className="set-main" id="select-1">
            <h1 className="set-main-tittle">奢華露營</h1>
            <h5>網帥網美的最愛，絕世美照的蜜基地</h5>
            {/* <!-- 卡片 --> */}
            <div className="d-flex row">
              {/* 手機板滑動 */}
              <div className="set-slide-display">
                <SwipeableViews
                  enableMouseEvents
                  className="set-slide-root set-slide-Container"
                >
                  {prodcuts[0].map((e, i) => (
                    <SetCard
                      key={e.id}
                      title={e.title}
                      subtitle={e.subtitle}
                      content={e.article}
                      o_id={e.o_id}
                      img_src={e.img_src}
                    />
                  ))}
                </SwipeableViews>
              </div>
              {/* 網頁版卡片組 */}
              <div className=" d-flex row justify-content-center set-web-display">
                {prodcuts[0].map((e, i) => (
                  <SetCard
                    key={e.id}
                    title={e.title}
                    subtitle={e.subtitle}
                    content={e.article}
                    o_id={e.o_id}
                    img_src={e.img_src}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="set-main" id="select-2">
            <h1 className="set-main-tittle">超值露營</h1>
            <h5>懶人露營好簡單，帳棚都幫你搭好了</h5>
            {/* <!-- 卡片 --> */}
            <div className="d-flex row ">
              {/* 手機板滑動 */}
              <div className="set-slide-display">
                <SwipeableViews
                  enableMouseEvents
                  className="set-slide-root set-slide-Container"
                >
                  {prodcuts[1].map((e, i) => (
                    <SetCard
                      key={e.id}
                      title={e.title}
                      subtitle={e.subtitle}
                      content={e.article}
                      o_id={e.o_id}
                      img_src={e.img_src}
                    />
                  ))}
                </SwipeableViews>
              </div>
              {/* 網頁版卡片組 */}
              <div className=" d-flex row justify-content-center set-web-display">
                {prodcuts[1].map((e, i) => (
                  <SetCard
                    key={e.id}
                    title={e.title}
                    subtitle={e.subtitle}
                    content={e.article}
                    o_id={e.o_id}
                    img_src={e.img_src}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="set-main" id="select-3">
            <h1 className="set-main-tittle">深度露營</h1>
            <h5>想要擁抱大自然，野營的瀟灑我懂</h5>
            {/* <!-- 卡片 --> */}
            <div className="d-flex row ">
              {/* 手機板滑動 */}
              <div className="set-slide-display">
                <SwipeableViews
                  enableMouseEvents
                  className="set-slide-root set-slide-Container"
                >
                  {prodcuts[2].map((e, i) => (
                    <SetCard
                      key={e.id}
                      title={e.title}
                      subtitle={e.subtitle}
                      content={e.article}
                      o_id={e.o_id}
                      img_src={e.img_src}
                    />
                  ))}
                </SwipeableViews>
              </div>
              {/* 網頁版卡片組 */}
              <div className=" d-flex row justify-content-center set-web-display">
                {prodcuts[2].map((e, i) => (
                  <SetCard
                    key={e.id}
                    title={e.title}
                    subtitle={e.subtitle}
                    content={e.article}
                    o_id={e.o_id}
                    img_src={e.img_src}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="set-main" id="select-4">
            <h1 className="set-main-tittle">季節限定</h1>
            <h5>依照季節不同限定露營活動，錯過就再等一年</h5>
            {/* <!-- 卡片 --> */}
            <div className="d-flex row ">
              {/* 手機板滑動 */}
              <div className="set-slide-display">
                <SwipeableViews
                  enableMouseEvents
                  className="set-slide-root set-slide-Container"
                >
                  {prodcuts[3].map((e, i) => (
                    <SetCard
                      key={e.id}
                      title={e.title}
                      subtitle={e.subtitle}
                      content={e.article}
                      o_id={e.o_id}
                      img_src={e.img_src}
                    />
                  ))}
                </SwipeableViews>
              </div>
              {/* 網頁版卡片組 */}
              <div className=" d-flex row justify-content-center set-web-display">
                {prodcuts[3].map((e, i) => (
                  <SetCard
                    key={e.id}
                    title={e.title}
                    subtitle={e.subtitle}
                    content={e.article}
                    o_id={e.o_id}
                    img_src={e.img_src}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </article>
    </>
  );
}

export default Set;
