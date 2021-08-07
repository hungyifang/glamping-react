import React from "react";
import Header from "./Header";
import Footer from "./Footer";
const Layout = (props) => {
  const { auth, setAuth, newCartsNum } = props;
  return (
    <>
      <Header auth={auth} setAuth={setAuth} newCartsNum={newCartsNum} />
      {props.children}
      <Footer />
    </>
  );
};
export default Layout;
