import React, { Component } from 'react';
import {
  Table, Divider, Tag,
  Popconfirm, Form, Button, Modal,
  Select, Input
} from 'antd';
import { connect } from 'react-redux';
import {
  DELETE_DATA_LAYOUT_5, CHANGE_EDITSTATE_5,
  SAVE_DATA_LAYOUT_5
} from '../../../Constant/ActionType';
import TextArea from "antd/lib/input/TextArea";

const confirm = Modal.confirm;
const EditableContext = React.createContext();
const FormItem = Form.Item
const { Option } = Select;

const standard_item = [
  "G1.1",
  "G1.2",
  "G1.3",
  "G1.4",
  "G2.1",
  "G2.2",
  "G2.3",
  "G3.1",
  "G3.2",
  "G4.1",
  "G4.2",
  "G5.1",
  "G5.2",
  "G5.3",
  "G5.4",
  "G5.5",
  "G6.1",
  "G7.1"
];
const teachingActs = [
  'Thuyết giảng',
  'Phân nhóm & chơi trò chơi',
  'Thảo luận nhóm',
  'Phân nhóm đồ án',
  'Thảo luận và thể hiện trên bảng',
  'Trò chơi nhập vai',
  'Nhóm thảo luận & thiết kế 1 màn hình',
  'Làm bài tập tạo test case',
  'Trò chơi',
];
const evalActs = [
  'BTVN',
  'BTTL',
  'DAMH',
  'Bài đọc thêm và viết báo cáo',
]
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    titleName: "",
    teachingActs: [],
    standardOutput: [],
    evalActs: []
  };

  handleChangeTeachingAct(value) {
    this.setState({ teachingActs: value });
  }
  handleChangeEvalActs(value) {
    this.setState({ evalActs: value });
  }
  handleChangeStandard(value) {
    this.setState({ standardOutput: value });
  }

  getInput = () => {
    const childrenTeachingActs = [];
    const childrenEvalActs = [];
    const childrenStandard = [];

    for (let i = 0; i < teachingActs.length; i++) {
      childrenTeachingActs.push(
        <Option key={teachingActs[i]}>{teachingActs[i]}</Option>
      );
    }
    for (let i = 0; i < evalActs.length; i++) {
      childrenEvalActs.push(<Option key={evalActs[i]}>{evalActs[i]}</Option>);
    }
    for (let i = 0; i < standard_item.length; i++) {
      childrenStandard.push(
        <Option key={standard_item[i]}>{standard_item[i]}</Option>
      );
    }
    
    
    switch (this.props.dataIndex) {
      case "titleName":
        return <TextArea rows={4} style={{ width: "100%" }} />;

      case "standardOutput":
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

      case "teachingActs":
        return (
          <Select
           
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Chọn hoạt động"
            onChange={value => this.handleChangeTeachingAct(value)}
          >
            {childrenTeachingActs}
          </Select>
        );

      case "evalActs":
        return (
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Chọn hoạt động"
            onChange={value => this.handleChangeEvalActs(value)}
          >
            {childrenEvalActs}
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
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: []
    }
    this.columns = [{
      title: 'Tên chủ đề',
      dataIndex: 'titleName',
      key: 'titleName',
      width: 150,
      editable: true
    }, {
      title: 'Hoạt động giảng dạy ',
      dataIndex: 'teachingActs',
      key: 'teachingActs',
      render: teachingActs => (
        <span>
          {teachingActs.map(tag => {
            let color = 'green';
            return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </span>
      ),
      width: 200,
      editable: true
    }, {
      title: 'Chuẩn đầu ra ',
      dataIndex: 'standardOutput',
      key: 'standardOutput',
      render: standardOutput => (
        <span>
          {standardOutput.map(tag => {
            let color = 'green';
            return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </span>
      ),
      width: 200,
      editable: true
    }, {
      title: 'Hoạt động đánh giá',
      key: 'evalActs',
      dataIndex: 'evalActs',
      render: evalActs => (
        <span>
          {evalActs.map(tag => {
            let color = 'volcano';
            return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </span>
      ),
      editable: true
    },
    {
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
                <a href="#a" onClick={() => this.props.handleEdit(record.key)}>Edit</a>
              )}
            {!editable ? <Divider type="vertical" /> : null}
            {!editable
              ? (
                <Popconfirm title="Xác nhận xóa?" onConfirm={() => this.props.handleDelete(record.key)}>
                  <a href="#a">Delete</a>
                </Popconfirm>
              ) : null}
          </div>
        )
      }
    }
    ];
  };
  isEditing = record => {
    return record.key === this.props.itemLayout5Reducer.changeEditStateState;;
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

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

  delete(key) {
    this.props.handleDelete(key);
    this.setState({ selectedRowKeys: [] });
  }

  onMultiDelete = () => {
    const selectedRow = this.state.selectedRowKeys;

    // delete one
    if (selectedRow.length === 1) {
      this.delete(selectedRow[0]);
      return;
    }

    //delete all
    if (selectedRow.length === this.props.itemLayout5Reducer.previewInfo.length) {
      this.props.handleSave([]);
      this.setState({ selectedRowKeys: [] });
      return;
    }

    let items = this.props.itemLayout5Reducer.previewInfo;
    const filteredItems = items.filter(
      (_, index) => !selectedRow.includes(index)
    );
    this.props.handleSave(filteredItems);
    this.setState({ selectedRowKeys: [] });
  };


  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.props.itemLayout5Reducer.previewInfo];
      const index = newData.findIndex(item => key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      newData.map(index => {
        let arr = [];
        let str = index.standActs + ""
        str.split(",").forEach(id => {
          if (!isNaN(parseInt(id))) {
            arr.push(id);
          }
        })
        let uniqueArr = arr.filter(this.onlyUnique)
        index.standActs = uniqueArr;
      })
      console.log(newData)
      this.props.handleSave(newData);
      // this.setState({ editingKey: "" });
    });
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
        <Button
          style={{ marginBottom: 16, marginTop: 10 }}
          type="danger"
          onClick={this.showModal}
          disabled={!hasSelected}
        >
          Delete
          </Button>

        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Đã chọn ${selectedRowKeys.length} mục` : ""}
        </span>
        <Table
          components={components}
          bordered
          rowClassName="editable-row"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.props.itemLayout5Reducer.previewInfo}
          style={{ wordWrap: "break-word", whiteSpace: 'pre-line' }}
        />
      </div>

    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    itemLayout5Reducer: state.itemLayout5Reducer
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleEdit: (key) => {
      dispatch({ type: CHANGE_EDITSTATE_5, key: key });
    },
    handleDelete: (key) => {
      dispatch({ type: DELETE_DATA_LAYOUT_5, key: key });
    },
    handleSave: (data) => {
      dispatch({ type: SAVE_DATA_LAYOUT_5, data: data, key: '' })
    }

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableItem);