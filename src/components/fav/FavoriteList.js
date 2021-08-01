import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import { withRouter } from "react-router-dom";

function FavoriteList(props) {
  const [fav, setFav] = useState(true);

  // 送出「取消收藏」請求
  async function FavChangeToServer() {
    const url = `http://localhost:8080/api/fav/${props.value.u_id}/${props.value.i_id}`;
    const request = new Request(url, {
      method: "POST",
      body: { able: 0 },
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      if (data.status === 1) getUserDataFromServer();
    } catch (err) {
      console.error(err);
    }
  }

  // 重新整理收藏列表
  async function getUserDataFromServer() {
    const url = `http://localhost:8080/api/fav/${props.value.u_id}`;
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    props.setFavList(data);
    console.log(data);
  }

  return (
    <>
      <div className="fav-order d-flex justify-content-between ">
        {/* 從資料庫串接圖片 */}
        <img
          className="fav-order-image"
          src="../images/member/748bc867eb74afbc7015d1c4f23c8a12.jpg"
          alt=""
        />
        <div className="order-content my-auto">
          <p className="h3 fav-order-title">{props.value.title}</p>
        </div>
        <div className="align-self-end">
          <i className="icon-fav">
            {fav ? (
              <FaHeart
                size="2rem"
                className="me-2 my-auto"
                // onClick={() => setFav(false)}
                onClick={() => FavChangeToServer()}
              />
            ) : (
              <FaRegHeart
                size="2rem"
                className="me-2 my-auto"
                onClick={() => setFav(true)}
              />
            )}
          </i>
          <p className="h3 order-price">TWD {props.value.price}</p>
        </div>
      </div>
    </>
  );
}

export default withRouter(FavoriteList);
