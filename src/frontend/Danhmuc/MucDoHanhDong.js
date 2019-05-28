import React, { Component } from 'react';
import { Collapse, Form, Input, Menu, Icon,
     Button, Dropdown, message, Row, Col,
      Select, Modal, Table, Tag, Popconfirm,
    Divider, notification } from 'antd';
import axios from 'axios';
import $ from './../helpers/services'

const Panel = Collapse.Panel;
const formItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
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

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Thông báo',
    description: 'Hoàn thành',
  });
};

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
            dataSource: [],
            level_select: '',
            visible: false
        }
        this.columns = [{
            title: 'Loại mức độ',
            dataIndex: 'muc_do_1',
            key: 'muc_do_1',
            width: 200,
            editable: true,
            align: "center",
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
            align: "center",
          }, 
          {
            title: 'Action',
            key: 'action',
            align: "center",
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

      loadTable = () => {
        $.collectCdrmdhd4().then((res) => {
          let data = [];
          for(let i = 0;i < res.data.length;i++) {
            data.push({
                key: res.data[i].id,
                muc_do_1: res.data[i].muc_do_1,
                muc_do_2: res.data[i].muc_do_2,
                muc_do_3: res.data[i].muc_do_3
            })
          }
          this.setState({dataSource: data});        
      });   
      }
      save(form, key) {
        form.validateFields((error, row) => {
          if (error) {
            return;
          }
          $.updateCdrmdhd({ data: {id: key, muc_do_1: row.muc_do_1, muc_do_2: row.muc_do_2, muc_do_3: row.muc_do_3}}).then(
            res => {
              this.loadTable();
              this.setState({editstate: ''});
              openNotificationWithIcon('success');
            });
        });
      }

      onSelectChange = (selectedRowKeys) => {
        this.setState({selecteditem: selectedRowKeys});
      }


      
      handleDelete = (key) => {
        $.deleteCdrmdhdFromCdr({ data: [key]}).then(
          res => {
            $.deleteCdrmdhd({ data: [key]}).then(
              res => {
                this.loadTable();
                this.setState({editstate: ''});
                this.setState({selecteditem: []});
                openNotificationWithIcon('success');
              });
          });
        
      }

      handleOk = () => {
        console.log(this.state.selecteditem);
        let data = [];
        $.deleteCdrmdhdFromCdr({ data: this.state.selecteditem}).then(
          res => {
            $.deleteCdrmdhd({ data: this.state.selecteditem}).then(
              res => {
                this.loadTable();
                this.setState({editstate: ''});
                this.setState({selecteditem: []});
                openNotificationWithIcon('success');
              });
          });
        this.setState({
          visible: false,
        });
      }

      handleCancel = () => {
        this.setState({
          visible: false,
        });
      }

      onChange = (value) => {
        this.setState({level_select: value})
      }

      addRow = () => {
        let muc_do_1 = document.getElementById("input-1").value;
        let muc_do_3 = document.getElementById("input-2").value;
        if(muc_do_1 === "" || muc_do_1 === undefined || muc_do_1 === null) {
          message.warning("Chưa nhập loại mức độ!");
        }
        else {
          if(this.state.level_select === "" || this.state.level_select === undefined || this.state.level_select === null) {
            message.warning("Chưa chọn mức độ!");
          }
          else {
            if(muc_do_3 === "" || muc_do_3 === undefined || muc_do_3 === null) {
              message.warning("Chưa nhập động từ!");
            }
            else {
             $.addCdrmdhd({ data: {muc_do_1: muc_do_1, muc_do_2: this.state.level_select, muc_do_3: muc_do_3}}).then(
                res => {
                  this.loadTable();
                  openNotificationWithIcon('success');
                })
            }
          }
        }
      }
      componentDidMount() {
        this.loadTable();
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
              <Input id="input-1"/>
          </Form.Item>
          </Col>
          <Col span={4}>
          <Form.Item
            {...formItemLayout}
            label="Level"
          >
              <Select onChange={this.onChange} style={{ width: 120 }}>
                  {levelOptions2}
            </Select>
          </Form.Item>
          </Col>
          <Col span={4}>
          <Form.Item
            {...formItemLayout}
            label="Động từ"
          >
              <Input id="input-2"/>
          </Form.Item>
          </Col>
          <Col span={4}>
          <Form.Item>
              <Button onClick={this.addRow} type="primary" style={{ marginLeft: "5em" }}>Thêm</Button>
          </Form.Item>
          </Col>
          </Row>

          <div style={{ marginLeft: 100, marginRight: 100}}>
          <div style={{ marginBottom: 16,  marginTop: 16}}>
          <Button
            type="danger"
            onClick={this.showModal}
            disabled={!hasSelected}
          >
            Delete
          </Button>
          <Modal
          title="Cảnh báo"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Xóa những mục đã chọn?</p>
          
        </Modal>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Đã chọn ${this.state.selecteditem.length} mục` : ''}
          </span>

          </div>
          
            <Table bordered 
            components={components}
            rowSelection={rowSelection} 
            columns={columns} 
            dataSource={this.state.dataSource}
            scroll={{y: 400}}
            style={{ wordWrap: "break-word", whiteSpace: 'pre-line'}}
             />
            </div>
                 </Panel>
                 
            </Collapse> 
        )
    }
}

export default MucDoHanhDong;