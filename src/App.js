import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./frontend/components/decuongmonhoc/index/index";
<<<<<<< HEAD
import Index from "./frontend/Index/Index";
import Page404 from "./frontend/NotFound/Page404";
=======
// import Index from "./frontend/Index/Index";
import Home from "./frontend/components/trangchu/index";
>>>>>>> master
class App extends Component {
  render() {
    return (
      <Switch>
<<<<<<< HEAD
        <Route exact path="/de-cuong-mon-hoc/:type" component={Dashboard} />
        <Route exact path="/" component={Index} />
        <Route component={Page404} />
=======
        <Route exact path="/:type1/:monhoc/:type" component={Dashboard} />
        <Route exact path="/" component={Home} />
        <Route exact path="/de-cuong-mon-hoc" component={Home} />
        <Route exact path="/tab-2" component={Home} />
>>>>>>> master
      </Switch>
    );
  }
}
export default App;
