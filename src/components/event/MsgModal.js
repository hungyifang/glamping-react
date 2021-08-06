import React from "react";
import Modal from "react-modal";

function MsgModal(props) {
  return (
    <Modal
      className="event-modal row"
      overlayClassName="Overlay"
      isOpen={props.modalIsOpen}
      onRequestClose={props.onRequestClose}
      contentLabel="訊息提示視窗"
      ariaHideApp={false}
    >
      <div className="login-modal-title col-12 d-flex justify-content-center align-items-center">
        <h1 className="login-modal-h1 m-0">山角行</h1>
      </div>

      <h2 className="col-12 text-center text-pri h2 my-4">{props.text}</h2>
      <div className="col-12 d-flex justify-content-center align-items-center">
        <div
          className="btn-outline d-flex justify-content-center align-items-center my-3"
          role="button"
          onClick={() => {
            props.onRequestClose();
          }}
        >
          <span className="text-pri">關閉</span>
        </div>
      </div>
    </Modal>
  );
}

export default MsgModal;
