import React, { Component } from 'react';
import './App.css';
import TreeMenu from './Component/TreeMenu/TreeMenu';
import RightLayout from './Component/Right-Layout/RightLayout';


class App extends Component {
  render() {
    return (
      <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6" >
            <TreeMenu/>
        </div>
        <div class="col-sm-6" >
            <RightLayout title="abc"/>
        </div>
      </div>
    </div>
      
    );
  }
}

export default App;
