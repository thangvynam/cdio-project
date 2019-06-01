import React, { Component } from 'react';
import DGForm from './Component/Main/DGForm';
import DGTableItem from './Component/Table/DGTableItem';
import { Tooltip, Button } from 'antd';
import { Element } from 'react-scroll';
import LogForm from '../Log/LogForm';

class Layout7 extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="section-layout">
                    {this.props.isReview === true ? null : <DGForm />}
                </div>
                <div className="section-layout">
                    <Tooltip placement="topLeft">
                        <Button style={{ color: "red", margin: "auto", width: "100%", height: "50px" }}>(Mô tả các thành phần bài tập, bài thi, đồ án... dùng để đánh giá kết quả của sinh viên khi tham gia môn học này. <br /> Bên cạnh mỗi nhóm bài tập, bài thi... cần có tỉ lệ % điểm tương ứng) </Button>
                    </Tooltip>
                    <Element name="test1" className="element" >
                        <DGTableItem isReview={this.props.isReview} monhoc={this.props.monhoc} />
                    </Element>
                </div>
                <div className="section-layout">
                    <LogForm />
                </div>
            </React.Fragment>
        );
    }
}

export default Layout7;