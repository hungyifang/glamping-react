import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdLocalMall, MdMenu } from "react-icons/md";
import $ from "jquery";
import Login from "./Login";
import { ReactComponent as Logo } from "../logo.svg";

function Header(props) {
  const u_id = localStorage.getItem("u_id");
  const { auth, setAuth } = props;
  const [modalIsOpen, setIsOpen] = useState(false);

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
      className="d-flex justify-content-center align-items-center btn-outline mx-2"
      onClick={openModal}
    >
      登入
    </div>
  );

  const avatar = (
    <>
      <Link to="/member" className="avatar mx-2">
        <img
          src={`http://localhost:8080/images/avatar/${u_id}.jpeg`}
          alt="個人資料相片"
        />
      </Link>
      <Link className="fw-bold main-menu-a mx-2" onClick={() => logout()}>
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

  return (
    <>
      <nav>
        <div className="container-fluid ">
          <div className="col nav d-flex align-items-center justify-content-between">
            <div className="logo">
              <NavLink exact to="/">
                <Logo />
              </NavLink>
            </div>
            <div className="main-menu">
              <ul className="d-flex align-items-center m-0 p-0">
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
              <Link to="/carts">
                <MdLocalMall className="header-icon mx-2" />
              </Link>
              {auth ? avatar : loginBtn}
              <div className="header-icon berger-list">
                <MdMenu />
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
