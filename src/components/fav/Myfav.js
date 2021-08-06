import React, { useState, useEffect } from "react";
import "../../styles/myfav.css";
import FavoriteList from "./FavoriteList";

function Myfav(props) {
  const { u_id } = props;
  const [favList, setFavList] = useState([]);

  //從API SERVER抓資料
  async function getUserDataFromServer(u_id) {
    const url = `http://localhost:8080/api/fav/${u_id}`;
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

  useEffect(() => {
    getUserDataFromServer(u_id);
  }, []);

  return (
    <>
      <main>
        <article className="article d-flex flex-column">
          <div className="h1 fav-section-title">我的收藏</div>
          <div className="h1 section-titleChange">收藏</div>
          {favList.map((value, index) => {
            return (
              <FavoriteList value={value} key={index} setFavList={setFavList} />
            );
          })}
        </article>
      </main>
    </>
  );
}

export default Myfav;
