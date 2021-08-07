import React from "react";
import Header from "./Header";
import Footer from "./Footer";
const Layout = (props) => {
  const { auth, setAuth, isDay } = props;
  return (
    <>
      <Header auth={auth} setAuth={setAuth} isDay={isDay} />
      {props.children}
      <Footer />
    </>
  );
};
export default Layout;
