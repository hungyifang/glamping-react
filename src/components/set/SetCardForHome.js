import React from "react";
import { withRouter } from "react-router-dom";

function SetCardForHome(props) {
  const { title, subtitle, o_id, img_src } = props;
  return (
    <>
      <div
        className="set-card-forhome col row d-flex align-items-center me-3"
        onClick={() => {
          console.log(o_id);
          props.history.push({
            pathname: "/customized",
            state: { o_id: o_id },
          });
        }}
      >
        <div className="col-5 set-card-forhome-figure">
          <img
            className="set-card-forhome-img"
            src={`http://localhost:8080/images/pic/tent/${img_src}`}
            alt="套裝行程圖片"
          />
        </div>
        <div className="col-7 row set-card-title">
          <h3 className="col-12 align-self-start aaaa">
            {title}：{subtitle}
          </h3>
          <hr className="mt-5" />
          <h3 className="col-12 d-flex">立即預訂→</h3>
        </div>
      </div>
    </>
  );
}

export default withRouter(SetCardForHome);
