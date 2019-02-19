import React, { Component } from 'react';
import MainForm from './Component/Main/MainForm';
import { Element } from "react-scroll";
import TableItem from "./Component/Table/TableItem";



class Layout9 extends Component {
    render() {
        return (
            <div className="container">
            <div className="row">
              <div className="" />
              <div className="col-sm-11">
                <br />
                <h2 style={{ textAlign: "center" }}>
                  CÁC QUY ĐỊNH CHUNG
                </h2>
                <MainForm />
                <br/><br/>

                <Element name="test1" className="element">
                  <TableItem />
                </Element>
              </div>
            </div>
          </div>
        );
    }
}

export default Layout9;