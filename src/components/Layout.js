import React from "react";
import Header from "./Header";
import Footer from "./Footer";
const Layout = (props) => {
  const { auth, setAuth, isDay, newCartsNum } = props;
  return (
    <>
      <Header
        auth={auth}
        setAuth={setAuth}
        isDay={isDay}
        newCartsNum={newCartsNum}
      />
      {props.children}
      <Footer />
    </>
  );
};
export default Layout;
