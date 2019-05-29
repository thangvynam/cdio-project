import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./frontend/components/decuongmonhoc/index/index";
import Home from "./frontend/components/trangchu/index";
import Subject from "./frontend/components/trangchu/subjects";
import Page404 from "./frontend/NotFound/Page404";
import Login from "./frontend/CDIO1/containers/Login";
import { PrivateRoute } from "./PrivateRoute";
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/:parent/" component={Subject} />
        <PrivateRoute exact path="/:parent/:ctdt/" component={Subject} />
        <PrivateRoute exact path="/:parent/:ctdt/:type/" component={Subject} />
        <PrivateRoute exact path="/:parent/:ctdt/:type/:khoi/" component={Subject} />
        <PrivateRoute exact path="/:parent/:ctdt/:type/:khoi/:monhoc/" component={Subject} />
        <PrivateRoute exact path="/:parent/:ctdt/:type/:khoi/:monhoc/:tab" component={Subject} />
        <PrivateRoute component={Page404}/>
      </Switch>
    );
  }
}
export default App;
