import React, { useState, useEffect } from "react";
import "../styles/event-detail.css";
import $ from "jquery";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { withRouter } from "react-router-dom";

function EventDetail() {
  const [silde, setSlide] = useState([]);
  useEffect(() => {
    // jquery程式碼寫在這裡
    // 旅客評論RWD
    $(window).on("load resize", function () {
      $(".more-review").remove();
      $("hr").remove();
      let moreReview = `<hr />
                    <div class="col d-flex align-items-center justify-content-center more-review">
                        <span class="material-icons-outlined">
                            arrow_drop_down
                        </span>
                        更多評論
                    </div>`;
      if ($(window).width() <= 748) {
        $(".rwd-review").addClass("container-fluid").removeClass("container");
        $(".review-card:first-child").append(moreReview);
      } else {
        $(".rwd-review").removeClass("container-fluid").addClass("container");
      }
    });
    //輪播內容 carousel
    //頭尾重複一次才會看到兩側圖
    let carouselImages = [
      "./images/event/pexels-laura-stanley-1751550.jpg",
      "./images/event/jules-a-lmydvgKiorI-unsplash.jpg",
      "./images/event/samuel-bryngelsson-dWHtwGV9EUU-unsplash.jpg",
      "./images/event/pexels-laura-stanley-1751550.jpg",
      "./images/event/jules-a-lmydvgKiorI-unsplash.jpg",
    ];
    // setSlide(carouselImages);
    // const carouselContent = silde.map((img, index) => {
    //   return (
    //     <li class="carousel-parts" key={index}>
    //       <img class="h-100 w-100 cover-fit" src={img} alt="" />
    //     </li>
    //   );
    // });
    // let carouselContent = '';
    let carouselContent = carouselImages.map((img, index) => {
      return `<li class="carousel-parts">
          <img class="h-100 w-100 cover-fit" src=${img} alt="" />
        </li>`;
    });
    // for (let i = 0; i < carouselImages.length; i++) {
    //   carouselContent += (
    //     <li class="carousel-parts">
    //       <img class="h-100 w-100 cover-fit" src={carouselImages[i]} alt="" />
    //     </li>
    //   );
    // }
    //扣掉頭尾重複兩個的圓點再 append
    let carouselPages = `<li></li>`.repeat(carouselImages.length - 2);
    $(".event-carousel").append(carouselContent);
    $("#pages").append(carouselPages);
    //預設白點
    $("#pages li").first().addClass("active");
    //兩側圖片模糊+變暗
    $(".carousel-parts")
      .eq(1)
      .css({ filter: "brightness(1) blur(0px)" })
      .siblings()
      .css({ filter: "brightness(0.7) blur(2px)" });

    //輪播動畫
    //圓點換頁
    let carouselIndex = 0;
    //最初一頁的 left
    let firstCarouselWidth =
      $(".carousel-parts").width() -
      ($(".carousel-wrapper").width() - $(".carousel-parts").width()) / 2 +
      20;
    //輪播單位寬 + 20 margin
    let carouselWidth = $(".carousel-parts").width() + 20;

    $("#pages li").on("click mouseenter", function () {
      carouselIndex = $(this).index() + 1;
      carouselRun();
    });
    //縮放大小
    $(window).on("load resize", function () {
      //輪播與視窗比例為 1350 / 1900
      carouselWidth = ($(".carousel-wrapper").width() * 1350) / 1900 + 20;
      $(".carousel-parts").css("width", carouselWidth);
      firstCarouselWidth =
        $(".carousel-parts").width() -
        ($(".carousel-wrapper").width() - $(".carousel-parts").width()) / 2 +
        30;
      //更新前後按鈕感應區域
      $(".carousel-btn").css(
        "width",
        ($(".carousel-wrapper").width() - $(".carousel-parts").width()) / 2
      );
      carouselIndex = $(".carousel-pages li.active").index() + 1;
      carouselRun();
    });
    //前後按鈕換頁
    $("#btnNext").on("click", function () {
      carouselIndex = $(".carousel-pages li.active").index() + 1;
      carouselIndex++;
      if (carouselIndex >= carouselImages.length - 1) {
        carouselIndex = 1;
      }
      carouselRun();
    });
    $("#btnPrev").on("click", function () {
      carouselIndex = $(".carousel-pages li.active").index() + 1;
      carouselIndex--;
      if (carouselIndex < 1) {
        carouselIndex = carouselImages.length - 2;
      }
      carouselRun();
    });
    //驅動程式
    function carouselRun() {
      //index 因扣掉頭要減 1
      let move =
        -firstCarouselWidth - (carouselIndex - 1) * (carouselWidth + 20);
      $("#pages li")
        .eq(carouselIndex - 1)
        .addClass("active")
        .siblings()
        .removeClass("active");
      $(".carousel-parts")
        .eq(carouselIndex)
        .css({ filter: "brightness(1) blur(0px)" })
        .siblings()
        .css({ filter: "brightness(0.7) blur(2px)" });
      $(".event-carousel").css("left", move);
    }
  }, []);
  return (
    <>
      {/* <!--! header --> */}
      <header>
        {/* <!--! banner --> */}
        <div className="banner-carousel">
          <div className="h3 banner-title col-auto">
            當地活動 / 浪漫日落SUP立槳
          </div>
          {/* <!-- !輪播 --> */}
          <div className="carousel-wrapper position-relative">
            <ul className="event-carousel list-unstyled position-absolute">
              {/* <!--* 動態新增 --> */}
              {/* <li className="carousel-parts">
                <img
                  className="h-100 w-100 cover-fit d-block"
                  src="images/event/jules-a-lmydvgKiorI-unsplash.jpg"
                  alt=""
                />
              </li>
              <li className="carousel-parts">
                <img
                  className="h-100 w-100 cover-fit"
                  src="images/event/pexels-laura-stanley-1751550.jpg"
                  alt=""
                />
              </li> */}
            </ul>
            {/* <!--! 輪播原點選頁 --> */}
            <ul
              className="
              list-unstyled
              position-absolute
              d-flex
              justify-content-center
              carousel-pages
            "
              id="pages"
            >
              {/* <!--* 動態新增 --> */}
              {/* <li></li> */}
            </ul>
            <a
              href="#/"
              className="position-absolute carousel-btn"
              id="btnPrev"
              role="button"
            >
              <IoIosArrowDropleft />
            </a>
            <a
              href="#/"
              className="position-absolute carousel-btn"
              id="btnNext"
              role="button"
            >
              <IoIosArrowDropright />
            </a>
          </div>
        </div>
      </header>
      {/* <!--! main --> */}
      <main>
        {/* <!--! section1 商品標題 --> */}
        <div className="container">
          <section className="event-title">
            <div className="col d-flex align-items-center">
              <div className="h1 event-name">浪漫日落SUP立槳</div>
              <i className="ic-fav"></i>
            </div>
            <div className="col d-flex event-subtitle h4">
              <i className="ic-place">海邊區</i>
              <i className="ic-clock">行程時間3小時</i>
              <i className="ic-restore">7天前免費取消</i>
            </div>
            <div className="col d-flex event-title-text h4">
              <span>
                專業教練指導, 無經驗者也可輕鬆上手, 快來下定 SUP 立槳體驗,
                從海面欣賞壯闊自然風景 !
              </span>
            </div>
          </section>
        </div>
        <div className="container-fluid p-0">
          <div className="rwd-menu my-2 col">
            <ul className="d-flex m-0 p-0">
              <li className="">
                <a href="#/">查詢日期</a>
              </li>
              <li>
                <a href="#/">商品資訊</a>
              </li>
              <li>
                <a href="#/">注意事項</a>
              </li>
              <li>
                <a href="#/">取消政策</a>
              </li>
              <li>
                <a href="#/">旅客評論</a>
              </li>
            </ul>
          </div>
          <div className="rwd-calendar">
            <div className="col text-center">查詢日期</div>
            <div className="col d-flex justify-content-center align-items-center position-relative">
              <span className="material-icons position-absolute">
                date_range
              </span>
              <input type="date" />
            </div>
            <div className="col d-flex justify-content-center align-items-center position-relative">
              <span className="material-icons position-absolute">person</span>
              <input type="number" min="1" />
            </div>
            <div className="col text-end px-5">TWD 900</div>
          </div>
        </div>

        {/* <!--! section2 商品說明 --> */}
        <div className="container-fluid event-description">
          <section className="container">
            <div className="row justify-content-between">
              <div className="col-6">
                <div className="h1 description-title">商品說明</div>
                <ul className="p-0 event-description-content">
                  <li className="h3 description-subtitle">－ 行程資訊 －</li>
                  <li>
                    適用對象: 15 - 60 歲旅客皆可體驗, 但不適合孕婦,
                    心血管疾病患者參與
                  </li>
                  <li>體驗時間: 14:00（請提早 10 分鐘抵達現場）</li>
                  <li>集合地點: 海邊露營區</li>
                  <li>行程時間: 約 3 小時</li>
                </ul>
                <ul className="p-0 event-description-content">
                  <li className="h3 description-subtitle">－ 行程介紹 －</li>
                  <li>浪漫日落團</li>
                  <li>
                    中午過後易有雲霧集散, 出海時會涼快一點,
                    能在日落銀輝下拍照將是此行最大收穫,
                    且能欣賞海岸綿延不絕的壯麗風景
                  </li>
                </ul>
                <ul className="p-0 event-description-content">
                  <li className="h3 description-subtitle">－ 購買須知 －</li>
                  <li>有高血壓, 心臟病, 氣喘的旅客請依身體狀況報名</li>
                  <li>有開刀及其他傷病無法進行激烈運動者請勿報名</li>
                  <li>請自己保管攜帶物品</li>
                  <li>因天氣變化, 無法保證一定可觀賞日落</li>
                </ul>
                <ul className="p-0 event-description-content">
                  <li className="h3 description-subtitle">
                    － 費用涵蓋項目 －
                  </li>
                  <li>保險</li>
                  <li>5L防潑水袋</li>
                  <li>照片電子檔</li>
                  <li>教練指導</li>
                  <li>全 SUP 裝備</li>
                </ul>
                <ul className="p-0 event-description-content">
                  <li className="h3 description-subtitle">－ 取消政策 －</li>
                  <li>預定日期 7 天前取消: 全額退費</li>
                  <li>預定日期 0 - 6 天前取消: 恕不退費</li>
                  <li className="cancel-warning">
                    需要 2 - 5 個工作日進行取消流程, 並依照購買商品之取消政策於
                    14 個工作日內退款
                  </li>
                </ul>
              </div>
              <div className="col-4 justify-content-center">
                <div className="calendar"></div>
              </div>
            </div>
            <div className="row">
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
        {/* <!--! section3 旅客評價 --> */}
        <div className="container rwd-review">
          <section className="row consumer-review">
            <div className="col d-flex align-items-center">
              <div className="h1 description-title">旅客評價</div>
              <div className="h1 description-title  review-grade">4.6</div>
              <div className="h4 review-quantity">37 則旅客評價</div>
            </div>
            <div className="row m-0">
              {/* <!-- 旅客評價小卡 --> */}
              <div className="col-md-6 col-12 my-2 review-card">
                <div className="d-flex align-items-center">
                  <div className="review-avatar ">
                    <img
                      src="./images/event/jared-rice-NTyBbu66_SI-unsplash.jpg"
                      alt=""
                      className="w-100 cover-fit"
                    />
                  </div>
                  <div className="m-2 d-flex">
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                  </div>
                </div>
                <div className="bg-mid row review-content">
                  <div className="col-12 review-title text-pri h2">
                    行程充實有趣
                  </div>
                  <div className="col-12 review-innertext text-bg-deep h4">
                    教練專業, 照片精美
                  </div>
                  <div className="col-12 review-timestamp text-sec-deep text-end h5">
                    2021-6-30 由 XXX 評價
                  </div>
                </div>
              </div>
              {/* <!--! RWD動態產生 --> */}
              {/* <!-- <hr />
                    <div className="col d-flex align-items-center justify-content-center more-review">
                        <span className="material-icons-outlined">
                            arrow_drop_down
                        </span>
                        更多評論
                    </div> --> */}
              <div className="col-md-6 col-12 my-2 review-card">
                <div className="d-flex align-items-center">
                  <div className="review-avatar ">
                    <img
                      src="./images/event/jared-rice-NTyBbu66_SI-unsplash.jpg"
                      alt=""
                      className="w-100 cover-fit"
                    />
                  </div>
                  <div className="m-2 d-flex">
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                  </div>
                </div>
                <div className="bg-mid row review-content">
                  <div className="col-12 review-title text-pri h2">
                    行程充實有趣
                  </div>
                  <div className="col-12 review-innertext text-bg-deep h4">
                    教練專業, 照片精美
                  </div>
                  <div className="col-12 review-timestamp text-sec-deep text-end h5">
                    2021-6-30 由 XXX 評價
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2 review-card">
                <div className="d-flex align-items-center">
                  <div className="review-avatar ">
                    <img
                      src="./images/event/jared-rice-NTyBbu66_SI-unsplash.jpg"
                      alt=""
                      className="w-100 cover-fit"
                    />
                  </div>
                  <div className="m-2 d-flex">
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                  </div>
                </div>
                <div className="bg-mid row review-content">
                  <div className="col-12 review-title text-pri h2">
                    行程充實有趣
                  </div>
                  <div className="col-12 review-innertext text-bg-deep h4">
                    教練專業, 照片精美
                  </div>
                  <div className="col-12 review-timestamp text-sec-deep text-end h5">
                    2021-6-30 由 XXX 評價
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2 review-card">
                <div className="d-flex align-items-center">
                  <div className="review-avatar ">
                    <img
                      src="./images/event/jared-rice-NTyBbu66_SI-unsplash.jpg"
                      alt=""
                      className="w-100 cover-fit"
                    />
                  </div>
                  <div className="m-2 d-flex">
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                  </div>
                </div>
                <div className="bg-mid row review-content">
                  <div className="col-12 review-title text-pri h2">
                    行程充實有趣
                  </div>
                  <div className="col-12 review-innertext text-bg-deep h4">
                    教練專業, 照片精美
                  </div>
                  <div className="col-12 review-timestamp text-sec-deep text-end h5">
                    2021-6-30 由 XXX 評價
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2 review-card">
                <div className="d-flex align-items-center">
                  <div className="review-avatar ">
                    <img
                      src="./images/event/jared-rice-NTyBbu66_SI-unsplash.jpg"
                      alt=""
                      className="w-100 cover-fit"
                    />
                  </div>
                  <div className="m-2 d-flex">
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                  </div>
                </div>
                <div className="bg-mid row review-content">
                  <div className="col-12 review-title text-pri h2">
                    行程充實有趣
                  </div>
                  <div className="col-12 review-innertext text-bg-deep h4">
                    教練專業, 照片精美
                  </div>
                  <div className="col-12 review-timestamp text-sec-deep text-end h5">
                    2021-6-30 由 XXX 評價
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2 review-card">
                <div className="d-flex align-items-center">
                  <div className="review-avatar ">
                    <img
                      src="./images/event/jared-rice-NTyBbu66_SI-unsplash.jpg"
                      alt=""
                      className="w-100 cover-fit"
                    />
                  </div>
                  <div className="m-2 d-flex">
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                    <i className="ic-star text-pri"></i>
                  </div>
                </div>
                <div className="bg-mid row review-content">
                  <div className="col-12 review-title text-pri h2">
                    行程充實有趣
                  </div>
                  <div className="col-12 review-innertext text-bg-deep h4">
                    教練專業, 照片精美
                  </div>
                  <div className="col-12 review-timestamp text-sec-deep text-end h5">
                    2021-6-30 由 XXX 評價
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- 評論頁碼 --> */}
            <div className="col-12 review-page-wrapper justify-content-center">
              <div className="col-3 pri-light review-page">page</div>
            </div>
          </section>
        </div>

        {/* <!--! section4 更多推薦 --> */}
        <div className="container-fluid suggestion pri-light">
          <div className="row m-0">
            <div className="col-12 suggestion-title text-pri d-flex justify-content-center h1">
              更多推薦活動
            </div>
            <div className="d-flex justify-content-center flex-wrap">
              <div className="d-flex justify-content-center">
                <div className="event-card">
                  <div className="card-img">
                    <img
                      className="img-fluid h-100"
                      src="images/event/samuel-bryngelsson-dWHtwGV9EUU-unsplash.jpg"
                      alt=""
                    />
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-auto mx-auto">
                        <div className="h2 card-title d-flex flex-column">
                          <div className="card-tag position-relative">
                            浪漫日落SUP立槳
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-star d-flex align-items-end"></i>
                            <span className="event-star-avg">4.6</span>
                            <span className="review-times">
                              &nbsp;&nbsp;37則評論
                            </span>
                            <span className="attend-times">
                              &nbsp;&nbsp;1K參加過
                            </span>
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-place d-flex "></i>
                            <span className="event-place">海邊區</span>
                          </div>
                        </div>
                      </div>
                      <div className="h4 event-price text-end">NT $900</div>
                    </div>
                    <div className="event-price text-end">NT $900</div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="event-card">
                  <div className="card-img">
                    <img
                      className="img-fluid h-100"
                      src="images/event/samuel-bryngelsson-dWHtwGV9EUU-unsplash.jpg"
                      alt=""
                    />
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-auto mx-auto">
                        <div className="h2 card-title d-flex flex-column">
                          <div className="card-tag position-relative">
                            浪漫日落SUP立槳
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-star d-flex align-items-end"></i>
                            <span className="event-star-avg">4.6</span>
                            <span className="review-times">
                              &nbsp;&nbsp;37則評論
                            </span>
                            <span className="attend-times">
                              &nbsp;&nbsp;1K參加過
                            </span>
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-place d-flex "></i>
                            <span className="event-place">海邊區</span>
                          </div>
                        </div>
                      </div>
                      <div className="h4 event-price text-end">NT $900</div>
                    </div>
                    <div className="event-price text-end">NT $900</div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="event-card">
                  <div className="card-img">
                    <img
                      className="img-fluid h-100"
                      src="images/event/samuel-bryngelsson-dWHtwGV9EUU-unsplash.jpg"
                      alt=""
                    />
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-auto mx-auto">
                        <div className="h2 card-title d-flex flex-column">
                          <div className="card-tag position-relative">
                            浪漫日落SUP立槳
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-star d-flex align-items-end"></i>
                            <span className="event-star-avg">4.6</span>
                            <span className="review-times">
                              &nbsp;&nbsp;37則評論
                            </span>
                            <span className="attend-times">
                              &nbsp;&nbsp;1K參加過
                            </span>
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-place d-flex "></i>
                            <span className="event-place">海邊區</span>
                          </div>
                        </div>
                      </div>
                      <div className="h4 event-price text-end">NT $900</div>
                    </div>
                    <div className="event-price text-end">NT $900</div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="event-card">
                  <div className="card-img">
                    <img
                      className="img-fluid h-100"
                      src="images/event/samuel-bryngelsson-dWHtwGV9EUU-unsplash.jpg"
                      alt=""
                    />
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-auto mx-auto">
                        <div className="h2 card-title d-flex flex-column">
                          <div className="card-tag position-relative">
                            浪漫日落SUP立槳
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-star d-flex align-items-end"></i>
                            <span className="event-star-avg">4.6</span>
                            <span className="review-times">
                              &nbsp;&nbsp;37則評論
                            </span>
                            <span className="attend-times">
                              &nbsp;&nbsp;1K參加過
                            </span>
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-place d-flex "></i>
                            <span className="event-place">海邊區</span>
                          </div>
                        </div>
                      </div>
                      <div className="h4 event-price text-end">NT $900</div>
                    </div>
                    <div className="event-price text-end">NT $900</div>
                  </div>
                </div>
                {/* <!-- </div> --> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default withRouter(EventDetail);
