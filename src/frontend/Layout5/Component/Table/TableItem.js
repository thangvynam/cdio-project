import React, { Component } from 'react';
import {
  Table, Divider, Tag,
  Popconfirm, Form, Button, Modal,
  Select, Input
} from 'antd';
import { connect } from 'react-redux';
import { DragDropContext, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TextArea from "antd/lib/input/TextArea";

import {
  DELETE_DATA_LAYOUT_5, CHANGE_EDITSTATE_5,
  SAVE_DATA_LAYOUT_5 , ADD_DATA_LAYOUT_5
} from '../../../Constant/ActionType';

const confirm = Modal.confirm;
const EditableContext = React.createContext();
const FormItem = Form.Item
const { Option } = Select;
let dragingIndex = -1; // move row

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

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

  getInput = (data ) => {
    const childrenTeachingActs = [];
    const childrenEvalActs = [];
    const childrenStandard = [];
    
    const standard_item = [...this.props.mapitem.standardOutputData];
    const teachingActs = [...this.props.mapitem.teachingActsData];
    const evalActs = [...this.props.mapitem.evalActsData];

    console.log(standard_item);

    for (let i = 0; i < teachingActs.length; i++) {
      childrenTeachingActs.push(
        <Option key={teachingActs[i]}>{teachingActs[i]}</Option>
      );
    }

    for (let i = 0; i < evalActs.length; i++) {
      childrenEvalActs.push(<Option key={evalActs[i]}>{evalActs[i]}</Option>);
    }

    for (let i = 0; i < standard_item.length; i++) {
      const children = standard_item[i].children;
      for (let j = 0; j< children.length; j++) {
        childrenStandard.push(
          <Option key={children[j].value}>{children[j].value}</Option>
        );
      }
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

    console.log(this.props);

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
                  })(this.getInput(this.props.itemLayout5Reducer))}
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
      render: this.props.isReview === true ? null : (text, record) => {
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
                  <a href="#a">Hủy</a>
                </Popconfirm>
              </span>
            ) : (
                <a href="#a" onClick={() => this.props.handleEdit(record.key)}>Sửa</a>
              )}
            {!editable ? <Divider type="vertical" /> : null}
            {!editable
              ? (
                <Popconfirm title="Xác nhận xóa?" onConfirm={() => this.props.handleDelete(record.key)}>
                  <a href="#a">Xóa</a>
                </Popconfirm>
              ) : null}
          </div>
        )
      }
    }
    ];
  };

  moveRow = (dragIndex, hoverIndex) => {
    let data = this.props.itemLayout5Reducer.previewInfo;

    const dragRow = data[dragIndex];

    data[dragIndex] = data[hoverIndex];
    data[hoverIndex] = dragRow;
    data[dragIndex].key = dragIndex + 1;
    data[hoverIndex].key = hoverIndex + 1;

    this.props.handleSave(data);
  }

  isEditing = (record) => {
    return record.key === this.props.itemLayout5Reducer.changeEditStateState;;
  }

  cancel() {
    this.props.handleEdit('');
    //this.setState({ editingKey: "" });
  }

  edit(key) {
    //this.setState({ editingKey: key });
    this.props.handleEdit('');
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
    let items = this.props.itemLayout5Reducer.previewInfo;
   
    selectedRow.forEach(id => {
      for (let index = 0; index < items.length; index++) {
        const element = items[index];

        if (element.key == id) {
          element.del_flag = 1;
        }
      }
    });

    this.props.handleSave(items);
    this.setState({ selectedRowKeys: [] });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      const newData = [...this.props.itemLayout5Reducer.previewInfo];
      const index = newData.findIndex(item => key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });

      if (error) {
        return;
      }
      
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

      this.props.handleSave(newData);
      //this.setState({ editingKey: "" });
    });
  }


  render() {
    var components = {};
    this.props.itemLayout5Reducer.changeEditStateState == ""
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
          mapitem:this.props.itemLayout5Reducer,
        })
      };
    });

    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const hasSelected = selectedRowKeys.length > 0;
    const data = this.props.itemLayout5Reducer;
    const childrenTeachingActs = [];

    if (data.teachingActsData.length !== 0) {
      for (let i = 0; i < data.teachingActsData.length; i++) {
          childrenTeachingActs.push(
            <Option key={data.teachingActs[i]}>{data.teachingActs[i]}</Option>);
      }
  }
    return (
      <div>
        {this.props.isReview === true ? null : <div>
        <Button
          style={{ marginBottom: 16, marginTop: 10 }}
          type="danger"
          onClick={this.showModal}
          disabled={!hasSelected}
        >
          Xóa
          </Button>

        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Đã chọn ${selectedRowKeys.length} mục` : ""}
        </span>
        <Button style={{float: "right" , marginBottom: 16, marginTop: 10}}
            onClick={() => this.props.saveAllData()}
          >
            Lưu tất cả
        </Button>
        </div>}
        <Table
          components={components}
          bordered
          rowClassName="editable-row"
          rowSelection={this.props.isReview === true ? null : rowSelection}
          columns={this.props.itemLayout5Reducer.changeEditStateState === "" ? this.columns : columns}
          dataSource={this.props.itemLayout5Reducer.previewInfo.filter(element => element.del_flag == 0)}
          style={{ wordWrap: "break-word", whiteSpace: 'pre-line' }}
          onRow={this.props.isReview === true ? null : 
            this.props.itemLayout5Reducer.changeEditStateState === ""
              ? (record, index) => ({
                index,
                moveRow: this.moveRow
              })
              : null
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemLayout5Reducer: state.itemLayout5Reducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleEdit: (key) => {
      dispatch({ type: CHANGE_EDITSTATE_5, key: key });
    },

    handleDelete: (key) => {
      dispatch({ type: DELETE_DATA_LAYOUT_5, key: key });
    },

    handleSave: (data) => {
      dispatch({ type: SAVE_DATA_LAYOUT_5, data: data });
    },

    saveAllData : () => {
      dispatch({ type: ADD_DATA_LAYOUT_5});
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(TableItem));