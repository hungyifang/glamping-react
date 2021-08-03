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
  const u_id = localStorage.getItem("u_id");
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

  return <>{auth ? display : <Redirect to="/" />}</>;
}

export default Member;
