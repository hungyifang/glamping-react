import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import {
  IoBagHandle,
  IoReorderFourSharp,
  IoCloseSharp,
  IoLogOutOutline,
} from "react-icons/io5";

function NavBar(props) {
  const login = props.auth || false;
  const [auth, setAuth] = useState(login);
  const [hamberger, setHamberger] = useState(true);

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

  // RWD 漢堡選單
  function clickHamberger() {
    let status = hamberger;
    setHamberger(!status);
    // if ($('body').width() >= 1043) setHamberger(false);
    if ($("body").width() >= 1043) $(".main-menu").css("display", "none");
    $(".main-menu").css("display", "flex");
    if (hamberger) $(".main-menu").css("right", "0");
    if (!hamberger) $(".main-menu").css("right", "-500px");
  }

  // useEffect(() => {
  //   console.log(hamberger);
  // }, [hamberger]);
  return (
    <>
      <nav>
        <div className="container-fluid ">
          <div className="col nav d-flex align-items-center justify-content-between">
            <div className="logo">
              <NavLink exact to="/">
                <img
                  className="img-fluid"
                  src="http://localhost:8080/images/logo-日.svg"
                  alt=""
                />
              </NavLink>
            </div>
            <div className="main-menu">
              <ul className="d-flex align-items-center m-0 p-0">
                <li>
                  {auth ? (
                    <div className="logout-icon rwd">
                      <IoLogOutOutline />
                      <span className="text-pri mx-2">登出</span>
                    </div>
                  ) : (
                    <div
                      className="
                justify-content-center
                align-items-center
                btn-outline
                rwd
                mx-2
              "
                    >
                      <NavLink to="/login">登入</NavLink>
                    </div>
                  )}
                </li>
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
            <div className="d-flex align-items-center function-icon">
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
              <IoBagHandle />
              {auth ? (
                <div className="logout-icon pc" title="登出">
                  <IoLogOutOutline />
                </div>
              ) : (
                <div
                  className="
                justify-content-center
                align-items-center
                btn-outline
                pc
                mx-2
              "
                >
                  <NavLink to="/login">登入</NavLink>
                </div>
              )}
              {auth === true && (
                <>
                  <div className="avatar mx-2 d-flex align-items-center">
                    <img
                      src="http://localhost:8080/images/jules-a-lmydvgKiorI-unsplash.jpg"
                      alt=""
                      className="cover-fit w-100 h-100"
                    />
                  </div>
                  <span className="text-pri">hi, 123</span>
                </>
              )}

              <div
                className="berger-list"
                onClick={() => {
                  clickHamberger();
                }}
              >
                {hamberger ? <IoReorderFourSharp /> : <IoCloseSharp />}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
