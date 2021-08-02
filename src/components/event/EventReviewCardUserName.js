import React, { useEffect, useState } from "react";
const axios = require("axios").default;

function EventReviewCardUserName(props) {
  const [name, setName] = useState("");
  async function findName() {
    let result = await axios.get(
      "http://localhost:8080/api/event/review/name",
      {
        params: {
          u_id: props.u_id,
        },
      }
    );
    result = result.data[0][0].username;
    // console.log(result);
    setName(result);
  }
  useEffect(() => {
    findName();
  }, []);
  // useEffect(() => {
  //   console.log(name);
  // }, [name]);
  return (
    <>
      <span className="text-pri">{name}</span>
    </>
  );
}

export default EventReviewCardUserName;
