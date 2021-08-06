import React, { useState, useEffect } from "react";

function Settings(props) {
  const { u_id } = props;
  // const [userData, setUserData] = useState([]);

  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");

  async function getUserDataFromServer(u_id) {
    // 連接的伺服器資料網址
    const url = `http://localhost:8080/api/users/${u_id}`;

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    // 設定資料
    // setUserData(data)
    setFirstname(data.first_name);
    setLastname(data.last_name);
    setGender(data.gender);
    setBirthday(data.birthday);
    setTel(data.tel);
    setEmail(data.email);
  }

  async function updateUserToSever() {
    const newData = { first_name, last_name, gender, birthday, tel, email };

    // 連接的伺服器資料網址
    const url = `http://localhost:8080/api/users/${u_id}`;

    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    console.log(JSON.stringify(newData));

    const response = await fetch(request);
    const data = await response.json();

    console.log("伺服器回傳的json資料", data);
  }

  useEffect(() => {
    getUserDataFromServer(u_id);
  }, []);

  return (
    <>
      <main>
        <article className="article">
          <div className="h1 member-section-title">帳號設定</div>
          <div className="member-form">
            <div className="row form-input">
              <div className="col-3 mb-5 mb-sm-3 me-4">
                <label htmlFor="" className="h4">
                  姓氏
                </label>
                <input
                  className="input-member"
                  type="text"
                  placeholder="姓氏"
                  aria-label="Last name"
                  name="last_name"
                  value={last_name}
                  onChange={(event) => {
                    setLastname(event.target.value);
                  }}
                  required
                />
              </div>

              <div className="col-3 mb-sm-3 mb-5">
                <label htmlFor="" className="h4">
                  名字
                </label>
                <input
                  className="input-member"
                  type="text"
                  placeholder="名字"
                  aria-label="First name"
                  name="first_name"
                  value={first_name}
                  onChange={(event) => {
                    setFirstname(event.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="row form-input">
              <div className="col-3 mb-5 mb-sm-3 me-4">
                <label htmlFor="" className="h4">
                  性別
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="gender"
                  value={gender}
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                  required
                >
                  <option value="">性別</option>
                  <option value="1">男</option>
                  <option value="2">女</option>
                </select>
              </div>

              <div className="col-3 mb-5 mb-sm-3">
                <label htmlFor="" className="h4">
                  出生日期
                </label>
                <input
                  type="date"
                  className="input-member birthday"
                  placeholder="出生日期"
                  name="birthday"
                  value={birthday}
                  onChange={(event) => {
                    setBirthday(event.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="row form-input">
              <div className="col-3 mb-5 mb-sm-3 me-4">
                <label htmlFor="" className="h4">
                  連絡電話
                </label>
                <input
                  className="input-member"
                  type="text"
                  placeholder=" 連絡電話"
                  aria-label="tel"
                  name="tel"
                  value={tel}
                  onChange={(event) => {
                    setTel(event.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-3 mb-5 mb-sm-3">
                <label htmlFor="" className="h4">
                  電子郵件
                </label>
                <input
                  className="input-mail"
                  type="text"
                  placeholder=" 電子郵件"
                  aria-label="mail"
                  name="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="row btn-store !important !important">
              <div className="col-12 d-flex justify-content-end mt-5 mt-sm-3">
                <button
                  onClick={() => {
                    updateUserToSever();
                  }}
                  type="submit"
                  className="btn-outline btn-storage"
                >
                  儲存
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
export default Settings;
