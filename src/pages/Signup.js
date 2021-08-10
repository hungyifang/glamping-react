import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function Signup(props) {
  const { auth } = props;
  const [isWrong, setIsWrong] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [signuped, setSignuped] = useState(false);

  // TOTP INFO
  const [createdUsername, setCreatedUsername] = useState();
  //   const [totpURI, setTotpURI] = useState();
  const [totpQR, setTotpQR] = useState();

  const wrongBtn = (
    <button className="login-btn-wrong login-btn h2" type="reset">
      {errorMsg}
    </button>
  );
  const signupBtn = (
    <button className="login-btn-signin login-btn h2" type="submit">
      送出以註冊
    </button>
  );

  const beforeSignup = (
    <main className="container-fluid d-flex justify-content-center p-5">
      <form
        className="h3 col-8 row d-flex justify-content-center m-0"
        onChange={() => setIsWrong(false)}
        onSubmit={signup}
      >
        <input
          className="col-10 login-input"
          type="text"
          placeholder="使用者名稱"
          name="username"
        />
        <input
          className="col-10 login-input"
          type="password"
          placeholder="密碼"
          name="password"
        />
        <div className="login-btn-group col-10 row d-flex justify-content-center p-0">
          {isWrong ? wrongBtn : signupBtn}
        </div>
      </form>
    </main>
  );
  const afterSignup = (
    <main className="signup-text container-fluid d-flex flex-column justify-content-center p-5 position-relative">
      <img
        className="login-hint position-absolute top-0"
        src="http://localhost:8080/images/login_hint.png"
        alt="登入提示箭號"
      />
      <div className="text-center">
        <h2>「{createdUsername}」註冊成功</h2>
      </div>
      <div className="text-center">
        <img
          className="col-3"
          src={totpQR}
          //   src="https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=otpauth://totp/%E5%B1%B1%E8%A7%92%E8%A1%8C%3Ashipmaster%3Fsecret=QC3AKRMU4M5LWAP47PZVLGVIR7HQFK7E%26issuer=%E5%B1%B1%E8%A7%92%E8%A1%8C"
          alt="兩步驟登入金鑰"
        />
        <h3 className="mt-2">請設定兩步驟登入後，點選右上角登入。</h3>
      </div>
    </main>
  );

  const display = signuped ? afterSignup : beforeSignup;

  async function signup(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const url = `http://localhost:8080/api/auth/signup`;

    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify({
        username: formdata.get("username"),
        password: formdata.get("password"),
      }),
      //   withCredentials: true,
      //   credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    console.log("伺服器回傳的json資料", data.status);
    if (data.status === 1) {
      setCreatedUsername(data.username);
      //   setTotpURI(data.totp_uri);
      setTotpQR(data.totp_qr);
      setSignuped(true);
    } else if (data.status === 0) {
      setErrorMsg(data.msg);
      setIsWrong(true);
    }
  }

  return <>{auth ? <Redirect to="/member" /> : display}</>;
}

export default Signup;
