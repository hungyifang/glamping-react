import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "../styles/member.css";
import MemberLayout from "../components/MemberLayout";
import Settings from "../components/member/Settings";
import Order from "../components/order/Order";
import RewardPoints from "../components/point/RewardPoints";
import Myfav from "../components/fav/Myfav";
import Comment from "./Comment";

function Member() {
  const u_id = localStorage.getItem("u_id");
  const [memberAuth, setMemberAuth] = useState(true);

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
      setMemberAuth(true);
    } else {
      localStorage.removeItem("u_id");
      setMemberAuth(false);
    }
  }

  useEffect(() => {
    checkIsLogin();
  }, [memberAuth]);

  const display = (
    <Switch>
      <Route path="/member/comment/:id">
        <Comment u_id={u_id} />
      </Route>
      <MemberLayout>
        <Route exact path="/member">
          <Settings u_id={u_id} />
        </Route>
        <Route path="/member/point">
          <RewardPoints u_id={u_id} />
        </Route>
        <Route path="/member/order">
          <Order u_id={u_id} />
        </Route>
        <Route path="/member/favorite">
          <Myfav u_id={u_id} />
        </Route>
      </MemberLayout>
    </Switch>
  );

  return <>{memberAuth ? display : <Redirect to="/" />}</>;
}

export default Member;
