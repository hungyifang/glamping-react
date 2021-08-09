import React, { useEffect, createRef } from "react";
import lottie from "lottie-web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Intro(props) {
  const { isDay } = props;

  let animationContainer = createRef();
  let animationContainerNight = createRef();
  // let animationContainermap = createRef();

  // const headerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/intro_banner.json", // JSON文件路徑
    });
    anim.setSpeed(0.5);

    const animnight = lottie.loadAnimation({
      container: animationContainerNight.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/intro_banner_night.json", // JSON文件路徑
    });
    animnight.setSpeed(0.5);

    LottieScrollTrigger({
      target: "#map",
      path: "/animations/intro_main.json",
      speed: "medium",
      pin: ".article",
      start: "top top",
      scrub: true,
      markers: false,
      toggleActions: "play none none reverse",
    });

    function LottieScrollTrigger(vars) {
      let playhead = { frame: 0 },
        target = gsap.utils.toArray(vars.target)[0],
        speeds = { slow: "+=3000", medium: "+=1000", fast: "+=500" },
        st = {
          trigger: target,
          pin: true,
          start: "top top",
          end: speeds[vars.speed] || "+=300%",
          scrub: 1,
        },
        animation = lottie.loadAnimation({
          container: target,
          renderer: vars.renderer || "svg",
          loop: false,
          autoplay: false,
          path: vars.path,
        });

      //標記
      for (let p in vars) {
        // let users override the ScrollTrigger defaults
        st[p] = vars[p];
      }

      animation.addEventListener("DOMLoaded", function () {
        gsap.to(playhead, {
          frame: animation.totalFrames - 1,
          ease: "none",
          onUpdate: () => animation.goToAndStop(playhead.frame, true),
          scrollTrigger: st,
        });
      });
    }
  }, []);

  return (
    <>
      <main
        className="container-fluid
      p-0"
      >
        <div ref={animationContainer} className="intro-map"></div>
        <div ref={animationContainerNight} className="intro-map-night"></div>
        <article id="map" className="mt-4"></article>
      </main>
    </>
  );
}

export default Intro;
