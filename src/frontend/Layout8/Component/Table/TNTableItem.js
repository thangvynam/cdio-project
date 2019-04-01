import React, { Component } from 'react';
import {
  Table, Input, Button, Popconfirm, Form, Divider, Tag, InputNumber, Select, Modal
} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { bindActionCreators } from 'redux';
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from 'react-redux';
import { updateTNData,addTNData,saveAllTNData,isLoaded8 } from '../../../Constant/ActionType';
import axios from 'axios';

const { Option } = Select;


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
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      let index = key;
      var newItems = this.props.itemLayout8Reducer.previewInfo;
      const item = newItems[index];
      newItems.splice(index, 1, {
        ...item,
        ...row
      });
      this.props.onAddTNData(newItems);
      this.setState({ editingKey: "" });
    });
  }

  handleDelete(key) {
    for(let i= key;i<this.props.itemLayout8Reducer.previewInfo.length-1;i++){
      this.props.itemLayout8Reducer.previewInfo[i].loai = this.props.itemLayout8Reducer.previewInfo[i+1].loai;
      this.props.itemLayout8Reducer.previewInfo[i].mota = this.props.itemLayout8Reducer.previewInfo[i+1].mota;
      this.props.itemLayout8Reducer.previewInfo[i].link = this.props.itemLayout8Reducer.previewInfo[i+1].link;
    }
    for (let i = 0; i < this.props.itemLayout8Reducer.previewInfo.length; i++) {
      this.props.itemLayout8Reducer.previewInfo[i].key = i;
      this.props.itemLayout8Reducer.previewInfo[i].stt = i + 1;
    }
    this.props.itemLayout8Reducer.previewInfo.splice(this.props.itemLayout8Reducer.previewInfo.length - 1, 1);
    let  newData = this.props.itemLayout8Reducer.previewInfo;
    this.setState({ selectedRowKeys: [], editingKey: "" });
    this.props.onAddTNData(newData);
  }

  edit(key) {
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
    if (selectedRow.length === this.props.itemLayout8Reducer.previewInfo.length) {
      this.props.itemLayout8Reducer.previewInfo = [];
      this.props.onUpdateTNData([]);
      this.setState({ selectedRowKeys: [], editingKey: "" });
      return;
    }

    let filteredItems = {previewInfo:[]}
   
    let KHitems = this.props.itemLayout8Reducer.previewInfo;
    this.props.itemLayout8Reducer.previewInfo = KHitems.filter(
      (_, index) => !selectedRow.includes(index + 1)
    );
    for (let i = 0; i < this.props.itemLayout8Reducer.previewInfo.length; i++) {
      this.props.itemLayout8Reducer.previewInfo[i].key = i + 1;
      this.props.itemLayout8Reducer.previewInfo[i].stt=  i+1;
    }

    filteredItems.previewInfo = this.props.itemLayout8Reducer.previewInfo;
    this.props.onUpdateTNData(filteredItems);
    this.setState({ selectedRowKeys: [], editingKey: "" });
  };

  getData() {
    return axios.get(`/get-tainguyenmonhoc/${this.props.subjectid}`).then(response => {
      
        return response.data
    }).catch(function(error){
      console.log(error)
    })
}

loaiDisplayName(value){
  for(let i=0 ;i<this.props.itemLayout8Reducer.loaitainguyenState.length;i++){
    if(value === this.props.itemLayout8Reducer.loaitainguyenState[i].id) {
      return this.props.itemLayout8Reducer.loaitainguyenState[i].loai;
    }}
}

async componentDidMount(){
  let temp = await this.getData();
  let tempPreview = [];
  if(temp!==null && temp!== undefined && this.props.itemLayout8Reducer.isLoaded === false){
    temp.map((item,index) =>{
      let data = {
        key: index,
        stt: index +1,
        loai: this.loaiDisplayName(item.tnmh_loai_tai_nguyen_id),
        mota: item.mo_ta,
        link: item.lien_ket,
      }
      tempPreview.push(data);
    })
    this.props.isLoaded(true);
  this.props.onAddTNData(tempPreview);
  }
  
}

saveAll = () => {

  let loaitainguyen = this.props.itemLayout8Reducer.loaitainguyenState;
  let id = this.props.subjectid;
  let description = this.props.itemLayout8Reducer.previewInfo;
  let obj = {
    loaitainguyen : loaitainguyen,
    id : id,
    description : description,
  }
  this.props.onSaveAllData(obj);
  alert("ok")
}

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
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="danger"
            onClick={this.showModal}
            disabled={!hasSelected}
          >
            Xóa
          </Button>

          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Đã chọn ${selectedRowKeys.length} mục` : ""}
          </span>
          <Button style={{float: "right"}}
            onClick={this.saveAll}
          >
            Lưu tât cả
          </Button>
        </div>
        <Table
          components={components}
          bordered
          dataSource={this.props.itemLayout8Reducer.previewInfo}
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
    onAddTNData: addTNData,
    onSaveAllData : saveAllTNData,
    isLoaded: isLoaded8,
  }, dispatch);
} 

const mapStateToProps = (state) => {
  return {
    
    itemLayout8Reducer: state.itemLayout8Reducer,
    subjectid: state.subjectid,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DragDropContext(HTML5Backend)(TNTableItem));
