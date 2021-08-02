import React, { useState } from "react";
import EventCard from "./EventCard";

function EventDetailSuggestion(props) {
  const login = props.auth || false;
  const [auth, setAuth] = useState(login);

  return (
    <div className="container-fluid suggestion pri-light">
      <div className="row m-0">
        <div className="col-12 suggestion-title text-pri d-flex justify-content-center h1">
          猜你喜歡
        </div>
        <div className="d-flex suggest-card-wrapper">
          <EventCard
            auth={auth}
            suggestion={true}
            u_id={props.u_id}
            i_id={props.i_id}
          />
        </div>
      </div>
    </div>
  );
}

export default EventDetailSuggestion;
