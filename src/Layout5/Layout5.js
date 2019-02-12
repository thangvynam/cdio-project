import React, { Component } from 'react';
import { Element } from 'react-scroll';

import MainForm from './Component/Main/MainForm';
import TableItem from './Component/Table/TableItem';
import { Tooltip, Button } from 'antd';

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
                        <Tooltip placement="topLeft">
                            <Button style={{color: "red", margin: "auto", width: "100%", height: "50px"}}>(Hướng dẫn: Mô tả chi tiết quá trình giảng dạy theo từng chủ đề: tên chủ đề, danh sách các chuẩn đầu
ra chi tiết tương ứng với mỗi chủ đề, <br /> các hoạt động dạy và học gợi ý, các hoạt động đánh giá nếu có)</Button>
                        </Tooltip>
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