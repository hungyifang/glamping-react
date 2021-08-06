import React from "react";
import { withRouter } from "react-router-dom";
import { GiHighGrass } from "react-icons/gi";
import { IoMdBonfire } from "react-icons/io";
import { GiChickenOven } from "react-icons/gi";
import { GiCampingTent } from "react-icons/gi";

function SetCard(props) {
  const { title, subtitle, content, o_id, img_src } = props;
  return (
    <>
      <div
        className="set-card ml-0"
        onClick={() => {
          console.log(o_id);
          props.history.push({
            pathname: "/customized",
            state: { o_id: o_id },
          });
        }}
      >
        <div className="set-card-wraper ">
          {/* <!-- 照片 --> */}
          <div className="set-picture ">
            <img
              className="pic-100"
              src={`http://localhost:8080/images/pic/tent/${img_src}`}
              alt="套裝行程圖片"
            />
          </div>
          {/* <!-- 卡片標題 --> */}

          <div className="d-flex set-card-title">
            <h3>{title}</h3>
            <h3>|</h3>
            <h3>{subtitle}</h3>
          </div>
          {/* <!-- 卡片內容 --> */}
          <div className="set-card-content">
            <span>{content}</span>
          </div>
          {/* <!-- 卡片icon --> */}
          <div className="set-card-icon ">
            <div className="d-grid set-icon-box">
              {/* <i className="ic-grass"></i> */}
              <GiHighGrass size="1.7rem" className="me-5 ms-5" />
              <p className="m-0 ms-5">草原</p>
            </div>
            <div className="d-grid set-icon-box">
              {/* <i className="ic-campfire"></i> */}
              <IoMdBonfire size="1.7rem" className="me-5" />
              <p className="m-0">營火</p>
            </div>
            <div className="d-grid set-icon-box">
              {/* <i className="ic-date_ok"></i> */}
              <GiChickenOven size="1.7rem" className="me-5" />
              <p className="m-0">餐點</p>
            </div>
            <div className="d-grid set-icon-box">
              {/* <i className="ic-tent"></i> */}
              <GiCampingTent size="1.7rem" className="me-5" />
              <p className="m-0">帳篷</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(SetCard);
