import React, { Component } from 'react';
import DGForm from './Component/Main/DGForm';
import DGTableItem from './Component/Table/DGTableItem';
import { Tooltip, Button } from 'antd';
import { Element } from 'react-scroll';

class Layout7 extends Component {
  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-1" >
                </div>
                <div className="col-sm-11" >
                    <br/>
                    <h2 style={{textAlign: "center"}}>DANH SÁCH ĐÁNH GIÁ</h2>
                    <DGForm />
                    <br />
                    <Tooltip placement="topLeft">
                        <Button style={{ color: "red", margin: "auto", width: "100%", height: "50px" }}>(Mô tả các thành phần bài tập , bài thi , đồ án ... dùng để đánh giá kết quả của sinh viên khi tham gia môn học này. <br /> Bên cạnh mỗi nhóm bài tập, bài thi ... cần có tỉ lệ % điểm tương ứng) </Button>
                    </Tooltip>
                    <br />
                    <Element name="test1" className="element" >
                        <DGTableItem />
                    </Element>
                </div>
            </div>
        </div>
    );
}
}

export default Layout7;