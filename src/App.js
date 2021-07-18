import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import Event from "./pages/Event";
import EventDetail from "./pages/EventDetail";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Layout>
            <Route exact path="/"></Route>
            <Route exact path="/event">
              <Event />
            </Route>
            <Route path="/event/:i_id?">
              <EventDetail />
            </Route>
          </Layout>
        </Switch>
      </ScrollToTop>
    </Router>
  );
}
export default App;
