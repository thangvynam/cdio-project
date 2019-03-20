import React, { Component } from 'react';
import { Table, Popconfirm, Tag, Button, Form, Divider, Modal } from 'antd';
import { connect } from 'react-redux';
import { SAVE_DATA_LAYOUT_2, SAVE_ALL_DATA_LAYOUT_2, ADD_DATA_LAYOUT_2 } from '../../../Constant/ActionType';
import TextArea from "antd/lib/input/TextArea"; 
import axios from 'axios';

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
      render: (text, record) => {
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
                </span>
            )}
          </div>
        );
      },
    }];
  }

  async getData() {
    return axios.get('/get-data-2').then(res => {
        return res.data
    }).then(resp => {
        return resp.noi_dung;
    })
}

  async componentDidMount(){
    let temp = await this.getData();
    console.log(temp);
    
    this.props.saveAndContinue(temp);
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
        newData.splice(0, 1, {
          ...newData.key,
          ...row,
        });
        console.log(newData);
        this.props.handleSave(newData);
        this.setState({ editingKey: "" });
    });
  }

  setIndexForItem = () => {
    let des = []; 
    // console.log(this.props.itemLayout2Reducer.previewInfo);
    
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
          <br />
           <Button
            onClick={this.props.saveAll}
          >
            Save all
          </Button>
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
    itemLayout2Reducer: state.itemLayout2Reducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSave: (data) => {            
      dispatch({type: SAVE_DATA_LAYOUT_2, data: data})
    },
    saveAll: () => {
      dispatch({type: SAVE_ALL_DATA_LAYOUT_2})
    },
    saveAndContinue: (description) => {
      dispatch({ type: ADD_DATA_LAYOUT_2, description });         
  }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableItem);