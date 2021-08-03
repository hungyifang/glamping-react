import React, { useState, useEffect } from "react";

function CustomizedLink(props) {
  const { inputWhere, inputStyle, inputFood, inputItem } = props;
  // 文字客製化錨點
  const linkLevel = (
    <>
      <a href="#linkLevel">
        <li>地區風景</li>
      </a>
    </>
  );
  const linkStyle = (
    <>
      <a href="#linkStyle">
        <li>帳篷樣式</li>
      </a>
    </>
  );
  const linkFood = (
    <>
      <a href="#linkFood">
        <li>美食佳餚</li>
      </a>
    </>
  );
  const linkItem = (
    <>
      <a href="#linkItem">
        <li>氣氛娛樂</li>
      </a>
    </>
  );
  return (
    <>
      <ul className="d-flex cus-display-link justify-content-center">
        {inputWhere && linkLevel}
        {inputStyle && linkStyle}
        {inputFood && linkFood}
        {inputItem && linkItem}
      </ul>
    </>
  );
}

export default CustomizedLink;
