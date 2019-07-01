import React, { Component } from 'react';
import MainForm from './Component/Main/MainForm';
import { Element } from "react-scroll";
import TableItem from "./Component/Table/TableItem";
import LogForm from '../Log/LogForm';
import { MENUITEM } from '../Constant/ActionType';

class Layout9 extends Component {
  componentWillMount(){
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <React.Fragment>
        <div className="section-layout">
          {this.props.isReview === true ? null : <MainForm monhoc={this.props.monhoc}/>}
        </div>
        <div className="section-layout">
          <Element name="test1" className="element">
            <TableItem isReview={this.props.isReview} monhoc={this.props.monhoc} />
          </Element>
        </div>
        <div className="section-layout">
          <LogForm monhoc={this.props.monhoc} tab={MENUITEM.QUY_DINH_CHUNG} tabIndex={9}/>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout9;
