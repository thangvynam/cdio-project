import React, { Component } from "react";
import {
  Collapse,
  Form,
  Input,
  Table,
  Divider,
  Button,
  Modal,
  Popconfirm,
  notification,
  Select,
  message,
  Tag,
} from "antd";
import _ from "lodash";
import MucDoHanhDong from './MucDoHanhDong';
import ChuDeDanhGia from './ChuDeDanhGia';
import TNMH_LoaiTaiNguyen from './TNMH_LoaiTaiNguyen';
import $ from './../helpers/services';

const Panel = Collapse.Panel;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

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
  render() {
    const {
      editing,
      dataIndex,
      title,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `Vui lòng nhập ${title.toLowerCase()}!`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(<Input />)}
                </FormItem>
              ) : (
                  restProps.children
                )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class Danhmuc extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Hoạt động",
        dataIndex: "hoat_dong",
        key: "hoat_dong",
        width: 830,
        editable: true
      },
      {
        title: "Loại hoạt động",
        dataIndex: "loai_hoat_dong",
        key: "loai_hoat_dong",
        width: 200,
        align: "center",
        render: type => {
          let color = type === "TH" ? "green" : "volcano";
          return (
            <span>
              <Tag color={color} key={type}>
                {type}
              </Tag>
            </span>
          );
        }
      },
      {
        title: "Thao tác",
        key: "action",
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
                        onClick={() => this.onSaveEdit(form, record.index)}
                        style={{ marginRight: 8 }}
                      >
                        Lưu
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Xác nhận hủy?"
                    onConfirm={() => this.onCancelEdit(record.index)}
                  >
                    <a href="#a">Hủy</a>
                  </Popconfirm>
                </span>
              ) : (
                  <span>
                    <a onClick={() => this.handleEdit(record.index)} href="#a">
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
        }
      }
    ];

    this.state = {
      value: "",
      keyItem: "1",
      selectedRowKeys: [],
      editingKey: "",
      dataSource: []
    };
  }



  save = () => {
    if (_.isEmpty(this.state.value)) {
      message.error("Mời nhập hoạt động");
      return;
    }
    const obj = {
      value: this.state.value,
      keyItem: this.state.keyItem
    };
    $.addHDD({data: obj})
      .then(function (response) {
        if (response.data === 1) {
          notification["success"]({
            message: "Lưu thành công",
            duration: 1
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        notification["error"]({
          message: "Lưu thất bại",
          duration: 1
        });
      })
      .finally(function () {
      });

    this.props.form.resetFields();
    this.setState({ value: "" });
    this.getData();
  };
  handleInputChange = e => {
    this.setState({ value: e.target.value });
  };

  onChangeHDD = value => {
    this.setState({ keyItem: value });
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    $.getDanhmucHDD()
      .then(res => {
        this.setState({ dataSource: res.data });
      })
      .catch(err => {
        console.log("err: ", err);
      });
  }

  handleEdit(index) {
    this.setState({ editingKey: index });
  }
  isEditing = record => record.index === this.state.editingKey;

  onSaveEdit(form, index) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      var newData = this.state.dataSource;
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row
      });

      let body = {
        id: newData[index].id,
        hoat_dong: newData[index].hoat_dong

      }
      $.updateDanhmucHDD(body).then(res => {
        if (res.data === 1) {
          this.getData();
        }
      })

      this.setState({ editingKey: "" });
    });
  }
  onCancelEdit = () => {
    this.setState({ editingKey: "" });
  };
  setIndexForItem = () => {
    let newData = [];
    let data = this.state.dataSource;
    for (let i = 0; i < data.length; i++) {
      let temp = data[i];
      temp.index = i;
      newData.push(temp);
    }
    return newData;
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  showModal = () => {
    confirm({
      title: "Xóa các mục đã chọn?",
      content: "",
      onOk: this.onMultiDelete,
      onCancel() { }
    });
  };

  handleDelete = (index) => {
    let body = [];
    let item = {};
    item.id = this.state.dataSource[index].id;
    item.type = this.state.dataSource[index].loai_hoat_dong;

    body.push(item);

    $.deleteDanhmucHDD(body).then(response => {
      if (response.data === 1) {
        this.getData();
      }

    });

  }

  onMultiDelete = () => {
    const selectedRow = this.state.selectedRowKeys;
    let body = [];
    for (let i = 0; i < selectedRow.length; i++) {
      let item = {};
      item.id = this.state.dataSource[selectedRow[i]].id;
      item.type = this.state.dataSource[selectedRow[i]].loai_hoat_dong;
      body.push(item);
    }
    
    $.deleteDanhmucHDD(body).then(response => {
      if (response.data === 1) {
        this.getData();
      }

    });

    this.setState({ selectedRowKeys: [], editingKey: "" });
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
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
        <Collapse defaultActiveKey="1">
          <Panel header="Danh mục hoạt động dạy" key="1">
            <Form.Item {...formItemLayout} label="Hoạt động">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng nhập hoạt động"
                  },
                ],
              })(<Input onChange={this.handleInputChange} />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="Loại">
              <Select
                defaultValue="1"
                style={{ width: "25%" }}
                onChange={this.onChangeHDD}
              >
                <Option value="1">Hoạt động dạy lý thuyết</Option>
                <Option value="2">Hoạt động dạy thực hành</Option>
              </Select>
            </Form.Item>
            <Button
              type="primary"
              onClick={this.save}
              style={{ marginLeft: "22em" }}
            >
              Thêm
            </Button>

            <div>
              <div style={{ marginBottom: 16, marginTop: 16 }}>
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
              </div>
              <Table
                components={components}
                bordered
                rowSelection={rowSelection}
                columns={columns}
                rowClassName="editable-row"
                dataSource={this.setIndexForItem()}
                style={{ wordWrap: "break-word", whiteSpace: "pre-line" }}
                rowKey={record => record.index}
              />
            </div>
          </Panel>
        </Collapse>
        <MucDoHanhDong />
        <ChuDeDanhGia />
        <TNMH_LoaiTaiNguyen />
      </div>
    );
  }
}

export default Form.create()(Danhmuc);;
