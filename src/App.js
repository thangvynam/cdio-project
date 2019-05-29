import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./frontend/components/decuongmonhoc/index/index";
// import Index from "./frontend/Index/Index";
import Home from "./frontend/components/trangchu/index";
import Subject from "./frontend/components/trangchu/subjects";
import Page404 from "./frontend/NotFound/Page404";
import Login from "../src/frontend/CDIO1/containers/Login";
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/home" component={Home} /> */}
        <Route exact path="/:parent/" component={Subject} />
        <Route exact path="/:parent/:ctdt/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/:khoi/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/:khoi/:monhoc/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/:khoi/:monhoc/:tab" component={Subject} />
        <Route component={Page404}/>
      </Switch>
    );
  }
}
export default App;
