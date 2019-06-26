import {
  Table, Input, Button, Popconfirm, Form, Divider, Tag, InputNumber, Select, Modal, message, notification
} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { bindActionCreators } from 'redux';
import { changeDGData, addDGData, deleteDGData, isLoaded7, updateChudeDanhGia, updateCDRDanhGia, saveLog, saveLogObject } from '../../../Constant/ActionType';
import React, { Component } from 'react';

import DragDropHTML5 from '../../../html5Backend/html5Backend';
import { connect } from 'react-redux';
import { getCurrTime } from '../../../utils/Time';
import $ from './../../../helpers/services'

const { Option } = Select;

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
  constructor(props) {
    super(props);
    this.state = {
      tenthanhphan: "",
      mota: "",
      standardOutput: [],
      tile: "",
      beforeSelected: [],
    };
  }
  getInput = () => {
    const childrenStandard = [];

    const standard_item = [];
    const chuandauraItem = this.props.mapitem.chuandaura;

    if (chuandauraItem.length > 0) {
      chuandauraItem.forEach(item => {
        let cdr = item.cdr;
        if (cdr.length > 0) {
          cdr.forEach(cdrItem => {
            standard_item.push(cdrItem.chuan_dau_ra)
          })
        }
      })
    }

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
        return <InputNumber min={1} max={100}
          formatter={value => `${value}%`} parser={value => value.replace('%', '')}
          style={{ width: "100%" }} />;
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

class itemLayout7ReducerItem extends React.Component {
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
      render: tile => (
        <span>
          {tile + "%"}
        </span>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: this.props.isReview === true ? null : (text, record) => {
        const editable = this.isEditing(record);
        if (this.isExist(record.mathanhphan)) return;
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

  isFloat(val) {
    var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
    if (!floatRegex.test(val))
      return false;

    val = parseFloat(val);
    if (isNaN(val))
      return false;
    return true;
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      const newData = this.props.itemLayout7Reducer.previewInfo;

      const index = newData.findIndex(item => key === item.key);
      let dataTemp = newData[index];
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
      } else {
        newData.previewInfo.push(row);
      }
      let message = `Chỉnh sửa đánh giá: [Mã: ${dataTemp.key},Tên: ${dataTemp.tenthanhphan},Mô tả (gợi ý): ${dataTemp.mota},Các chuẩn đầu ra được đánh giá: ${dataTemp.standardOutput},Tỉ lệ: ${dataTemp.tile}]` +
        `-> [Mã: ${dataTemp.key},Tên: ${row.tenthanhphan},Mô tả (gợi ý): ${row.mota},Các chuẩn đầu ra được đánh giá: ${row.standardOutput},Tỉ lệ: ${row.tile}]`;
      this.props.onSaveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), message, this.props.logReducer.contentTab, this.props.monhoc,this.props.ctdt)
      this.props.onSaveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), message, this.props.logReducer.contentTab, this.props.monhoc)

      this.props.onAddDGData(newData);
      this.setState({ editingKey: "" });
    });
  }

  isEmptyChildrenChude(value) {
    let chude = this.props.itemLayout7Reducer.chudeDanhGia;
    let previewInfo = this.props.itemLayout7Reducer.previewInfo.filter(item => item.del_flag !== 1);

    for (let i = 0; i < chude.length; i++) {
      if (chude[i].ma_chu_de === value.substring(0, chude[i].ma_chu_de.length)) {
        let index = 0;
        for (let j = 0; j < previewInfo.length; j++) {
          if (chude[i].ma_chu_de === previewInfo[j].key.substring(0, chude[i].ma_chu_de.length)) {
            index++;
          }
        }
        if (index === 1) {
          return true;
        }
      }
    }
    return false;
  }



  handleDelete(key) {
    let previewInfo = this.props.itemLayout7Reducer.previewInfo;
    let index = previewInfo.findIndex(item => item.key === key);
    this.props.onSaveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa đánh giá: Mã : ${previewInfo[index].key}, Tên : ${previewInfo[index].tenthanhphan}, Mô tả (gợi ý) : ${previewInfo[index].mota} , Các chuẩn đầu ra được đánh giá : ${previewInfo[index].standardOutput}, Tỉ lệ : ${previewInfo[index].tile}`, this.props.logReducer.contentTab, this.props.monhoc,this.props.ctdt)
    this.props.onSaveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa đánh giá: Mã : ${previewInfo[index].key}, Tên : ${previewInfo[index].tenthanhphan}, Mô tả (gợi ý) : ${previewInfo[index].mota} , Các chuẩn đầu ra được đánh giá : ${previewInfo[index].standardOutput}, Tỉ lệ : ${previewInfo[index].tile}`, this.props.logReducer.contentTab, this.props.monhoc)

    this.onDelete(key);
    this.setState({ selectedRowKeys: [], editingKey: "" });

    let chude = this.props.itemLayout7Reducer.chudeDanhGia;

    if (this.isEmptyChildrenChude(key)) {
      for (let i = 0; i < chude.length; i++) {
        if (chude[i].ma_chu_de === key.substring(0, chude[i].ma_chu_de.length)) {
          this.onDelete(chude[i].ma_chu_de);
        }
      }
    }
  }

  onDelete = (key) => {
    let previewInfo = this.props.itemLayout7Reducer.previewInfo;
    
    //nếu key là chủ đề . xóa hết tất cả thằng con trong chủ đề đó .
    if (this.isExist(key)) {
      let index = 0;
      let indexChildren = 0;
      for (let i = 0; i < previewInfo.length; i++) {
        if (key === previewInfo[i].key && previewInfo[i].del_flag !== 1) {
          index = i;
        }
        //vị trí của thằng con cuối cùng
        if (this.isChildren(key, previewInfo[i].key) && previewInfo[i].del_flag !==1) {
          indexChildren++;
        }
      }
      console.log()
      //vị trí thăngf con cuối cùng
      indexChildren = indexChildren + index;

      //nếu chỉ có 1 thằng chủ đề
      if ((index === 0 && indexChildren === previewInfo.length) || previewInfo.length === 1) {
        // this.props.itemLayout7Reducer.previewInfo = [];
        for (let i = 0; i < previewInfo.length; i++) {
          previewInfo[i].del_flag = 1;
        }
      }
      // nếu nó là thằng chủ đề đầu tiên trong list hoặc là thằng cuối cùng
      // else if (index === 0 || indexChildren === previewInfo.length) {

      //   for (let i = index; i < indexChildren; i++) {
      //     previewInfo[i].del_flag = 1;
      //   }
      // }
      //ngược lại 
      else {

        //delete từ vị trí index tới index + indexChildren
        for (let i = index; i < indexChildren; i++) {
          previewInfo[i].del_flag = 1;
        }
      }


    } else {
      let temp = previewInfo.findIndex(item => item.key === key);
      if (temp !== -1) {
        previewInfo[temp].del_flag = 1;
      }

    }

    this.props.onAddDGData(previewInfo)
  }

  onSelectChange = selectedRowKeys => {
    let chudeDanhGia = this.props.itemLayout7Reducer.chudeDanhGia;
    let previewInfo = this.props.itemLayout7Reducer.previewInfo.filter(item => item.del_flag !== 1)
    let pushItem = "";
    if (selectedRowKeys.length !== previewInfo.length) {
      if (selectedRowKeys.length > 0) {
        if (this.state.beforeSelected && this.state.beforeSelected.length > 0) {
          selectedRowKeys.forEach(selected => {
            if (!this.state.beforeSelected.includes(selected)) {
              pushItem = selected;
            }
          })
        } else {
          pushItem = selectedRowKeys[0];
        }
      }
    }

    console.log(pushItem)
    // if(pushItem){
    //   if(this.isExist(pushItem)){
    //     previewInfo.forEach(item => {
    //       if(item.key.length > pushItem.length && item.key.substring(0,pushItem.length)===pushItem){
    //         if(!selectedRowKeys.includes(item.key)){
    //           selectedRowKeys.push(item.key);
    //         }
    //       }
    //     })
    //   }else{

    //   }
    // }
    // if(selectedRowKeys.length >0){
    //  chudeDanhGia.forEach(chude => {
    //    selectedRowKeys.forEach(select => {

    //    })
    //  })
    //   selectedRowKeys.forEach(select => {
    //     chudeDanhGia.forEach(chude => {

    //       if(select.length >= chude.ma_chu_de.length && select.substring(0,chude.ma_chu_de.length)===chude.ma_chu_de){
    //         let tempArray = selectedRowKeys.filter(element => element.substring(0,chude.ma_chu_de.length)===chude.ma_chu_de 
    //         && element.substring(0,chude.ma_chu_de.length).length !== chude.ma_chu_de.length)
    //         if(tempArray.length === 1){
    //           selectedRowKeys = selectedRowKeys.filter(element => element !== select.substring(0,chude.ma_chu_de)===chude.ma_chu_de)
    //         }else{
    //           previewInfo.forEach(item => {
    //             if(chude.ma_chu_de===item.key.substring(0,chude.ma_chu_de.length)){
    //               if(selectedRowKeys.includes(chude.ma_chu_de) && !selectedRowKeys.includes(item.key)){
    //                 selectedRowKeys.push(item.key)                
    //               }else if(!selectedRowKeys.includes(chude.ma_chu_de)){
    //                 console.log("HAHHAA")
    //                 selectedRowKeys = selectedRowKeys.filter(element => element !==item.key)
    //               }

    //             }
    //           })
    //         }
    //         console.log("HIHI")

    //       }
    //     })
    //   })
    // }
    // console.log(selectedRowKeys)

    this.setState({
      selectedRowKeys,
      beforeSelected: selectedRowKeys,
    });
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  onCancelEdit = () => {
    this.setState({ editingKey: "" });
  };


  isExist(value) {
    for (let i = 0; i < this.props.itemLayout7Reducer.chudeDanhGia.length; i++) {
      if (value === this.props.itemLayout7Reducer.chudeDanhGia[i].ma_chu_de)
        return true;
    }
    return false;
  }

  onMultiDelete = () => {
    let chude = this.props.itemLayout7Reducer.chudeDanhGia;
    let previewInfo = this.props.itemLayout7Reducer.previewInfo.filter(item => item.del_flag !== 1)
    if (this.state.selectedRowKeys.length === previewInfo.length) {
      for (let i = 0; i < previewInfo.length; i++) {
        this.props.onSaveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa đánh giá: Mã : ${previewInfo[i].key}, Tên : ${previewInfo[i].tenthanhphan}, Mô tả (gợi ý) : ${previewInfo[i].mota} , Các chuẩn đầu ra được đánh giá : ${previewInfo[i].standardOutput}, Tỉ lệ : ${previewInfo[i].tile}`, this.props.logReducer.contentTab, this.props.monhoc,this.props.ctdt)
        this.props.onSaveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa đánh giá: Mã : ${previewInfo[i].key}, Tên : ${previewInfo[i].tenthanhphan}, Mô tả (gợi ý) : ${previewInfo[i].mota} , Các chuẩn đầu ra được đánh giá : ${previewInfo[i].standardOutput}, Tỉ lệ : ${previewInfo[i].tile}`, this.props.logReducer.contentTab, this.props.monhoc)
        previewInfo[i].del_flag = 1;
      }

    } else {
      for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
        let key = this.state.selectedRowKeys[i];
        let index = previewInfo.findIndex(item => item.key === key);
        this.props.onSaveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa đánh giá: Mã : ${previewInfo[index].key}, Tên : ${previewInfo[index].tenthanhphan}, Mô tả (gợi ý) : ${previewInfo[index].mota} , Các chuẩn đầu ra được đánh giá : ${previewInfo[index].standardOutput}, Tỉ lệ : ${previewInfo[index].tile}`, this.props.logReducer.contentTab, this.props.monhoc,this.props.ctdt)
        this.props.onSaveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Xóa đánh giá: Mã : ${previewInfo[index].key}, Tên : ${previewInfo[index].tenthanhphan}, Mô tả (gợi ý) : ${previewInfo[index].mota} , Các chuẩn đầu ra được đánh giá : ${previewInfo[index].standardOutput}, Tỉ lệ : ${previewInfo[index].tile}`, this.props.logReducer.contentTab, this.props.monhoc)
        this.onDelete(key);
        if (this.isEmptyChildrenChude(key)) {
          for (let i = 0; i < chude.length; i++) {
            if (chude[i].ma_chu_de === key.substring(0, chude[i].ma_chu_de.length)) {
              this.onDelete(chude[i].ma_chu_de);
            }
          }
        }
      }

    }
    this.setState({ selectedRowKeys: [], editingKey: "" });
  }

  saveAll = () => {
    let table = this.props.itemLayout7Reducer.previewInfo;
    let totalTile = 0;
    for (let i = 0; i < table.length; i++) {
      if (this.isExist(table[i].mathanhphan) && table[i].del_flag !== 1) {
        totalTile += parseFloat(table[i].tile);
      }
    }

    if (totalTile !== 100 && table.length > 0) {
      message.error("Tổng tỉ lệ phải bằng 100% , vui lòng kiểm tra lại!")
    } else {
      console.log(table)
      let data = table.filter(item => item.id !== 0);
      console.log(data);
      let chuandaura = [];
      if (this.props.itemLayout7Reducer.chuandaura) {
        this.props.itemLayout7Reducer.chuandaura.forEach(item => {
          if (item.cdr) {
            item.cdr.forEach(element => {
              chuandaura.push(element)
            })
          }
        })
      }

      data.forEach(item => {
        let standard = [];
        if (item.standardOutput) {
          item.standardOutput.forEach(element => {
            let temp = chuandaura.filter(cdr => cdr.chuan_dau_ra === element)
            if (temp && temp.length > 0) {
              standard.push(temp[0].id);
            }
          })
        }
        item.standardOutput = standard;
      })


      let obj = {
        thong_tin_chung_id: this.props.monhoc,
        data: data,
        idCtdt: this.props.ctdt,
      }

      console.log(obj)

      $.saveData7(obj)
        .then(response => {
          this.getData();


          if (response.data === 1) {
            notification["success"]({
              message: "Cập nhật thành công",
              duration: 2
            });
          }
          else {
            notification["error"]({
              message: "Cập nhật thất bại",
              duration: 2
            });
          }
        });
      $.saveLog({ data: this.props.itemLayout7Reducer.logData })
    }

  }
  getData() {
    var self= this;
    $.getData7(self.props.monhoc, self.props.ctdt).then(res => {
      var result = res.data;
      var chude = self.props.itemLayout7Reducer.chudeDanhGia;
      var previewInfo = [];
      for (let i = 0; i < chude.length; i++) {
        let haveFather = false;
        for (let j = 0; j < result.length; j++) {
          let str = result[j].mathanhphan.substring(0, chude[i].ma_chu_de.length);
          if (str === chude[i].ma_chu_de) {
            if (!haveFather) {
              haveFather = true;
              let dataFather = {
                id: 0,
                key: chude[i].ma_chu_de,
                chude: chude[i].id,
                standardOutput: [],
                mathanhphan: chude[i].ma_chu_de,
                tenthanhphan: chude[i].ten_chu_de,
                mota: '',
                tile: '',
                del_flag: 0,
              };
              let data = {
                id: result[j].id,
                key: result[j].mathanhphan,
                chude: chude[i].id,
                standardOutput: result[j].standardOutput,
                mathanhphan: "\xa0\xa0\xa0" + result[j].mathanhphan,
                tenthanhphan: result[j].tenthanhphan,
                mota: result[j].mota,
                tile: result[j].tile,
                del_flag: result[j].del_flag,
              }
              previewInfo = previewInfo.concat(dataFather);
              previewInfo = previewInfo.concat(data);
            } else {
              let data = {
                id: result[j].id,
                key: result[j].mathanhphan,
                chude: chude[i].id,
                standardOutput: result[j].standardOutput,
                mathanhphan: "\xa0\xa0\xa0" + result[j].mathanhphan,
                tenthanhphan: result[j].tenthanhphan,
                mota: result[j].mota,
                tile: result[j].tile,
                del_flag: result[j].del_flag,
              }
              previewInfo = previewInfo.concat(data);
            }

          }
        }
      }

      if (previewInfo.length > 1) {
        previewInfo = this.sortValues(previewInfo);
      }
      this.props.onAddDGData(previewInfo);
    })
  }


  async componentDidMount() {
    var self = this;
    await $.getChuDe()
      .then(function (response) {
        self.props.onGetChude(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    $.getStandardOutput7(this.props.monhoc, this.props.ctdt)
      .then(function (response) {
        self.props.onGetCDR(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    
    if (this.props.monhoc !== null && this.props.monhoc !== undefined && this.props.monhoc !== "" && this.props.itemLayout7Reducer.isLoaded === false) {
      this.props.isLoaded(true);
      this.getData();
    }
  }


  showModal = () => {
    confirm({
      title: "Xóa các mục đã chọn?",
      content: "",
      onOk: this.onMultiDelete,
      onCancel() { }
    });
  };

  //kiểm tra là con 
  isChildren(value, children) {
    for (let i = 0; i < value.length; i++) {
      if (children[i] !== value[i]) {
        return false;
      }
    }
    return true;
  }


  sortValues(previewInfo) {
    if (previewInfo === undefined || previewInfo.length === 0) return [];

    // cắt khoảng trắng trước các mã thành phần 
    for (let i = 0; i < previewInfo.length; i++) {
      if (!this.isExist(previewInfo[i].mathanhphan) && previewInfo[i].mathanhphan[0] === '\xa0') {
        previewInfo[i].mathanhphan = previewInfo[i].mathanhphan.slice(3, previewInfo[i].mathanhphan.length);
      }
    }

    //sort Value theo thứ tự
    for (let i = 0; i < previewInfo.length - 1; i++) {
      for (let j = i + 1; j < previewInfo.length; j++) {
        if (previewInfo[j].mathanhphan < previewInfo[i].mathanhphan) {
          let temp = previewInfo[j];
          previewInfo[j] = previewInfo[i];
          previewInfo[i] = temp;
        }
      }
    }


    //find vị trí các parent
    let index = [];
    for (let i = 0; i < previewInfo.length; i++) {
      if (this.isExist(previewInfo[i].mathanhphan)) {
        index.push(i);
      }
    }

    //nếu chỉ có 1 parent
    if (index.length === 1) {

      let totalTile = 0;
      for (let j = 1; j < previewInfo.length; j++) {
        let newTile = previewInfo[j].tile;
        totalTile += parseFloat(newTile);
      }

      previewInfo[index[0]].tile = totalTile;
    }
    //nếu có nhiều parent 
    else {
      for (let i = 0; i < index.length - 1; i++) {
        let totalTile = 0;
        for (let j = index[i] + 1; j < index[i + 1]; j++) {
          let newTile = previewInfo[j].tile;
          totalTile += parseFloat(newTile);
        }
        previewInfo[index[i]].tile = totalTile;
      }
      let totalTile = 0;
      for (let i = index[index.length - 1] + 1; i < previewInfo.length; i++) {
        let newTile = previewInfo[i].tile;
        totalTile += parseFloat(newTile);
      }

      previewInfo[index[index.length - 1]].tile = totalTile;
    }

    for (let i = 0; i < previewInfo.length; i++) {
      if (!this.isExist(previewInfo[i].mathanhphan)) {
        previewInfo[i].mathanhphan = '\xa0\xa0\xa0' + previewInfo[i].mathanhphan;
      }
    }

    return previewInfo;

  }

  setIndexForItem = () => {
    let responseDanhGia = [];
    let danhGia = this.props.itemLayout7Reducer.previewInfo.filter(item => item.id !== 0);
    for (let i = 0; i < danhGia.length; i++) {
      let temp = danhGia[i];
      temp.index = i;
      responseDanhGia.push(temp);
    }

    return responseDanhGia;
  };


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
          mapitem: this.props.itemLayout7Reducer
        }),
      };
    });

    return (
      <div>
        {this.props.isReview === true ? null : <div style={{ marginBottom: 16, marginTop: 16 }}>
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
          <Button style={{ float: "right" }}
            onClick={this.saveAll}
          >
            Lưu tât cả
          </Button>
        </div>}
        <Table
          components={components}
          bordered
          dataSource={this.sortValues(this.props.itemLayout7Reducer.previewInfo.filter(item => item.del_flag !== 1))}
          columns={columns}
          rowSelection={this.props.isReview === true ? null : rowSelection}
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
    itemLayout7Reducer: state.itemLayout7Reducer,
    logReducer: state.logReducer

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddDGData: addDGData,
    onChangeDGData: changeDGData,
    onDeleteDGData: deleteDGData,
    isLoaded: isLoaded7,
    onGetChude: updateChudeDanhGia,
    onGetCDR: updateCDRDanhGia,
    onSaveLog: saveLog,
    onSaveReducer: saveLogObject
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropHTML5(itemLayout7ReducerItem));