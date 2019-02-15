import React, { Component } from 'react';
import { Table, Divider, Tag, Button,
   Popconfirm, Modal, Form, Checkbox,
   Input, message } from 'antd';
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';
import { selectedCDRItem, addCDRData } from '../../../Constant/ActionType';

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
      return <Checkbox.Group options={levelsOptions}  style={{ width: "100%" }}/>;
    }
    else if(this.props.inputType === 'select'){
      return <div>
          <Input style={{ width: '100%' }} placeholder="CDR"/>
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
          const  { getFieldDecorator } = form;
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

class CDRTableItem extends Component {

  state = { visible: false, editingKey: '' }

  constructor(props){
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
        return(
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
          <Divider type="vertical" />
          {this.props.cdrtable.length >= 1
              ? (
                <Popconfirm title="Xác nhận xóa?" onConfirm={() => this.handleDelete(record.key)}>
                  <a href="#a">Xóa</a>
                </Popconfirm>
              ) : null}
        </div>
      )},
    }];
  }

  // Delete
  onSelectChange = (selectedRowKeys) => {
    this.props.onSelectCDRItem(selectedRowKeys);
  }

  handleDelete = (key) => {
    var cdrtable = this.props.cdrtable;
    if(key === cdrtable.length){
      cdrtable.splice(cdrtable.length - 1, 1);
    }
    else {
      var cdrType = cdrtable[key - 1].cdr.split(".")[0];
      for(let i = key - 1;i < cdrtable.length - 1;i++){
        if(cdrtable[i + 1].cdr.split(".")[0] === cdrType){
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
    this.props.onAddCDRData(cdrtable);
    this.props.onSelectCDRItem([]);
  }

  delete = () => {
    var cdrtable = this.props.cdrtable;
    var cdrselecteditem = this.props.cdrselecteditem;
    for(let i = 0;i < cdrselecteditem.length;i++){
      if(cdrselecteditem[i] - 1 === cdrtable.length - 1){
        cdrtable.splice(cdrtable.length - 1, 1);
      }
      else {
        var cdrType = cdrtable[cdrselecteditem[i] - 1].cdr.split(".")[0];
        for(let j = cdrselecteditem[i] - 1;j < cdrtable.length - 1;j++){
          if(cdrtable[j + 1].cdr.split(".")[0] === cdrType){
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
        for(let k = 0;k < cdrselecteditem.length;k++){
          if(cdrselecteditem[k] > cdrselecteditem[i]){
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
  checkDuplicate = (str) => {
    var arr = Array.from(str);
    let count = 0;
    for(let i = 0;i < arr.length;i++){
      if(arr[i] === "."){
        count++;
      }
      if(count === 2){
        return true;
      }
    }
    return false;
  }

  checkNumber = (str) => {
    if(str === "" || str === null || str === undefined){
      return true;
    }
    var arr = Array.from(str);
    for(let i = 0;i < arr.length;i++){
      if(arr[0] === "0"){
        return true;
      }
      if(isNaN(arr[i])){
        return true;
      }
    }
    return false;
  }
  
  checkExist = (cdr, cdrtable) => {
    for(let i = 0;i < cdrtable.length;i++){
      if(cdr === cdrtable[i].cdr){
        return i;
      }
    }
    return -1;
  }
  
  checkIndex = (str, cdrtable, key) => {
    console.log(cdrtable)
    let count = 0;
    for(let i = 0;i < cdrtable.length;i++){
      if(str.split("G")[1].split(".")[0] === cdrtable[i].cdr.split("G")[1].split(".")[0]){
        count++;
      }
    }
    if((str.split("G")[1].split(".")[1] - count >= 1) && str.split("G")[1].split(".")[0] === cdrtable[key].cdr.split("G")[1].split(".")[0]){
      return true;
    }
    if((str.split("G")[1].split(".")[1] - count >= 2) && str.split("G")[1].split(".")[0] !== cdrtable[key].cdr.split("G")[1].split(".")[0]){
      return true;
    }
    return false;
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
        const cdrtable = this.props.cdrtable.slice();
        if(row.cdr.charAt(0) !== "G"){
          message.info("Chuẩn đầu ra không hợp lệ!");
        }
        else {
          if(this.checkNumber(row.cdr.split("G")[1].split(".")[0]) || 
          this.checkNumber(row.cdr.split("G")[1].split(".")[1]) || 
          this.checkDuplicate(row.cdr)){
            message.info("Chuẩn đầu ra không hợp lệ!");
          }
          else {
              if(this.checkIndex(row.cdr, cdrtable, key - 1)){
                message.info("Chuẩn đầu ra quá lớn!");
                return;
              }
              else {
                let isExist = this.checkExist(row.cdr, cdrtable);
                if(isExist !== -1){
                  let temp = cdrtable[key - 1].cdr;
                  cdrtable[key - 1].cdr = row.cdr;
                  cdrtable[isExist].cdr = temp;
                }
                else {
                  if(key === cdrtable.length){
                    cdrtable.splice(cdrtable.length - 1, 1);
                  }
                  else {
                    var cdrType = cdrtable[key - 1].cdr.split(".")[0];
                    for(let i = key - 1;i < cdrtable.length - 1;i++){
                      if(cdrtable[i + 1].cdr.split(".")[0] === cdrType){
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
                  var data = {
                    key: (cdrtable.length + 1).toString(),
                    cdr: row.cdr,
                    description: row.description,
                    levels: row.levels
                  }
                  cdrtable.push(data);
                  
                  this.props.onAddCDRData(cdrtable);
                  this.props.onSelectCDRItem([]);
                }
                this.setState({ editingKey: '' });
              }
            
          }
      }
      
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

    render() {
      
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };

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
      for(let i = 0;i < CDRTable.length - 1;i++){
        for(let j = i + 1;j < CDRTable.length;j++){
          if(CDRTable[i].cdr.split("G")[1].split(".")[0] > CDRTable[j].cdr.split("G")[1].split(".")[0]){
            let iKey = CDRTable[i].key;
            let jKey = CDRTable[j].key;
            let temp = CDRTable[i];
            CDRTable[i] = CDRTable[j];
            CDRTable[i].key = iKey;
            CDRTable[j] = temp;
            CDRTable[j].key = jKey;
          }
          else if(CDRTable[i].cdr.split("G")[1].split(".")[0] === CDRTable[j].cdr.split("G")[1].split(".")[0]){
            if(CDRTable[i].cdr.split("G")[1].split(".")[1] > CDRTable[j].cdr.split("G")[1].split(".")[1]){
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
          <div style={{ marginBottom: 16,  marginTop: 16}}>
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
            columns={columns} 
            dataSource={CDRTable}
             />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cdrtable: state.cdrtable,
        cdrselecteditem: state.cdrselecteditem
    }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddCDRData: addCDRData,
    onSelectCDRItem: selectedCDRItem,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CDRTableItem);
