import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "../styles/comment.css";
import MobileMemberNav from "../components/MobileMemberNav";
import OrderCard from "../components/order/OrderCard";
import OrderComment from "../components/order/OrderComment";
import OrderUnComment from "../components/order/OrderUnComment";
// import OrderEditComment from '../components/OrderEditComment'

function Comment(props) {
  let o_id = props.match.params.id;
  // 評論API

  const [comment, setComment] = useState([]);
  const [orders, setOrders] = useState([]);

  const [iscomment, setIsComment] = useState(true);
  // const [update, setUpdate] = useState([])

  //從API SERVER抓資料
  async function getCommentFromServer(id) {
    const url = `http://localhost:8080/api/comment/${id}`;
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    console.log(data.length);
    if (data.length === 1) {
      setComment(data[0]);
    } else {
      setIsComment(false);
    }
  }

  async function getOrdersFromServer(o_id) {
    const url = `http://localhost:8080/api/orderview/${o_id}`;
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    });

    const response = await fetch(request);
    const order = await response.json();

    setOrders(order);
    console.log("UID" + order.u_id);
  }

  useEffect(() => {
    // let o_id = props.match.params.id
    getCommentFromServer(o_id);
  }, []);

  useEffect(() => {
    // let o_id = props.match.params.id
    // let o_id = 3
    getOrdersFromServer(o_id);
  }, []);

  return (
    <>
      <div className="container-fluid g-0">
        <div className="rwd-title d-flex justify-content-center align-items-center">
          <p className="h1 title-text">行程管理</p>
        </div>
      </div>

      <div className="container-fluid g-0 d-flex justify-content-center">
        <div className="main-content d-flex justify-content-between">
          <div className="container-fluid p-0">
            <OrderCard orders={orders} />
          </div>
          {/* 有留言與未留言 */}
          {iscomment ? (
            <OrderComment comment={comment} setIsComment={setIsComment} />
          ) : (
            <OrderUnComment o_id={o_id} u_id={orders.u_id} comment={comment} />
          )}
          {/* <OrderComment update={update} />
          <OrderEditComment setUpdate={setUpdate} /> */}
        </div>
      </div>
      <MobileMemberNav />
    </>
  );
}

export default withRouter(Comment);
