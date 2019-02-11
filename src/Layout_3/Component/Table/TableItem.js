import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import { connect } from 'react-redux';

const columns = [{
  title: 'Mục tiêu',
  dataIndex: 'objectName',
  key: 'objectName',
}, {
  title: 'Mô tả',
  dataIndex: 'description',
  key: 'description',
}, {
  title: 'CĐR CDIO của chương trình',
  dataIndex: 'standActs',
  key: 'standActs',
  render: standActs => (
    <span>
      {standActs.map(  tag => {
        let color = 'green';
        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#a">Edit {record.name}</a>
      <Divider type="vertical" />
      <a href="#b">Delete</a>
    </span>
  ),
}];

class TableItem extends Component {
    render() {
        return (
            <Table columns={columns} dataSource={this.props.itemLayout3Reducer.previewInfo} />
        );
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    itemLayout3Reducer: state.itemLayout3Reducer
  }
}
export default connect(mapStateToProps, null)(TableItem);