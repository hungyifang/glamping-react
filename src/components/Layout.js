import React from "react";
import Header from "./Header";
import Footer from "./Footer";
const Layout = (props) => {
  const { auth, setAuth } = props;
  return (
    <>
      <Header auth={auth} setAuth={setAuth} />
      {props.children}
      <Footer />
    </>
  );
};
export default Layout;
