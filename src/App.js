import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import $ from "jquery";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Event from "./pages/Event";
import EventDetail from "./pages/EventDetail";
import Member from "./pages/Member";
import Intro from "./pages/Intro";
import Set from "./pages/Set";
import Customized from "./pages/Customized";
import Carts from "./pages/Carts";
import Checkout from "./pages/Checkout";

function App() {
  const [auth, setAuth] = useState(true);
  const [isDay, setIsDay] = useState(true);
  const [virgin, setVirgin] = useState();
  const [newCartsNum, setNewCartsNum] = useState();

  const cssLink = isDay ? "day" : "night";

  function updateCartNum() {
    if (localStorage.getItem("orderData")) {
      setNewCartsNum(JSON.parse(localStorage.getItem("orderData")).length);
    } else {
      setNewCartsNum(0);
    }
  }

  function updateVirginState() {
    if (sessionStorage.getItem("virgin")) {
      setVirgin(false);
    } else {
      setVirgin(true);
    }
  }

  function mountThemeToggle() {
    $(".day-night-switch").on("click", function () {
      $(".day-night-switch").find(".switch-ball").toggleClass("switch");
      $(".day-night-switch").find(".switch-text").toggleClass("switch");
      if ($(".day-night-switch").find(".switch-text").text() === "day") {
        $(".day-night-switch").find(".switch-text").text("night");
        setIsDay(false);
      } else {
        $(".day-night-switch").find(".switch-text").text("day");
        setIsDay(true);
      }
    });
  }

  async function checkIsLogin() {
    const url = `http://localhost:8080/api/auth/check`;
    const request = new Request(url, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
    });
    const response = await fetch(request);
    const isLogin = await response.json();
    console.log("登入與否？", isLogin);
    if (isLogin) {
      setAuth(true);
    } else {
      localStorage.removeItem("u_id");
      setAuth(false);
    }
  }

  useEffect(() => {
    mountThemeToggle();
  }, [virgin]);

  useEffect(() => {
    checkIsLogin();
    updateVirginState();
    mountThemeToggle();
    updateCartNum();
  }, []);

  return (
    <>
      <Helmet>
        <link
          type="text/css"
          rel="stylesheet"
          href={`./styles/${cssLink}.css`}
        />
      </Helmet>
      <Router>
        <ScrollToTop>
          <Switch>
            <Layout
              auth={auth}
              setAuth={setAuth}
              isDay={isDay}
              virgin={virgin}
              newCartsNum={newCartsNum}
            >
              <Route exact path="/">
                <Home
                  auth={auth}
                  isDay={isDay}
                  virgin={virgin}
                  setVirgin={setVirgin}
                />
              </Route>
              <Route path="/event-detail/:i_id">
                <EventDetail
                  auth={auth}
                  isDay={isDay}
                  setNewCartsNum={setNewCartsNum}
                />
              </Route>
              <Route exact path="/event">
                <Event auth={auth} isDay={isDay} />
              </Route>
              <Route exact path="/set">
                <Set isDay={isDay} />
              </Route>
              <Route exact path="/customized">
                <Customized isDay={isDay} />
              </Route>
              <Route exact path="/carts">
                <Carts
                  auth={auth}
                  isDay={isDay}
                  setNewCartsNum={setNewCartsNum}
                />
              </Route>
              <Route exact path="/checkout">
                <Checkout isDay={isDay} />
              </Route>
              <Route path="/member">
                <Member auth={auth} isDay={isDay} />
              </Route>
              <Route path="/intro">
                <Intro isDay={isDay} />
              </Route>
            </Layout>
          </Switch>
        </ScrollToTop>
      </Router>
    </>
  );
}
export default App;
