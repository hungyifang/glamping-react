import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "../styles/member.css";
import MemberLayout from "../components/MemberLayout";
import Settings from "../components/member/Settings";
import Order from "../components/order/Order";
import RewardPoints from "../components/point/RewardPoints";
import Myfav from "../components/fav/Myfav";
import Comment from "./Comment";

function Member(props) {
  const { auth } = props;
  const display = (
    <Switch>
      <Route path="/member/comment/:id">
        <Comment />
      </Route>
      <MemberLayout>
        <Route exact path="/member">
          <Settings />
        </Route>
        <Route path="/member/point">
          <RewardPoints />
        </Route>
        <Route path="/member/order">
          <Order />
        </Route>
        <Route path="/member/favorite">
          <Myfav />
        </Route>
      </MemberLayout>
    </Switch>
  );

  return <>{auth ? display : <Redirect to="/" />}</>;
}

export default Member;
