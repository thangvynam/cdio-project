import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import { connect } from 'react-redux';

const columns = [{
  title: 'STT',
  dataIndex: 'stt',
  key: 'stt',
}, {
  title: 'Loại',
  dataIndex: 'loai',
  key: 'loai',
  
}, {
  title: 'Mô tả',
  dataIndex: 'mota',
  key: 'mota',
},
{
  title: 'Link liên kết',
  dataIndex: 'link',
  key: 'link',
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

class TNTableItem extends Component {

  render() {
    return (
      <Table columns={columns} dataSource={this.props.tntable.previewInfo} style={{ wordWrap: "break-word", whiteSpace: 'pre-line'}}/>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tntable: state.itemLayout8Reducer,
  }
}

export default connect(mapStateToProps)(TNTableItem);
