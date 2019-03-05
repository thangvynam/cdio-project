import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const DynamicImport = (LoaderComponent) => Loadable({
  loader: LoaderComponent,
  loading: () => null
});

class App extends Component {
  render() {
    return (
      <Switch>
        {/* Dashboard */}
        <Route exact path='/de-cuong-mon-hoc/:type' component={DynamicImport(() => import('./frontend/components/decuongmonhoc/index/index'))} />
        {/* Index */}
        <Route exact path='/' component={DynamicImport(() => import('./frontend/Index/Index'))} />
      </Switch>
    );
  }
}

export default App;