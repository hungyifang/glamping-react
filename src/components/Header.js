import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdLocalMall, MdMenu } from "react-icons/md";
import $ from "jquery";
import Login from "./Login";
// import { ReactComponent as Logo } from "../logo.svg";

function Header() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // componentDidMount
  useEffect(() => {
    // jquery程式碼寫在這裡
    // 日夜開關
    $("#day-night-switch").on("click", () => {
      $(".switch-ball").toggleClass("switch");
      $("#switch-text").toggleClass("switch");
      if ($("#switch-text").text() === "day") {
        $("#switch-text").text("night");
      } else {
        $("#switch-text").text("day");
      }
    });
    //手機版 導覽列 fix-bottom and top
    $(window).on("load resize", function () {
      if ($("body").width() <= 1043) {
        $("nav").addClass("fixed-top custom-bg-light");
      } else {
        $("nav").removeClass("fixed-top custom-bg-light");
      }
    });
  }, []);

  return (
    <>
      {/* <!--! 導覽列 --> */}
      <nav>
        <div className="container-fluid ">
          <div className="col nav d-flex align-items-center justify-content-between">
            <div className="logo">
              {/* <!--! 網址 --> */}
              <NavLink exact to="/">
                {/* <img
                  className="img-fluid"
                  src="./images/logo/logo-日.svg"
                  alt=""
                /> */}
                {/* <Logo /> */}
              </NavLink>
            </div>
            <div className="main-menu">
              <ul className="d-flex align-items-center m-0 p-0">
                {/* <!--! 網址 --> */}
                <li>
                  <NavLink
                    className="fw-bold main-menu-a mx-4"
                    to="/customized"
                    activeClassName="active"
                  >
                    客製行程
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="fw-bold main-menu-a mx-4"
                    to="/set"
                    activeClassName="active"
                  >
                    套裝行程
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="fw-bold main-menu-a mx-4"
                    to="/event"
                    activeClassName="active"
                  >
                    當地活動
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="fw-bold main-menu-a mx-4"
                    to="/intro"
                    activeClassName="active"
                  >
                    營區介紹
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center">
              <div
                className="day-night-switch bg-pri d-flex align-items-center justify-content-between position-relative mx-2"
                id="day-night-switch"
              >
                <div
                  className="position-absolute mx-auto text-white"
                  id="switch-text"
                >
                  day
                </div>
                <div className="switch-ball bg-white"></div>
              </div>
              <MdLocalMall className="header-icon mx-2" />
              <div className="avatar mx-2">
                <img src="" alt="" />
              </div>
              <div
                className="
                d-flex
                justify-content-center
                align-items-center
                btn-outline
                mx-2
              "
                onClick={openModal}
              >
                登入
              </div>
              <div className="header-icon berger-list">
                <MdMenu />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Login modalIsOpen={modalIsOpen} onRequestClose={closeModal} />
    </>
  );
}

export default Header;
