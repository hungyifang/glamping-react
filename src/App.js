import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Event from "./pages/Event";
import EventDetail from "./pages/EventDetail";
import Member from "./pages/Member";

function App() {
  const [auth, setAuth] = useState(false);

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
    checkIsLogin();
  }, []);

  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Layout auth={auth} setAuth={setAuth}>
            <Route exact path="/">
              <Home />
            </Route>
            <Route auth={auth} path="/event-detail/:i_id">
              <EventDetail />
            </Route>
            <Route exact path="/event">
              <Event />
            </Route>
            <Route path="/member">
              <Member auth={auth} />
            </Route>
          </Layout>
        </Switch>
      </ScrollToTop>
    </Router>
  );
}
export default App;
