import {
  Table, Input, Button, Popconfirm, Form, Divider, Tag, InputNumber, Select, Modal
} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { bindActionCreators } from 'redux';
import { changeDGData, addDGData, deleteDGData } from '../../../Constant/ActionType';
import React, { Component } from 'react';
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from 'react-redux';
const { Option } = Select;
// import './1.css';
const chude = ['BTVN', 'BTTL', 'DAMH', 'LTCK'];

const confirm = Modal.confirm;
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
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenthanhphan: "",
      mota: "",
      standardOutput: [],
      tile: ""
    };
  }
  getInput = () => {
    const childrenStandard = [];
    function init() {
      for (let i = 0; i < standard_item.length; i++) {
        childrenStandard.push(
          <Option key={standard_item[i]}>{standard_item[i]}</Option>
        );
      }
    }
    init();
    switch (this.props.dataIndex) {
      case "tenthanhphan":
        return <TextArea rows={4} style={{ width: "100%" }} />;
      case "mota":
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
      case "tile":
        return <TextArea rows={4} style={{ width: "100%" }} />;
      default:
        return <Input />;
    }
  };

  handleChangeStandard(value) {
    this.setState({ standardOutput: value });
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
                      message: `Please Input ${title}!`,
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

class DGTableItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedRowKeys: [], editingKey: '' };
    this.columns = [{
      title: 'Mã',
      dataIndex: 'mathanhphan',
      key: 'mathanhphan',
    }, {
      title: 'Tên',
      dataIndex: 'tenthanhphan',
      key: 'tenthanhphan',
      editable: true,
    }, {
      title: 'Mô tả(gợi ý)',
      dataIndex: 'mota',
      key: 'mota',
      editable: true,
    },
    {
      title: 'Các chuẩn đầu ra được đánh giá',
      dataIndex: 'standardOutput',
      key: 'standardOutput',
      editable: true,
      render: standardOutput => (
        <span>
          {standardOutput.map(tag => {
            let color = 'green';
            return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </span>
      ),
    },
    {
      title: 'Tỉ lệ',
      dataIndex: 'tile',
      key: 'tile',
      editable: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const editable = this.isEditing(record);
        console.log(editable);
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
                  title="Xác nhận hủy?"
                  onConfirm={() => this.onCancelEdit(record.key)}
                >
                  <a href="#a">Hủy</a>
                </Popconfirm>
              </span>
            ) : (
                <span>
                  <a onClick={() => this.edit(record.key)} href="#a">
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
      },
    }];
  }


  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    console.log("AHAHA SAVE");
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = this.props.dgtable;
      const index = newData.previewInfo.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData.previewInfo[index];
        newData.previewInfo.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log(newData.previewInfo);
      } else {
        newData.previewInfo.push(row);
      }
      this.props.onAddDGData(newData);
      this.setState({ editingKey: "" });
    });
  }

  handleDelete(key) {
    let newData = { previewInfo: [] };    
    this.onDelete(newData,key);
    this.setState({ selectedRowKeys: [], editingKey: "" });
    this.props.onDeleteDGData(newData);
  }

  onDelete = (newData,key) => {
    if (this.isExist(key)) {
      let index = 0;
      let indexChildren = 0;
      for (let i = 0; i < this.props.dgtable.previewInfo.length; i++) {
        if (key === this.props.dgtable.previewInfo[i].key) {
          index = i;
        }
        if (this.isChildren(key, this.props.dgtable.previewInfo[i].key)) {
          indexChildren++;
        }
      }
      indexChildren = indexChildren + index;
      if ((index === 0 && indexChildren === this.props.dgtable.previewInfo.length) || this.props.dgtable.previewInfo.length === 1) {
        console.log("1");
        this.props.dgtable.previewInfo = [];
      } else if (index === 0 || indexChildren === this.props.dgtable.previewInfo.length) {
        console.log("2");
          this.props.dgtable.previewInfo.splice(index, indexChildren);
      } else {
        console.log("3")
          let listKey = [];
          for (let i = index; i < index + indexChildren; i++) {
            console.log(this.props.dgtable.previewInfo[i])
            this.props.dgtable.previewInfo[i].mathanhphan = this.props.dgtable.previewInfo[i + indexChildren].mathanhphan;
            this.props.dgtable.previewInfo[i].tenthanhphan = this.props.dgtable.previewInfo[i + indexChildren].tenthanhphan;
            this.props.dgtable.previewInfo[i].mota = this.props.dgtable.previewInfo[i + indexChildren].mota;
            this.props.dgtable.previewInfo[i].standardOutput = this.props.dgtable.previewInfo[i + indexChildren].standardOutput;
            this.props.dgtable.previewInfo[i].tile = this.props.dgtable.previewInfo[i + indexChildren].tile;
            this.props.dgtable.previewInfo[i].key = index;
            listKey.push(this.props.dgtable.previewInfo[i + indexChildren].key);
          }
          this.props.dgtable.previewInfo.splice(this.props.dgtable.previewInfo.length - indexChildren - 1, 1);
        }


    }
    else if (key === this.props.dgtable.previewInfo[this.props.dgtable.previewInfo.length - 1].key) {
      this.props.dgtable.previewInfo.splice(this.props.dgtable.previewInfo.length - 1, 1);
      newData.previewInfo = this.props.dgtable.previewInfo;
    } else {
      console.log(this.props.dgtable.previewInfo);
      let index = 0;
      for (let i = 0; i < this.props.dgtable.previewInfo.length; i++) {
        if (key === this.props.dgtable.previewInfo[i].key) {
          index = i;
        }
      }
      let listKey = [];
      for (let i = index; i < this.props.dgtable.previewInfo.length - 1; i++) {
        this.props.dgtable.previewInfo[i].mathanhphan = this.props.dgtable.previewInfo[i + 1].mathanhphan;
        this.props.dgtable.previewInfo[i].tenthanhphan = this.props.dgtable.previewInfo[i + 1].tenthanhphan;
        this.props.dgtable.previewInfo[i].mota = this.props.dgtable.previewInfo[i + 1].mota;
        this.props.dgtable.previewInfo[i].standardOutput = this.props.dgtable.previewInfo[i + 1].standardOutput;
        this.props.dgtable.previewInfo[i].tile = this.props.dgtable.previewInfo[i + 1].tile;
        this.props.dgtable.previewInfo[i].key = index;
        listKey.push(this.props.dgtable.previewInfo[i + 1].key);
      }
      console.log(listKey);
      this.props.dgtable.previewInfo.splice(this.props.dgtable.previewInfo.length - 1, 1);
      let indexListKey = 0;
      for (let i = index; i < this.props.dgtable.previewInfo.length; i++) {
        this.props.dgtable.previewInfo[i].key = listKey[indexListKey];
        indexListKey++;
      }
      newData.previewInfo = this.props.dgtable.previewInfo;
      console.log(newData);
    }
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  onCancelEdit = () => {
    this.setState({ editingKey: "" });
  };

  isExist(value) {
    for (let i = 0; i < chude.length; i++) {
      if (value === chude[i])
        return true;
    }
    return false;
  }

  onMultiDelete = () => {
    let newData = {previewInfo:[]};
    console.log(this.state.selectedRowKeys.length);
    console.log(this.props.dgtable)
    if(this.state.selectedRowKeys.length === this.props.dgtable.previewInfo.length){
      this.props.dgtable.previewInfo = [];
    }else {
    for(let i=0 ;i< this.state.selectedRowKeys.length;i++){
      this.onDelete(newData,this.state.selectedRowKeys[i]);
    }}
    this.setState({ selectedRowKeys: [], editingKey: "" });
    this.props.onDeleteDGData(newData);
  }


  showModal = () => {
    confirm({
      title: "Xóa các mục đã chọn?",
      content: "",
      onOk: this.onMultiDelete,
      onCancel() { }
    });
  };

  isChildren(value, children) {
    for (let i = 0; i < value.length; i++) {
      if (children[i] !== value[i]) {
        return false;
      }
    }
    return true;
  }


  sortValues(checkedValues) {
    for (let i = 0; i < checkedValues.length; i++) {
      if (!this.isExist(checkedValues[i].mathanhphan) && checkedValues[i].mathanhphan[0] === '\xa0') {

        checkedValues[i].mathanhphan = checkedValues[i].mathanhphan.slice(3, checkedValues[i].mathanhphan.length);
      }
    }
    for (let i = 0; i < checkedValues.length - 1; i++) {
      for (let j = i + 1; j < checkedValues.length; j++) {
        if (checkedValues[j].mathanhphan < checkedValues[i].mathanhphan) {
          let temp = checkedValues[j];
          checkedValues[j] = checkedValues[i];
          checkedValues[i] = temp;
        }
      }
    }
    let index = [];
    for (let i = 0; i < checkedValues.length; i++) {
      if (this.isExist(checkedValues[i].mathanhphan)) {
        index.push(i);
      }
    }
    if (index.length === 1) {

      let totalTile = 0;
      for (let j = 1; j < checkedValues.length; j++) {
        let newTile = checkedValues[j].tile.slice(0, checkedValues[j].tile.length - 1);
        totalTile += parseFloat(newTile);
      }

      checkedValues[index[0]].tile = totalTile + '%';
    } else {
      for (let i = 0; i < index.length - 1; i++) {
        let totalTile = 0;
        for (let j = index[i] + 1; j < index[i + 1]; j++) {
          let newTile = checkedValues[j].tile.slice(0, checkedValues[j].tile.length - 1);
          totalTile += parseFloat(newTile);
        }
        checkedValues[index[i]].tile = totalTile + '%';
      }
      let totalTile = 0;
      for (let i = index[index.length - 1] + 1; i < checkedValues.length; i++) {
        let newTile = checkedValues[i].tile.slice(0, checkedValues[i].tile.length - 1);
        totalTile += parseFloat(newTile);

      }
      checkedValues[index[index.length - 1]].tile = totalTile + '%';
    }

    for (let i = 0; i < checkedValues.length; i++) {
      if (!this.isExist(checkedValues[i].mathanhphan)) {
        checkedValues[i].mathanhphan = '\xa0\xa0\xa0' + checkedValues[i].mathanhphan;
      }
    }

  }



  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;
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
    if (this.props.dgtable.previewInfo.length !== 0) {
      this.sortValues(this.props.dgtable.previewInfo);

    }

    return (
      <div>
        <div style={{ marginBottom: 16 , marginTop:16 }}>
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
          <Button style={{float: "right"}}
            onClick={this.props.saveAll}
          >
            Lưu tât cả
          </Button>
        </div>
        <Table
          components={components}
          bordered
          dataSource={this.props.dgtable.previewInfo}
          columns={columns}
          rowSelection={rowSelection}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
          style={{ wordWrap: "break-word", whiteSpace: 'pre-line' }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dgtable: state.itemLayout7Reducer,
    subjectId: state.subjectid,

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddDGData: addDGData,
    onChangeDGData: changeDGData,
    onDeleteDGData: deleteDGData,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(DGTableItem));