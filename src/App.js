import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
  const [newCartsNum, setNewCartsNum] = useState();

  function updateCartNum() {
    if (localStorage.getItem("orderData")) {
      setNewCartsNum(JSON.parse(localStorage.getItem("orderData")).length);
    } else {
      setNewCartsNum(0);
    }
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
    updateCartNum();
    checkIsLogin();
  }, []);

  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Layout auth={auth} setAuth={setAuth} newCartsNum={newCartsNum}>
            <Route exact path="/">
              <Home auth={auth} />
            </Route>
            <Route path="/event-detail/:i_id">
              <EventDetail auth={auth} setNewCartsNum={setNewCartsNum} />
            </Route>
            <Route exact path="/event">
              <Event auth={auth} />
            </Route>
            <Route exact path="/set">
              <Set />
            </Route>
            <Route exact path="/customized">
              <Customized />
            </Route>
            <Route exact path="/carts">
              <Carts auth={auth} setNewCartsNum={setNewCartsNum} />
            </Route>
            <Route exact path="/checkout">
              <Checkout />
            </Route>
            <Route path="/member">
              <Member auth={auth} />
            </Route>
            <Route path="/intro">
              <Intro />
            </Route>
          </Layout>
        </Switch>
      </ScrollToTop>
    </Router>
  );
}
export default App;
