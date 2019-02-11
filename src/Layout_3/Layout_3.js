import React, { Component } from 'react';
import { Element } from 'react-scroll';

import MainForm from './Component/Main/MainForm';
import TableItem from './Component/Table/TableItem';

class Layout3 extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2" >
                    </div>
                    <div className="col-sm-10" >
                        <MainForm />
                        <br />
                        <h1 style={{textAlign: "center"}}>MỤC TIÊU MÔN HỌC</h1>
                        <br />
                        <TableItem/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout3;