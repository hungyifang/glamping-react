import React from "react";
import { NavLink } from "react-router-dom";
// import "../styles/Member.css";
import { VscSettingsGear } from "react-icons/vsc";
import { HiOutlineTicket } from "react-icons/hi";
import { FaRegListAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

function MobileMemberNav() {
  return (
    <>
      <div className="container-fluid g-0 fixed-bottom">
        <div className="rwd-nav d-flex justify-content-between align-items-center">
          <div className="nav-check ms-sm-5">
            <NavLink
              as={NavLink}
              exact
              to="/member"
              className="mobile-nav-check-link"
              activeClassName="mobile-nav-active"
            >
              <VscSettingsGear className="icon ms-4" />
              <p className="icon-text ms-2">帳號設定</p>
            </NavLink>
          </div>
          <div className="nav-check">
            <NavLink
              as={NavLink}
              to="/member/point"
              activeClassName="mobile-nav-active"
            >
              <HiOutlineTicket className="icon ms-4" />
              <p className="icon-text ms-2">點數管理</p>
            </NavLink>
          </div>
          <div className="nav-check">
            <NavLink
              as={NavLink}
              to="/member/order"
              activeClassName="mobile-nav-active"
            >
              <FaRegListAlt className="icon ms-4" />
              <p className="icon-text ms-2">行程管理</p>
            </NavLink>
          </div>
          <div className="nav-check me-sm-5">
            <NavLink
              as={NavLink}
              to="/member/favorite"
              activeClassName="mobile-nav-active"
            >
              <FaRegHeart className="icon ms-4" />
              <p className="icon-text ms-2">我的收藏</p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileMemberNav;
