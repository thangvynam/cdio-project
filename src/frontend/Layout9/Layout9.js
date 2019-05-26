import React, { Component } from 'react';
import MainForm from './Component/Main/MainForm';
import { Element } from "react-scroll";
import TableItem from "./Component/Table/TableItem";
import LogForm from '../Log/LogForm';

class Layout9 extends Component {
  render() {
    const items = [...Array(100)].map((val, i) => `Item ${i}`);
    return (
      <React.Fragment>
        <div className="section-layout">
          {this.props.isReview === true ? null : <MainForm />}
        </div>
        <div className="section-layout">
          <Element name="test1" className="element">
            <TableItem isReview={this.props.isReview} />
          </Element>
        </div>
        <div className="section-layout">
          <LogForm />
        </div>
      </React.Fragment>
    );
  }
}

export default Layout9;
