import React, { Component } from 'react';
import { Element } from 'react-scroll';

import MainForm from './Component/Main/MainForm';
import TableItem from './Component/Table/TableItem';

class Layout5 extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2" >
                    </div>
                    <div className="col-sm-10" >
                        <MainForm />
                        <br />
                        <h1>DANH SÁCH KẾ HOẠCH GIẢNG DẠY LÝ THUYẾT</h1>
                        <br />
                        <Element name="test1" className="element" >
                            <TableItem />
                        </Element>
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout5;