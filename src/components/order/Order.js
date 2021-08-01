import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "../../styles/order.css";
import OrderLayout from "../OrderLayout";
import OrderList from "../order/OrderList";

function Order() {
  return (
    <Switch>
      <OrderLayout>
        <Route exact path="/member/order">
          <OrderList sid={10} />
        </Route>
        <Route exact path="/member/order/expired">
          <OrderList sid={20} />
        </Route>
        <Route exact path="/member/order/canceled">
          <OrderList sid={99} />
        </Route>
      </OrderLayout>
    </Switch>
  );
}

export default withRouter(Order);
