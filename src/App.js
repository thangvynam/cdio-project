import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Dashboard from './components/decuongmonhoc/index/index';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/de-cuong-mon-hoc/:type' component={Dashboard} />
      </Switch>
    );
  }
}

export default App;
