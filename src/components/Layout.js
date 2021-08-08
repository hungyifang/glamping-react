import React from "react";
import Header from "./Header";
import Footer from "./Footer";
const Layout = (props) => {
  const { auth, setAuth, isDay, virgin, newCartsNum } = props;
  return (
    <>
      <Header
        auth={auth}
        setAuth={setAuth}
        isDay={isDay}
        virgin={virgin}
        newCartsNum={newCartsNum}
      />
      {props.children}
      <Footer virgin={virgin} />
    </>
  );
};
export default Layout;
