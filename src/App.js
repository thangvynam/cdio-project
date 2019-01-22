import React, { Component } from 'react';
import './App.css';
import TreeMenu from './Component/TreeMenu/TreeMenu';


class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <div className="container">
          <div className="row">
            <article className="col-md-12">
              <div id="app" className="app-container">
                <TreeMenu/>
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
