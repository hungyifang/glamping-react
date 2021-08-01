import React, { useState, useEffect } from "react";
import "../../styles/myfav.css";
import FavoriteList from "./FavoriteList";

function Myfav() {
  //登入後使用者代入
  const id = "14";
  const [favList, setFavList] = useState([]);

  //從API SERVER抓資料
  async function getUserDataFromServer() {
    const url = `http://localhost:8080/api/fav/${id}`;
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    setFavList(data);
    console.log(data);
  }

  useEffect(() => {
    getUserDataFromServer(id);
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