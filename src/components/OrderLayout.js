import React from "react";
import { NavLink } from "react-router-dom";

function OrderLayout(props) {
  return (
    <main>
      <article className="article d-flex flex-column">
        <div className="h1 trip-section-title">行程管理</div>
        <ul className="d-flex article-menu">
          <li>
            <NavLink
              as={NavLink}
              className="h4 fw-bold article-menu-a"
              exact
              to="/member/order"
            >
              新訂單
            </NavLink>
          </li>
          <li>
            <NavLink
              as={NavLink}
              className="h4 fw-bold article-menu-a"
              to="/member/order/expired"
            >
              已出發
            </NavLink>
          </li>
          <li>
            <NavLink
              as={NavLink}
              className="h4 fw-bold article-menu-a"
              to="/member/order/canceled"
            >
              已取消
            </NavLink>
          </li>
        </ul>
        {props.children}
      </article>
    </main>
  );
}

export default OrderLayout;
