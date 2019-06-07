import React, { Component } from 'react';
import { Table, Popconfirm, Tag, Button, Form, Divider, Modal, Select, Input, notification } from 'antd';
import { connect } from 'react-redux';
import { DELETE_DATA_LAYOUT_3, SAVE_DATA_LAYOUT_3, SAVE_ALL_DATA_LAYOUT_3, ADD_DATA_LAYOUT_3, IS_LOADED_3, ADD_ARRAY_LAYOUT_3, SAVE_LOG ,SAVE_LOG_OBJECT} from '../../../Constant/ActionType';
import TextArea from "antd/lib/input/TextArea"; 
import { getCurrTime } from '../../../utils/Time';
import $ from './../../../helpers/services';

const { Option } = Select;
const confirm = Modal.confirm;
const FormItem = Form.Item
const EditableContext = React.createContext();

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Thông báo',
    description: 'Lưu dữ liệu thành công',
  });
};

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

let cellData = [] 

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      standActs: [],
      cdr: []
    };
  }

  handleChangeStandard(value) {
    this.setState({ standActs: value });
  }

async componentDidMount() {
  // let arr = cellData
  // console.log(arr);
  
            // cellData[0].forEach(element => {
            //     element.KeyRow = element.KeyRow.slice(0, element.KeyRow.length -1)
            // });
    this.setState({cdr: cellData[0]})
}

  getInput = () => {
    const childrenStandard = [];
    
    let standActs = this.state.cdr

    for (let i = 0; i < standActs.length; i++) {
      childrenStandard.push(
        <Option key={standActs[i].KeyRow}>{standActs[i].KeyRow}</Option>
      );
    }    

    switch (this.props.dataIndex) {
      case "objectName":
        return <TextArea rows={1} style={{ width: "100%" }} />;
      case "description":
        return <TextArea rows={2} style={{ width: "100%" }} />;
      case "standActs":
        return (
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Chọn hoạt động"
            onChange={value => this.handleChangeStandard(value)}
          >
            {childrenStandard}
          </Select>
        );
      default:
        return <Input />;
    }
  }

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

class TableItem extends Component {
  constructor(props){
    super(props)
    this.state = { 
      data: this.props.itemLayout3Reducer.previewInfo, 
      editingKey: '' ,
      selectedRowKeys: [],
      count: 0,
      disableSaveAll: false,
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
            return <Tag color={color} key={tag}>{tag}</Tag>;
          })}
        </span>
      ),
    }, {
      title: 'Thao tác',
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
                      href="#;"
                      onClick={() => this.save(form, record.key)}
                      style={{ marginRight: 8 }}
                    >
                      Lưu
                    </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="Xác nhận hủy?"
                  onConfirm={() => this.cancel(record.key)}
                >
                  <a>Hủy</a>
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
                    onConfirm={() => this.delete(record.key)}
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

async getData() {
  return $.getData3(this.props.monhoc).then(res => {
    return res.data
  })
}

getUnique(arr, comp) {
  const unique = arr
       .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)

    .filter(e => arr[e]).map(e => arr[e]);
   return unique;
}

async componentDidMount() {
  await cellData.push(await this.getCDR());
  await console.log(cellData);
}

async getCDR() {
  return $.getCDR_3().then(res => {
      return res.data
  })
}

loadData = () => {
  let self = this

  let saveData = []
  let standActs = [];
  let count = self.state.count
  //if(!self.props.itemLayout3Reducer.isLoaded) {
   //if (count <= 2) {
      self.setState({count: count + 1})
      self.getData().then((res) => {
        if (res.length > 0) {
          res.forEach(element => {
            res.forEach(element2 => {
              if(element2.muc_tieu === element.muc_tieu) {
                element2.KeyRow = element2.KeyRow.slice(0, element2.KeyRow.length -1)
                element2.KeyRow = element2.KeyRow.replace(/-/g, ".")
                standActs.push(element2.KeyRow)
              }
            });
            let newObj = {
                  objectName: element.muc_tieu,
                  description: element.mo_ta,
                  standActs: standActs,
                  del_flag: element.del_flag,
                  id: element.id,
                }            
              saveData.push(newObj);        
              standActs = []
          });
        }
        saveData = self.getUnique(saveData, "objectName")
        saveData = saveData.filter((item) => item.del_flag === 0)
        self.props.saveAndContinue(saveData);
        self.setState({disableSaveAll: false})
        //self.props.setFlag(true);
        
        
      }) 
      
   // }
  //}
}

