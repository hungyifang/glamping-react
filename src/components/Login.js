import React from "react";
import Modal from "react-modal";
import "../styles/login.css";

function Login(props) {
  return (
    <Modal
      className="login-modal row"
      overlayClassName="Overlay"
      isOpen={props.modalIsOpen}
      onRequestClose={props.onRequestClose}
      contentLabel="登入視窗"
    >
      <div className="login-modal-title col-12 d-flex justify-content-center align-items-center">
        <h1 className="login-modal-h1">山角行</h1>
      </div>
      <div className="icon-login d-flex justify-content-center col-12">
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
      </div>
      <div className="h3 col-12 row d-flex justify-content-center m-0">
        <input
          className="col-10 login-input"
          type="text"
          placeholder="手機 / 使用者名稱 / 電子郵件位址"
          name="account"
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
          <button className="login-btn-signin login-btn h2">登入</button>
        </div>
      </div>
    </Modal>
  );
}

export default Login;
