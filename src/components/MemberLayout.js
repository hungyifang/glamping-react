import React from "react";
import MemberNav from "../components/MemberNav";
import MobileMemberNav from "../components/MobileMemberNav";
import MobileTitle from "../components/MobileTitle";

function MemberLayout(props) {
  const { u_id } = props;
  return (
    <>
      <div className="container-fluid g-0">
        <MobileTitle />
      </div>

      <div className="container-fluid g-0 d-flex justify-content-center">
        <div className="main-content d-flex justify-content-between">
          <div className="container-fluid p-0">
            <MemberNav u_id={u_id} />
          </div>
          {props.children}
        </div>
      </div>
      <MobileMemberNav />
    </>
  );
}

export default MemberLayout;
