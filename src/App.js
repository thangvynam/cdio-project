import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import Dashboard from './components/decuongmonhoc/index/';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/de-cuong-mon-hoc/:type' component={Dashboard} />
      </Switch>
      // <Layout2/>
      // <Layout3/>
      // <Layout4/>
      // <Layout5/>
      // <Layout9/>
    );
  }
}

export default App;