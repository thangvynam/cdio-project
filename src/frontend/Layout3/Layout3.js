import React, { Component } from 'react';
import MainForm from './Component/Main/MainForm';
import TableItem from './Component/Table/TableItem';
import { Tooltip, Button } from 'antd';
import LogForm from '../Log/LogForm';

class Layout3 extends Component {
    componentWillMount(){
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <React.Fragment>
                <div className="section-layout">
                    {this.props.isReview === true ? null : <MainForm monhoc={this.props.monhoc} id_ctdt={this.props.id_ctdt}/>}
                </div>
                <div className="section-layout">
                    <Tooltip placement="topLeft">
                        <Button style={{ color: "red", margin: "auto", width: "100%", height: "50px" }}>
                            <span>(Hướng dẫn: Liệt kê các mục tiêu môn học, từ 5-8 mục tiêu ở mức độ tổng quát. Sử dụng động từ
Bloom ở mức độ nhóm. <br />Mỗi mục tiêu môn học được mapping với chuẩn đầu ra cấp chương trình)
                                </span>
                        </Button>
                    </Tooltip>

                    <TableItem isReview={this.props.isReview} monhoc={this.props.monhoc} id_ctdt={this.props.id_ctdt}/>

                    <br />
                    <br />
                    <LogForm monhoc={this.props.monhoc}/>
                    <br />
                </div>
            </React.Fragment>
        );
    }
}

export default Layout3;