import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { VscSettingsGear } from "react-icons/vsc";
import { HiOutlineTicket } from "react-icons/hi";
import { FaRegListAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdPhotoCamera } from "react-icons/md";
import { Modal, Form } from "react-bootstrap";

function MemberNav(props) {
  const u_id = localStorage.getItem("u_id");
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getUserDataFromServer(u_id) {
    // 連接的伺服器資料網址
    const url = `http://localhost:8080/api/users/${u_id}`;

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    console.log(data);
    setUserData(data);
  }

  useEffect(() => {
    getUserDataFromServer(u_id);
  }, []);

  //上傳圖片預覽
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  // const [repeat, setRepeat] = useState("");

  const fileInputRef = useRef(null);

  // 當檔案有變化時，更新preview網址
  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // component unmounted時，清除記憶體
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!show) {
      setSelectedFile(null);
    }
  }, [show]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const resetFile = (event) => {
    event.preventDefault();
    // 清除所選的檔案，fileInputRef
    fileInputRef.current.value = null;
    setSelectedFile(null);
  };

  //上傳圖片
  async function uploadImageToServer(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    if (formdata.get("avatar").name) {
      const url = `http://localhost:8080/api/avatar/${u_id}`;
      const request = new Request(url, {
        method: "POST",
        body: formdata,
      });
      try {
        const response = await fetch(request);
        const data = await response.json();
        if (data.status === 1) {
          handleClose();
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  function handleAvatarError(e) {
    e.target.onerror = null;
    e.target.src = "http://localhost:8080/images/example.jpg";
  }

  return (
    <>
      <aside className="left-aside d-flex align-content-center flex-md-column flex-md-wrap flex-sm-row align-items-sm-center">
        <img
          className="avatar-img"
          // src="https://picsum.photos/200/200?random=1"
          src={`http://localhost:8080/images/avatar/${u_id}.jpeg`}
          alt="個人資料圖片"
          onError={handleAvatarError}
        />

        <div>
          <div className="change-pic">
            <MdPhotoCamera
              className="icon-camera"
              style={{ cursor: "pointer" }}
              onClick={handleShow}
            />
          </div>
        </div>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <p className="upload-title h2">上傳大頭貼</p>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={uploadImageToServer}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  type="file"
                  name="avatar"
                  id="upload_img"
                  className="mb-3 modal-input-btn"
                  accept="image/jpeg"
                  onChange={onSelectFile}
                  ref={fileInputRef}
                />
                {preview && (
                  <div style={{ textAlign: "center" }}>
                    <img
                      className="preview-img"
                      src={preview}
                      alt="個人資料相片預覽"
                      title="個人資料相片預覽"
                    />
                    <div className="mt-4 d-flex gap-4 justify-content-center">
                      {/* <TiDelete
                      size="48px"
                      color="secondary"
                      onClick={resetFile}
                      title="重置"
                      className="close"
                    /> */}{" "}
                      <button
                        className="btn-outline modal-btn-text"
                        variant="mute"
                        title="重設"
                        onClick={resetFile}
                      >
                        重設
                      </button>
                      <button
                        type="submit"
                        variant="dark"
                        title="上傳"
                        className="btn-outline modal-btn-text"
                        // onClick={(e) => {
                        //   uploadImageToServer(e.target);
                        // }}
                        // onClick={uploadImageToServer}
                      >
                        上傳
                      </button>
                    </div>
                  </div>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
        <p className="h1 id-name mx-sm-auto">{userData.username}</p>
      </aside>
      <div className="nav-sub-menu h2">
        <ul>
          <li>
            <NavLink as={NavLink} exact to="/member">
              <VscSettingsGear className="icon m-3" size="2rem" />
              帳號設定
            </NavLink>
          </li>
          <li>
            <NavLink as={NavLink} to="/member/point">
              <HiOutlineTicket className="icon m-3" size="2rem" />
              點數管理
            </NavLink>
          </li>
          <li>
            <NavLink as={NavLink} to="/member/order">
              <FaRegListAlt className="icon m-3" size="2rem" />
              行程管理
            </NavLink>
          </li>
          <li>
            <NavLink as={NavLink} to="/member/favorite">
              <FaRegHeart className="icon m-3" size="2rem" />
              我的收藏
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MemberNav;
