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
    let user = localStorage.getItem('user');
    return (
      <Switch>
        <Route exact path="/" component={user ? Home : Login} />
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
