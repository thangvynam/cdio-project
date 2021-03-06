import React, { Component } from 'react';
import { Table, Popconfirm, Button, Form, notification } from 'antd';
import { connect } from 'react-redux';
import { SAVE_DATA_LAYOUT_2, SAVE_ALL_DATA_LAYOUT_2, ADD_DATA_LAYOUT_2, IS_LOADED_2, SAVE_LOG, IS_LOAD_LOG, SAVE_LOG_OBJECT } from '../../../Constant/ActionType';
import TextArea from "antd/lib/input/TextArea"; 
import { getCurrTime } from '../../../utils/Time';
import $ from './../../../helpers/services';

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
                  })(<TextArea  rows={5}/>)}
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
      data: '', 
      editingKey: '',
      selectedRowKeys: [],
      count: 0
    };
    this.columns = [{
      title: 'Mô tả môn học',
      dataIndex: 'description',
      key: 'description',
      width: '100%',
      editable: true,
      onCell: () => {
        return {
          style: {
            maxWidth: 500,
          }
        }
      },
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
                      href="#"
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
                </span>
            )}
          </div>
        );
      },
    }];
  }

  async getData() {
    return $.getData2(this.props.monhoc).then(res => {
        return res.data
    }).then(resp => {
        return resp.Description;
    })
}

  async componentWillReceiveProps(nextProps){
    let count = this.state.count
    if(!this.props.itemLayout2Reducer.isLoaded) {
      if (count <= 2) {
        this.setState({count: count + 1})
        let temp = await this.getData();
        this.props.saveAndContinue(temp);
        this.props.setFlag(true);
      }
    }
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
      
      const newData = [...this.props.itemLayout2Reducer.previewInfo];
      let item = "";
      newData.forEach(element => item +=element)
      
        newData.splice(0, 1, {
          ...newData.key,
          ...row,
        });
        this.props.handleSave(newData);
        let message = `Chỉnh sửa nội dung mô tả môn học: [${item}] -> [${newData[key].description}]`;
        this.props.saveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), message, this.props.logReducer.contentTab, this.props.monhoc, this.props.id_ctdt);
        this.props.saveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(),message, this.props.logReducer.contentTab, this.props.monhoc);
        this.props.setFlag2(true);   
        this.setState({ editingKey: "" });
    });
  }

  setIndexForItem = () => {
    let des = []; 
    let temp = {
      key: 0,
      description: this.props.itemLayout2Reducer.previewInfo,
    };
    des.push(temp);
    return des;
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

      return (
        <div>          
          <div style={{ marginBottom: 16, marginTop: 10 }}>
          {this.props.isReview === true ? null : <Button></Button>}

           {this.props.isReview === true ? null : <Button style={{float: "right"}}
            onClick={() => {
              this.props.saveAll(this.props.monhoc)
              openNotificationWithIcon('success')
            } 
            }>
            Lưu tất cả
          </Button>}
          </div>
          <Table
            components={components}
            bordered
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
    itemLayout2Reducer: state.itemLayout2Reducer,
    logReducer: state.logReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSave: (data) => {            
      dispatch({type: SAVE_DATA_LAYOUT_2, data: data})
    },
    saveAll: (id) => {      
      dispatch({type: SAVE_ALL_DATA_LAYOUT_2, id})
    },
    saveAndContinue: (description) => {
      dispatch({ type: ADD_DATA_LAYOUT_2, description });         
    },
    setFlag: (idLoaded) => {
      dispatch({ type: IS_LOADED_2, idLoaded });         
    },
    saveLog: (ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id, id_ctdt) => {
      dispatch({type: SAVE_LOG, ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id, id_ctdt})
    },
    setFlag2: (idLoaded) => {
      dispatch({ type: IS_LOAD_LOG, idLoaded });         
    },
    saveReducer: (ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id) => {
      dispatch({type: SAVE_LOG_OBJECT, ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id})
  }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableItem);