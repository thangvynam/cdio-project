import React, { Component } from 'react';
import { Table, Divider, Tag, Button,
   Popconfirm, Modal, Form, Checkbox,
   Input, Cascader, notification } from 'antd';
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';
import { selectedCDRItem, addCDRData, changeEditState, selectedVerb, cdrmdhd, isLoad, saveLog, changeCDRData, isLoadEditMatrix, editMatrix, cdrmdhddb,saveLogObject } from '../../../Constant/ActionType';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import axios from 'axios';
import { getCurrTime } from '../../../utils/Time';
import $ from "../../../helpers/services";

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Thông báo',
    description: 'Lưu dữ liệu thành công',
  });
};

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
  displayRender = (label) => {
    if(label[1] !== "" && label[1] !== undefined){
      return label[0] + " - Level " + label[1];
    }
      return label[0];
    }
  getInput = () => {

    if (this.props.inputType === 'choice') {
      return <Checkbox.Group options={levelsOptions} style={{ width: "100%" }}/>;
    }
    else if(this.props.inputType === 'level_verb') {
      return <Cascader
      options={this.props.cdrmdhd_level}
      expandTrigger="hover"
      displayRender={this.displayRender}
      style={{width: "100%"}}
    />
    }
    else if(this.props.inputType === 'select'){
      return <div>
          <Input disabled={true} style={{ width: '100%' }} placeholder={this.props.record[this.props.dataIndex]}/>
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
      cdrmdhd_level,
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


  constructor(props){
    super(props);
    this.state = {
      id: this.props.subjectId,
      visible: false,
      isLoaded: false,
      notifications: []
    };
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
      render: this.props.isReview === true ? null : (text, record) => {
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
                <a href="#a" onClick={() => this.edit(record.key)}>Sửa</a>
              )}
          {!editable ? <Divider type="vertical" /> : null}
          {!editable 
              ? (
                <Popconfirm title="Xác nhận xóa?" onConfirm={() => this.handleDelete(record.key)}>
                  <a href="#a">Xóa</a>
                </Popconfirm>
              ) : null}
        </div>
      )},
    }];
  }

  getCdrmdhd = (state, id) => {
    for(let i = 0;i < state.length;i++) {
      if(state[i].id === id) {
        return state[i];
      }
    }
    return {muc_do_1: "", muc_do_2: "", muc_do_3: ""};
  }

  isExistInArr = (cdr, arr) => {
    for(let i = 0;i < arr.length;i++) {
      if(cdr === arr[i].cdr) {
        return i;
      }
    }
    return -1;
  }
  
  sortLevels = (levels) => {
    for (let i = 0; i < levels.length - 1; i++) {
        for (let j = i + 1; j < levels.length; j++) {
          if (levels[j] < levels[i]) {
            let temp = levels[j];
            levels[j] = levels[i];
            levels[i] = temp;
          }
        }
      }
      return levels;
  }

  isExistInArray = (arr, item) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return true;
        }
    }
    return false;
}

  createGapNotifications = (desArr, matrixData, editMatrixData) => {
    
    desArr = [];
    for(let i = 0;i < editMatrixData.length;i++) {
      let matrixIndex = this.isExistInArr(editMatrixData[i].cdr, matrixData);
      if(matrixIndex !== -1) {
        let text = matrixData[matrixIndex].muc_do;
        let textMatrix = editMatrixData[i].muc_do;
        if (textMatrix !== "") {
          if (text === "-") {
              if (text !== textMatrix) {
                desArr.push({
                  state: "add",
                  cdr: matrixData[matrixIndex].cdr,
                  muc_tieu: matrixData[matrixIndex].muc_tieu,
                  muc_do: textMatrix
                })
              }
          }
          else {
              if (textMatrix === "-") {
                desArr.push({
                  state: "delete",
                  cdr: matrixData[matrixIndex].cdr,
                  muc_tieu: matrixData[matrixIndex].muc_tieu,
                  muc_do: text
                })
              }
              else {
                if(text !== textMatrix) {
                  let textArr = text.split(",");
                  let textMatrixArr = textMatrix.split(",");
                  let muc_do_del_arr = [];
                  let muc_do_add_arr = [];

                  for(let j = 0;j < textArr.length;j++) {
                    if(this.isExistInArray(textMatrixArr, textArr[j]) === false) {
                      muc_do_del_arr.push(textArr[j]);
                    }
                  }
                  if(muc_do_del_arr.length > 0) {
                      muc_do_del_arr = this.sortLevels(muc_do_del_arr);
                      desArr.push({
                        state: "delete",
                        cdr: matrixData[matrixIndex].cdr,
                        muc_tieu: matrixData[matrixIndex].muc_tieu,
                        muc_do: muc_do_del_arr.toString()
                      });
                  }
                  

                  for(let j = 0;j < textMatrixArr.length;j++) {
                    if(this.isExistInArray(textArr, textMatrixArr[j]) === false) {
                      muc_do_add_arr.push(textMatrixArr[j]);
                    }
                  }
                  if(muc_do_add_arr.length > 0) {
                      muc_do_add_arr = this.sortLevels(muc_do_add_arr);
                      desArr.push({
                        state: "add",
                        cdr: matrixData[matrixIndex].cdr,
                        muc_tieu: matrixData[matrixIndex].muc_tieu,
                        muc_do: muc_do_add_arr.toString()
                      })
                }
                }
              }
          }
      }
      }
      else {
        if(editMatrixData[i].muc_do !== "-" && editMatrixData[i].muc_do !== "") {

          desArr.push({
            state: "add-cdr",
            cdr: editMatrixData[i].cdr,
            muc_tieu: "",
            muc_do: editMatrixData[i].muc_do
          })
        }
      }
      
    }
    return desArr;
  }

  loadGap = () => {

    $.collectMtmhHasCdrCdio({data: {thong_tin_chung_id: this.state.id}}).then((res) => {
      $.collectMucdoMtmhHasCdrCdio({data: res.data}).then((response) => {
          let arr = [];
          for(let i = 0;i < response.data.length;i++) {
            let keyrow = response.data[i].cdr.split(".");
            keyrow.splice(keyrow.length - 1, 1);
            let index = this.isExistInArr(keyrow.join("."), arr);
            if(index !== -1) {
              arr[index].muc_do = arr[index].muc_do + "," + response.data[i].muc_do;
              arr[index].muc_do = this.sortLevels(Array.from(new Set(arr[index].muc_do.split(",")))).toString();
              if(arr[index].muc_do.split(",").length > 1 && arr[index].muc_do.split(",")[0] === "-") {
                let muc_do = arr[index].muc_do.split(",");
                muc_do.splice(0, 1);
                arr[index].muc_do = muc_do.toString();
              }
              arr[index].muc_tieu = arr[index].muc_tieu + "," + response.data[i].muc_tieu;
              arr[index].muc_tieu = this.sortLevels(arr[index].muc_tieu.split(",")).toString();
            }
            else {
              let muc_do = this.sortLevels(Array.from(new Set(response.data[i].muc_do.split(",")))).toString();
              let muc_tieu = this.sortLevels(response.data[i].muc_tieu.split(",")).toString();

              arr.push({
                cdr: keyrow.join("."),
                muc_do: muc_do,
                muc_tieu: muc_tieu
              })
            }
          }
          let editMatrixArr = [];
          for(let i = 0;i < this.props.editMatrix.length;i++) {
            if(this.props.editMatrix[i].key.toString() === this.state.id.toString()) {
              for(let j = 0;j < Object.keys(this.props.editMatrix[i]).length;j++) {
                let key = Object.keys(this.props.editMatrix[i])[j];
                if(key !== "key" && key !== "hocky" && key !== "hocphan" && key !== "gvtruongnhom") {
                editMatrixArr.push({
                  cdr: key,
                  muc_do: this.props.editMatrix[i][key]
                })
              }
              }
              break;
            }
          }
          let notiArr = this.createGapNotifications(notiArr, arr, editMatrixArr);
          let notifications = [];
          for(let i = 0;i < notiArr.length;i++) {
            if(notiArr[i].state === "add") {
            notifications.push(<div key={i}>
              <span style={{color: "green"}}>{notiArr[i].cdr}. </span>
              <span style={{color: "green"}}>{`Chọn ${notiArr[i].muc_do}`}</span>
              <span>{` tại ít nhất một trong các mục tiêu: `}</span>
              <span style={{fontWeight: "bold"}}>{notiArr[i].muc_tieu}.</span>
              </div>);
            }
            else if(notiArr[i].state === "delete") {
              notifications.push(<div key={i}>
              <span style={{color: "red"}}>{notiArr[i].cdr}. </span>
              <span style={{color: "red"}}>{`Không chọn ${notiArr[i].muc_do}`}</span>
              <span>{` tại tất cả các mục tiêu: `}</span>
              <span style={{fontWeight: "bold"}}>{notiArr[i].muc_tieu}.</span>
              </div>
              );
            }
            else {
              notifications.push(<div key={i}>
                <span style={{color: "orange"}}>Thêm</span>
                <span> chuẩn đầu ra </span>
                <span style={{color: "orange"}}>{notiArr[i].cdr}</span>
                <span> vào môn học và chọn </span>
                <span style={{color: "green"}}>{notiArr[i].muc_do}.</span>
                </div>);
            }
          }
          this.setState({notifications: notifications});
      })
   })
  }

  loadTable = () => {
    var self = this;
    $.collectData4({ data: {thong_tin_chung_id: self.state.id}})
    .then(function (response) {
    const tableData = {
      previewInfo: []
    };
    for(let i = 0;i < response.data.length;i++) {
      let cdrmdhd = self.getCdrmdhd(self.props.cdrmdhddb, response.data[i].cdrmh_muc_do_hanh_dong_id);
      let data = {
      key: (i + 1).toString(),
      cdr: response.data[i].chuan_dau_ra,
      level_verb: [cdrmdhd.muc_do_1, cdrmdhd.muc_do_2.toString(), cdrmdhd.muc_do_3],
      description: response.data[i].mo_ta,
      levels: response.data[i].muc_do.split(","),
      id: response.data[i].id,
      del_flag: response.data[i].del_flag
      }
      tableData.previewInfo.push(data);
    }
    self.props.onAddCDRData(tableData);
        })
      .catch(function (error) {
          console.log(error);
      });  
  }

  checkIdExist = (matrix, id) => {
    for(let i = 0;i < matrix.length;i++) {
        if(matrix[i].key.toString() === id.toString()) {
            return i;
        }
    }
    return -1;
}

