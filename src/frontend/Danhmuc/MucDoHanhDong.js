import React, { Component } from 'react';
import { Collapse, Form, Input, Menu, Icon,
     Button, Dropdown, message, Row, Col,
      Select, Modal, Table, Tag, Popconfirm,
    Divider } from 'antd';
import axios from 'axios';

const Panel = Collapse.Panel;
const formItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const levelOptions = ["1", "2", "3", "4", "5"];
const Option = Select.Option;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {

    getInput = () => {
  
      if (this.props.inputType === 'muc_do_1') {
        return <Input style={{ width: '100%' }}/>
      }
      else if(this.props.inputType === 'muc_do_2') {
        const levelOptions2 = levelOptions.map((item, id) => {
            return <Option key={id} value={item}>{item}</Option>
          });
        return <Select style={{ width: '100%' }}>
                {levelOptions2}
            </Select>
      }
      else {
        return <Input style={{ width: '100%' }} />
      }
      
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
          const  { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <Form.Item style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                      
                    rules: [{
                      required: true,
                      message: `Thiếu thông tin!`,
                    }],
                    initialValue: record[dataIndex],
                  })( this.getInput())}
                </Form.Item>
              ) : restProps.children}
            </td>
          );
        }}
        </EditableContext.Consumer>
      );
    }
  }

class MucDoHanhDong extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selecteditem: [],
            editstate: '',
            dataSource: []
        }
        this.columns = [{
            title: 'Loại mức độ',
            dataIndex: 'muc_do_1',
            key: 'muc_do_1',
            width: 100,
            editable: true,
            render: text => <p>{text}</p>,
          }, {
            title: 'Cấp mức độ',
            dataIndex: 'muc_do_2',
            key: 'muc_do_2',
            width: 200,
            align: "center",
            editable: true,
            render: level => {
              let color = level === 1 ? 'green' :
              level === 2 ? 'volcano' : level === 3 ? 'yellow' : level === 4 ? 'blue' : 'orange';
              return (
                <span>
                  <Tag color={color} key={level}>{level}</Tag>
              </span>
              )
              
          }
          }, {
            title: 'Động từ',
            dataIndex: 'muc_do_3',
            key: 'muc_do_3',
            width: 400,
            editable: true,
          }, 
          {
            title: 'Action',
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
                      <a href="#a" onClick={() => this.edit(record.key)}>Sửa</a>
                    )}
                {!editable ? <Divider type="vertical" /> : null}
                {!editable 
                    ? (
                      <Popconfirm title="Xác nhận xóa?" onConfirm={() => this.handleDelete(record.key)}>
                        <a href="#a">Xóa</a>
                      </Popconfirm>
                    ) : null}
              </div>
            )},
          }];
      }

      showModal = () => {
        this.setState({
          visible: true,
        });
      }

      isEditing = record => record.key === this.state.editstate;

      edit(key) {
        this.setState({editstate: key})
      }

      cancel = () => {
        this.setState({editstate: ''})
      };

      save(form, key) {
        // form.validateFields((error, row) => {
        //   if (error) {
        //     return;
        //   }
        //   const newData = this.props.cdrtable;
          
        //   const index = newData.previewInfo.findIndex(item => key === item.key);
        //   if (index > -1) {
        //     const item = newData.previewInfo[index];
        //     newData.previewInfo.splice(index, 1, {
        //       ...item,
        //       ...row,
        //     });   
        //   } else {
        //     newData.previewInfo.push(row);
        //   }
        //   for(let i = 0;i < newData.previewInfo[key - 1].levels.length - 1;i++){
        //     for (let j = i + 1; j < newData.previewInfo[key - 1].levels.length; j++) {
        //       if (newData.previewInfo[key - 1].levels[j] < newData.previewInfo[key - 1].levels[i]) {
        //         let temp = newData.previewInfo[key - 1].levels[j];
        //         newData.previewInfo[key - 1].levels[j] = newData.previewInfo[key - 1].levels[i];
        //         newData.previewInfo[key - 1].levels[i] = temp;
        //       }
        //     }
          
        // }
        //   let newItems = newData.previewInfo[key-1]
        
        //   this.props.saveLog("Nguyen Van A", getCurrTime(), `Chỉnh sửa nội dung chuẩn đầu ra môn học thành: ${newItems.cdr}, ${newItems.level_verb}, ${newItems.description}, ${newItems.level}`, this.props.logReducer.contentTab, this.props.subjectId);
        //   this.props.onAddCDRData(newData);
        //   this.props.onSelectCDRItem([]);
        //   this.props.onChangeEditState('');
        // });
      }

      onSelectChange = (selectedRowKeys) => {
        this.setState({selecteditem: selectedRowKeys});
      }

      handleDelete = (key) => {

      }

      componentDidMount() {
          axios.get('/collect-cdrmdhd-4').then((res) => {
              let data = [];
              for(let i = 0;i < res.data.length;i++) {
                data.push({
                    key: res.data[i].id,
                    muc_do_1: res.data[i].muc_do_1,
                    muc_do_2: res.data[i].muc_do_2,
                    muc_do_3: res.data[i].muc_do_3
                })
              }
              this.setState({dataSource: data})
          })
      }
    render() {
        const levelOptions2 = levelOptions.map((item, id) => {
            return <Option key={id} value={item}>{item}</Option>
          });

          const components = {
            body: {
              row:  EditableFormRow,
              cell: EditableCell
            },
          }

          const hasSelected = this.state.selecteditem.length > 0;
      const selectedRowKeys = this.state.selecteditem;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
      };

      const columns = this.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === 'muc_do_1' ? 'muc_do_1' : col.dataIndex === 'muc_do_2' ? 'muc_do_2' : 'muc_do_3',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      });

        return (
            <Collapse >
                <Panel header="Danh mục chuẩn đầu ra mức độ hành động" key="1">
                <Row>
                <Col span={4}>
                </Col>
                    <Col span={4}>
                <Form.Item
            {...formItemLayout}
            label="Loại"
          >
              <Input/>
          </Form.Item>
          </Col>
          <Col span={4}>
          <Form.Item
            {...formItemLayout}
            label="Level"
          >
              <Select style={{ width: 120 }}>
                  {levelOptions2}
            </Select>
          </Form.Item>
          </Col>
          <Col span={4}>
          <Form.Item
            {...formItemLayout}
            label="Động từ"
          >
              <Input/>
          </Form.Item>
          </Col>
          <Col span={4}>
          <Form.Item>
              <Button type="primary" style={{ marginLeft: "5em" }}>Thêm</Button>
          </Form.Item>
          </Col>
          </Row>
          <div>
          <div style={{ marginBottom: 16,  marginTop: 16}}>
          <Button
            type="danger"
            //onClick={this.showModal}
            disabled={!hasSelected}
          >
            Delete
          </Button>
          <Modal
          title="Cảnh báo"
          //visible={this.state.visible}
          //onOk={this.handleOk}
          //onCancel={this.handleCancel}
        >
          <p>Xóa những mục đã chọn?</p>
          
        </Modal>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Đã chọn ${this.state.selecteditem.length} mục` : ''}
          </span>
          <Button style={{float: "right"}}
            //onClick={this.saveAll}
          >
            Lưu lại
          </Button>
          </div>
          
            <Table bordered 
            components={components}
            rowSelection={rowSelection} 
            columns={columns} 
            dataSource={this.state.dataSource}
            style={{ wordWrap: "break-word", whiteSpace: 'pre-line'}}
             />
            </div>
                 </Panel>
                 
            </Collapse> 
        )
    }
}

export default MucDoHanhDong;