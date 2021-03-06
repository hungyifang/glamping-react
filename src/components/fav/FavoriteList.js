import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { FaHeartBroken, FaRegHeart } from "react-icons/fa";

function FavoriteList(props) {
  const { value, setFavList } = props;
  const [fav, setFav] = useState(true);

  // 送出「取消收藏」請求
  async function FavChangeToServer() {
    const url = `http://localhost:8080/api/fav/${value.u_id}/${value.i_id}`;
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify({ able: 0 }),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      console.log(123);
      if (data.status === 1) getUserDataFromServer();
    } catch (err) {
      console.error(err);
    }
  }

  // 重新整理收藏列表
  async function getUserDataFromServer() {
    const url = `http://localhost:8080/api/fav/${value.u_id}`;
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    setFavList(data);
    console.log(data);
  }

  return (
    <>
      <div className="fav-order d-flex justify-content-between ">
        <Link to={`/event-detail/${value.i_id}`}>
          <div>
            <img
              className="fav-order-image"
              src={`http://localhost:8080/images/pic/event/${value.img_src}`}
              alt="當地活動圖片"
            />
          </div>
        </Link>

        <div className="order-content my-auto">
          <Link to={`/event-detail/${value.i_id}`}>
            <p className="h3 fav-order-title">{value.title}</p>
          </Link>
        </div>

        <div className="align-self-end">
          <i className="icon-fav">
            {fav ? (
              <FaHeartBroken
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
          <p className="h3 order-price">TWD {value.price}</p>
        </div>
      </div>
    </>
  );
}

export default withRouter(FavoriteList);
