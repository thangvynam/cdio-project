import React, { Component } from 'react';
import { Table, Popconfirm, Tag, Button, Form, Divider } from 'antd';
import { connect } from 'react-redux';
import { DELETE_DATA_LAYOUT_3, SAVE_DATA_LAYOUT_3 } from '../../../Constant/ActionType';
import axios from 'axios';
import TextArea from "antd/lib/input/TextArea"; 

const FormItem = Form.Item
const EditableContext = React.createContext();

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
    super(props)
    this.exportData = this.exportData.bind(this);
    this.state = { 
      data: this.props.itemLayout3Reducer.previewInfo, 
      editingKey: '' 
    };
    this.columns = [{
      title: 'Mục tiêu',
      dataIndex: 'objectName',
      key: 'objectName',
      editable: true,
    }, {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: '500px',
      editable: true,
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
      editable: true,
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
      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      href="#;"
                      onClick={() => this.save(form, record.key)}
                      style={{ marginRight: 8 }}
                    >
                      Save
                    </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="Xác nhận hủy?"
                  onConfirm={() => this.cancel(record.key)}
                >
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <span>
                  <a onClick={() => this.edit(record.key)} href="#a">
                    Edit
                  </a>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Xác nhận xóa?"
                    onConfirm={() => this.delete(record.key)}
                  >
                    <a href="#a">Delete</a>
                  </Popconfirm>
                </span>
            )}
          </div>
        );
      },
        // render: (text, record) => (
        //   <Popconfirm title="Sure to delete?" onConfirm={() => this.props.handleDelete(record.key)}>
        //     <a href="javascript:;">Delete</a>
        //   </Popconfirm>
        // ),
    }];
  }

  delete(key) {
    this.props.handleDelete(key);
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.props.itemLayout3Reducer.previewInfo];
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
            arr.push(id);
          })
          index.standActs = arr;
        })
        this.props.handleSave(newData);
        this.setState({ editingKey: "" });
    });
  }

  setIndexForItem = () => {
    let data = [];
    let items = this.props.itemLayout3Reducer.previewInfo;
    for (let i = 0; i < items.length; i++) {
      let temp = {
        key: i,
        objectName: items[i].objectName,
        description: items[i].description,
        standActs: items[i].standActs
      };
      data.push(temp);
    }
    return data;
  };

  exportData (){
    axios.post("/exportfile", {exportData: this.props.itemLayout3Reducer.previewInfo})
      .then(res => {
        console.log(res)
      })
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
      return (
        <div>
          <Table
            components={components}
            bordered
            dataSource={this.setIndexForItem()}
            columns={columns}
            rowClassName="editable-row"
          />
          <Button style={{float: "right"}} onClick={this.exportData}>Export PDF</Button>
        </div>
      );
        // return (
        //   <div>
        //     <Table columns={this.columns} dataSource={this.props.itemLayout3Reducer.previewInfo} style={{ wordWrap: "break-word", whiteSpace: 'pre-line'}} />
        //     <Button style={{float: "right"}} onClick={this.exportData}>Export PDF</Button>
        //   </div>
        //   );
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
      console.log(key)
      dispatch({type: DELETE_DATA_LAYOUT_3, key: key});
    },
    handleSave: (data) => {
      dispatch({type: SAVE_DATA_LAYOUT_3, data: data})
    }
    // dispatch({ type: DELETE_DATA_LAYOUT_3, item: this.dataSource });
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableItem);