import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./frontend/components/decuongmonhoc/index/index";
import Home from "./frontend/components/trangchu/index";
import Subject from "./frontend/components/trangchu/subjects";
import Page404 from "./frontend/NotFound/Page404";
import Login from "./frontend/CDIO1/containers/Login";
import $ from './frontend/helpers/services';
import _ from 'lodash';
import { PrivateRoute } from "./PrivateRoute";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthen: false,
    }

  }
  // componentDidMount(){
  //   if (!_.isNull(localStorage.getItem("user")) ){
  //     console.log("B")
  //     let user = JSON.parse(localStorage.getItem("user"));
  //     $.authenMe({ "access": user.token }).then(res => {
  //       console.log("AAA", res);
  //       if (res.status === 200) {
  //         this.setState({ isAuthen: true });
  //       }
  //       else {
  //         console.log("AAA");
  //         this.props.history.go('/login');
  //       }
  //     })
  //   }
  // }
  render() {
    let user = localStorage.getItem('user');
    return (
      <Switch>
        <Route exact path="/" component={user ? Home : Login} />
        {/* <Route exact path="/" component={this.state.isAuthen ? Home : Login} /> */}
        <Route exact path="/:parent/" component={Subject} />
        <Route exact path="/:parent/:ctdt/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/:khoi/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/:khoi/:monhoc/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/:khoi/:monhoc/:tab" component={Subject} />
        <Route component={Page404} />
      </Switch>
    );
  }
}
export default App;
