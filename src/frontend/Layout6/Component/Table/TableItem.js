import React, { Component } from "react";
import { Table, Divider, Tag } from "antd";
import { connect } from "react-redux";

const columns = [
  {
    title: "Tên chủ đề",
    dataIndex: "titleName",
    key: "titleName"
  },
  {
    title: "Hoạt động giảng dạy ",
    dataIndex: "teachingActs",
    key: "teachingActs",
    render: teachingActs => (
      <span>
        {teachingActs.map(tag => {
          let color = "green";
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "Chuẩn đầu ra ",
    dataIndex: "standardOutput",
    key: "standardOutput",
    render: standardOutput => (
      <span>
        {standardOutput.map(tag => {
          let color = "green";
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "Hoạt động đánh giá",
    key: "evalActs",
    dataIndex: "evalActs",
    render: evalActs => (
      <span>
        {evalActs.map(tag => {
          let color = "volcano";
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a href="#a">Edit {record.name}</a>
        <Divider type="vertical" />
        <a href="#b">Delete</a>
      </span>
    )
  }
];

class TableItem extends Component {
  render() {
    return (
      <Table columns={columns} dataSource={this.props.itemKHGDTH.previewInfo} />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    itemKHGDTH: state.itemKHGDTHReducer
  };
};
export default connect(
  mapStateToProps,
  null
)(TableItem);
