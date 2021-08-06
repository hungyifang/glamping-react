import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "../../styles/order.css";
import OrderLayout from "../OrderLayout";
import OrderList from "../order/OrderList";

function Order() {
  const u_id = localStorage.getItem("u_id");

  useEffect(() => {
    document.title = `山角行 - 行程管理`;
  }, []);

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
