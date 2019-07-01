import React, { Component } from 'react';
import {
  Form, Input,  Icon,
  Button, 
  Select, Modal, Table, Tag, Popconfirm,
  Divider, notification, Tooltip
} from 'antd';
import $ from "./../../helpers/services";

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

    if (this.props.inputType === 'subject') {
      return <Select style={{ width: '100%' }} disabled={true} />
    }
    else if (this.props.inputType === 'list') {

      return <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Chọn giáo viên"
        onChange={this.props.handleChange}
      >
        {this.props.teacherOptions}
      </Select>
    }
    else {
      return <Input style={{ width: '100%' }} disabled={true} />
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
      teacherOptions,
      handleChange,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <Form.Item style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {

                    rules: [{
                      required: true,
                      message: `Chưa chọn giáo viên!`,
                    }],
                    initialValue: dataIndex === "time" ? record[dataIndex][0] + " đến " + record[dataIndex][1]
                    : record[dataIndex],
                  })(this.getInput())}
                </Form.Item>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class TablePhanCong extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selecteditem: [],
      editstate: '',
      visible: false,
      teacherSelect: [],
      teacherList: []
    }
    this.columns = [{
      title: 'Môn học',
      dataIndex: 'subject',
      key: 'subject',
      width: "fixed",
      editable: true,
      align: "left",
      ...this.getColumnSearchProps('subject'),
      render: text => <div >
        {text}
      </div>,
    }, {
      title: 'Giáo viên được phân công',
      dataIndex: 'list',
      key: 'list',
      width: "30%",
      align: "left",
      editable: true,
      ...this.getColumnSearchProps('list'),
      render: list => (
        <span>
          {list.map(item => {
            let color = 'orange';
            return <Tag color={color} key={item}>{item.toUpperCase()}</Tag>;
          })}
        </span>
      )
    }, {
      title: 'Thời hạn',
      dataIndex: 'time',
      key: 'time',
      width: "30%",
      editable: true,
      align: "center",
      render: item => (
        <Tag color='geekblue'>{item[0]} đến {item[1]}</Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      align: "center",
      width: "10%",
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
                  title="Hủy bỏ?"
                  onConfirm={() => this.cancel(record.key)}
                >
                  <a href="#a">Hủy</a>
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
        )
      },
    }];
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
            </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
            </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },

  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
  };

  handleReset = clearFilters => {
    clearFilters();
  };

  handleChange = (key, value) => {
    let teacherSelect = [];
    for (let i in value) {
      console.log(value[i].key);
      teacherSelect.push(value[i].key)
    }
    this.setState({ teacherSelect: teacherSelect })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  isEditing = record => record.key === this.state.editstate;

  edit(key) {
    this.setState({ editstate: key })
  }

  cancel = () => {
    this.setState({ editstate: '' })
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      let record = this.props.phancongTable.find(item => item.key === key);
      console.log(this.props.phancongTable.find(item => item.key === key));

      $.deleteTeacherReview({ keys: [key], idCtdt: this.props.idCtdt })
        .then(
          res => {
            $.addTeacherReview({ idCtdt: this.props.idCtdt, idTeacher: this.state.teacherSelect, dateRange: record.time, idTTC: record.subjectId })
              .then(res => {
                this.props.loadTable();
                this.setState({ editstate: "" });
                this.setState({ selecteditem: [] });
                openNotificationWithIcon('success');
              });

          }
        )
    });
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selecteditem: selectedRowKeys });
  }



  handleDelete = (key) => {
    $.deleteTeacherReview({ keys: [key], idCtdt: this.props.idCtdt })
      .then(
        res => {
          this.props.loadTable();
          this.setState({ editstate: "" });
          this.setState({ selecteditem: [] });
          openNotificationWithIcon('success');
        }
      )

  }

  handleOk = () => {
    $.deleteTeacherReview({ keys: this.state.selecteditem, idCtdt: this.props.idCtdt })
      .then(
        res => {
          this.props.loadTable();
          this.setState({ editstate: "" });
          this.setState({ selecteditem: [] });
          openNotificationWithIcon('success');
        }
      )

    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }


  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      },
    }

    const hasSelected = this.state.selecteditem.length > 0;
    const selectedRowKeys = this.state.selecteditem;
    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: this.onSelectChange,
    };

    let teacherList = this.props.teacherList;
    let teacherOptions = [];

    for (let i in teacherList) {
      teacherOptions.push(<Option key={teacherList[i].id} value={teacherList[i].name}><Tooltip title={teacherList[i].name}>{teacherList[i].name}</Tooltip></Option>)
    }

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'subject' ? 'subject' : col.dataIndex === 'list' ? 'list' : 'time',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
          handleChange: this.handleChange,
          teacherOptions: teacherOptions
        }),
      };
    });

    return (
      <div style={{ marginLeft: 50, marginRight: 50 }}>
        <div style={{ marginBottom: 16, marginTop: 16 }}>
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
          dataSource={this.props.phancongTable}
          scroll={{ y: 400 }}
          style={{ wordWrap: "break-word", whiteSpace: 'pre-line' }}
        />
      </div>
    )
  }
}

export default TablePhanCong;