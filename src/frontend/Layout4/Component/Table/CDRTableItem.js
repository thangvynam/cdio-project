import React, { Component } from 'react';

import { Table, Divider, Tag, Button,
   Popconfirm, Modal, Form, Checkbox,
   Input, Cascader } from 'antd';
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';
import { selectedCDRItem, addCDRData, changeEditState, selectedVerb } from '../../../Constant/ActionType';
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
const level_data = [{
  value: 'Knowledge',
  label: 'Knowledge',
  children: [
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
    {
      value: '3',
      label: '3',
    },
    {
      value: '4',
      label: '4',
    },
    {
      value: '5',
      label: '5',
    }
  ],
}, {
  value: 'Skill',
  label: 'Skill',
  children: [
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
    {
      value: '3',
      label: '3',
    },
    {
      value: '4',
      label: '4',
    },
    {
      value: '5',
      label: '5',
    }
    ],
}, {
  value: 'Attitude',
  label: 'Attitude',
  children: [
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
    {
      value: '3',
      label: '3',
    },
    {
      value: '4',
      label: '4',
    },
    {
      value: '5',
      label: '5',
    }
    ],
}];
class EditableCell extends Component {

  displayRender = (label) => {
    if(label[1] !== "" && label[1] !== undefined){
      return label[0] + " - Level " + label[1];
    }
      return label[0];
    }
  getInput = () => {

    if (this.props.inputType === 'choice') {
      return <Checkbox.Group options={levelsOptions} style={{ width: "100%" }} />;
    }

    else if(this.props.inputType === 'level_verb') {
      return <Cascader
      options={level_data}
      expandTrigger="hover"
      displayRender={this.displayRender}
      style={{width: "100%"}}
    />
    }
    else if(this.props.inputType === 'select'){

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
      title: 'Mức độ đạt được',
      dataIndex: 'level_verb',
      key: 'level_verb',
      width: 200,
      align: "center",
      editable: true,
      render: level => {
        let color = level[1] === "1" ? 'green' :
        level[1] === "2" ? 'volcano' : level[1] === "3" ? 'yellow' : level[1] === "4" ? 'blue' : 'orange';
        return (
          <span>
            <Tag color={color} key={level}>{level[0].toUpperCase()}</Tag>
        </span>
        )
        
    }
    }, {
      title: 'Mô tả (Mức chi tiết - hành động)',
      dataIndex: 'description',
      key: 'description',
      width: 400,
      editable: true,
    }, {
      title: 'Mức độ (I/T/U)',
      key: 'levels',
      dataIndex: 'levels',
      width: 130,
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

    if(key === cdrtable.previewInfo.length){
      cdrtable.previewInfo.splice(cdrtable.previewInfo.length - 1, 1);
    }
    else {
      var cdrType = cdrtable.previewInfo[key - 1].cdr.split(".")[0];
      for(let i = key - 1;i < cdrtable.previewInfo.length - 1;i++){
        if(cdrtable.previewInfo[i + 1].cdr.split(".")[0] === cdrType){
          cdrtable.previewInfo[i].level_verb = cdrtable.previewInfo[i + 1].level_verb;
          cdrtable.previewInfo[i].description = cdrtable.previewInfo[i + 1].description;
          cdrtable.previewInfo[i].levels = cdrtable.previewInfo[i + 1].levels;

        }
        else {
          cdrtable.previewInfo[i].cdr = cdrtable.previewInfo[i + 1].cdr;
          cdrtable.previewInfo[i].level_verb = cdrtable.previewInfo[i + 1].level_verb;
          cdrtable.previewInfo[i].description = cdrtable.previewInfo[i + 1].description;
          cdrtable.previewInfo[i].levels = cdrtable.previewInfo[i + 1].levels;
        }
      }
      cdrtable.previewInfo.splice(cdrtable.previewInfo.length - 1, 1);
    }
  }
  handleDelete = (key) => {
    var cdrtable = this.props.cdrtable;
    this.OnDelete(cdrtable, key);
    this.props.onAddCDRData(cdrtable);
    this.props.onUpdateVerb(this.props.cdrverb);
    this.props.onSelectCDRItem([]);
  }

  delete = () => {
    var cdrtable = this.props.cdrtable;
    var cdrselecteditem = this.props.cdrselecteditem;

    for(let i = 0;i < cdrselecteditem.length;i++){
      if(cdrselecteditem[i] - 1 === cdrtable.previewInfo.length - 1){
        cdrtable.previewInfo.splice(cdrtable.previewInfo.length - 1, 1);
      }
      else {
        var cdrType = cdrtable.previewInfo[cdrselecteditem[i] - 1].cdr.split(".")[0];
        for(let j = cdrselecteditem[i] - 1;j < cdrtable.previewInfo.length - 1;j++){
          if(cdrtable.previewInfo[j + 1].cdr.split(".")[0] === cdrType){
            cdrtable.previewInfo[j].level_verb = cdrtable.previewInfo[j + 1].level_verb;
            cdrtable.previewInfo[j].description = cdrtable.previewInfo[j + 1].description;
            cdrtable.previewInfo[j].levels = cdrtable.previewInfo[j + 1].levels;
          }
          else {
            cdrtable.previewInfo[j].cdr = cdrtable.previewInfo[j + 1].cdr;
            cdrtable.previewInfo[j].level_verb = cdrtable.previewInfo[j + 1].level_verb;
            cdrtable.previewInfo[j].description = cdrtable.previewInfo[j + 1].description;
            cdrtable.previewInfo[j].levels = cdrtable.previewInfo[j + 1].levels;
          }
        }
        cdrtable.previewInfo.splice(cdrtable.previewInfo.length - 1, 1);
        for(let k = 0;k < cdrselecteditem.length;k++){
          if(cdrselecteditem[k] > cdrselecteditem[i]){
            cdrselecteditem[k]--;
          }
        }
      }
    }
    this.props.onAddCDRData(cdrtable);
    const cdrverb = this.props.cdrverb;
    this.props.onUpdateVerb({});
    this.props.onUpdateVerb(cdrverb);
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

      
      const index = newData.previewInfo.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData.previewInfo[index];
        newData.previewInfo.splice(index, 1, {
          ...item,
          ...row,
        });
      } else {
        newData.previewInfo.push(row);
      }
      for(let i = 0;i < newData.previewInfo[key - 1].levels.length - 1;i++){
        for (let j = i + 1; j < newData.previewInfo[key - 1].levels.length; j++) {
          if (newData.previewInfo[key - 1].levels[j] < newData.previewInfo[key - 1].levels[i]) {
            let temp = newData.previewInfo[key - 1].levels[j];
            newData.previewInfo[key - 1].levels[j] = newData.previewInfo[key - 1].levels[i];
            newData.previewInfo[key - 1].levels[i] = temp;
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
      level_verb: data.previewInfo[dragIndex].level_verb,
      description: data.previewInfo[dragIndex].description,
      levels: data.previewInfo[dragIndex].levels
    }

    data.previewInfo[dragIndex].level_verb = data.previewInfo[hoverIndex].level_verb;
    data.previewInfo[dragIndex].description = data.previewInfo[hoverIndex].description;
    data.previewInfo[dragIndex].levels= data.previewInfo[hoverIndex].levels;

    data.previewInfo[hoverIndex].level_verb = temp.level_verb;
    data.previewInfo[hoverIndex].description = temp.description;
    data.previewInfo[hoverIndex].levels= temp.levels;

    this.props.onAddCDRData(data);
    this.props.onSelectCDRItem([]);
  }


    render() {
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
        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === 'cdr' ? 'select' : col.dataIndex === 'levels' ? 'choice' : col.dataIndex === 'level_verb' ? 'level_verb' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      });

      var CDRTable = this.props.cdrtable;
      for(let i = 0;i < CDRTable.previewInfo.length - 1;i++){
        for(let j = i + 1;j < CDRTable.previewInfo.length;j++){
          if(CDRTable.previewInfo[i].cdr.split(".")[0] > CDRTable.previewInfo[j].cdr.split(".")[0]){
            let iKey = CDRTable.previewInfo[i].key;
            let jKey = CDRTable.previewInfo[j].key;
            let temp = CDRTable.previewInfo[i];
            CDRTable.previewInfo[i] = CDRTable.previewInfo[j];
            CDRTable.previewInfo[i].key = iKey;
            CDRTable.previewInfo[j] = temp;
            CDRTable.previewInfo[j].key = jKey;
          }
          else if(CDRTable.previewInfo[i].cdr.split(".")[0] === CDRTable.previewInfo[j].cdr.split(".")[0]){
            if(CDRTable.previewInfo[i].cdr.split(".")[1] > CDRTable.previewInfo[j].cdr.split(".")[1]){
              let iKey = CDRTable.previewInfo[i].key;
              let jKey = CDRTable.previewInfo[j].key;
              let temp = CDRTable.previewInfo[i];
              CDRTable.previewInfo[i] = CDRTable.previewInfo[j];
              CDRTable.previewInfo[i].key = iKey;
              CDRTable.previewInfo[j] = temp;
              CDRTable.previewInfo[j].key = jKey;
            }
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
            dataSource={CDRTable.previewInfo}
            onRow={
              this.props.cdreditstate === '' ?
              (record, index) => ({
              index,
              moveRow: this.moveRow,
            }) : null}
            pagination={{ pageSize: 50 }} 
          scroll={{ y: 600, }}
             />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cdrtable: state.itemLayout4Reducer,
        cdrselecteditem: state.cdrselecteditem,
        cdreditstate: state.cdreditstate,
        cdrverb: state.cdrverb
    }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddCDRData: addCDRData,
    onSelectCDRItem: selectedCDRItem,
    onChangeEditState: changeEditState,
    onUpdateVerb: selectedVerb,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(CDRTableItem));
