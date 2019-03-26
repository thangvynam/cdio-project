import React, { Component } from 'react';
import MainForm from './Component/Main/MainForm';
import TableItem from './Component/Table/TableItem';
import { Tooltip, Button } from 'antd';
class Layout3 extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-1" >
                    </div>
                    <div className="col-sm-11" >
                        <br />
                        <h1 style={{textAlign: "center"}}>MỤC TIÊU MÔN HỌC</h1>
                        <MainForm />
                        <br />
                        <Tooltip placement="topLeft">
                            <Button style={{color: "red", margin: "auto", width: "100%", height: "50px"}}>
                                <span>(Hướng dẫn: Liệt kê các mục tiêu môn học, từ 5-8 mục tiêu ở mức độ tổng quát. Sử dụng động từ
Bloom ở mức độ nhóm. <br/>Mỗi mục tiêu môn học được mapping với chuẩn đầu ra cấp chương trình)
                                </span>
                            </Button>
                        </Tooltip>
                        <TableItem/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout3;