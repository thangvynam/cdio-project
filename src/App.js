import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./frontend/components/decuongmonhoc/index/index";
import Index from "./frontend/Index/Index";
import Page404 from "./frontend/NotFound/Page404";
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/de-cuong-mon-hoc/:type" component={Dashboard} />
        <Route exact path="/" component={Index} />
        <Route component={Page404} />
      </Switch>
    );
  }
}
export default App;
