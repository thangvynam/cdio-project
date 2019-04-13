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
  Select,notification
} from "antd";
import { connect } from "react-redux";
import { updateKHGDTH, changeIsLoadedKHTH } from "../../../Constant/ActionType";
import { bindActionCreators } from "redux";
import { DragDropContext, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";

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
      evalActs: [],
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
    };

    this.columns = [
      {
        title: "Tuần",
        dataIndex: "key",
        key: "key",
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
                        Lưu
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Xác nhận hủy?"
                    onConfirm={() => this.onCancelEdit(record.key)}
                  >
                    <a href="#a">Hủy</a>
                  </Popconfirm>
                </span>
              ) : (
                <span>
                  <a onClick={() => this.handleEdit(record.key)} href="#a">
                    Sửa
                  </a>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Xác nhận xóa?"
                    onConfirm={() => this.handleDelete(record.key)}
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

  moveRow = (dragIndex, hoverIndex) => {
    let data = this.props.itemKHGDTH.previewInfo;
    
    const dragRow = data[dragIndex];

    data[dragIndex] = data[hoverIndex];
    data[hoverIndex] = dragRow;
    data[dragIndex].key = dragIndex + 1;
    data[hoverIndex].key = hoverIndex + 1;

    this.props.onUpdateKHGDTH(data);
  };
  isEditing = record => record.key === this.state.editingKey;

  onSaveEdit(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      let index = key - 1;

      var newItems = this.props.itemKHGDTH.previewInfo;
      const item = newItems[index];
      newItems.splice(index, 1, {
        ...item,
        ...row
      });
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

  handleDelete(key) {
    let newData = this.props.itemKHGDTH.previewInfo.filter(
      (_, index) => index !== key - 1
    );
    for (let i = 0; i < newData.length; i++) {
      newData[i].key = i + 1;
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

    // delete one
    if (selectedRow.length === 1) {
      this.handleDelete(selectedRow[0]);
      return;
    }

    //delete all
    if (selectedRow.length === this.props.itemKHGDTH.previewInfo.length) {
      this.props.onUpdateKHGDTH([]);
      this.setState({ selectedRowKeys: [], editingKey: "" });
      return;
    }

    let KHitems = this.props.itemKHGDTH.previewInfo;
    const filteredItems = KHitems.filter(
      (_, index) => !selectedRow.includes(index + 1)
    );

    for (let i = 0; i < filteredItems.length; i++) {
      filteredItems[i].key = i + 1;
    }
    this.props.onUpdateKHGDTH(filteredItems);
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

  onSaveAll = ()=>{
    const itemKHGDTH = this.props.itemKHGDTH;
    var body = {};
    body.thong_tin_chung_id = this.state.subjectId;
    body.data = [];
    itemKHGDTH.previewInfo.forEach((item,index)=>{
      let temp = {};
      temp.week = item.key;
      temp.titleName = item.titleName;
      temp.teachingActs = [];
      temp.standardOutput = [];
      temp.evalActs = [];
           
      item.teachingActs.forEach( (act,_)=>{
        let id = itemKHGDTH.mapIdForValue.teachingActs.get(act);
        if(id === undefined || id ===''){
          // insert hoat_dong_day khong phai danh muc
          console.log("insert ",act);
          let itemAct = {
            hoat_dong:act,
            loai:'TH',
            danh_muc: 0,
          }
          // push 
          
          // axios.post(`/add-teachingacts-6`,itemAct).then(response=>{
            
          //   temp.teachingActs.push(response.data.id);
          // })
        }
        else temp.teachingActs.push(id); 
      });



      item.standardOutput.forEach((stan,_)=>{
        let id = itemKHGDTH.mapIdForValue.standardOutput.get(stan);
        temp.standardOutput.push(id);
      })
      item.evalActs.forEach((act,_)=>{
        let id = itemKHGDTH.mapIdForValue.evalActs.get(act);
        temp.evalActs.push(id);
      })
      body.data.push(temp);
    })

    console.log("body",body.data);
      axios.post("/add-data-6", body)
   .then(response => {
     if(response.data === 1){
      notification["success"]({
        message: "Cập nhật thành công",
        duration: 1
      });
     }
     else{
      notification["error"]({
        message: "Cập nhật thất bại",
        duration: 1
      });
     }
   });
    
   

  }

  componentDidMount() {
    if(!this.props.itemKHGDTH.isLoaded && this.props.subjectId !== null 
      && this.props.subjectId !== undefined && this.props.subjectId!== "") {
        this.props.onChangeIsLoaded(true);
        this.setState({subjectId:this.props.subjectId});
        axios.get(`/get-data-6/${this.props.subjectId}`).then(response => {
          const data = response.data;
          this.props.onUpdateKHGDTH(data);
        });
      }
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.itemKHGDTH.isLoaded && nextProps.subjectId !== null 
    && nextProps.subjectId !== undefined && nextProps.subjectId !== "") {
      this.props.onChangeIsLoaded(true);
      this.setState({subjectId:this.props.subjectId});
      axios.get(`/get-data-6/${nextProps.subjectId}`).then(response => {
        const data = response.data;
        this.props.onUpdateKHGDTH(data);
      });
    }
  }





  render() {
    var components = {};
    var columns = [];

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
          mapitem:this.props.itemKHGDTH.mapIdForValue,
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
          <Button style={{ float: "right" }} type="primary" onClick={this.onSaveAll}>
            Lưu thay đổi
          </Button>
        </div>
        <Table
          components={components}
          bordered
          columns={this.state.editingKey === "" ? this.columns : columns}
          rowSelection={rowSelection}
          rowClassName="editable-row"
          dataSource={this.props.itemKHGDTH.previewInfo}
          onRow={
            this.state.editingKey === ""
              ? (record, index) => ({
                  index,
                  moveRow: this.moveRow
                })
              : null
          }
          style={{ wordWrap: "break-word", whiteSpace: 'pre-line'}}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    itemKHGDTH: state.itemLayout6Reducer,
    subjectId: state.subjectid,

  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onUpdateKHGDTH: updateKHGDTH,
      onChangeIsLoaded:changeIsLoadedKHTH,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropContext(HTML5Backend)(TableItem));
