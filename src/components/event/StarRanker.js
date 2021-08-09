import React from "react";
import { ReactComponent as HollowStar } from "../star_border.svg";

function StarRanker(props) {
  const { isDay, star } = props;
  const starColor = isDay ? "var(--c-pri)" : "var(--c-sec-light-night)";

  return (
    <div
      className="star-rate-bg h5 d-block m-0"
      style={{
        background: `linear-gradient(to right, ${starColor} ${
          star * 20
        }%, transparent ${star * 20}%)`,
      }}
    >
      <HollowStar />
      <HollowStar />
      <HollowStar />
      <HollowStar />
      <HollowStar />
    </div>
  );

}

export default StarRanker;
