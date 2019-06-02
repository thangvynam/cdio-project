import React, { Component } from "react";
import { BrowserRouter,Route, Switch } from "react-router-dom";

import Dashboard from "./frontend/components/decuongmonhoc/index/index";
import Home from "./frontend/components/trangchu/index";
import Subject from "./frontend/components/trangchu/subjects";
import Page404 from "./frontend/NotFound/Page404";
import Login from "./frontend/CDIO1/containers/Login";
import $ from './frontend/helpers/services';
import _ from 'lodash';
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isAuthen: false,
  //   }

  // }
  // componentDidMount(){
  //   if (!this.state.isAuthen && !_.isNull(localStorage.getItem("user")) ){
  //     let user = JSON.parse(localStorage.getItem("user"));
  //     $.authenMe({ "access": user.token }).then(res => {
  //       console.log("AAA", res);
  //       if (res.status === 200) {
  //         this.setState({ isAuthen: true });
  //         localStorage.clear();
  //         $.setStorage(res.data)
  //       }
  //       else if(res.status === 401){

  //       }
  //     })
  //   }
  // }
  render() {
   // let user = localStorage.getItem('user');
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/home" component={Home}/>

        {/* <Route exact path="/" component={this.state.isAuthen ? Home : Login} /> */}
        <Route exact path="/:parent/" component={Subject} />
        <Route exact path="/:parent/:ctdt/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/:khoi/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/:khoi/:monhoc/" component={Subject} />
        <Route exact path="/:parent/:ctdt/:type/:khoi/:monhoc/:tab" component={Subject} />
        <Route component={Page404} />
      </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
