import React, { Component } from 'react';
import { Table, Popconfirm, Tag, Button, Form, Divider, Modal } from 'antd';
import { connect } from 'react-redux';
import { DELETE_DATA_LAYOUT_3, SAVE_DATA_LAYOUT_3 } from '../../../Constant/ActionType';
import axios from 'axios';
import TextArea from "antd/lib/input/TextArea"; 

const confirm = Modal.confirm;
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
      editingKey: '' ,
      selectedRowKeys: []
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

  onMultiDelete = () => {
    const selectedRow = this.state.selectedRowKeys;

    // delete one
    if (selectedRow.length === 1) {
      this.delete(selectedRow[0]);
      return;
    }

    //delete all
    if (selectedRow.length === this.props.itemLayout3Reducer.previewInfo.length) {
      this.props.handleSave([]);
      this.setState({ selectedRowKeys: [] });
      return;
    }

    let items = this.props.itemLayout3Reducer.previewInfo;
    const filteredItems = items.filter(
      (_, index) => !selectedRow.includes(index)
    );
    this.props.handleSave(filteredItems);
    this.setState({ selectedRowKeys: [] });
  };

  showModal = () => {
    confirm({
      title: "Xóa các mục đã chọn?",
      content: "",
      onOk: this.onMultiDelete,
      onCancel() {}
    });
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  delete(key) {
    this.props.handleDelete(key);
    this.setState({ selectedRowKeys: [] });
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

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
            if(!isNaN(parseInt(id))) {
              arr.push(id);
            }
          })
          let uniqueArr = arr.filter(this.onlyUnique)
          index.standActs = uniqueArr;
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

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;

      return (
        <div>
          <div style={{ marginBottom: 16, marginTop: 10 }}>
          <Button
            type="danger"
            onClick={this.showModal}
            disabled={!hasSelected}
          >
            Delete
          </Button>

          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Đã chọn ${selectedRowKeys.length} mục` : ""}
          </span>
        </div>
          <Table
            components={components}
            bordered
            rowSelection={rowSelection}
            dataSource={this.setIndexForItem()}
            columns={columns}
            rowClassName="editable-row"
            style={{ wordWrap: "break-word", whiteSpace: 'pre-line'}}
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
      dispatch({type: DELETE_DATA_LAYOUT_3, key: key});
    },
    handleSave: (data) => {
      dispatch({type: SAVE_DATA_LAYOUT_3, data: data})
    }
    // dispatch({ type: DELETE_DATA_LAYOUT_3, item: this.dataSource });
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableItem);