import {
  Table, Input, Button, Popconfirm, Form, Divider, Tag, InputNumber, Select, Modal, message, notification
} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { bindActionCreators } from 'redux';
import { changeDGData, addDGData, deleteDGData, saveAllDGData, isLoaded7, updateChudeDanhGia, updateCDRDanhGia, saveLog, saveLogObject } from '../../../Constant/ActionType';
import React, { Component } from 'react';
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from 'react-redux';
import axios from "axios"
import { getCurrTime } from '../../../utils/Time';

const { Option } = Select;

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
      tile: "",

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
    },
    {
      title: 'Action',
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

  getStringFromCDR(CDR) {
    let temp = '';
    for (let i = 0; i < CDR.length; i++) {
      temp += CDR[i] + " , ";
    }
    temp = temp.substring(0, temp.length - 3);
    console.log(temp);
    return temp;
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      if (row.tile.substring(row.tile.length - 1, row.tile.length) !== "%") {
        message.error("Nhập tỉ lệ sai định dạng , vui lòng nhập lại !")
        return;
      }

      if (!this.isFloat(row.tile.substring(0, row.tile.length - 1))) {
        message.error("Nhập tỉ lệ sai định dạng , vui lòng nhập lại !")
        return;
      }

      const newData = this.props.itemLayout7Reducer.previewInfo.filter(item => item.del_flag !== 1);

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

      this.props.onSaveLog("Nguyen Van A", getCurrTime(), `Chỉnh sửa đánh giá: [Mã: ${dataTemp.key},Tên: ${dataTemp.tenthanhphan},Mô tả (gợi ý): ${dataTemp.mota},Các chuẩn đầu ra được đánh giá: ${this.getStringFromCDR(dataTemp.standardOutput)},Tỉ lệ: ${dataTemp.tile}] -> 
      [Mã: ${dataTemp.key},Tên: ${row.tenthanhphan},Mô tả (gợi ý): ${row.mota},Các chuẩn đầu ra được đánh giá: ${this.getStringFromCDR(row.standardOutput)},Tỉ lệ: ${row.tile}]`,
        this.props.logReducer.contentTab, this.props.subjectId)
      this.props.onSaveReducer("Nguyen Van A", getCurrTime(), `Chỉnh sửa đánh giá: [Mã: ${dataTemp.key},Tên: ${dataTemp.tenthanhphan},Mô tả (gợi ý): ${dataTemp.mota},Các chuẩn đầu ra được đánh giá: ${this.getStringFromCDR(dataTemp.standardOutput)},Tỉ lệ: ${dataTemp.tile}] -> 
      [Mã: ${dataTemp.key},Tên: ${row.tenthanhphan},Mô tả (gợi ý): ${row.mota},Các chuẩn đầu ra được đánh giá: ${this.getStringFromCDR(row.standardOutput)},Tỉ lệ: ${row.tile}]`, this.props.logReducer.contentTab, this.props.subjectId)

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
    this.props.onSaveLog("Nguyen Van A", getCurrTime(), `Xóa đánh giá: Mã : ${previewInfo[index].mathanhphan}, Tên : ${previewInfo[index].tenthanhphan}, Mô tả (gợi ý) : ${previewInfo[index].mota} , Các chuẩn đầu ra được đánh giá : ${this.getStringFromCDR(previewInfo[index].standardOutput)}, Tỉ lệ : ${previewInfo[index].tile}`, this.props.logReducer.contentTab, this.props.subjectId)
    this.props.onSaveReducer("Nguyen Van A", getCurrTime(), `Xóa đánh giá: Mã : ${previewInfo[index].mathanhphan}, Tên : ${previewInfo[index].tenthanhphan}, Mô tả (gợi ý) : ${previewInfo[index].mota} , Các chuẩn đầu ra được đánh giá : ${this.getStringFromCDR(previewInfo[index].standardOutput)}, Tỉ lệ : ${previewInfo[index].tile}`, this.props.logReducer.contentTab, this.props.subjectId)

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
    //nếu key là chủ đề . xóa hết tất cả thằng con trong chủ đề đó .
    let previewInfo = this.props.itemLayout7Reducer.previewInfo.filter(item => item.del_flag !== 1);
    if (this.isExist(key)) {
      let index = 0;
      let indexChildren = 0;
      for (let i = 0; i < previewInfo.length; i++) {
        if (key === previewInfo[i].key) {
          index = i;
        }
        //vị trí của thằng con cuối cùng
        if (this.isChildren(key, previewInfo[i].key)) {
          indexChildren++;
        }
      }

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
      else if (index === 0 || indexChildren === previewInfo.length) {

        for (let i = index; i < indexChildren; i++) {
          previewInfo[i].del_flag = 1;
        }
      }
      //ngược lại 
      else {

        //delete từ vị trí index tới index + indexChildren
        for (let i = index; i < index + indexChildren; i++) {
          previewInfo[i].del_flag = 1;
        }
      }


    }
    else {
      let temp = previewInfo.findIndex(item => item.key === key);
      previewInfo[temp].del_flag = 1;
    }

    this.props.onAddDGData(previewInfo)
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
        this.props.onSaveLog("Nguyen Van A", getCurrTime(), `Xóa đánh giá: Mã : ${previewInfo[i].mathanhphan}, Tên : ${previewInfo[i].tenthanhphan}, Mô tả (gợi ý) : ${previewInfo[i].mota} , Các chuẩn đầu ra được đánh giá : ${this.getStringFromCDR(previewInfo[i].standardOutput)}, Tỉ lệ : ${previewInfo[i].tile}`, this.props.logReducer.contentTab, this.props.subjectId)
        this.props.onSaveReducer("Nguyen Van A", getCurrTime(), `Xóa đánh giá: Mã : ${previewInfo[i].mathanhphan}, Tên : ${previewInfo[i].tenthanhphan}, Mô tả (gợi ý) : ${previewInfo[i].mota} , Các chuẩn đầu ra được đánh giá : ${this.getStringFromCDR(previewInfo[i].standardOutput)}, Tỉ lệ : ${previewInfo[i].tile}`, this.props.logReducer.contentTab, this.props.subjectId)
      }
      previewInfo = [];
    } else {
      for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
        let key = this.state.selectedRowKeys[i];
        this.onDelete(key);
        let index = previewInfo.findIndex(item => item.key === key);
        this.props.onSaveLog("Nguyen Van A", getCurrTime(), `Xóa đánh giá: Mã : ${previewInfo[index].mathanhphan}, Tên : ${previewInfo[index].tenthanhphan}, Mô tả (gợi ý) : ${previewInfo[index].mota} , Các chuẩn đầu ra được đánh giá : ${this.getStringFromCDR(previewInfo[index].standardOutput)}, Tỉ lệ : ${previewInfo[index].tile}`, this.props.logReducer.contentTab, this.props.subjectId)
        this.props.onSaveReducer("Nguyen Van A", getCurrTime(), `Xóa đánh giá: Mã : ${previewInfo[index].mathanhphan}, Tên : ${previewInfo[index].tenthanhphan}, Mô tả (gợi ý) : ${previewInfo[index].mota} , Các chuẩn đầu ra được đánh giá : ${this.getStringFromCDR(previewInfo[index].standardOutput)}, Tỉ lệ : ${previewInfo[index].tile}`, this.props.logReducer.contentTab, this.props.subjectId)
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
    let table = this.props.itemLayout7Reducer.previewInfo.filter(item => item.del_flag !== 1);
    let totalTile = 0;
    for (let i = 0; i < table.length; i++) {
      if (this.isExist(table[i].mathanhphan)) {
        totalTile += parseFloat(table[i].tile.replace("%", ""));
      }
    }
    if (totalTile != 100) {
      message.error("Tổng tỉ lệ phải bằng 100% , vui lòng kiểm tra lại!")
    } else {
      let obj = {
        thongtinchungid: this.props.subjectId,
        description: table,
      }

      axios.post(`/save-danhgia`, obj)
        .then(response => {
          if (response.data === 1) {
            notification["success"]({
              message: "Cập nhật thành công",
              duration: 1
            });
          }
          else {
            notification["error"]({
              message: "Cập nhật thất bại",
              duration: 1
            });
          }
        });
      axios.post('/save-log', { data: this.props.itemLayout7Reducer.logData })
    }

  }
  getData() {
    var self = this;
    axios.get('/get-chude')
      .then(function (response) {
        self.props.onGetChude(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get(`/get-standardoutput-7/${this.props.subjectId}`)
      .then(function (response) {

        self.props.onGetCDR(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    var listDG = [];
    var listCDRDG = [];
    var listCDR = [];
    var result = [];
    axios.get(`/get-danhgia/${this.props.subjectId}`).then(response => {
      if (response.data === null || response.data === undefined || response.data.length === 0) return;
      let listStringId = '';
      listDG = response.data;
      response.data.forEach(item => {
        if (listStringId === '') {
          listStringId += item.id
        } else {
          listStringId = listStringId + ',' + item.id;
        }
      })

      axios.post(`/get-cdrdanhgia`, { data: listStringId }).then(response2 => {
        if (response2.data === null || response2.data === undefined || response2.data.length === 0) return;
        listCDRDG = response2.data
        let listCDRDGString = '';
        listCDRDG.forEach(item => {
          if (listCDRDGString === '') {
            listCDRDGString += item.chuan_dau_ra_mon_hoc_id;
          } else {
            listCDRDGString = listCDRDGString + ',' + item.chuan_dau_ra_mon_hoc_id;
          }
        })
        axios.post(`/get-cdr-7`, { data: listCDRDGString }).then(response3 => {
          if (response3.data === null || response3.data === undefined || response3.data.length === 0) return;
          listCDR = response3.data;



          for (let i = 0; i < listDG.length; i++) {

            let cdrResponse = [];
            for (let j = 0; j < listCDRDG.length; j++) {

              if (listDG[i].id === listCDRDG[j].danh_gia_id) {

                for (let k = 0; k < listCDR.length; k++) {
                  if (listCDRDG[j].chuan_dau_ra_mon_hoc_id === listCDR[k].id) {

                    cdrResponse.push(listCDR[k].chuan_dau_ra);
                  }
                }
              }
            }
            result.push({ danhgia: listDG[i], chuandaura: cdrResponse });
          }
          var chude = this.props.itemLayout7Reducer.chudeDanhGia;
          var previewInfo = [];
          for (let i = 0; i < chude.length; i++) {
            let haveFather = false;
            for (let j = 0; j < result.length; j++) {
              let str = result[j].danhgia.ma.substring(0, chude[i].ma_chu_de.length);

              if (str === chude[i].ma_chu_de) {
                if (!haveFather) {
                  haveFather = true;
                  let dataFather = {
                    key: chude[i].ma_chu_de,
                    chude: chude[i].id,
                    standardOutput: [],
                    mathanhphan: chude[i].ma_chu_de,
                    tenthanhphan: chude[i].ten_chu_de,
                    mota: '',
                    tile: '',
                  };
                  let data = {
                    key: result[j].danhgia.ma,
                    chude: chude[i].id,
                    standardOutput: result[j].chuandaura,
                    mathanhphan: "\xa0\xa0\xa0" + result[j].danhgia.ma,
                    tenthanhphan: result[j].danhgia.ten,
                    mota: result[j].danhgia.mo_ta,
                    tile: result[j].danhgia.ti_le + "%",
                  }
                  previewInfo = previewInfo.concat(dataFather);
                  previewInfo = previewInfo.concat(data);
                } else {
                  let data = {
                    key: result[j].danhgia.ma,
                    chude: chude[i].id,
                    standardOutput: result[j].chuandaura,
                    mathanhphan: "\xa0\xa0\xa0" + result[j].danhgia.ma,
                    tenthanhphan: result[j].danhgia.ten,
                    mota: result[j].danhgia.mo_ta,
                    tile: result[j].danhgia.ti_le + "%",
                  }
                  previewInfo = previewInfo.concat(data);
                }

              }
            }
          }
          if (previewInfo.filter(item => item.del_flag !== 1).length > 1) {
            this.sortValues(previewInfo.filter(item => item.del_flag !== 1));

          }

          this.props.onAddDGData(previewInfo);
        })
      })

    })

  }


  componentWillMount() {

    if (this.props.subjectId !== null && this.props.subjectId !== undefined && this.props.subjectId !== "" && this.props.itemLayout7Reducer.isLoaded === false) {
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
        let newTile = previewInfo[j].tile.slice(0, previewInfo[j].tile.length - 1);
        totalTile += parseFloat(newTile);
      }

      previewInfo[index[0]].tile = totalTile + '%';
    }
    //nếu có nhiều parent 
    else {
      for (let i = 0; i < index.length - 1; i++) {
        let totalTile = 0;
        for (let j = index[i] + 1; j < index[i + 1]; j++) {
          let newTile = previewInfo[j].tile.slice(0, previewInfo[j].tile.length - 1);
          totalTile += parseFloat(newTile);
        }
        previewInfo[index[i]].tile = totalTile + '%';
      }
      let totalTile = 0;
      for (let i = index[index.length - 1] + 1; i < previewInfo.length; i++) {
        let newTile = previewInfo[i].tile.slice(0, previewInfo[i].tile.length - 1);
        totalTile += parseFloat(newTile);
      }

      previewInfo[index[index.length - 1]].tile = totalTile + '%';
    }

    for (let i = 0; i < previewInfo.length; i++) {
      if (!this.isExist(previewInfo[i].mathanhphan)) {
        previewInfo[i].mathanhphan = '\xa0\xa0\xa0' + previewInfo[i].mathanhphan;
      }
    }

  }

  setIndexForItem = () => {
    let responseDanhGia = [];
    let danhGia = this.props.itemLayout7Reducer.previewInfo.filter(item => item.del_flag === 0);
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
        }),
      };
    });

    if (this.props.itemLayout7Reducer.previewInfo.filter(item => item.del_flag !== 1).length > 1) {
      this.sortValues(this.props.itemLayout7Reducer.previewInfo.filter(item => item.del_flag !== 1));

    }

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
          dataSource={this.props.itemLayout7Reducer.previewInfo.filter(item => item.del_flag !== 1)}
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
    subjectId: state.subjectid,
    logReducer: state.logReducer

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddDGData: addDGData,
    onChangeDGData: changeDGData,
    onDeleteDGData: deleteDGData,
    isLoaded: isLoaded7,
    onSaveAllData: saveAllDGData,
    onGetChude: updateChudeDanhGia,
    onGetCDR: updateCDRDanhGia,
    onSaveLog: saveLog,
    onSaveReducer: saveLogObject
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(itemLayout7ReducerItem));