getCdrCdio = (cdr_cdio, id) => {
  for(let i = 0;i < cdr_cdio.length;i++) {
      if(cdr_cdio[i].id.toString() === id.toString())  {
          return cdr_cdio[i].cdr;
      }
  }
  return "";
}

getSubjectName = (subjectList, id) => {
    for(let i = 0;i < subjectList.length;i++) {
        if(subjectList[i].Id.toString() === id.toString()) {
            return subjectList[i].SubjectName;
        }
    }
    return "";
  }

  checkLevel_1_Exist = (level_1, cdrmdhd) => {
    for(let i = 0;i < cdrmdhd.length;i++) {
        if(cdrmdhd[i].value === level_1) {
            return i;
        }
    }
    return -1;
  }

  checkLevel_2_Exist = (level_2, level_1_children) => {
    for(let i = 0;i < level_1_children.length;i++) {
        if(level_1_children[i].value === level_2) {
            return i;
        }
    }
    return -1;
  }

  componentDidMount() {
    // axios.get('/collect-cdrmdhd-4')
    // .then(function (response) {
    //     let cdrmdhd = self.props.cdrmdhd;
    //     for(let i = 0;i < response.data.length;i++) {
    //         let index_1 = self.checkLevel_1_Exist(response.data[i].muc_do_1, cdrmdhd);
    //         if(index_1 != -1) {
    //             let index_2 = self.checkLevel_2_Exist(response.data[i].muc_do_2, cdrmdhd[index_1].children);
    //             if(index_2 != -1) {
    //                 cdrmdhd[index_1].children[index_2].children.push({
    //                     value: response.data[i].muc_do_3,
    //                     label: response.data[i].muc_do_3
    //                   })
    //             }
    //             else {
    //                 cdrmdhd[index_1].children.push({
    //                     value: response.data[i].muc_do_2,
    //                     label: response.data[i].muc_do_2,
    //                     children: [{
    //                         value: response.data[i].muc_do_3,
    //                         label: response.data[i].muc_do_3
    //                     }]
    //                   })
    //             }
    //         }
    //         else {
    //             cdrmdhd.push({
    //                 value: response.data[i].muc_do_1,
    //                 label: response.data[i].muc_do_1,
    //                 children: [{
    //                     value: response.data[i].muc_do_2,
    //                     label: response.data[i].muc_do_2,
    //                     children: [{
    //                         value: response.data[i].muc_do_3,
    //                         label: response.data[i].muc_do_3
    //                     }]
    //                 }]
    //               })
    //         }
    //     }
    //     self.props.updateCdrmdhdDB(response.data);
    //     self.props.updateCdrmdhd(cdrmdhd);
        
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
   
    if(this.state.id !== null && this.state.id !== undefined && this.state.id !== "") {
      if(this.props.isLoadEditMatrix === "false" &&  this.props.subjectList.length > 0) {
        this.props.updateIsLoadEditMatrix("true");
        $.getRealityMatrix();
        $.getStandardMatrix().then((res) => {
            let data = [];
            for(let i = 0;i < res.data.length;i++) {
                let index = this.checkIdExist(data, res.data[i].thong_tin_chung_id);
                if(index !== -1) {
                    let cdr_cdio = this.getCdrCdio(this.props.cdrCdio, res.data[i].chuan_dau_ra_cdio_id);
                    if(cdr_cdio !== "") {
                        data[index][cdr_cdio] = res.data[i].muc_do;
                    }
                }
                else {  
                    let subjectName = this.getSubjectName(this.props.subjectList, res.data[i].thong_tin_chung_id);
                    let cdr_cdio = this.getCdrCdio(this.props.cdrCdio, res.data[i].chuan_dau_ra_cdio_id);
                    if(subjectName !== "" && cdr_cdio !== "") {
                        data.push({
                            key: res.data[i].thong_tin_chung_id,
                            hocky: 1,
                            hocphan: subjectName,
                            gvtruongnhom: 'NULL'
                        })

                        data[data.length - 1][cdr_cdio] = res.data[i].muc_do;
                    }
                    
                }
            }
            this.props.updateEditMatrix(data);
          })
          
    }
      this.loadGap();
    }

    if(this.props.isLoad === "false" && this.state.id !== null && this.state.id !== undefined && this.state.id !== "") {
      this.props.updateIsLoad("true");
      this.loadTable();
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({id: nextProps.subjectId})
    if(this.props.isLoad === "false" && this.state.id !== null && this.state.id !== undefined && this.state.id !== "") {
      this.props.updateIsLoad("true");
      this.loadGap();
      this.loadTable();
    }
}

  // Delete
  onSelectChange = (selectedRowKeys) => {
    this.props.onSelectCDRItem(selectedRowKeys);
  }

  OnDelete = (cdrtable, key) => {
    let deleteData = cdrtable.previewInfo[key - 1]    
    this.props.saveLog("Nguyen Van A", getCurrTime(), `Xóa chuẩn đầu ra môn học: ${deleteData.cdr}, ${deleteData.level_verb}, ${deleteData.description}, ${deleteData.levels}`, this.props.logReducer.contentTab, this.props.subjectId);

    if(key === cdrtable.previewInfo.length){
      //cdrtable.previewInfo.splice(cdrtable.previewInfo.length - 1, 1);
      cdrtable.previewInfo[key - 1].del_flag = 1;
    }
    else {
      let cdrType = cdrtable.previewInfo[key - 1].cdr.split(".")[0];
      let delId = cdrtable.previewInfo[key - 1].id;
      for(let i = key - 1;i < cdrtable.previewInfo.length - 1;i++){
        if(cdrtable.previewInfo[i + 1].cdr.split(".")[0] === cdrType){
          cdrtable.previewInfo[i].level_verb = cdrtable.previewInfo[i + 1].level_verb;
          cdrtable.previewInfo[i].description = cdrtable.previewInfo[i + 1].description;
          cdrtable.previewInfo[i].levels = cdrtable.previewInfo[i + 1].levels;
          cdrtable.previewInfo[i].id = cdrtable.previewInfo[i + 1].id;
          cdrtable.previewInfo[i].del_flag = cdrtable.previewInfo[i + 1].del_flag;
        }
        else {
          cdrtable.previewInfo[i].cdr = cdrtable.previewInfo[i + 1].cdr;
          cdrtable.previewInfo[i].level_verb = cdrtable.previewInfo[i + 1].level_verb;
          cdrtable.previewInfo[i].description = cdrtable.previewInfo[i + 1].description;
          cdrtable.previewInfo[i].levels = cdrtable.previewInfo[i + 1].levels;
          cdrtable.previewInfo[i].id = cdrtable.previewInfo[i + 1].id;
          cdrtable.previewInfo[i].del_flag = cdrtable.previewInfo[i + 1].del_flag;
        }
      }
      //cdrtable.previewInfo.splice(cdrtable.previewInfo.length - 1, 1);
      cdrtable.previewInfo[cdrtable.previewInfo.length - 1].id = delId;
      cdrtable.previewInfo[cdrtable.previewInfo.length - 1].del_flag = 1;
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
        //cdrtable.previewInfo.splice(cdrtable.previewInfo.length - 1, 1);
        cdrtable.previewInfo[cdrtable.previewInfo.length - 1].del_flag = 1;
      }
      else {
        let cdrType = cdrtable.previewInfo[cdrselecteditem[i] - 1].cdr.split(".")[0];
        let delId = cdrtable.previewInfo[cdrselecteditem[i] - 1].id;
        for(let j = cdrselecteditem[i] - 1;j < cdrtable.previewInfo.length - 1;j++){
          if(cdrtable.previewInfo[j + 1].cdr.split(".")[0] === cdrType){
            cdrtable.previewInfo[j].level_verb = cdrtable.previewInfo[j + 1].level_verb;
            cdrtable.previewInfo[j].description = cdrtable.previewInfo[j + 1].description;
            cdrtable.previewInfo[j].levels = cdrtable.previewInfo[j + 1].levels;
            cdrtable.previewInfo[j].id = cdrtable.previewInfo[j + 1].id;
            cdrtable.previewInfo[j].del_flag = cdrtable.previewInfo[j + 1].del_flag;
          }
          else {
            cdrtable.previewInfo[j].cdr = cdrtable.previewInfo[j + 1].cdr;
            cdrtable.previewInfo[j].level_verb = cdrtable.previewInfo[j + 1].level_verb;
            cdrtable.previewInfo[j].description = cdrtable.previewInfo[j + 1].description;
            cdrtable.previewInfo[j].levels = cdrtable.previewInfo[j + 1].levels;
            cdrtable.previewInfo[j].id = cdrtable.previewInfo[j + 1].id;
            cdrtable.previewInfo[j].del_flag = cdrtable.previewInfo[j + 1].del_flag;
          }
        }
        //cdrtable.previewInfo.splice(cdrtable.previewInfo.length - 1, 1);
        cdrtable.previewInfo[cdrtable.previewInfo.length - 1].id = delId;
        cdrtable.previewInfo[cdrtable.previewInfo.length - 1].del_flag = 1;
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
      let dataTemp  = newData.previewInfo[index];
      if (index > -1) {
        const item = newData.previewInfo[index];
        newData.previewInfo.splice(index, 1, {
          ...item,
          ...row,
        });   
      } else {
        newData.previewInfo.push(row);
      }
      this.props.onSaveLog("Nguyen Van A", getCurrTime(), `Chỉnh sửa chuẩn đầu ra môn học: [Chuẩn đầu ra : ${dataTemp.cdr}, Mức độ đạt được : ${dataTemp.level_verb}, Mô tả : ${dataTemp.description}, Mức độ (I/T/U) : ${dataTemp.levels}] -> [Chuẩn đầu ra : ${row.cdr}, Mức độ đạt được : ${row.level_verb}, Mô tả : ${row.description}, Mức độ (I/T/U) : ${row.levels}]`, this.props.logReducer.contentTab, this.props.subjectId)
      this.props.onSaveReducer("Nguyen Van A", getCurrTime(), `Chỉnh sửa chuẩn đầu ra môn học: [Chuẩn đầu ra : ${dataTemp.cdr}, Mức độ đạt được : ${dataTemp.level_verb}, Mô tả : ${dataTemp.description}, Mức độ (I/T/U) : ${dataTemp.levels}] -> [Chuẩn đầu ra : ${row.cdr}, Mức độ đạt được : ${row.level_verb}, Mô tả : ${row.description}, Mức độ (I/T/U) : ${row.levels}]`, this.props.logReducer.contentTab, this.props.subjectId)
      
      for(let i = 0;i < newData.previewInfo[key - 1].levels.length - 1;i++){
        for (let j = i + 1; j < newData.previewInfo[key - 1].levels.length; j++) {
          if (newData.previewInfo[key - 1].levels[j] < newData.previewInfo[key - 1].levels[i]) {
            let temp = newData.previewInfo[key - 1].levels[j];
            newData.previewInfo[key - 1].levels[j] = newData.previewInfo[key - 1].levels[i];
            newData.previewInfo[key - 1].levels[i] = temp;
          }
        }
      
    }
      let newItems = newData.previewInfo[key - 1];
    
      this.props.onAddCDRData(newData);
      this.props.onSelectCDRItem([]);
      this.props.onChangeEditState('');
    });
  }

  edit(key) {
    this.props.onChangeEditState(key);
  }

  moveRow = (dragIndex, hoverIndex) => {

    const data  = this.props.cdrtable;
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

  getMtmhId = (cdr) => {
    for(let i = 0;i < this.props.mtmh.length;i++) {
      if(this.props.mtmh[i].muc_tieu === cdr) {
        return this.props.mtmh[i].id;
      }
    }
    return -1;
  }

  getCdrmdhdId = (muc_do_1, muc_do_2) => {
    for(let i = 0;i < this.props.cdrmdhddb.length;i++) {
      if(this.props.cdrmdhddb[i].muc_do_1 === muc_do_1 && this.props.cdrmdhddb[i].muc_do_2.toString() === muc_do_2.toString()) {
        return this.props.cdrmdhddb[i].id;
      }
    }
    return -1;
  }
  saveAll = () => {
    let data = [];
    if(this.props.cdrtable.previewInfo.length > 0) {
      data = this.props.cdrtable.previewInfo.map((item) => {
      
        return {
          cdr: item.cdr,
          description: item.description,
          levels: item.levels,
          id: item.id,
          del_flag: item.del_flag,
          muc_tieu_mon_hoc_id: this.getMtmhId(item.cdr.split(".")[0]),
          cdrmh_muc_do_hanh_dong_id: this.getCdrmdhdId(item.level_verb[0], item.level_verb[1]),
        }
      });
    }
    
    $.saveData4({ data: {data: data, thong_tin_chung_id: this.props.subjectId}});
    this.loadTable();
    this.loadGap();
    this.props.updateIsLoad("false");
    openNotificationWithIcon('success');
    //axios.post('/save-log', { data: this.props.logData });
    
  }

    render() {
      var components = {};
      this.props.cdreditstate !== '' ?
      components = {
        body: {
          row:  EditableFormRow,
          cell: EditableCell
        },
      } : 
      components = {
        body: {
          row:  DragableBodyRow
        },
      }
      let cdrmdhd_level = [];
      if(this.props.cdrmdhd.length > 0) {
        cdrmdhd_level = this.props.cdrmdhd.map((item, key) => {
          let child_level_1 = [];
          for(let i = 0;i < item.children.length;i++) {
            child_level_1.push({
              value: item.children[i].value.toString(),
              label: item.children[i].label.toString()
            })
          }
          return {
            value: item.value,
            label: item.label,
            children: child_level_1
          }
        });
      }
      
      
      
      
      
      const columns = this.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === 'cdr' ? 'select' : col.dataIndex === 'levels' ? 'choice' : col.dataIndex === 'level_verb' ? 'level_verb' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            cdrmdhd_level,
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
      const hasSelected = this.props.cdrselecteditem.length > 0;
      const selectedRowKeys = this.props.cdrselecteditem;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
      };

        return (
          <div>
            {this.props.isReview === true ? null : this.state.notifications}
            {this.props.isReview === true ? null : <div style={{ marginBottom: 16,  marginTop: 16}}>
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
          <Button style={{float: "right"}}
            onClick={this.saveAll}
          >
            Lưu lại
          </Button>
          </div>}
          
            <Table bordered 
            components={components}
            rowSelection={this.props.isReview === true ? null : rowSelection} 
            columns={this.props.cdreditstate === '' ? this.columns : columns} 
            dataSource={CDRTable.previewInfo.filter(item => item.del_flag === 0)}
            onRow={this.props.isReview === true ? null : 
              this.props.cdreditstate === '' ?
              (record, index) => ({
              index,
              moveRow: this.moveRow,
            }) : null}
            style={{ wordWrap: "break-word", whiteSpace: 'pre-line'}}
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
        cdrverb: state.cdrverb,
        cdrmdhd: state.cdrmdhd,
        cdrmdhddb: state.cdrmdhddb,
        mtmh: state.mtmh,
        subjectId: state.subjectid,
        logReducer: state.logReducer,
        isLoad: state.isloadtab4,
        editMatrix: state.editmatrix,
        isLoadEditMatrix: state.isloadeditmatrix,
        subjectList: state.subjectlist,
        cdrCdio: state.cdrcdio,
        logData: state.logLayout4Reducer.logData
    }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddCDRData: addCDRData,
    onSelectCDRItem: selectedCDRItem,
    onChangeEditState: changeEditState,
    onChangeCDRData: changeCDRData,
    onUpdateVerb: selectedVerb,
    updateIsLoad: isLoad,
    updateIsLoadEditMatrix: isLoadEditMatrix,
    updateEditMatrix: editMatrix,
    updateCdrmdhd: cdrmdhd,
    updateCdrmdhdDB: cdrmdhddb,
    onSaveLog : saveLog,
    onSaveReducer : saveLogObject
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(CDRTableItem));
