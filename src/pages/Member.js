import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// import "../styles/Member.css";
import "../styles/member.css";
import MemberLayout from "../components/MemberLayout";
import Settings from "../components/member/Settings";
import Order from "../components/order/Order";
import RewardPoints from "../components/point/RewardPoints";
import Myfav from "../components/fav/Myfav";
import Comment from "./Comment";

function Member() {
  return (
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
}

export default withRouter(Member);
