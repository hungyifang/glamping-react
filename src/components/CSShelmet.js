import React from "react";
import { Helmet } from "react-helmet";

function CSShelmet(props) {
  const isDay = props.isDay;
  const cssLink = isDay ? "day" : "night";

  return (
    <Helmet>
      <link type="text/css" rel="stylesheet" href={`./styles/${cssLink}.css`} />
    </Helmet>
  );
}

export default CSShelmet;
