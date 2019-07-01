import React, { Component } from 'react';
import CDRForm from './Component/Main/CDRForm';
import CDRTableItem from './Component/Table/CDRTableItem';
import { Tooltip, Button } from 'antd';
import LogForm from '../Log/LogForm';
import { MENUITEM } from '../Constant/ActionType';

class Layout4 extends Component {
  componentWillMount(){
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <React.Fragment>
        <div className="section-layout">
          {this.props.isReview === true ? null : <CDRForm monhoc={this.props.monhoc} ctdt={this.props.ctdt}/>}
        </div>
        <div className="section-layout">

          <Tooltip placement="topLeft" >
            <Button style={{ color: "red", margin: "auto", width: "100%", height: "100px" }}>(Hướng dẫn: Mô tả chi tiết các chuẩn đầu ra của môn học. Ứng với mỗi mục tiêu ở mục phía trên có
thể có 1 hay nhiều chuẩn đầu ra chi tiết. <br />Đánh mã số chuẩn đầu ra môn học ở cấp 2 tương ứng với mỗi
mục tiêu môn học. Mức độ được thể hiện bằng các ký hiệu I-Introduce, T-Teach <br />và U-Utilize. Các động
từ mô tả được sử dụng từ các động từ <br />chi tiết của Bloom cho mức độ tương ứng – xem thêm bảng các
động từ Bloom chi tiết cho ngành kỹ thuật.)</Button>
          </Tooltip>
          <CDRTableItem isReview={this.props.isReview} monhoc={this.props.monhoc} ctdt={this.props.ctdt}/>
        </div>
        <div className="section-layout">
          <LogForm isComment={this.props.isReview} monhoc={this.props.monhoc} tab={MENUITEM.CHUAN_DAU_RA} id_ctdt={this.props.ctdt} tabIndex={4}/>
        </div>
      </React.Fragment>

    );
  }
}

export default Layout4;