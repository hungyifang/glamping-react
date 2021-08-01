import React from "react";

function PointList(props) {
  return (
    <>
      <div className="d-md-inline-flex flex-md-row">
        <div className="user-points d-flex flex-column justify-content-center align-items-center">
          <p className="h1 point-total">點數 {props.value.points} 點</p>
          <p className="h4 point-requirement">{props.value.reason}</p>
          <p className="h4 point-date">有效期限：{props.value.expired}</p>
        </div>
      </div>
    </>
  );
}

export default PointList;
