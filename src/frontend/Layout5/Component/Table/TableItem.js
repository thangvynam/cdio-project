import React, { Component } from 'react';
import { Table, Divider, Tag, Popconfirm,Form } from 'antd';
import { connect } from 'react-redux';
import {DELETE_DATA_LAYOUT_5,CHANGE_EDITSTATE_5} from '../../../Constant/ActionType';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
class TableItem extends Component {  
  constructor(props){
    super(props);
    this.columns = [{
      title: 'Tên chủ đề',
      dataIndex: 'titleName',
      key: 'titleName',
      width: 150
    }, {
      title: 'Hoạt động giảng dạy ',
      dataIndex: 'teachingActs',
      key: 'teachingActs',
      render: teachingActs => (
        <span>
          {teachingActs.map(  tag => {
            let color = 'green';
            return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </span>
      ),
      width:200
    }, {
      title: 'Chuẩn đầu ra ',
      dataIndex: 'standardOutput',
      key: 'standardOutput',
      render: standardOutput => (
        <span>
          {standardOutput.map(tag => {
            let color = 'green';
            return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </span>
      ),
      width:200
    }, {
      title: 'Hoạt động đánh giá',
      key: 'evalActs',
      dataIndex: 'evalActs',
      render: evalActs => (
        <span>
          {evalActs.map(tag => {
            let color = 'volcano';
            return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </span>
      ),
    },
    , {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const editable = this.isEditing(record);
        return(
        <div>
          {editable ? (
                <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      href="#a"
                      onClick={() => this.save(form, record.key)}
                      style={{ marginRight: 8 }}
                    >
                      Save
                    </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="Hủy bỏ?"
                  onConfirm={() => this.cancel(record.key)}
                >
                  <a href="#a">Cancel</a>
                </Popconfirm>
              </span>
              ) : (
                <a href="#a" onClick={() => this.props.handleEdit(record.key)}>Edit</a>
              )}
          {!editable ? <Divider type="vertical" /> : null}
          {!editable 
              ? (
                <Popconfirm title="Xác nhận xóa?" onConfirm={() => this.props.handleDelete(record.key)}>
                  <a href="#a">Xóa</a>
                </Popconfirm>
              ) : null}
        </div>
      )},
    }
  ];};
  isEditing = record => {
    return record.key === this.props.itemMenuReducer.changeEditStateState;;
  }
 

  render() {
      return (
        <div>
          <Table columns={this.columns} dataSource={this.props.itemMenuReducer.previewInfo} pagination={{ pageSize: 50 }} scroll={{ y: 240, }}/>
        </div>
          
      );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    itemMenuReducer: state.itemMenuReducer5
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleEdit : (key) => {
      dispatch({type: CHANGE_EDITSTATE_5, key: key});
    },
    handleDelete : (key) => {
      dispatch({type: DELETE_DATA_LAYOUT_5, key: key});
    }, 
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableItem);