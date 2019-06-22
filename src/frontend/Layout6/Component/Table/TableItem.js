import React, { Component } from "react";
import {
  Table,
  Divider,
  Tag,
  Button,
  Popconfirm,
  Modal,
  Form,
  Input,
  Select,
  notification
} from "antd";
import { connect } from "react-redux";
import {
  updateKHGDTH,
  changeIsLoadedKHTH,
  saveLog,
  saveLogObject
} from "../../../Constant/ActionType";
import { bindActionCreators } from "redux";
import { DragSource, DropTarget } from "react-dnd";
import TextArea from "antd/lib/input/TextArea";
import $ from "./../../../helpers/services";
import { getCurrTime } from "../../../utils/Time";
import DragDropHTML5 from "../../../html5Backend/html5Backend";

const { Option } = Select;

const confirm = Modal.confirm;

let dragingIndex = -1; // move row

// edit row
const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: "move" };

    let className = restProps.className;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += " drop-over-downward";
      }
      if (restProps.index < dragingIndex) {
        className += " drop-over-upward";
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr {...restProps} className={className} style={style} />
      )
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index
    };
  }
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    props.moveRow(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
};

const DragableBodyRow = DropTarget("row", rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(
  DragSource("row", rowSource, connect => ({
    connectDragSource: connect.dragSource()
  }))(BodyRow)
);

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleName: "",
      teachingActs: [],
      standardOutput: [],
      evalActs: []
    };
  }

  getInput = () => {
    const childrenTeachingActs = [];
    const childrenEvalActs = [];
    const childrenStandard = [];

    const standard_item = [...this.props.mapitem.standardOutput.keys()];
    const teachingActs = [...this.props.mapitem.teachingActs.keys()];
    const evalActs = [...this.props.mapitem.evalActs.keys()];

    function init() {
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
    }

    init();

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
            id="select-teaching"
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
                  })(this.getInput())}
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
    this.state = {
      selectedRowKeys: [],
      editingKey: "",
      subjectId: -1,
      isSaveAll: false
    };

    this.dataSource = [];

    this.columns = [
      {
        title: "Tuần",
        dataIndex: "key",
        key: "key"
      },
      {
        title: "Chủ đề",
        dataIndex: "titleName",
        key: "titleName",
        editable: true,
        width: 130
      },
      {
        title: "Chuẩn đầu ra ",
        dataIndex: "standardOutput",
        key: "standardOutput",
        editable: true,
        width: 130,
        render: standardOutput => (
          <span>
            {standardOutput.map(tag => {
              let color = "green";
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
      {
        title: "Hoạt động dạy/ Hoạt động học",
        dataIndex: "teachingActs",
        key: "teachingActs",
        width: 420,
        editable: true,
        render: teachingActs => (
          <span>
            {teachingActs.map(tag => {
              let color = "green";
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },

      {
        title: "Hoạt động đánh giá",
        key: "evalActs",
        dataIndex: "evalActs",
        editable: true,
        width: 100,
        render: evalActs => (
          <span>
            {evalActs.map(tag => {
              let color = "volcano";
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
      {
        title: "Action",
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
                          onConfirm={() => this.onCancelEdit()}
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
  }

  compare(a, b) {
    if (a.key < b.key) {
      return -1;
    }
    if (a.key > b.key) {
      return 1;
    }
    return 0;
  }

  moveRow = (dragIndex, hoverIndex) => {
    let data = this.setIndexForItem();

    const dragRow = data[dragIndex];
    data[dragIndex] = data[hoverIndex];
    data[hoverIndex] = dragRow;

    let temp = data[dragIndex].key;
    data[dragIndex].key = data[hoverIndex].key;
    data[hoverIndex].key = temp;

    let result = this.props.itemKHGDTH.previewInfo.map((item, _) => {
      if (item.id === data[dragIndex].id) return data[dragIndex];
      else if (item.id === data[hoverIndex].id) return data[hoverIndex];
      return item;
    });

    let sortRes = result.sort(this.compare);
    this.props.onUpdateKHGDTH(sortRes);
  };
  isEditing = record => record.index === this.state.editingKey;

  onSaveEdit(form, index) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      var newItems = this.props.itemKHGDTH.previewInfo;
      const item = newItems[index];
      newItems.splice(index, 1, {
        ...item,
        ...row
      });

      this.props.onSaveLog(
        `${JSON.parse(localStorage.getItem("user")).data.Name}`,
        getCurrTime(),
        `Chỉnh sửa kế hoạch giảng dạy thực hành:[Chủ đề : ${
          item.titleName
        } ; Chuẩn đầu ra : ${
          item.standardOutput
        } ; Hoạt động dạy/ Hoạt động học : ${
          item.teachingActs
        } ; Hoạt động đánh giá: ${item.evalActs}] -> [Chủ đề : ${
          newItems[index].titleName
        } ; Chuẩn đầu ra : ${
          newItems[index].standardOutput
        } ; Hoạt động dạy/ Hoạt động học : ${
          newItems[index].teachingActs
        } ; Hoạt động đánh giá: ${newItems[index].evalActs}]`,
        this.props.logReducer.contentTab,
        this.props.monhoc,
        this.props.ctdt
      );
      this.props.onSaveReducer(
        `${JSON.parse(localStorage.getItem("user")).data.Name}`,
        getCurrTime(),
        `Chỉnh sửa kế hoạch giảng dạy thực hành:[Chủ đề : ${
          item.titleName
        } ; Chuẩn đầu ra : ${
          item.standardOutput
        } ; Hoạt động dạy/ Hoạt động học : ${
          item.teachingActs
        } ; Hoạt động đánh giá: ${item.evalActs}] -> [Chủ đề : ${
          newItems[index].titleName
        } ; Chuẩn đầu ra : ${
          newItems[index].standardOutput
        } ; Hoạt động dạy/ Hoạt động học : ${
          newItems[index].teachingActs
        } ; Hoạt động đánh giá: ${newItems[index].evalActs}]`,
        this.props.logReducer.contentTab,
        this.props.monhoc
      );

      this.props.onUpdateKHGDTH(newItems);
      this.setState({ editingKey: "" });
    });
  }
  onCancelEdit = () => {
    this.setState({ editingKey: "" });
  };
  handleEdit(key) {
    this.setState({ editingKey: key });
  }

  handleDelete(index) {
    // let newData = this.props.itemKHGDTH.previewInfo.filter(
    //   (_, index) => index !== key - 1
    // );
    // for (let i = 0; i < newData.length; i++) {
    //   newData[i].key = i + 1;
    // }

    let newData = this.props.itemKHGDTH.previewInfo;
    newData[index].del_flag = 1;

    this.props.onSaveLog(
      `${JSON.parse(localStorage.getItem("user")).data.Name}`,
      getCurrTime(),
      `Xóa kế hoạch giảng dạy thực hành: Chủ đề : ${
        newData[index].titleName
      } ; Chuẩn đầu ra : ${
        newData[index].standardOutput
      } ; Hoạt động dạy/ Hoạt động học : ${
        newData[index].teachingActs
      } ; Hoạt động đánh giá: ${newData[index].evalActs}`,
      this.props.logReducer.contentTab,
      this.props.monhoc,
      this.props.ctdt
    );
    this.props.onSaveReducer(
      `${JSON.parse(localStorage.getItem("user")).data.Name}`,
      getCurrTime(),
      `Xóa kế hoạch giảng dạy thực hành: Chủ đề : ${
        newData[index].titleName
      } ; Chuẩn đầu ra : ${
        newData[index].standardOutput
      } ; Hoạt động dạy/ Hoạt động học : ${
        newData[index].teachingActs
      } ; Hoạt động đánh giá: ${newData[index].evalActs}`,
      this.props.logReducer.contentTab,
      this.props.monhoc
    );

    let key = 1;
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].del_flag === 0) {
        newData[i].key = key;
        key++;
      }
    }

    this.setState({ selectedRowKeys: [], editingKey: "" });
    this.props.onUpdateKHGDTH(newData);
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  showModal = () => {
    confirm({
      title: "Xóa các mục đã chọn?",
      content: "",
      onOk: this.onMultiDelete,
      onCancel() {}
    });
  };

  onMultiDelete = () => {
    const selectedRow = this.state.selectedRowKeys;

    let KHitems = this.props.itemKHGDTH.previewInfo;
    let indexArray = [];

    for (let i = 0; i < selectedRow.length; i++) {
      let index = 0;
      for (let j = 0; j < KHitems.length; j++) {
        if (KHitems[j].del_flag === 0) index++;
        if (index === selectedRow[i]) {
          indexArray.push(j);
        }
      }
    }

    for (let i = 0; i < indexArray.length; i++) {
      let j = indexArray[i];
      KHitems[j].del_flag = 1;
      this.props.onSaveLog(
        `${JSON.parse(localStorage.getItem("user")).data.Name}`,
        getCurrTime(),
        `Xóa kế hoạch giảng dạy thực hành: Chủ đề : ${
          KHitems[j].titleName
        } ; Chuẩn đầu ra : ${
          KHitems[j].standardOutput
        } ; Hoạt động dạy/ Hoạt động học : ${
          KHitems[j].teachingActs
        } ; Hoạt động đánh giá: ${KHitems[j].evalActs}`,
        this.props.logReducer.contentTab,
        this.props.monhoc,
        this.props.ctdt
      );
      this.props.onSaveReducer(
        `${JSON.parse(localStorage.getItem("user")).data.Name}`,
        getCurrTime(),
        `Xóa kế hoạch giảng dạy thực hành: Chủ đề : ${
          KHitems[j].titleName
        } ; Chuẩn đầu ra : ${
          KHitems[j].standardOutput
        } ; Hoạt động dạy/ Hoạt động học : ${
          KHitems[j].teachingActs
        } ; Hoạt động đánh giá: ${KHitems[j].evalActs}`,
        this.props.logReducer.contentTab,
        this.props.monhoc
      );
    }

    let key = 1;
    for (let i = 0; i < KHitems.length; i++) {
      if (KHitems[i].del_flag === 0) {
        KHitems[i].key = key;
        key++;
      }
    }

    this.props.onUpdateKHGDTH(KHitems);
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

  onSaveAll = () => {
    this.setState({ isSaveAll: true });

    const itemKHGDTH = this.props.itemKHGDTH;
    var body = {};
    body.thong_tin_chung_id = this.props.monhoc;
    body.data = [];
    body.idCtdt = this.props.ctdt;

    let arrActsNoCategory = [];
    itemKHGDTH.previewInfo.forEach((item, _) => {
      let temp = {};
      temp.id = item.id;
      temp.week = item.key;
      temp.titleName = item.titleName;
      temp.teachingActs = [];
      temp.standardOutput = [];
      temp.evalActs = [];
      temp.del_flag = item.del_flag;

      if (temp.del_flag === 0) {
        item.teachingActs.forEach((act, index) => {
          let id = itemKHGDTH.mapIdForValue.teachingActs.get(act);
          if (id === undefined || id === "") {
            // insert hoat_dong_day khong phai danh muc
            console.log("insert ", act);
            let itemAct = {
              hoat_dong: act,
              loai: "TH",
              index: index,
              danh_muc: 0,
              indexKHTH: body.data.length
            };
            arrActsNoCategory.push(itemAct);
            temp.teachingActs.push(-1);
          } else temp.teachingActs.push(id);
        });

        item.standardOutput.forEach((stan, _) => {
          let id = itemKHGDTH.mapIdForValue.standardOutput.get(stan);
          temp.standardOutput.push(id);
        });
        item.evalActs.forEach((act, _) => {
          let id = itemKHGDTH.mapIdForValue.evalActs.get(act);
          temp.evalActs.push(id);
        });
      }
      body.data.push(temp);
    });

    $.addTeachingActs6(arrActsNoCategory).then(response => {
      let ActsNocategory = response.data;
      ActsNocategory.forEach((item, _) => {
        body.data[item.indexKHTH].teachingActs[item.index] = item.id;
      });

      $.addData6(body).then(response => {
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
        //axios.post("/save-log", { data: this.props.itemKHGDTH.logData });
        $.saveLog({ data: this.props.itemKHGDTH.logData });
        this.getDataTable(this.props.monhoc, this.props.ctdt);
      });
    });
  };

  componentDidMount() {
    if (
      !this.props.itemKHGDTH.isLoaded &&
      this.props.monhoc !== null &&
      this.props.monhoc !== undefined &&
      this.props.monhoc !== ""
    ) {
      this.props.onChangeIsLoaded(true);
      this.setState({ subjectId: this.props.monhoc });
      // axios.get(`/get-data-6/${this.props.monhoc}`).then(response => {
      //   const data = response.data;
      //   this.props.onUpdateKHGDTH(data);
      // });
      this.getDataTable(this.props.monhoc, this.props.ctdt);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.itemKHGDTH.isLoaded) {
      this.props.onChangeIsLoaded(true);
      this.setState({ subjectId: this.props.monhoc });
      // axios.get(`/get-data-6/${nextProps.subjectId}`).then(response => {
      //   const data = response.data;
      //   this.props.onUpdateKHGDTH(data);
      // });
      this.getDataTable(this.props.monhoc, this.props.ctdt);
    }
  }

  getDataTable = (idSubject, idCtdt) => {
    //axios.get(`/get-data-6/${idSubject}`)
    $.getData6(idSubject, idCtdt).then(response => {
      const data = response.data;
      console.log("data: ", data);
      this.props.onUpdateKHGDTH(data);
      this.setState({ isSaveAll: false });
    });
  };

  setIndexForItem = () => {
    let itemKHTHTable = [];
    let data = this.props.itemKHGDTH.previewInfo;
    for (let i = 0; i < data.length; i++) {
      let temp = data[i];
      temp.index = i;
      itemKHTHTable.push(temp);
    }
    return (this.dataSource = itemKHTHTable.filter(
      (item, _) => item.del_flag === 0
    ));
  };

  render() {
    var components = {};
    this.state.editingKey === ""
      ? (components = {
          body: {
            row: DragableBodyRow
          }
        })
      : (components = {
          body: {
            row: EditableFormRow,
            cell: EditableCell
          }
        });

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
          editing: this.isEditing(record),
          mapitem: this.props.itemKHGDTH.mapIdForValue
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
          columns={this.state.editingKey === "" ? this.columns : columns}
          rowSelection={this.props.isReview === true ? null : rowSelection}
          rowClassName="editable-row"
          // dataSource={this.props.itemKHGDTH.previewInfo.filter((item,_) => item.del_flag ===0)}
          dataSource={this.setIndexForItem()}
          onRow={
            this.props.isReview === true
              ? null
              : this.state.editingKey === ""
              ? (record, index) => ({
                  index,
                  moveRow: this.moveRow
                })
              : null
          }
          style={{ wordWrap: "break-word", whiteSpace: "pre-line" }}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    itemKHGDTH: state.itemLayout6Reducer,
    logReducer: state.logReducer
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onUpdateKHGDTH: updateKHGDTH,
      onChangeIsLoaded: changeIsLoadedKHTH,

      onSaveLog: saveLog,
      onSaveReducer: saveLogObject
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropHTML5(TableItem));
