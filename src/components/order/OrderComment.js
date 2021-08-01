import React from "react";
import { RatingView } from "react-simple-star-rating";

function OrderComment(props) {
  // const [orderUnComment, setOrderUnComment] = useState("OrderComment");
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
              <RatingView ratingValue={props.comment.score} />
            </div>
          </div>
          <div className="comment">
            <div className="d-flex flex-column">
              <p className="h2 comment-title">{props.comment.title}</p>
              <div className="h4 comment-content">
                <p>{props.comment.article}</p>
              </div>
              <div className="h5 comment-time">
                {props.comment.created} 評論
              </div>
            </div>
            <div className="new-comment d-flex justify-content-end">
              <button
                className="new-comment-btn btn-outline"
                onClick={() => {
                  props.setIsComment(false);
                }}
              >
                修改
              </button>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

export default OrderComment;
