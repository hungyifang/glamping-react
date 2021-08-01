import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";

function OrderUnComment(props) {
  const [title, setTitle] = useState(props.comment.title);
  const [article, setArticle] = useState(props.comment.article);
  const [score, setScore] = useState(props.comment.score);
  const o_id = props.o_id;
  const u_id = props.u_id;

  const handleRating = (rate) => {
    setScore(rate);
  };

  useEffect(() => {
    console.log("s" + score);
  }, [score]);

  async function addCommentToSever() {
    const newData = { u_id, o_id, title, article, score };

    // 連接的伺服器資料網址
    const url = `http://localhost:8080/api/comment/${props.o_id}`;

    //從API SERVER抓資料
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    console.log(JSON.stringify(newData));

    const response = await fetch(request);
    const data = await response.json();

    console.log(data);
  }
  return (
    <>
      <main>
        <article className="comment-article d-flex flex-column">
          <div className="h1 comment-section-title">旅客評論</div>
          <div className="d-flex align-items-center">
            {/* 從資料庫連結 */}
            <img
              className="small-cricle me-3"
              src="https://picsum.photos/80/80?random=1"
              alt="個人資料圖片"
            />
            <div className="App">
              <Rating onClick={handleRating} ratingValue={score} />
            </div>
          </div>
          <div className="comment">
            <div className="d-flex flex-column">
              <lable className="comment-text h4">標題</lable>
              <input
                className="usercomment-title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
              <lable className="comment-text h4">想對我們說 ...</lable>
              <textarea
                className="usercomment-article"
                value={article}
                onChange={(event) => {
                  setArticle(event.target.value);
                }}
              />
              <div className="new-comment d-flex justify-content-end mt-4">
                <button
                  className="new-comment-btn btn-outline"
                  onClick={() => {
                    addCommentToSever();
                  }}
                >
                  送出
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

export default OrderUnComment;
