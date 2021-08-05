import React from "react";
import { withRouter } from "react-router-dom";

function SetCard(props) {
  const { title, subtitle, content, o_id } = props;
  return (
    <>
      <div
        class="set-card ml-0"
        onClick={() => {
          console.log(o_id);
          props.history.push({
            pathname: "/Customized",
            state: { o_id: o_id },
          });
        }}
      >
        <div class="set-card-wraper ">
          {/* <!-- 照片 --> */}
          <div class="set-picture ">
            <img class="pic-100" src="" alt="" />
          </div>
          {/* <!-- 卡片標題 --> */}

          <div class="d-flex set-card-title">
            <h3>{title}</h3>
            <h3>|</h3>
            <h3>{subtitle}</h3>
          </div>
          {/* <!-- 卡片內容 --> */}
          <div class="set-card-content">
            <span>{content}</span>
          </div>
          {/* <!-- 卡片icon --> */}
          <div class="set-card-icon ">
            <div class="d-grid set-icon-box">
              <i class="ic-grass"></i>
              <p class="m-0">草原</p>
            </div>
            <div class="d-grid set-icon-box">
              <i class="ic-campfire"></i>
              <p class="m-0">營火</p>
            </div>
            <div class="d-grid set-icon-box">
              <i class="ic-date_ok"></i>
              <p class="m-0">日期</p>
            </div>
            <div class="d-grid set-icon-box">
              <i class="ic-tent"></i>
              <p class="m-0">帳篷</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(SetCard);
