import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
const axios = require("axios").default;

function EventSection() {
  const [sections, setSections] = useState([]);
  //從API SERVER抓資料
  async function loadEventSection() {
    let result = await axios.get("http://localhost:8080/api/event/section");
    result = result.data[0];
    setSections(result);
  }

  useEffect(() => {
    loadEventSection();
  }, []);
  // useEffect(() => {
  //   console.log(sections);
  // }, [sections]);

  const display = sections.map((section, index) => {
    return (
      <section
        className="bg-deep section"
        id={`section${index + 1}`}
        key={index}
        c_id={section.c_id}
      >
        <div className="h1 event-section-title col">{section.title}</div>
        <div className="h4 event-section-subtitle col">
          {section.c_id === 23
            ? "活著是一種美好, 應該用盡全力去珍惜, 從生活中體驗學習, 快來報名活動 !"
            : "生活是否太繁忙需要喘口氣, 別猶豫快來放鬆一下找回自我 !"}
        </div>
        <div className="card-wrapper d-flex col-auto mx-auto">
          <EventCard c_id={section.c_id} suggestion={false} />
        </div>
      </section>
    );
  });
  return <>{display}</>;
}

export default EventSection;
