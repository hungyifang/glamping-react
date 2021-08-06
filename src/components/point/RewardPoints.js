import React, { useState, useEffect } from "react";
import "../../styles/point.css";
import PointList from "../point/PointList";
import { NavLink } from "react-router-dom";

function RewardPoint(props) {
  const { u_id } = props;
  const [points, setPoints] = useState([]);

  //從API SERVER抓資料
  async function getUserDataFromServer() {
    const url = `http://localhost:8080/api/points/history/${u_id}`;
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    setPoints(data);
    console.log(data);
  }

  useEffect(() => {
    getUserDataFromServer(u_id);
  }, []);

  return (
    <>
      <main>
        <article className="article">
          <div className="h1 section-title">點數管理</div>
          <ul className="d-flex point-article-menu">
            <li>
              <NavLink
                as={NavLink}
                className="h4 fw-bold point-article-menu-a"
                exact
                to="/member/point"
              >
                可使用
              </NavLink>
            </li>
            <li>
              <NavLink
                as={NavLink}
                className="h4 fw-bold point-article-menu-a"
                exact
                to="/member/point/used"
              >
                已使用
              </NavLink>
            </li>
          </ul>
          {points.map((value, index) => {
            return <PointList value={value} key={index} />;
          })}
        </article>
      </main>
    </>
  );
}
export default RewardPoint;
