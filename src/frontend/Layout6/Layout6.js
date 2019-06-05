import React, { Component } from "react";
import { Element } from "react-scroll";

import MainForm from "./Component/Main/MainForm";
import TableItem from "./Component/Table/TableItem";
import { Tooltip, Button } from "antd";
import LogForm from '../Log/LogForm';

class Layout6 extends Component {
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
            <Button
              style={{
                color: "red",
                margin: "auto",
                width: "100%",
                height: "50px"
              }}
            >
              (Hướng dẫn: Mô tả chi tiết quá trình giảng dạy theo từng chủ đề:
              tên chủ đề, danh sách các chuẩn đầu ra chi tiết tương ứng với
                mỗi chủ đề, <br /> các hoạt động dạy và học gợi ý, các hoạt động
              đánh giá nếu có)
              </Button>
          </Tooltip>
          <Element name="test1" className="element">
            <TableItem isReview={this.props.isReview} monhoc={this.props.monhoc} />
          </Element>
        </div>
        <div className="section-layout">
          <LogForm monhoc={this.props.monhoc}/>
        </div>

      </React.Fragment>
    );
  }
}

export default Layout6;
