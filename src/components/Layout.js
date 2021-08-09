import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CSShelmet from "../components/CSShelmet";

const Layout = (props) => {
  const { auth, setAuth, isDay, virgin, newCartsNum } = props;
  return (
    <>
      <CSShelmet isDay={isDay} />
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
