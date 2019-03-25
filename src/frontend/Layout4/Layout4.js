import React, { Component } from 'react';
import CDRForm from './Component/Main/CDRForm';
import CDRTableItem from './Component/Table/CDRTableItem';
import { Tooltip, Button } from 'antd';

class Layout4 extends Component {
  componentWillUnmount() {
    //alert("hey")
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-1" >
          </div>
          <div className="col-sm-11" >
            <br/>
            <h1 style={{textAlign: "center"}}>CHUẨN ĐẦU RA MÔN HỌC</h1>
            <CDRForm/>
            <br />
            <Tooltip placement="topLeft" >
              <Button style={{color: "red", margin: "auto", width: "100%", height: "100px"}}>(Hướng dẫn: Mô tả chi tiết các chuẩn đầu ra của môn học. Ứng với mỗi mục tiêu ở mục phía trên có
thể có 1 hay nhiều chuẩn đầu ra chi tiết. <br />Đánh mã số chuẩn đầu ra môn học ở cấp 2 tương ứng với mỗi
mục tiêu môn học. Mức độ được thể hiện bằng các ký hiệu I-Introduce, T-Teach <br />và U-Utilize. Các động
từ mô tả được sử dụng từ các động từ <br />chi tiết của Bloom cho mức độ tương ứng – xem thêm bảng các
động từ Bloom chi tiết cho ngành kỹ thuật.)</Button>
            </Tooltip>
            <CDRTableItem />
          </div>
        </div>
      </div>

    );
  }
}

export default Layout4;