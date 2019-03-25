import React, { Component } from 'react'
import { Table, Form, Input, Checkbox, Icon, Tooltip, Button } from 'antd';
import "./matrix.css";
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';
import { editMatrix, editMatrixEditState } from '../../Constant/ActionType';
import axios from 'axios';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

const levelsOptions = ["I", "T", "U"];
class EditableCell extends React.Component {


  save = (e) => {
    // const { record, handleSave } = this.props;
    // this.form.validateFields((error, values) => {
    //   if (error && error[e.currentTarget.id]) {
    //     return;
    //   }
    //   this.toggleEdit();
    //   handleSave({ ...record, ...values });
    // });
  }

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      editing,
      save,
      cancel,
      change,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                 editing === record.key + "-" + dataIndex ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: false,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex].split(" "),
                    })(
                        
                        <Checkbox.Group 
                        onChange={change}
                        >
                        <div style={{width: "135px", fontSize: "10pt"}}>
                       <Checkbox value="I">I</Checkbox>
                       <Checkbox value="T">T</Checkbox>
                       <Checkbox value="U">U</Checkbox>
                       <div style={{paddingTop: "10px"}}>
                       <Tooltip placement="bottomRight" title="Save"><Icon onClick={save} type="check" /></Tooltip>
                       <Tooltip placement="bottomLeft" title="Cancel"><Icon onClick={cancel} type="close" /></Tooltip>
                       </div>
                       </div>
                        </Checkbox.Group>
                        
                        
                        
                    )}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class EditMatrix extends Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'HK', width: 100, dataIndex: 'hocky', key: 'hocky', 
            },
            {
                title: 'Học phần', width: 100, dataIndex: 'hocphan', key: 'hocphan', 
            },
            {
                title: 'GV trưởng nhóm', width: 100, dataIndex: 'gvtruongnhom', key: 'gvtruongnhom',
            }
        ];
        this.state = {
            levels: [],
            cdr_cdio: [],
            isLoad: false,
            subjectList: [],
            tempMatrix: []
        }
        
      }

      checkIdExist = (matrix, id) => {
          for(let i = 0;i < matrix.length;i++) {
              if(matrix[i].key === id) {
                  return i;
              }
          }
          return -1;
      }

      getCdrCdio = (cdr_cdio, id) => {
        for(let i = 0;i < cdr_cdio.length;i++) {
            if(cdr_cdio[i].id === id)  {
                return cdr_cdio[i].cdr;
            }
        }
        return "";
      }

      getSubjectName = (subjectList, id) => {
        for(let i = 0;i < subjectList.length;i++) {
            if(subjectList[i].id === id) {
                return subjectList[i].ten_mon_hoc_tv;
            }
        }
        return "";
      }
      componentWillReceiveProps(nextProps) {
        this.setState({subjectList: nextProps.subjectList})
        if(this.state.isLoad === false && nextProps.subjectList.length > 0) {
            axios.get("/get-standard-matrix").then((res) => {
                this.setState({tempMatrix: res.data});
                let data = [];
                for(let i = 0;i < res.data.length;i++) {
                    let index = this.checkIdExist(data, res.data[i].thong_tin_chung_id);
                    if(index !== -1) {
                        let cdr_cdio = this.getCdrCdio(this.state.cdr_cdio, res.data[i].chuan_dau_ra_cdio_id);
                        if(cdr_cdio !== "") {
                            data[index][cdr_cdio] = res.data[i].muc_do.split(",").join(" ");
                        }
                    }
                    else {
                        let subjectName = this.getSubjectName(nextProps.subjectList, res.data[i].thong_tin_chung_id);
                        let cdr_cdio = this.getCdrCdio(this.state.cdr_cdio, res.data[i].chuan_dau_ra_cdio_id);
                        if(subjectName !== "" && cdr_cdio !== "") {
                            data.push({
                                key: res.data[i].thong_tin_chung_id,
                                hocky: 1,
                                hocphan: subjectName,
                                gvtruongnhom: 'NULL'
                            })

                            data[data.length - 1][cdr_cdio] = res.data[i].muc_do.split(",").join(" ");
                        }
                        
                    }
                }
                this.props.updateEditMatrix(data);
              })
              this.setState({isLoad: true})
        }
      }
      
      componentDidMount() {
          axios.get("/get-cdr-cdio").then((res) => {
            this.setState({cdr_cdio: res.data})
          }  
          )
      }

      getIndex = (matrix, key) => {
          for(let i= 0;i < matrix.length;i++) {
              if(matrix[i].key === key) {
                  return i;
              }
          }
          return -1;
      }
    handleSave = (record, dataIndex) => {
        const matrix = this.props.editMatrix;
        let index = this.getIndex(matrix, record.key);
        if(this.state.levels.length > 0) {
            if(index !== -1) {
                matrix[index][dataIndex] = this.state.levels.join(' ');
            }
        }
        else {
            if(index !== -1) {
                matrix[index][dataIndex] = "-";
            }
        }
        
        this.props.updateEditMatrix(matrix);
        this.props.updateEditMatrixEditState("");
      }

      handleCancel = (row) => {
        this.setState({levels: []})
        this.props.updateEditMatrixEditState("");
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
      }

      handleChange = (levels) => {
        if(levels.length > 0) {
            this.sortLevels(levels);
            if(levels[0] === "-") {
                levels.splice(0, 1);
            }
            this.setState({levels: levels})
        }
        else {
            this.setState({levels: ["-"]})
        }
        
      }

      isExistInArray = (arr, item) => {
          for(let i = 0;i < arr.length;i++) {
              if(arr[i] === item) {
                  return true;
              }
          }
          return false;
      }

      onClickEdit = (record, key) => {
        let levels = record[key].split(" ");
        this.sortLevels(levels);
        this.setState({levels: levels});
        this.props.updateEditMatrixEditState(record.key + "-" + key)
      }
      
      getMatrixId = (matrix, thong_tin_chung_id, cdr_cdrio_id) => {
        for(let i = 0;i < matrix.length;i++) {
            if(matrix[i].thong_tin_chung_id === thong_tin_chung_id && matrix[i].chuan_dau_ra_cdio_id === cdr_cdrio_id) {
                return matrix[i].id;
            }
        }
        return -1;
      }

      getCdrCdioId = (cdr_cdio, cdr) => {
        for(let i = 0;i < cdr_cdio.length;i++) {
            if(cdr_cdio[i].cdr === cdr)  {
                return cdr_cdio[i].id;
            }
        }
        return -1;
      }
      saveAll = () => {
          let data = [];
          for(let i = 0;i < this.props.editMatrix.length;i++) {
            Object.keys(this.props.editMatrix[i]).map((key, id) => {
                if(Object.keys(this.props.editMatrix[i])[id] !== "key" && Object.keys(this.props.editMatrix[i])[id] !== "hocky"
            && Object.keys(this.props.editMatrix[i])[id] !== "hocphan" && Object.keys(this.props.editMatrix[i])[id] !== "gvtruongnhom") {
                let cdr_cdio_id = this.getCdrCdioId(this.state.cdr_cdio, Object.keys(this.props.editMatrix[i])[id]);
                let matrixId = this.getMatrixId(this.state.tempMatrix, this.props.editMatrix[i].key, cdr_cdio_id);
                data.push({id: matrixId, muc_do: this.props.editMatrix[i][Object.keys(this.props.editMatrix[i])[id]].split(" ").toString()});
            }
                
            })
          }
          //console.log(data);
          axios.post('/update-standard-matrix', data).then(alert("ok"));
        
      }
    render() {
        let firstColumnMapped = [];
        if(this.state.cdr_cdio.length > 0) {
            const firstColumn = [];
            const secondColumn = [];
            const thirdColumn = [];
            for(let i = 0;i < this.state.cdr_cdio.length;i++) {
                if(!this.isExistInArray(firstColumn, this.state.cdr_cdio[i].cdr.split(".")[0])) {
                    firstColumn.push(this.state.cdr_cdio[i].cdr.split(".")[0]);
                }

                if(!this.isExistInArray(secondColumn, this.state.cdr_cdio[i].cdr.split(".")[0] + "." +
                 this.state.cdr_cdio[i].cdr.split(".")[1])) {
                    secondColumn.push(this.state.cdr_cdio[i].cdr.split(".")[0] + "." +
                    this.state.cdr_cdio[i].cdr.split(".")[1]);
                }

                if(!this.isExistInArray(thirdColumn, this.state.cdr_cdio[i].cdr)) {
                    thirdColumn.push(this.state.cdr_cdio[i].cdr);
                }
            }
            this.sortLevels(firstColumn);
            this.sortLevels(secondColumn);
            this.sortLevels(thirdColumn);

            const thirdColumnMapped = thirdColumn.map((key) => {
                return {
                    title: key,
                    dataIndex: key,
                    key: key,
                    width: 90,
                    align: "center",
                    editable: true,
                    render: (text, record) => <div>
                        <p>{text}</p>
                        <Tooltip placement="bottom" title="Edit"><Icon onClick={() => this.onClickEdit(record, key)} type="edit" style={{cursor: "pointer"}}/></Tooltip>
                        </div>,
                }
            });

            const secondColumnMapped = secondColumn.map((key) => {
                let children = [];
                for(let i = 0;i < thirdColumnMapped.length;i++) {
                    if(thirdColumnMapped[i].title.split(".")[0] + "." +
                     thirdColumnMapped[i].title.split(".")[1] === key)
                    children.push(thirdColumnMapped[i]);
                }
                return {
                    title: key,
                    dataIndex: key,
                    key: key,
                    children: children
                }
            })

            firstColumnMapped = firstColumn.map((key) => {
                let children = [];
                for(let i = 0;i < secondColumnMapped.length;i++) {
                    if(secondColumnMapped[i].title.split(".")[0] === key)
                    children.push(secondColumnMapped[i]);
                }
                return {
                    title: key,
                    key: key,
                    children: children
                }
            })
        }

        const dataSource  = this.props.editMatrix;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.concat(firstColumnMapped).map((col) => {
        if(col.children !== null && col.children !== undefined) {
            for(let i = 0;i < col.children.length;i++) {
                col.children[i].children = col.children[i].children.map((colchild) => {
                    if (!colchild.editable) {
                        return colchild;
                      }
                      return {
                        ...colchild,
                        onCell: record => ({
                          record,
                          editable: colchild.editable,
                          dataIndex: colchild.dataIndex,
                          key: colchild.key,
                          title: colchild.title,
                          save: () => this.handleSave(record, colchild.dataIndex),
                          cancel: this.handleCancel,
                          change: this.handleChange,
                          editing: this.props.editMatrixEditState,
                        }),
                      };
                })
            }
        }
        return col;
        
        });

        return (
            <React.Fragment>
                <Table  bordered
                    components={components}
                    rowClassName={() => 'editable-row'}
                    dataSource={dataSource}
                    columns={columns}
                    scroll={{x: 1500}}
                    size="small"
                    />
                    <Button onClick={this.saveAll}>Lưu lại</Button>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        editMatrix: state.editmatrix,
        editMatrixEditState: state.editmatrixeditstate,
        subjectList: state.subjectlist
    }
}
const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    updateEditMatrix: editMatrix,
    updateEditMatrixEditState: editMatrixEditState,
  }, dispatch);

}
export default connect(mapStateToProps, mapDispatchToProps)(EditMatrix);