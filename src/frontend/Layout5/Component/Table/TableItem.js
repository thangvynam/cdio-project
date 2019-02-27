import React, { Component } from 'react';
import { Table, Divider, Tag, Popconfirm,Form } from 'antd';
import { connect } from 'react-redux';
import {DELETE_DATA_LAYOUT_5,CHANGE_EDITSTATE_5,
        SAVE_DATA_LAYOUT_5} from '../../../Constant/ActionType';
import TextArea from "antd/lib/input/TextArea";

const EditableContext = React.createContext();
const FormItem = Form.Item
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;    
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Vui lòng nhập ${title.toLowerCase()}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(<TextArea  rows={1}/>)}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class TableItem extends Component {  
  constructor(props){
    super(props);
    this.state = {
      selectedRowKeys: []
    }
    this.columns = [{
      title: 'Tên chủ đề',
      dataIndex: 'titleName',
      key: 'titleName',
      width: 150,
      editable:true
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
    {
      title: 'Thao tác',
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
                  <a href="#a">Delete</a>
                </Popconfirm>
              ) : null}
        </div>
      )}
}
  ];
};
  isEditing = record => {
    return record.key === this.props.itemMenuReducer.changeEditStateState;;
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.props.itemMenuReducer.previewInfo];
      const index = newData.findIndex(item => key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        newData.map(index => {
          let arr = [];
          let str = index.standActs + ""
          str.split(",").forEach(id => {
            if(!isNaN(parseInt(id))) {
              arr.push(id);
            }
          })
          let uniqueArr = arr.filter(this.onlyUnique)
          index.standActs = uniqueArr;
        })
        console.log(newData)
        this.props.handleSave(newData);
        // this.setState({ editingKey: "" });
    });
  }
 

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;
      return (
        <div>
          <Table 
          components={components}
          bordered
          rowClassName="editable-row"
          rowSelection={rowSelection}
          columns={columns} 
          dataSource={this.props.itemMenuReducer.previewInfo} 
          pagination={{ pageSize: 50 }} 
          scroll={{ y: 240, }}/>
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
    handleSave: (data) => {
      dispatch({type: SAVE_DATA_LAYOUT_5, data: data,key : ''})
    }
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableItem);