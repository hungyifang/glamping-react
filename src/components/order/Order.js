import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "../../styles/order.css";
import OrderLayout from "../OrderLayout";
import OrderList from "../order/OrderList";

function Order(props) {
  const u_id = localStorage.getItem("u_id");
  return (
    <Switch>
      <OrderLayout>
        <Route exact path="/member/order">
          <OrderList s_id={10} u_id={u_id} />
        </Route>
        <Route exact path="/member/order/expired">
          <OrderList s_id={20} u_id={u_id} />
        </Route>
        <Route exact path="/member/order/canceled">
          <OrderList s_id={99} u_id={u_id} />
        </Route>
      </OrderLayout>
    </Switch>
  );
}

export default withRouter(Order);
