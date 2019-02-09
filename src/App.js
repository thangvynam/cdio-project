import React, { Component } from 'react';
import MainForm from './Component/Main/MainForm';
import TableItem from './Component/Table/TableItem';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2" >
          </div>
          <div className="col-sm-10" >
            <MainForm />
            <br/>
            <h1>DANH SÁCH KẾ HOẠCH GIẢNG DẠY LÝ THUYẾT</h1>
            <br/>
            <TableItem/>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
