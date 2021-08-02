import React from "react";
import parse from "html-react-parser";

function EventDetailInfo(props) {
  // 轉換字串成HTML
  const itemInfo = parse(props.article);

  return (
    <div className="col-lg-6 col-12">
      <div className="h1 description-title">商品資訊</div>
      {/* 從資料庫拿HTML文章 */}
      {itemInfo}
    </div>
  );
}

export default EventDetailInfo;
