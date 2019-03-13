import React, { Component } from 'react';
import {
  Table, Input, Button, Popconfirm, Form, Divider, Tag, InputNumber, Select, Modal
} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { bindActionCreators } from 'redux';
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from 'react-redux';
import { updateTNData } from '../../../Constant/ActionType';
const { Option } = Select;

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

const confirm = Modal.confirm;
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
  }
  getInput = () => {
    return <TextArea rows = {4} style = {{width: "100%"}} />;
  };

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
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class TNTableItem extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedRowKeys: [], editingKey: '' };
    this.columns = [{
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    }, {
      title: 'Loại',
      dataIndex: 'loai',
      key: 'loai',
      editable: true,
    }, {
      title: 'Mô tả',
      dataIndex: 'mota',
      key: 'mota',
      editable: true,
    },
    {
      title: 'Link liên kết',
      dataIndex: 'link',
      key: 'link',
      editable: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const editable = this.isEditing(record);
        console.log(editable);
        return (
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
                      Lưu
                    </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="Xác nhận hủy?"
                  onConfirm={() => this.onCancelEdit(record.key)}
                >
                  <a href="#a">Hủy</a>
                </Popconfirm>
              </span>
            ) : (
                <span>
                  <a onClick={() => this.edit(record.key)} href="#a">
                    Sửa
                </a>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Xác nhận xóa?"
                    onConfirm={() => this.handleDelete(record.key)}
                  >
                    <a href="#a">Xóa</a>
                  </Popconfirm>
                </span>
              )}
          </div>
        );
      },
    }];
  }

  isEditing = record => record.key === this.state.editingKey;

  save(form, key) {
    console.log(this.props.tntable.previewInfo)
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      let index = key - 1;

      var newItems = this.props.tntable.previewInfo;
      const item = newItems[index];
      newItems.splice(index, 1, {
        ...item,
        ...row
      });
      this.props.onUpdateTNData(newItems);
      this.setState({ editingKey: "" });
    });
  }

  handleDelete(key) {
    let newData = {previewInfo:[]};
    this.props.tntable.previewInfo = this.props.tntable.previewInfo.filter(
      (_, index) => index !== key - 1
    );
    
    for (let i = 0; i < this.props.tntable.previewInfo.length; i++) {
      this.props.tntable.previewInfo[i].key = i + 1;
      this.props.tntable.previewInfo[i].stt = i+1;
    }

    newData.previewInfo = this.props.tntable.previewInfo;
    console.log(newData.previewInfo);
    this.setState({ selectedRowKeys: [], editingKey: "" });
    this.props.onUpdateTNData(newData);
  }

  edit(key) {
    console.log(this.props.tntable.previewInfo)
    this.setState({ editingKey: key });
  }

  onCancelEdit = (key) => {
    this.setState({ editingKey: "" });
  };
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onMultiDelete = () => {
    const selectedRow = this.state.selectedRowKeys;

    // delete one
    if (selectedRow.length === 1) {
      this.handleDelete(selectedRow[0]);
      return;
    }

    //delete all
    if (selectedRow.length === this.props.tntable.previewInfo.length) {
      this.props.tntable.previewInfo = [];
      this.props.onUpdateTNData([]);
      this.setState({ selectedRowKeys: [], editingKey: "" });
      return;
    }

    let filteredItems = {previewInfo:[]}
   
    let KHitems = this.props.tntable.previewInfo;
    this.props.tntable.previewInfo = KHitems.filter(
      (_, index) => !selectedRow.includes(index + 1)
    );
    for (let i = 0; i < this.props.tntable.previewInfo.length; i++) {
      this.props.tntable.previewInfo[i].key = i + 1;
      this.props.tntable.previewInfo[i].stt=  i+1;
    }

    filteredItems.previewInfo = this.props.tntable.previewInfo;
    this.props.onUpdateTNData(filteredItems);
    this.setState({ selectedRowKeys: [], editingKey: "" });
  };



  showModal = () => {
    confirm({
      title: "Xóa các mục đã chọn?",
      content: "",
      onOk: this.onMultiDelete,
      onCancel() { }
    });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;
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
    console.log(this.props.tntable.previewInfo)
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
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
          dataSource={this.props.tntable.previewInfo}
          columns={columns}
          rowSelection={rowSelection}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
          style={{ wordWrap: "break-word", whiteSpace: 'pre-line' }}
        />
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onUpdateTNData: updateTNData,
  }, dispatch);
} 

const mapStateToProps = (state) => {
  return {
    tntable: state.itemLayout8Reducer,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DragDropContext(HTML5Backend)(TNTableItem));
