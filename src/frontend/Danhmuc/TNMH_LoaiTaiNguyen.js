import React, { Component } from 'react';
import { Collapse, Form, Input, Menu, Icon,
     Button, Dropdown, message, Row, Col,
      Select, Modal, Table, Tag, Popconfirm,
    Divider, notification } from 'antd';
import axios from 'axios';
import $ from './../helpers/services';
const Panel = Collapse.Panel;
const formItemLayout = {
    labelCol: {
        xs: { span: 16 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

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
        return <Input style={{ width: '100%' }} />
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

class TNMH_LoaiTaiNguyen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selecteditem: [],
            editstate: '',
            dataSource: [],
            visible: false
        }
        this.columns = [{
            title: 'Loại tài nguyên',
            dataIndex: 'loai',
            key: 'loai',
            width: 600,
            editable: true,
            align: "center",
            render: text => <p>{text}</p>,
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
        $.getLoaiTaiNguyen().then((res) => {
          let data = [];
          for(let i = 0;i < res.data.length;i++) {
            data.push({
                key: res.data[i].id,
                loai: res.data[i].loai,
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
          axios.post("/update-loaitainguyen", { data: {id: key, loai: row.loai}}).then(
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
        axios.post("/delete-loaitainguyen-from-tainguyen", { data: [key]}).then(
          res => {
            axios.post("/delete-tainguyen", { data: [key]}).then(
                res => {
                    axios.post("/delete-loaitainguyen", { data: [key]}).then(
                        res => {
                          this.loadTable();
                          this.setState({editstate: ''});
                          this.setState({selecteditem: []});
                          openNotificationWithIcon('success');
                        });
                })
          });
        
      }

      handleOk = () => {
        let data = [];
        axios.post("/delete-loaitainguyen-from-tainguyen", { data: this.state.selecteditem}).then(
          res => {
            axios.post("/delete-tainguyen", { data: this.state.selecteditem}).then(
                res => {
                    axios.post("/delete-loaitainguyen", { data: this.state.selecteditem}).then(
                        res => {
                          this.loadTable();
                          this.setState({editstate: ''});
                          this.setState({selecteditem: []});
                          openNotificationWithIcon('success');
                        });
                })
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

      addRow = () => {
        let loai = document.getElementById("input-1").value;
        if(loai === "" || loai === undefined || loai === null) {
          message.warning("Chưa nhập loại tài nguyên!");
        }
        else {
            axios.post("/add-loaitainguyen", { data: {loai: loai}}).then(
            res => {
                this.loadTable();
                openNotificationWithIcon('success');
            })
        }
      }
      componentDidMount() {
        this.loadTable();
      }
    render() {

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
            inputType: col.dataIndex === 'ma_chu_de' ? 'ma_chu_de' : 'ten_chu_de',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      });

        return (
            <Collapse >
                <Panel header="Danh mục loại tài nguyên môn học" key="1">
                <Row>
                <Col span={6}>
                </Col>
                    <Col span={6}>
                <Form.Item
            {...formItemLayout}
            label="Loại tài nguyên: "
          >
              <Input id="input-1"/>
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

export default TNMH_LoaiTaiNguyen;