componentWillReceiveProps(nextProps){
  if(!this.props.itemLayout3Reducer.isLoaded) {
    this.props.setFlag(true);
    this.loadData();
  }
  
}

  onMultiDelete = () => { 
    const selectedRow = this.state.selectedRowKeys;
    console.log(selectedRow[0])
    // delete one
    if (selectedRow.length === 1) {
      this.delete(selectedRow[0]);
      return;
    }

    //delete all
    if (selectedRow.length === this.props.itemLayout3Reducer.previewInfo.length) {
      let data = [];
      this.props.itemLayout3Reducer.previewInfo.forEach(element => {
        this.props.saveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa mục tiêu môn học: [Mục tiêu: ${element.objectName}, Mô tả : ${element.description}, CDR CDIO : ${element.standActs}]`, this.props.logReducer.contentTab, this.props.monhoc);
          this.props.saveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa mục tiêu môn học: [Mục tiêu: ${element.objectName}, Mô tả : ${element.description}, CDR CDIO : ${element.standActs}]`, this.props.logReducer.contentTab, this.props.monhoc)
      
        element.del_flag = 1;
        data.push(element)
      });
      data = this.getUnique(data, "objectName")
      this.props.handleSave(data);
      this.setState({ selectedRowKeys: [] });
      return;
    }

    // let items = this.props.itemLayout3Reducer.previewInfo;
    // const filteredItems = items.filter(
    //   (_, index) => !selectedRow.includes(index)
    // );
    let data = [];
    selectedRow.forEach(element => {
      this.props.itemLayout3Reducer.previewInfo.forEach((element2, index) => {
        if(element === index) {
          this.props.saveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa mục tiêu môn học: [Mục tiêu: ${element2.objectName}, Mô tả : ${element2.description}, CDR CDIO : ${element2.standActs}]`, this.props.logReducer.contentTab, this.props.monhoc);
          this.props.saveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa mục tiêu môn học: [Mục tiêu: ${element2.objectName}, Mô tả : ${element2.description}, CDR CDIO : ${element2.standActs}]`, this.props.logReducer.contentTab, this.props.monhoc)
      
          element2.del_flag = 1;
        }
        data.push(element2)
      });
    });
    data = this.getUnique(data, "objectName")
    this.props.handleSave(data);
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
    let deleteData = this.props.itemLayout3Reducer.previewInfo[key]
    this.props.saveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa mục tiêu môn học: [Mục tiêu : ${deleteData.objectName},Mô tả: ${deleteData.description},CDR CDIO : ${deleteData.standActs}]`, this.props.logReducer.contentTab, this.props.monhoc);
    this.props.saveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa mục tiêu môn học: [Mục tiêu : ${deleteData.objectName},Mô tả: ${deleteData.description},CDR CDIO : ${deleteData.standActs}]`, this.props.logReducer.contentTab, this.props.monhoc)

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
      let index = key

      var newItems = this.props.itemLayout3Reducer.previewInfo;
      const item = newItems[index];
      newItems.splice(index, 1, {
        ...item,
        ...row
      });

      this.props.handleSave(newItems, key);
      this.props.saveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Chỉnh sửa mục tiêu môn học: [Mục tiêu : ${item.objectName.toUpperCase()}, Mô tả : ${item.description}, CĐR CDIO của chương trình: ${item.standActs}]`, this.props.logReducer.contentTab, this.props.monhoc)
      this.props.saveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Chỉnh sửa mục tiêu môn học: [Mục tiêu : ${item.objectName.toUpperCase()}, Mô tả : ${item.description}, CĐR CDIO của chương trình: ${item.standActs}]`, this.props.logReducer.contentTab, this.props.monhoc)

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
        standActs: items[i].standActs,
        del_flag: items[i].del_flag,
        id: items[i].id,
      };
      data.push(temp);
    }    
    data = data.filter((item) => item.del_flag === 0)
    data = this.getUnique(data, "objectName")
    return data;
  };

  saveAll = () => {
    var self = this;
    self.setState({disableSaveAll: true})
    //this.props.saveAll(this.props.monhoc)
    $.saveData3({ data: self.props.itemLayout3Reducer.previewInfo, id: self.props.monhoc })
    .then((res) => {
      if(res.data === 1) {
        self.loadData()
      }
    });
    openNotificationWithIcon('success');
    //this.loadData();
    
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
          {this.props.isReview === true ? null : <div style={{ marginBottom: 16, marginTop: 10 }}>
          <Button
            type="danger"
            onClick={this.showModal}
            disabled={!hasSelected}
          >
            Xoá
          </Button>

          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Đã chọn ${selectedRowKeys.length} mục` : ""}
          </span>
           <Button style={{float: "right"}}
            disabled={this.state.disableSaveAll}
            onClick={() => {
              // this.loadData()
              this.saveAll()
            }
            }
          >
            Lưu tất cả
          </Button>
          </div>}
          <Table
            components={components}
            bordered
            rowSelection={this.props.isReview === true ? null : rowSelection}
            dataSource={this.setIndexForItem()}
            columns={columns}
            rowClassName="editable-row"
            style={{ wordWrap: "break-word", whiteSpace: 'pre-line'}}
          />
        </div>
      );
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    itemLayout3Reducer: state.itemLayout3Reducer,
    subjectid: state.subjectid,
    logReducer: state.logReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDelete: (key) => {
      dispatch({type: DELETE_DATA_LAYOUT_3, key: key});
    },
    handleSave: (data, key) => {
      dispatch({type: SAVE_DATA_LAYOUT_3, data, key})
    },
    saveAndContinue: (item) => {
      dispatch({ type: ADD_ARRAY_LAYOUT_3, item });         
    },
    setFlag: (idLoaded) => {
      dispatch({ type: IS_LOADED_3, idLoaded });         
    },
    saveAll: (id) => {
      dispatch({type: SAVE_ALL_DATA_LAYOUT_3, id})
    },
    saveLog: (ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id) => {
      dispatch({type: SAVE_LOG, ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id})
    },
    saveReducer: (ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id) => {
      dispatch({ type: SAVE_LOG_OBJECT, ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id })
  }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableItem);