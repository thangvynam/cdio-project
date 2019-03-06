import React, { Component } from "react";
import { Table, Divider, Button, Modal, Popconfirm, Form } from "antd";
import { connect } from "react-redux";
import { DeleteItemRule, UpdateRules } from "../../../Constant/ActionType";
import { bindActionCreators } from "redux";
import TextArea from "antd/lib/input/TextArea";

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
    this.columns = [
      {
        title: "Nội dung",
        dataIndex: "content",
        key: "content",
        width: 830,
        editable: true
      },
      {
        title: "Action",
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
                        onClick={() => this.onSaveEdit(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Xác nhận hủy?"
                    onConfirm={() => this.onCancelEdit(record.key)}
                  >
                    <a href="#a">Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <span>
                  <a onClick={() => this.handleEdit(record.key)} href="#a">
                    Edit
                  </a>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Xác nhận xóa?"
                    onConfirm={() => this.handleDelete(record.key)}
                  >
                    <a href="#a">Delete</a>
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
      editingKey: ""
    };
  }

  onMultiDelete = () => {
    const selectedRow = this.state.selectedRowKeys;

    // delete one
    if (selectedRow.length === 1) {
      this.handleDelete(selectedRow[0]);
      return;
    }

    //delete all
    if (selectedRow.length === this.props.itemRule.previewInfo.length) {
      this.props.onUpdateRules([]);
      this.setState({ selectedRowKeys: [], editingKey: "" });
      return;
    }

    let ruleitems = this.props.itemRule.previewInfo;
    const filteredItems = ruleitems.filter(
      (_, index) => !selectedRow.includes(index)
    );
    this.props.onUpdateRules(filteredItems);
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

  handleDelete(key) {
    this.props.onDeleteItemRule(key);
    this.setState({ selectedRowKeys: [], editingKey: "" });
  }
  handleEdit(key) {
    this.setState({ editingKey: key });
  }
  isEditing = record => record.key === this.state.editingKey;

  onSaveEdit(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      var newRules = this.props.itemRule.previewInfo;
      const item = newRules[key];
      newRules.splice(key, 1, {
        ...item,
        ...row
      });

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
      let temp = {
        key: i,
        content: rules[i].content
      };
      itemRuleTable.push(temp);
    }
    return itemRuleTable;
  };

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
        <div style={{ marginBottom: 16 }}>
          <Button
            type="danger"
            onClick={this.showModal}
            disabled={!hasSelected}
          >
            Delete
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
          style={{ wordWrap: "break-word", whiteSpace: 'pre-line'}}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    itemRule: state.itemLayout9Reducer
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onDeleteItemRule: DeleteItemRule,
      onUpdateRules: UpdateRules
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableItem);
