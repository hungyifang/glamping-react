import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/login.css";

function Login(props) {
  const [isWrong, setIsWrong] = useState(false);
  const wrongBtn = (
    <button className="login-btn-wrong login-btn h2" type="reset">
      帳號或密碼錯誤
    </button>
  );
  const loginBtn = (
    <button className="login-btn-signin login-btn h2" type="submit">
      登入
    </button>
  );

  async function login(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    let username = formdata.get("username");
    let password = formdata.get("password");
    const url = `http://localhost:8080/api/auth/login?username=${username}&password=${password}`;

    const request = new Request(url, {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    console.log("伺服器回傳的json資料", data.status);
    if (data.status === 1) {
      localStorage.setItem("u_id", data.u_id);
      props.setAuth(true);
      props.onRequestClose();
    } else if (data.status === 0) {
      setIsWrong(true);
    }
  }

  return (
    <Modal
      className="login-modal row"
      overlayClassName="Overlay"
      isOpen={props.modalIsOpen}
      onRequestClose={props.onRequestClose}
      contentLabel="登入視窗"
      ariaHideApp={false}
    >
      <div className="login-modal-title col-12 d-flex justify-content-center align-items-center">
        <h1 className="login-modal-h1">山角行</h1>
      </div>
      {/* <div className="icon-login d-flex justify-content-center col-12">
        <a href="/">
          <img src="images/logoin/fb.svg" alt="" />
        </a>
        <a href="/">
          <img src="images/logoin/line.svg" alt="" />
        </a>
        <a href="/">
          <img src="images/logoin/google.svg" alt="" />
        </a>
      </div>

      <div className="demarcation col-12">
        <span className="line"></span>
        <span className="txt">或</span>
        <span className="line"></span>
      </div> */}
      <form
        className="h3 col-12 row d-flex justify-content-center m-0"
        onChange={() => setIsWrong(false)}
        onSubmit={login}
      >
        <input
          className="col-10 login-input"
          type="text"
          placeholder="手機 / 使用者名稱 / 電子郵件位址"
          name="username"
        />
        <input
          className="col-10 login-input"
          type="password"
          placeholder="密碼"
          name="password"
        />
        <div className="login-btn-group col-10 row d-flex justify-content-between p-0">
          <button className="login-btn-link login-btn h2">忘記密碼</button>
          <button className="login-btn-link login-btn h2">註冊</button>
          {isWrong ? wrongBtn : loginBtn}
        </div>
      </form>
    </Modal>
  );
}

export default Login;
