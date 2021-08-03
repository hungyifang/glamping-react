import React, { useState, useEffect } from "react";

function CustomizedRight(props) {
  const { i_id, data, linkId } = props;

  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");

  let contentProduce = function () {
    //   利用i_id抓需要的物件
    let itemData = data.filter((e) => e.i_id === Number(i_id));
    // 解決i_id為空的問題
    let itemTitle = i_id ? itemData[0].title : "";
    let itemArticle = i_id ? itemData[0].article : "";
    setTitle(itemTitle);
    setArticle(itemArticle);
  };

  //   選項改變就改變文字生成
  useEffect(() => {
    contentProduce();
  }, [i_id]);
  return (
    <>
      <div class="item-evenBackground" id={linkId}>
        <div class="p-4 d-flex">
          {/* <!-- 商品敘述 --> */}
          <div class="col cus-item-text">
            <h3>{title}</h3>
            <p>{article}</p>
          </div>
          {/* <!-- 商品大圖 --> */}
          <div class="item-bigPicture col-5">
            <img class="pic-100" src="" alt="" />
          </div>
        </div>
        {/* <!-- 商品小圖區 --> */}
        <div class="d-flex justify-content-between">
          <div class="item-smallPicture col">
            <img class="pic-100 col" src="" alt="" />
          </div>
          <div class="item-smallPicture col">
            <img class="pic-100" src="" alt="" />
          </div>
          <div class="item-smallPicture col">
            <img class="pic-100" src="" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomizedRight;
