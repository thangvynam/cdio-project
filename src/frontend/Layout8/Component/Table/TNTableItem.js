import React, { Component } from 'react';
import {
  Table, Button, Popconfirm, Form, Divider, Select, Modal, notification
} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateTNData, addTNData, isLoaded8, saveLog, saveLogObject } from '../../../Constant/ActionType';
import { getCurrTime } from '../../../utils/Time';
import $ from './../../../helpers/services';
import DragDropHTML5 from '../../../html5Backend/html5Backend';

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
    return <TextArea rows={4} style={{ width: "100%" }} />;
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
    this.state = { selectedRowKeys: [], editingKey: '' ,isSaveAll : false};
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
      render: this.props.isReview === true ? null : (text, record) => {
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
                    onConfirm={() => this.handleDelete(record.index)}
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
      let message = `Chỉnh sửa tài nguyên môn học: [Loại : ${item.loai}, Mô tả : ${item.mota}, Link liên kết : ${item.link}] thành [Loại : ${newItems[key].loai}, Mô tả : ${newItems[key].mota}, Link liên kết : ${newItems[key].link}]`;

      this.props.onSaveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), message, this.props.logReducer.contentTab, this.props.monhoc)
      this.props.onSaveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), message, this.props.logReducer.contentTab, this.props.monhoc)

      this.props.onAddTNData(newItems);
      this.setState({ editingKey: "" });
    });
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

  handleDelete = (index) => {
    let previewInfo  = this.props.itemLayout8Reducer.previewInfo;
    previewInfo[index].del_flag = 1;
    this.props.onSaveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa tài nguyên môn học: Loại : ${previewInfo[index].loai}, Mô tả : ${previewInfo[index].mota}, Link liên kết : ${previewInfo[index].link}`, this.props.logReducer.contentTab, this.props.monhoc)
      this.props.onSaveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa tài nguyên môn học: Loại : ${previewInfo[index].loai}, Mô tả : ${previewInfo[index].mota}, Link liên kết : ${previewInfo[index].link}`, this.props.logReducer.contentTab, this.props.monhoc)
   this.props.onAddTNData(previewInfo);
   this.setState({selectedRowKeys: [],editingKey : ""});
  }

  onMultiDelete = () => {
    const selectedRow = this.state.selectedRowKeys;

    let newData = this.props.itemLayout8Reducer.previewInfo;

    for (let i = 0; i < selectedRow.length; i++) {
      newData[selectedRow[i]].del_flag = 1;

      this.props.onSaveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa tài nguyên môn học: Loại : ${newData[selectedRow[i]].loai}, Mô tả : ${newData[selectedRow[i]].mota}, Link liên kết : ${newData[selectedRow[i]].link}`, this.props.logReducer.contentTab, this.props.monhoc)
      this.props.onSaveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa tài nguyên môn học: Loại : ${newData[selectedRow[i]].loai}, Mô tả : ${newData[selectedRow[i]].mota}, Link liên kết : ${newData[selectedRow[i]].link}`, this.props.logReducer.contentTab, this.props.monhoc)
    }

    this.props.onAddTNData(newData);
    this.setState({ selectedRowKeys: [], editingKey: "" });
  };

  async getData() {
    return $.getTaiNguyenMonHoc(this.props.monhoc).then(response => {
      return response.data
    }).catch(function (error) {
      console.log(error)
    })
  }

  loaiDisplayName(value) {
    for (let i = 0; i < this.props.itemLayout8Reducer.loaitainguyen.length; i++) {
      if (value === this.props.itemLayout8Reducer.loaitainguyen[i].id) {
        return this.props.itemLayout8Reducer.loaitainguyen[i].loai;
      }
    }
  }

  async componentDidMount() {
    if(this.props.itemLayout8Reducer.isLoaded === false){
      let temp = await this.getData();
      this.setData(temp);
      this.props.isLoaded(true);

    }
    
  }

  setData = temp => {
    let tempPreview = [];
    if (temp !== null && temp !== undefined) {
      temp.map((item, index) => {
        let data = {
          id: item.id,
          key: index,
          index: index,
          stt: index + 1,
          loai: this.loaiDisplayName(item.tnmh_loai_tai_nguyen_id),
          mota: item.mo_ta,
          link: item.lien_ket,
          del_flag: item.del_flag,
        }
        tempPreview.push(data);
      })
      this.props.onAddTNData(tempPreview);
    }
    this.setState({isSaveAll:false})
  }

  setIndexForItem = () => {
    let tainguyenmonhoc = [];
    let tnmh = this.props.itemLayout8Reducer.previewInfo;
    let stt = 1;
    for (let i = 0; i < tnmh.length; i++) {
      let temp = tnmh[i];
      temp.index = i;
      if(temp.del_flag === 0) temp.stt = stt++;
      tainguyenmonhoc.push(temp);
    }

    return (this.dataSource = tainguyenmonhoc.filter(
      (item, _) => item.del_flag === 0
    ));
  };

  async saveAll(){
    this.setState({isSaveAll : true})
    let loaitainguyen = this.props.itemLayout8Reducer.loaitainguyen;
    let id = this.props.monhoc;
    let description = this.props.itemLayout8Reducer.previewInfo;
    let obj = {
      loaitainguyen: loaitainguyen,
      id: id,
      description: description,
    }

    $.saveData8(obj)
      .then(response => {
        if (response.data === 1) {
          notification["success"]({
            message: "Cập nhật thành công",
            duration: 1
          });
        }
        else {
          notification["error"]({
            message: "Cập nhật thất bại",
            duration: 1
          });
        }
      });
    $.saveLog({ data: this.props.itemLayout8Reducer.logData })
  
    let temp = await this.getData();
    this.setData(temp);
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
        {this.props.isReview === true ? null : <div style={{ marginBottom: 16 }}>
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
          <Button style={{ float: "right" }}
            onClick={() => this.saveAll()}
            disabled={this.state.isSaveAll}
          >
            Lưu tât cả
          </Button>
        </div>}
        <Table
          components={components}
          bordered
          dataSource={this.setIndexForItem()}
          columns={columns}
          rowSelection={this.props.isReview === true ? null : rowSelection}
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
    isLoaded: isLoaded8,
    onSaveLog: saveLog,
    onSaveReducer: saveLogObject
  }, dispatch);
}

const mapStateToProps = (state) => {
  return {
    itemLayout8Reducer: state.itemLayout8Reducer,
    logReducer: state.logReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropHTML5(TNTableItem));
