import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import $ from "jquery";
import { MdClose, MdExitToApp, MdLocalMall, MdMenu } from "react-icons/md";
import { ReactComponent as Logo } from "../logo.svg";
import Login from "./Login";

function Header(props) {
  const u_id = localStorage.getItem("u_id");
  const { auth, setAuth, newCartsNum } = props;
  const [hamberger, setHamberger] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cartsNum, setCartsNum] = useState(0);
  const [showBadge, setShowBadge] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function logout() {
    const url = `http://localhost:8080/api/auth/logout`;
    const request = new Request(url, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    console.log("伺服器回傳的json資料", data.status);
    if (data.status === 1) {
      localStorage.removeItem("u_id");
      setAuth(false);
    }
  }

  const loginBtn = (
    <div
      className="btn-outline d-none-rwd d-flex justify-content-center align-items-center mx-2"
      onClick={openModal}
    >
      登入
    </div>
  );

  const avatar = (
    <>
      <Link to="/member" className="avatar mx-2">
        <img
          className="img-fluid"
          src={`http://localhost:8080/images/avatar/${u_id}.jpeg`}
          alt="個人資料相片"
        />
      </Link>
      <Link
        className="fw-bold main-menu-a mx-2 d-none-rwd"
        onClick={() => logout()}
      >
        登出
      </Link>
    </>
  );

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

  useEffect(() => {
    setCartsNum(newCartsNum);
    if (cartsNum === 0) {
      setShowBadge(false);
    } else {
      setShowBadge(true);
    }
  }, [cartsNum, newCartsNum]);

  // RWD 側邊選單
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
        <div className="container-fluid">
          <div className="col nav d-flex align-items-center justify-content-between">
            <div className="logo">
              <NavLink exact to="/">
                <Logo />
              </NavLink>
            </div>
            <div className="main-menu">
              <ul className="d-flex align-items-center m-0 p-0">
                <li>
                  {auth ? (
                    <div className="logout-icon rwd" onClick={() => logout()}>
                      <MdExitToApp />
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
              <Link to="/carts" className="position-relative">
                <MdLocalMall className="header-icon mx-2" />
                {showBadge && (
                  <div className="header-icon-badge position-absolute bottom-0 end-0">
                    {cartsNum}
                  </div>
                )}
              </Link>
              {auth ? avatar : loginBtn}
              <div
                className="header-icon hamberger-icon"
                onClick={() => {
                  clickHamberger();
                }}
              >
                {hamberger ? <MdMenu /> : <MdClose />}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Login
        modalIsOpen={modalIsOpen}
        onRequestClose={closeModal}
        setAuth={setAuth}
      />
    </>
  );
}

export default Header;
