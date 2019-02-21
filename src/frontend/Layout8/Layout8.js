import React, { Component } from 'react';
import TNForm from './Component/Main/TNForm';
import TNTableItem from './Component/Table/TNTableItem';
import { Tooltip, Button } from 'antd';
import { Element } from 'react-scroll';

class Layout8 extends Component {
  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-1" >
                </div>
                <div className="col-sm-11" >
                    <br/>
                    <h2 style={{textAlign: "center"}}>TÀI NGUYÊN MÔN HỌC</h2>
                    <TNForm />
                    <br />
                    <Tooltip placement="topLeft">
                        <Button style={{ color: "red", margin: "auto", width: "100%", height: "50px" }}>(Mô tả các thành phần bài tập , bài thi , đồ án ... dùng để đánh giá kết quả của sinh viên khi tham gia môn học này. <br /> Bên cạnh mỗi nhóm bài tập, bài thi ... cần có tỉ lệ % điểm tương ứng) </Button>
                    </Tooltip>
                    <br />
                    <Element name="test1" className="element" >
                        <TNTableItem />
                    </Element>
                </div>
            </div>
        </div>
    );
}
}

export default Layout8;