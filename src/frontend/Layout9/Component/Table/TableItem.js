import React, { Component } from "react";
import {
  Table,
  Divider,
  Button,
  Modal,
  Popconfirm,
  Form,
  notification
} from "antd";
import { connect } from "react-redux";
import {
  deleteItemRule,
  updateRules,
  changeIsLoadedRules,
  saveLog,
  saveLogObject
} from "../../../Constant/ActionType";
import { bindActionCreators } from "redux";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { getCurrTime } from "../../../utils/Time";
import $ from './../../../helpers/services';

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
                  })(<TextArea rows={4} />)}
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

class TableItem extends Component {
  constructor(props) {
    super(props);
    this.dataSource = [];
    this.columns = [
      {
        title: "Nội dung",
        dataIndex: "content",
        key: "content",
        width: 830,
        editable: true
      },
      {
        title: "Thao tác",
        key: "action",
        render:
          this.props.isReview === true
            ? null
            : (text, record) => {
                const editable = this.isEditing(record);

                return (
                  <div>
                    {editable ? (
                      <span>
                        <EditableContext.Consumer>
                          {form => (
                            <a
                              href="#a"
                              onClick={() =>
                                this.onSaveEdit(form, record.index)
                              }
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
                        <a
                          onClick={() => this.handleEdit(record.index)}
                          href="#a"
                        >
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
      selectedRowKeys: [],
      editingKey: "",
      idSubject: -1
    };
  }

  onMultiDelete = () => {
    const selectedRow = this.state.selectedRowKeys;

    let ruleitems = this.props.itemRule.previewInfo;

    for (let i = 0; i < selectedRow.length; i++) {
      let id = this.dataSource[selectedRow[i]].id;
      for (let j = 0; j < ruleitems.length; j++) {
        if (ruleitems[j].id === id) {
          ruleitems[j].del_flag = 1;
          this.props.onSaveLog(
            "Nguyen Van A",
            getCurrTime(),
            `Xóa quy định chung: ${ruleitems[j].content}`,
            this.props.logReducer.contentTab,
            this.props.subjectId
          );
          this.props.onSaveReducer(
            "Nguyen Van A",
            getCurrTime(),
            `Xóa quy định chung: ${ruleitems[j].content}`,
            this.props.logReducer.contentTab,
            this.props.subjectId
          );
        }
      }
    }

    this.props.onUpdateRules(ruleitems);
    this.setState({ selectedRowKeys: [], editingKey: "" });
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

  handleDelete(index) {
    let ruleitems = this.props.itemRule.previewInfo;
    ruleitems[index].del_flag = 1;
    this.props.onSaveLog(
      "Nguyen Van A",
      getCurrTime(),
      `Xóa quy định chung: ${ruleitems[index].content}`,
      this.props.logReducer.contentTab,
      this.props.subjectId
    );
    this.props.onSaveReducer(
      "Nguyen Van A",
      getCurrTime(),
      `Xóa quy định chung: ${ruleitems[index].content}`,
      this.props.logReducer.contentTab,
      this.props.subjectId
    );

    this.props.onUpdateRules(ruleitems);

    this.setState({ selectedRowKeys: [], editingKey: "" });
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

      var newRules = this.props.itemRule.previewInfo;
      const item = newRules[index];
      newRules.splice(index, 1, {
        ...item,
        ...row
      });
      this.props.onSaveLog(
        "Nguyen Van A",
        getCurrTime(),
        `Chỉnh sửa quy định chung : ${item.content} -> ${
          newRules[index].content
        }`,
        this.props.logReducer.contentTab,
        this.props.subjectId
      );
      this.props.onSaveReducer(
        "Nguyen Van A",
        getCurrTime(),
        `Chỉnh sửa quy định chung : ${item.content} -> ${
          newRules[index].content
        }`,
        this.props.logReducer.contentTab,
        this.props.subjectId
      );

      this.props.onUpdateRules(newRules);
      this.setState({ editingKey: "" });
    });
  }
  onCancelEdit = () => {
    this.setState({ editingKey: "" });
  };

  setIndexForItem = () => {
    let itemRuleTable = [];
    let rules = this.props.itemRule.previewInfo;
    for (let i = 0; i < rules.length; i++) {
      let temp = rules[i];
      temp.index = i;
      itemRuleTable.push(temp);
    }
    return (this.dataSource = itemRuleTable.filter(
      (item, _) => item.del_flag === 0
    ));
  };

  onSaveAll = () => {
    let body = {};
    body.thong_tin_chung_id = this.state.subjectId;
    body.data = this.props.itemRule.previewInfo;

    //axios.post("/add-data-9", body)
    $.addData9(body)
    .then(response => {
      if (response.data === 1) {
        notification["success"]({
          message: "Cập nhật thành công",
          duration: 1
        });
      } else {
        notification["error"]({
          message: "Cập nhật thất bại",
          duration: 1
        });
      }

      $.saveLog({ data: this.props.itemRule.logData });

      this.getData(this.state.subjectId);
    });

    //axios.post("/save-log", { data: this.props.itemRule.logData });
   
  };

  componentDidMount() {
    if (
      !this.props.itemRule.isLoaded &&
      this.props.subjectId !== null &&
      this.props.subjectId !== undefined &&
      this.props.subjectId !== ""
    ) {
      this.props.onChangeIsLoaded(true);
      this.setState({ subjectId: this.props.subjectId });
      this.getData(this.props.subjectId);
    }
  }

  getData(subjectId) {
    //axios.get(`/get-data-9/${subjectId}`).then(response => {
    $.getData9(subjectId).then(response => {
      const data = response.data;
      let array = [];
      data.forEach((item, index) => {
        let temp = {
          id: item.id,
          content: item.noi_dung,
          del_flag: item.del_flag
        };
        array.push(temp);
      });
      this.props.onUpdateRules(array);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.props.itemRule.isLoaded &&
      nextProps.subjectId !== null &&
      nextProps.subjectId !== undefined &&
      nextProps.subjectId !== ""
    ) {
      this.props.onChangeIsLoaded(true);
      this.setState({ subjectId: nextProps.subjectId });
      this.getData(nextProps.subjectId);
    }
  }

  render() {
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
        {this.props.isReview === true ? null : (
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

            <Button
              style={{ float: "right" }}
              type="primary"
              onClick={this.onSaveAll}
            >
              Lưu thay đổi
            </Button>
          </div>
        )}
        <Table
          components={components}
          bordered
          rowSelection={this.props.isReview === true ? null : rowSelection}
          columns={columns}
          rowClassName="editable-row"
          dataSource={this.setIndexForItem()}
          style={{ wordWrap: "break-word", whiteSpace: "pre-line" }}
          rowKey={record => record.index}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    itemRule: state.itemLayout9Reducer,
    subjectId: state.subjectid,
    logReducer: state.logReducer
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onDeleteItemRule: deleteItemRule,
      onUpdateRules: updateRules,
      onChangeIsLoaded: changeIsLoadedRules,
      onSaveLog: saveLog,
      onSaveReducer: saveLogObject
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableItem);
