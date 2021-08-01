import React from "react";
import { withRouter, NavLink } from "react-router-dom";
// import "../styles/Member.css";
// import { GrFormPreviousLink } from "react-icons/gr";

function MobileTitle(props) {
  // const url = props.match.url;
  let title;
  const url = props.location.pathname;
  switch (url) {
    case "/member/point":
      title = "點數管理";
      break;
    case "/member/order":
      title = "行程管理";
      break;
    case "/member/favorite":
      title = "我的收藏";
      break;
    default:
      title = "帳號管理";
  }

  return (
    <div className="container-fluid g-0">
      <NavLink exact to="/member">
        <div className="rwd-title d-flex justify-content-center align-items-center">
          {/* <GrFormPreviousLink className="back-icon me-5" size="2rem" /> */}
          <p className="h1 title-text me-5">{title}</p>
        </div>
      </NavLink>
    </div>
  );
}

export default withRouter(MobileTitle);
