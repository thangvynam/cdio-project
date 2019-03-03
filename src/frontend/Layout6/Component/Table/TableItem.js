import React, { Component } from "react";
import { Table, Divider, Tag, Button,Popconfirm,Modal } from "antd";
import { connect } from "react-redux";
import { UpdateKHGDTH } from "../../../Constant/ActionType";
import { bindActionCreators } from "redux";
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import update from 'immutability-helper';
import HTML5Backend from 'react-dnd-html5-backend';


const confirm = Modal.confirm;


let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let className = restProps.className;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr
          {...restProps}
          className={className}
          style={style}
        />
      )
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget(
  'row',
  rowTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }),
)(
  DragSource(
    'row',
    rowSource,
    (connect) => ({
      connectDragSource: connect.dragSource(),
    }),
  )(BodyRow),
);
















class TableItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedRowKeys: [],
      data: this.props.itemKHGDTH.previewInfo
    };
   
  }

  columns = [
    {
      title: "Tuần",
      dataIndex:"key",
      key: "key"
    },
    {
      title: "Chủ đề",
      dataIndex: "titleName",
      key: "titleName"
    },
    {
      title: "Chuẩn đầu ra ",
      dataIndex: "standardOutput",
      key: "standardOutput",
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
      width:120,
      render: (text, record) => (
        <span>
          <a href="#a">Edit {record.name}</a>
          <Divider type="vertical" />
                <Popconfirm
                  title="Xác nhận xóa?"
                  onConfirm={() => this.handleDelete(record.key)}
                >
                  <a href="#a">Delete</a>
                </Popconfirm>
        </span>
      )
    }
  ];
  components = {
    body: {
      row: DragableBodyRow,
    }
  }
  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];

    // this.setState(
    //   update(this.state, {
    //     data: {
    //       $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
    //     },
    //   }),
    // );

    
  }


  handleDelete(key) {
    let newData = this.props.itemKHGDTH.previewInfo.filter((_, index) => index !== key-1);
    for(let i = 0;i<newData.length;i++){
      newData[i].key = i+1;
    }
    this.setState({ selectedRowKeys: [] });
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
      this.setState({ selectedRowKeys: [] });
      return;
    }

    let KHitems = this.props.itemKHGDTH.previewInfo;
    const filteredItems = KHitems.filter(
      (_, index) => !selectedRow.includes(index+1)
    );

    for(let i = 0;i<filteredItems.length;i++){
      filteredItems[i].key = i+1;
    }
    this.props.onUpdateKHGDTH(filteredItems);
    this.setState({ selectedRowKeys: [] });
  };

  showModal = () => {
    confirm({
      title: "Xóa các mục đã chọn?",
      content: "",
      onOk: this.onMultiDelete,
      onCancel() {}
    });
  };


  render() {


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
      bordered
      columns={this.columns} 
      // dataSource={this.props.itemKHGDTH.previewInfo} 
      dataSource = {this.state.data}
      rowSelection={rowSelection}

      components={this.components}
      onRow={(record, index) => ({
        index,
        moveRow: this.moveRow,
      })}
      />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    itemKHGDTH: state.itemKHGDTHReducer
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onUpdateKHGDTH: UpdateKHGDTH
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropContext(HTML5Backend)(TableItem));
