import React, { Component } from "react";
import { BrowserRouter,Route, Switch } from "react-router-dom";

import Home from "./frontend/components/trangchu/index";
import Subject from "./frontend/components/trangchu/subjects";
import Page404 from "./frontend/NotFound/Page404";
import Login from "./frontend/CDIO1/containers/Login";
class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/home" component={Home}/>

        {/* <Route exact path="/" component={this.state.isAuthen ? Home : Login} /> */}
        <Route exact path="/:parent/" component={Subject} />
        <Route exact path="/:parent/:ctdt/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/:action/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/:action/:khoi/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/:action/:khoi/:monhoc/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/:action/:khoi/:monhoc/:tab" component={Subject} />
        <Route component={Page404} />
      </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
