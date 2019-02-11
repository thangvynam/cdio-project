import React, { Component } from 'react';
import CDRForm from './Component/Main/CDRForm';
import CDRTableItem from './Component/Table/CDRTableItem';

class Layout4 extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2" >
          </div>
          <div className="col-sm-10" >
            <CDRForm />
            <br/>
            <h1>CHUẨN ĐẦU RA MÔN HỌC</h1>
            <br/>
            <CDRTableItem />
          </div>
        </div>
      </div>

    );
  }
}

export default Layout4;