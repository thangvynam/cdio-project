import React, { Component } from 'react';
import { Table, Popconfirm, Tag, Button } from 'antd';
import { connect } from 'react-redux';
import { DELETE_DATA_LAYOUT_3 } from '../../../Constant/ActionType';
import axios from 'axios';

class TableItem extends Component {
  constructor(props){
    super(props)
    this.exportData = this.exportData.bind(this);
    let dataSource = [];
    this.columns = [{
      title: 'Mục tiêu',
      dataIndex: 'objectName',
      key: 'objectName',
    }, {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: '500px',
      onCell: () => {
        return {
          style: {
            maxWidth: 250,
          }
        }
      },
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
      title: 'Thao tác',
      key: 'action',
        render: (text, record) => (
          <Popconfirm title="Sure to delete?" onConfirm={() => this.props.handleDelete(record.key)}>
            <a href="javascript:;">Delete</a>
          </Popconfirm>
        ),
    }];
  }
  exportData (){
    console.log(this.props.itemLayout3Reducer.previewInfo)
    axios.post("/exportfile", {exportData: this.props.itemLayout3Reducer.previewInfo})
      .then(res => {
        console.log(res)
      })
  }
    render() {
        return (
          <div>
            <Table columns={this.columns} dataSource={this.props.itemLayout3Reducer.previewInfo} style={{ wordWrap: "break-word", whiteSpace: 'pre-line'}} />
            <Button style={{float: "right"}} onClick={this.exportData}>Export PDF</Button>
          </div>
          );
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    itemLayout3Reducer: state.itemLayout3Reducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDelete: (key) => {
      dispatch({type: DELETE_DATA_LAYOUT_3, key: key});
    }
    // dispatch({ type: DELETE_DATA_LAYOUT_3, item: this.dataSource });
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableItem);