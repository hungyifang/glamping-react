import React, { useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "../styles/carts.css";
import CartsCheckbox from "../components/carts/CartsCheckbox";
import MsgModal from "../components/event/MsgModal";

function Carts(props) {
  const { auth } = props;
  if (auth) {
    putU_idToData();
  }

  // console.log(auth);
  const [allAgree, setAllAgree] = useState(false);
  const [allTotal, setAllTotal] = useState(0);
  const [orderedData, setOrderedData] = useState([]);
  const [checkboxArray, setCheckboxArray] = useState([]);
  const [selectAllArr, setSelectAllArr] = useState([]);
  const [msg, setMsg] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // 抓取localstorage orderData資料
  function setData() {
    setOrderedData(JSON.parse(localStorage.getItem("orderData")));
  }
  // 判斷有登入把u_id塞回去
  function putU_idToData() {
    if (JSON.parse(localStorage.getItem("orderData"))) {
      let localU_id = JSON.parse(localStorage.getItem("u_id"));
      let data = JSON.parse(localStorage.getItem("orderData"));
      for (let i = 0; i < data.length; i++) {
        data[i]["u_id"] = localU_id;
      }
      localStorage.setItem("orderData", JSON.stringify(data));
    }
  }
  // 設定總價
  function total() {
    let result = 0;
    if (orderedData) {
      for (let i = 0; i < orderedData.length; i++) {
        result += orderedData[i].total;
        setAllTotal(result);
      }
    }
  }
  // 設定checkArray
  function setCheck(id) {
    if (checkboxArray.find((element) => element === id)) {
      const newCheckboxArray = checkboxArray.filter((v) => v !== id);
      setCheckboxArray(newCheckboxArray);
      // console.log(checkboxArray);
    } else {
      setCheckboxArray([...checkboxArray, id]);
      // console.log(checkboxArray);
    }
  }
  // 全選

  function selectAll() {
    if (allAgree) {
      for (let i = 0; i < orderedData.length; i++) {
        setSelectAllArr([]);
        selectAllArr.push(orderedData[i].o_id);
        if (i + 1 === orderedData.length) {
          setCheckboxArray(selectAllArr);
          // console.log(selectAllArr);
        }
      }
    }
  }
  // 刪除ordered資料表資料
  async function deleteToSever() {
    let objData = [];
    for (let i = 0; i < checkboxArray.length; i++) {
      objData.push({ o_id: checkboxArray[i] });
    }
    const url = "http://localhost:8080/api/orders/delete";
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "DELETE",
      body: JSON.stringify(objData),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
  }

  // 多重刪除
  function moreDelete() {
    const newData = [];
    for (let i = 0; i < orderedData.length; i++) {
      if (checkboxArray.find((element) => element === orderedData[i].o_id))
        continue;
      newData.push(orderedData[i]);

      setOrderedData(newData);
      // 資料表刪除資料
      deleteToSever();
      // 重製選擇到的checkbox
      setCheckboxArray([]);
      // console.log(checkboxArray);
      // 更新localstorage
      localStorage.setItem("orderData", JSON.stringify(newData));
    }
    // 處理全部刪除
    if (checkboxArray.length === orderedData.length) {
      setOrderedData([]);
      // 資料表刪除資料
      deleteToSever();
      // 重製選擇到的checkbox
      setCheckboxArray([]);
      // 更新localstorage
      localStorage.removeItem("orderData");
    }
  }
  console.log(checkboxArray);
  useEffect(() => {
    document.title = "山角行 - 購物車";
    setData();
  }, []);
  useEffect(() => {
    total();
    selectAll();
  }, [orderedData, allAgree]);
  return (
    <>
      <div className="container-fluid g-0">
        <div className="cart-info d-flex flex-column">
          <div className="h1 cart-title">購物車</div>
          {orderedData &&
            orderedData.map((value) => (
              <CartsCheckbox
                key={value.o_id}
                allAgree={allAgree}
                value={value}
                setCheck={setCheck}
                setCheckboxArray={setCheckboxArray}
                moreDelete={moreDelete}
                setIsOpen={setIsOpen}
                setMsg={setMsg}
              />
            ))}
          <h1 className=" cart-title">
            {JSON.parse(localStorage.getItem("orderData"))
              ? ""
              : "空空如也~~  快點去選購新的行程啦"}
          </h1>
          <div className="d-flex align-items-center justify-content-start input-total">
            <input
              type="checkbox"
              className="input-all carts-input"
              checked={allAgree}
              onChange={(e) => {
                setAllAgree(e.target.checked);
              }}
            />
            <p className="h3 input-all">
              全選
              {/* 全選({orderedData ? orderedData.length : ""}) */}
            </p>
            <button
              // type="submit"
              className="btn-outline btn-delete"
              onClick={() => {
                moreDelete();
              }}
            >
              刪除已選項目
            </button>
          </div>
          <div className="d-flex justify-content-end total-sum">
            <p className="h3 total">
              {orderedData ? orderedData.length : ""} 件商品合計
            </p>
            <p className="h2 sum">TWD {allTotal}</p>
            <button
              type=""
              className="btn-action btn-checktotal"
              onClick={() => {
                if (localStorage.getItem("u_id")) {
                  props.history.push({
                    pathname: `/checkout`,
                  });
                } else {
                  // alert("請先登入");
                  setMsg("請先登入會員！");
                  setIsOpen(true);
                }
              }}
            >
              確認
            </button>
          </div>
        </div>
      </div>
      <MsgModal
        modalIsOpen={modalIsOpen}
        onRequestClose={closeModal}
        text={msg}
      />
    </>
  );
}

export default withRouter(Carts);
