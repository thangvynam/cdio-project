import React, { Component } from 'react';

import MainForm from './Component/Main/MainForm';
import TableItem from './Component/Table/TableItem';
import { Tooltip, Button } from 'antd';
import LogForm from '../Log/LogForm';
import { MENUITEM } from '../Constant/ActionType';

class Layout5 extends Component {
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
                    <Tooltip placement="topLeft">
                        <Button style={{ color: "red", margin: "auto", width: "100%", height: "50px" }}>(Hướng dẫn: Mô tả chi tiết quá trình giảng dạy theo từng chủ đề: tên chủ đề, danh sách các chuẩn đầu
ra chi tiết tương ứng với mỗi chủ đề, <br /> các hoạt động dạy và học gợi ý, các hoạt động đánh giá nếu có)</Button>
                    </Tooltip>
                </div>
                <div className="section-layout">
                    <TableItem isReview={this.props.isReview} monhoc={this.props.monhoc} />
                </div>
                <div className="section-layout">
                    <LogForm monhoc={this.props.monhoc} tab={MENUITEM.GIANG_DAY_LY_THUYET} tabIndex={5}/>
                </div>
            </React.Fragment>
        );
    }
}

export default Layout5;