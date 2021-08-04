import React, { useEffect, createRef, useState } from "react";
import lottie from "lottie-web";
import { Modal } from "react-bootstrap";

function Intro() {
  let animationContainer = createRef();
  let animationContainermap = createRef();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // handleClick = () => {
  //      this.SubInput.handleFocus();

  // };

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/intro_banner.json", // JSON文件路徑
    });
    anim.setSpeed(0.5);

    const animmap = lottie.loadAnimation({
      container: animationContainermap.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      id: "iconPin1",
      path: "/animations/intro_main.json", // JSON文件路徑
    });
    animmap.setSpeed(1);
    animmap.addEventListener("DOMLoaded", () => {
      console.log(document.getElementById("iconPin1"));
    });
  }, []);

  return (
    <>
      <main className="container-fluid p-0">
        <div ref={animationContainer}></div>
        <article ref={animationContainermap} className="mt-4">
          <div id="iconPin1" onClick={handleShow}>
            <Modal show={show} onHide={handleClose}>
              <Modal.Body>123</Modal.Body>
            </Modal>
          </div>
        </article>
        <div id="pin-icon2"></div>
        <div id="pin-icon3"></div>
      </main>
    </>
  );
}

export default Intro;
