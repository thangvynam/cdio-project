import React, { Component } from 'react';
import {
  Table, Divider, Tag, Button,
  Popconfirm, Modal, Form, Checkbox,
  Input
} from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectedCDRItem, addCDRData, changeEditState } from '../../../Constant/ActionType';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

const FormItem = Form.Item;
const { TextArea } = Input;
const levelsOptions = ["I", "T", "U"];

class EditableCell extends Component {

  getInput = () => {

    if (this.props.inputType === 'choice') {
      return <Checkbox.Group options={levelsOptions} style={{ width: "100%" }} />;
    }
    else if (this.props.inputType === 'select') {
      return <div>
        <Input disabled={true} style={{ width: '100%' }} placeholder={this.props.record[this.props.dataIndex]} />
      </div>


    }
    else return <TextArea rows={4} placeholder="Mô tả" />

  };

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
                      message: `Thiếu thông tin!`,
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

class CDRTableItem extends Component {

  state = { visible: false }

  constructor(props) {
    super(props);
    this.columns = [{
      title: 'Chuẩn đầu ra',
      dataIndex: 'cdr',
      key: 'cdr',
      width: 100,
      editable: true,
      render: text => <p>{text}</p>,
    }, {
      title: 'Mô tả (Mức chi tiết - hành động)',
      dataIndex: 'description',
      key: 'description',
      width: 600,
      editable: true,
    }, {
      title: 'Mức độ (I/T/U)',
      key: 'levels',
      dataIndex: 'levels',
      width: 150,
      editable: true,
      render: levels => (
        <span>
          {levels.map(level => {
            let color = level === "I" ? 'geekblue' :
              level === "T" ? 'orange' : 'gray';
            return <Tag color={color} key={level}>{level.toUpperCase()}</Tag>;
          })}
        </span>
      ),
    }, {
      title: 'Action',
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
                <a href="#a" onClick={() => this.edit(record.key)}>Edit</a>
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

  // Delete
  onSelectChange = (selectedRowKeys) => {
    this.props.onSelectCDRItem(selectedRowKeys);
  }

  OnDelete = (cdrtable, key) => {
    if (key === cdrtable.length) {
      cdrtable.splice(cdrtable.length - 1, 1);
    }
    else {
      var cdrType = cdrtable[key - 1].cdr.split(".")[0];
      for (let i = key - 1; i < cdrtable.length - 1; i++) {
        if (cdrtable[i + 1].cdr.split(".")[0] === cdrType) {
          cdrtable[i].description = cdrtable[i + 1].description;
          cdrtable[i].levels = cdrtable[i + 1].levels;
        }
        else {
          cdrtable[i].cdr = cdrtable[i + 1].cdr;
          cdrtable[i].description = cdrtable[i + 1].description;
          cdrtable[i].levels = cdrtable[i + 1].levels;
        }
      }
      cdrtable.splice(cdrtable.length - 1, 1);
    }
  }
  handleDelete = (key) => {
    var cdrtable = this.props.cdrtable;
    this.OnDelete(cdrtable, key);
    this.props.onAddCDRData(cdrtable);
    this.props.onSelectCDRItem([]);
  }

  delete = () => {
    var cdrtable = this.props.cdrtable;
    var cdrselecteditem = this.props.cdrselecteditem;
    for (let i = 0; i < cdrselecteditem.length; i++) {
      if (cdrselecteditem[i] - 1 === cdrtable.length - 1) {
        cdrtable.splice(cdrtable.length - 1, 1);
      }
      else {
        var cdrType = cdrtable[cdrselecteditem[i] - 1].cdr.split(".")[0];
        for (let j = cdrselecteditem[i] - 1; j < cdrtable.length - 1; j++) {
          if (cdrtable[j + 1].cdr.split(".")[0] === cdrType) {
            cdrtable[j].description = cdrtable[j + 1].description;
            cdrtable[j].levels = cdrtable[j + 1].levels;
          }
          else {
            cdrtable[j].cdr = cdrtable[j + 1].cdr;
            cdrtable[j].description = cdrtable[j + 1].description;
            cdrtable[j].levels = cdrtable[j + 1].levels;
          }
        }
        cdrtable.splice(cdrtable.length - 1, 1);
        for (let k = 0; k < cdrselecteditem.length; k++) {
          if (cdrselecteditem[k] > cdrselecteditem[i]) {
            cdrselecteditem[k]--;
          }
        }
      }
    }
    this.props.onAddCDRData(cdrtable);
    this.props.onSelectCDRItem([]);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.delete();
    this.setState({
      visible: false,
    });

  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  // Edit

  isEditing = record => record.key === this.props.cdreditstate;

  cancel = () => {
    this.props.onChangeEditState('');
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = this.props.cdrtable;

      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
      } else {
        newData.push(row);
      }
      for (let i = 0; i < newData[key - 1].levels.length - 1; i++) {
        for (let j = i + 1; j < newData[key - 1].levels.length; j++) {
          if (newData[key - 1].levels[j] < newData[key - 1].levels[i]) {
            let temp = newData[key - 1].levels[j];
            newData[key - 1].levels[j] = newData[key - 1].levels[i];
            newData[key - 1].levels[i] = temp;
          }
        }

      }
      this.props.onAddCDRData(newData);
      this.props.onSelectCDRItem([]);
      this.props.onChangeEditState('');
    });
  }

  edit(key) {
    this.props.onChangeEditState(key);
  }

  moveRow = (dragIndex, hoverIndex) => {

    const data = this.props.cdrtable;
    const temp = {
      description: data[dragIndex].description,
      levels: data[dragIndex].levels
    }
    data[dragIndex].description = data[hoverIndex].description;
    data[dragIndex].levels = data[hoverIndex].levels;

    data[hoverIndex].description = temp.description;
    data[hoverIndex].levels = temp.levels;

    this.props.onAddCDRData(data);
    this.props.onSelectCDRItem([]);
  }

  render() {
    console.log(this.props.cdrtable)
    var components = {};
    this.props.cdreditstate !== '' ?
      components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell
        },
      } :
      components = {
        body: {
          row: DragableBodyRow
        },
      }

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'cdr' ? 'select' : col.dataIndex === 'levels' ? 'choice' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    const CDRTable = this.props.cdrtable;
    for (let i = 0; i < CDRTable.length - 1; i++) {
      for (let j = i + 1; j < CDRTable.length; j++) {
        if (CDRTable[i].cdr.split("G")[1].split(".")[0] > CDRTable[j].cdr.split("G")[1].split(".")[0]) {
          let iKey = CDRTable[i].key;
          let jKey = CDRTable[j].key;
          let temp = CDRTable[i];
          CDRTable[i] = CDRTable[j];
          CDRTable[i].key = iKey;
          CDRTable[j] = temp;
          CDRTable[j].key = jKey;
        }
        else if (CDRTable[i].cdr.split("G")[1].split(".")[0] === CDRTable[j].cdr.split("G")[1].split(".")[0]) {
          if (CDRTable[i].cdr.split("G")[1].split(".")[1] > CDRTable[j].cdr.split("G")[1].split(".")[1]) {
            let iKey = CDRTable[i].key;
            let jKey = CDRTable[j].key;
            let temp = CDRTable[i];
            CDRTable[i] = CDRTable[j];
            CDRTable[i].key = iKey;
            CDRTable[j] = temp;
            CDRTable[j].key = jKey;
          }
        }
      }
    }
    const hasSelected = this.props.cdrselecteditem.length > 0;
    const selectedRowKeys = this.props.cdrselecteditem;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
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
            {hasSelected ? `Đã chọn ${this.props.cdrselecteditem.length} mục` : ''}
          </span>
        </div>
        <Table bordered
          components={components}
          rowSelection={rowSelection}
          columns={this.props.cdreditstate === '' ? this.columns : columns}
          dataSource={CDRTable}
          onRow={
            this.props.cdreditstate === '' ?
              (record, index) => ({
                index,
                moveRow: this.moveRow,
              }) : null}
        />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cdrtable: state.cdrtable,
    cdrselecteditem: state.cdrselecteditem,
    cdreditstate: state.cdreditstate
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddCDRData: addCDRData,
    onSelectCDRItem: selectedCDRItem,
    onChangeEditState: changeEditState
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(CDRTableItem));
