import React from "react";
import EventCard from "./EventCard";

function EventDetailSuggestion(props) {
  const auth = props.auth;
  // const [auth, setAuth] = useState(login);

  return (
    <div className="container-fluid suggestion">
      <div className="row m-0">
        <div className="col-12 suggestion-title d-flex justify-content-center h1 mb-5">
          {auth ? "猜你喜歡" : "熱銷推薦"}
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
