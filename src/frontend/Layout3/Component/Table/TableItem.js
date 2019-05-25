import React, { Component } from 'react';
import { Table, Popconfirm, Tag, Button, Form, Divider, Modal, Select, Input } from 'antd';
import { connect } from 'react-redux';
import { DELETE_DATA_LAYOUT_3, SAVE_DATA_LAYOUT_3, SAVE_ALL_DATA_LAYOUT_3, ADD_DATA_LAYOUT_3, IS_LOADED_3, ADD_ARRAY_LAYOUT_3, SAVE_LOG } from '../../../Constant/ActionType';
import TextArea from "antd/lib/input/TextArea"; 
import axios from 'axios'
import { getCurrTime } from '../../../utils/Time';

const { Option } = Select;
const confirm = Modal.confirm;
const FormItem = Form.Item
const EditableContext = React.createContext();
const staActs = [
  '1.1',
  '2.2',
  '2.3',
  '2.4',
  '4.1',
]

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

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

  async getCDR() {
    return axios.get("/get-cdr-3").then(res => {
        return res.data
    })
}

async componentDidMount() {
  let arr = await this.getCDR()
            arr.forEach(element => {
                element.KeyRow = element.KeyRow.slice(0, element.KeyRow.length -1)
                element.KeyRow = element.KeyRow.replace(/-/g, ".")
            });
    this.setState({cdr: arr})
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
      count: 0
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
  return axios.get(`/get-data-3/${this.props.subjectid}`).then(res => {
    return res.data
  }).then(resp => {
    return resp;
  })
}

getUnique(arr, comp) {
  const unique = arr
       .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)

    .filter(e => arr[e]).map(e => arr[e]);
   return unique;
}

async componentWillReceiveProps(nextProps){
  let saveData = []
  let standActs = [];
  let count = this.state.count
  if (count <= 2) {
    this.setState({count: count + 1})
    let temp = await this.getData()
    if (temp.length > 0) {
      temp.forEach(element => {
        temp.forEach(element2 => {
          if(element2.muc_tieu === element.muc_tieu) {
            element2.KeyRow = element2.KeyRow.slice(0, element2.KeyRow.length -1)
            element2.KeyRow = element2.KeyRow.replace(/-/g, ".")
            standActs.push(element2.KeyRow)
          }
        });
        let newObj = {
              objectName: element.muc_tieu,
              description: element.mo_ta,
              standActs: standActs
            }            
          saveData.push(newObj);        
          standActs = []
      });
    }
    
    saveData = this.getUnique(saveData, "objectName")
    this.props.saveAndContinue(saveData);
    this.props.setFlag(true);
  }
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
    let deleteData = this.props.itemLayout3Reducer.previewInfo[key]
    this.props.saveLog("Nguyen Van A", getCurrTime(), `Xóa mục tiêu môn học: ${deleteData.objectName}, ${deleteData.description}, ${deleteData.standActs}`, this.props.logReducer.contentTab, this.props.subjectid);
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
      this.props.saveLog("Nguyen Van A", getCurrTime(), `Chỉnh sửa nội dung mục tiêu môn học thành: ${newItems[key].objectName}, ${newItems[key].description}, ${newItems[key].standActs}`, this.props.logReducer.contentTab, this.props.subjectid);
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
            onClick={() => this.props.saveAll(this.props.subjectid)}
          >
            Lưu tất cả
          </Button>}
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableItem);