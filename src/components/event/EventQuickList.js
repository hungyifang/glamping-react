import React from "react";
import { HashLink } from "react-router-hash-link";
import { IoMdFlower } from "react-icons/io";
import { FaRegLifeRing } from "react-icons/fa";

function EventQuickList() {
  return (
    <>
      {/* <!--! 快速選單 --> */}
      <div
        className="
          col
          quick-list-wrapper
          d-flex
          justify-content-center
          align-items-center
        "
      >
        <div className="quick-list col d-flex justify-content-around align-items-center">
          {/* <!--TODO 錨點 --> */}
          <HashLink
            className="h2
              quick-list-option
              d-flex
              justify-content-center
              align-items-center
              active col
            "
            to="#section1"
          >
            <FaRegLifeRing size="1.7rem" />
            &nbsp;<span>動態活動</span>
          </HashLink>
          {/* <!--TODO 錨點 --> */}
          <HashLink
            className="h2
              quick-list-option
              d-flex
              justify-content-center
              align-items-center col
            "
            to="#section2"
          >
            <IoMdFlower size="1.7rem" />
            &nbsp;<span>靜態活動</span>
          </HashLink>
        </div>
      </div>
    </>
  );
}
export default EventQuickList;
