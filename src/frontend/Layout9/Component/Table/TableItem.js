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
      idSubject: -1,
      isSaveAll:false

    };
  }

  onMultiDelete = () => {
    const selectedRow = this.state.selectedRowKeys;
    console.log("aa: ",selectedRow,this.dataSource[selectedRow[0]]);

    let ruleitems = this.props.itemRule.previewInfo;

    for (let i = 0; i < selectedRow.length; i++) {
      ruleitems[selectedRow[i]].del_flag = 1;
          let message = `Xóa quy định chung: ${ruleitems[selectedRow[i]].content}`;
          this.props.onSaveLog(
            `${JSON.parse(localStorage.getItem('user')).data.Name}`,
            getCurrTime(),
            message,
            this.props.logReducer.contentTab,
            this.props.monhoc
          );
          this.props.onSaveReducer(
            `${JSON.parse(localStorage.getItem('user')).data.Name}`,
            getCurrTime(),
            message,
            this.props.logReducer.contentTab,
            this.props.monhoc
          );
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
    let message = `Xóa quy định chung: ${ruleitems[index].content}`;
    this.props.onSaveLog(
      `${JSON.parse(localStorage.getItem('user')).data.Name}`,
      getCurrTime(),
      message,
      this.props.logReducer.contentTab,
      this.props.monhoc
    );
    this.props.onSaveReducer(
      `${JSON.parse(localStorage.getItem('user')).data.Name}`,
      getCurrTime(),
      message,
      this.props.logReducer.contentTab,
      this.props.monhoc
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
      let message = `Chỉnh sửa quy định chung : [${item.content}] -> [${newRules[index].content}]`;
      this.props.onSaveLog(
        `${JSON.parse(localStorage.getItem('user')).data.Name}`,
        getCurrTime(),
        message,
        this.props.logReducer.contentTab,
        this.props.monhoc
      );
      this.props.onSaveReducer(
        `${JSON.parse(localStorage.getItem('user')).data.Name}`,
        getCurrTime(),
        message,
        this.props.logReducer.contentTab,
        this.props.monhoc
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
    this.setState({isSaveAll:true});

    let body = {};
    body.thong_tin_chung_id = this.props.monhoc;
    body.data = this.props.itemRule.previewInfo;

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

      this.getData(this.props.monhoc);
    });
   
  };

  componentDidMount() {
    if (
      !this.props.itemRule.isLoaded &&
      this.props.monhoc !== null &&
      this.props.monhoc !== undefined &&
      this.props.monhoc !== ""
    ) {
      this.props.onChangeIsLoaded(true);
      this.setState({ subjectId: this.props.monhoc });
      this.getData(this.props.monhoc);
    }
  }

  getData(subjectId) {
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
      this.setState({isSaveAll:false});
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.props.itemRule.isLoaded &&
      this.props.monhoc !== null &&
      this.props.monhoc !== undefined &&
      this.props.monhoc !== ""
    ) {
      this.props.onChangeIsLoaded(true);
      this.setState({ subjectId: this.props.monhoc });
      this.getData(this.props.monhoc);
    }
  }

  render() {
    console.log(this.props.monhoc)
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
              disabled={this.state.isSaveAll}

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
