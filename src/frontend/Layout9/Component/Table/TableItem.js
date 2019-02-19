import React, { Component } from "react";
import { Table, Divider, Tag } from "antd";
import { connect } from "react-redux";

const columns = [
  {
    title: "Nội dung",
    dataIndex: "content",
    key: "content",
    width: 900,
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a href="#a">Edit</a>
        <Divider type="vertical" />
        <a href="#b">Delete</a>
      </span>
    )
  }
];

class TableItem extends Component {
  render() {
    return (
      <Table columns={columns} dataSource={this.props.itemRule.rules} rowKey = "index"/>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    itemRule: state.itemRuleReducer,
  };
};
export default connect(
  mapStateToProps,
  null
)(TableItem);
