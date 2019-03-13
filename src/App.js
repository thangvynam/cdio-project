import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./frontend/components/decuongmonhoc/index/index";
// import Index from "./frontend/Index/Index";
import Home from "./frontend/components/trangchu/index";
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/:type1/:monhoc/:type" component={Dashboard} />
        <Route exact path="/" component={Home} />
        <Route exact path="/de-cuong-mon-hoc" component={Home} />
        <Route exact path="/tab-2" component={Home} />
      </Switch>
    );
  }
}
export default App;
