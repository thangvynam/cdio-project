import React, { Component } from 'react';
import MainForm from './Component/Main/MainForm';
import { Element } from "react-scroll";
import TableItem from "./Component/Table/TableItem";
import LogForm from '../Log/LogForm';

class Layout9 extends Component {
  render() {
    const items = [...Array(100)].map((val, i) => `Item ${i}`);
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-1" ></div>
          <div className="col-sm-11">
            <br />
            <h2 style={{ textAlign: "center" }}>
              CÁC QUY ĐỊNH CHUNG
                </h2>
            <MainForm />
            <br /><br />
            
            <Element name="test1" className="element">
              <TableItem />
            </Element>
            <br/>
            <br/>
            <LogForm/>
            <br/>
            <br/>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout9;
