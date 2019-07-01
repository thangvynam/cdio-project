import React, { Component } from "react";
import _ from "lodash";
import { Icon, Table, Tag, Button, notification } from "antd";
import { connect } from "react-redux";
import { getDataMatrix } from "./../../Constant/matrix/matrixAction";
import "./matrix.css";
import {
  editMatrix,
  isLoadEditMatrix,
  cdrCdio
} from "../../Constant/ActionType";
import $ from "./../../helpers/services";
import PreviewMatrix from "./preview-matrix";
import LoadingPage from "./loading";

class Matrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      isSuccess: false,
      isShow: false,
      isSubmit: false,
      matrix: []
    };
    this.myRef = React.createRef();
  }

  checkIdExist = (matrix, id) => {
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i].key.toString() === id.toString()) {
        return i;
      }
    }
    return -1;
  };

  getCdrCdio = (cdr_cdio, id) => {
    for (let i = 0; i < cdr_cdio.length; i++) {
      if (cdr_cdio[i].id.toString() === id.toString()) {
        return cdr_cdio[i].cdr;
      }
    }
    return "";
  };

  getSubjectName = (subjectList, id) => {
    for (let i = 0; i < subjectList.length; i++) {
      if (subjectList[i].Id.toString() === id.toString()) {
        return subjectList[i].SubjectName;
      }
    }
    return "";
  };

  checkInTeacherSubject = (teacherSubject, idSubject) => {
    for (let i = 0; i < teacherSubject.length; i++) {
      if (teacherSubject[i].IdSubject === idSubject) {
        return true;
      }
    }
    return false;
  };

  checkInTeacherReviewSubject = (teacherReviewSubject, idSubject) => {
    for (let i = 0; i < teacherReviewSubject.length; i++) {
      if (teacherReviewSubject[i].idTTC === idSubject) {
        return true;
      }
    }
    return false;
  };

  getEditMatrix = data1 => {
    var self = this;
    $.getCDR_CDIO(this.props.ctdt).then((res) => {

      self.props.updateCdrCdio(res.data);
      $.getStandardMatrix(data1).then(res => {
        let data = [];
        for (let i = 0; i < res.data.length; i++) {
          let index = self.checkIdExist(data, res.data[i].thong_tin_chung_id);
          if (index !== -1) {
            let cdr_cdio = self.getCdrCdio(
              self.props.cdrCdio,
              res.data[i].chuan_dau_ra_cdio_id
            );
            if (cdr_cdio !== "") {
              data[index][cdr_cdio] = res.data[i].muc_do;
            }

          } else {
            let subjectName = self.getSubjectName(
              self.props.allSubjectList,
              res.data[i].thong_tin_chung_id
            );
            let cdr_cdio = self.getCdrCdio(
              self.props.cdrCdio,
              res.data[i].chuan_dau_ra_cdio_id
            );

            if (subjectName !== "" && cdr_cdio !== "") {
              data.push({
                key: res.data[i].thong_tin_chung_id,
                hocky: 1,
                hocphan: subjectName,
                gvtruongnhom: "NULL"
              });

              data[data.length - 1][cdr_cdio] = res.data[i].muc_do;
            }
          }
        }

        self.props.updateEditMatrix(data);

        var a = $.getRealityMatrix(data1);
        a.then(res => self.setState({ matrix: res.data }));
        var b = $.getCDR_CDIO(data1.idCtdt);
        Promise.all([a, b])
          .then(res => {
            self.props.getDataMatrix(res);
            self.createData(res);
            self.setState({
              isLoading: false
            });
          })
          .catch(err => {
            console.log(err);
          });
      });

    })


  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoadEditMatrix === "false" &&
      nextProps.allSubjectList.length > 0
    ) {
      console.log("receive");
      this.setState({ isLoading: true });
      this.props.updateIsLoadEditMatrix("true");

      let subjectListId = [];
      nextProps.allSubjectList.map(item => {
        subjectListId.push(item.IdSubject);
      });
      let data1 = {
        data: subjectListId,
        idCtdt: this.props.ctdt
      };

      if (data1.data.length > 0) {
        this.getEditMatrix(data1);
      }
    }
  }

  componentDidMount() {
    if (this.props.allSubjectList.length > 0) {
      this.setState({ isLoading: true });

      let subjectListId = [];
      this.props.allSubjectList.map(item => {
        subjectListId.push(item.IdSubject);
      });
      let data1 = {
        data: subjectListId,
        idCtdt: this.props.ctdt
      };

      if (data1.data.length > 0) {
        this.getEditMatrix(data1);
      }
    }
  }

  componentDidUpdate() {
    this.addClassExport();
  }

  createGroupCDR = (data, index) => {
    let result = _.chain(data)
      .groupBy(x => x.cdr[index])
      .value();
    return result;
  };

  getMatrixField = (key, dataIndex, matrix) => {
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i].key === key) {
        return matrix[i][dataIndex];
      }
    }
    return "";
  };
  checkGAPandReturnResult = (text, textMatrix) => {
    if (textMatrix !== "" && textMatrix !== undefined && textMatrix !== null) {
      if (text === "-") {
        if (text !== textMatrix) {
          let textArr = textMatrix.split(",");
          let textRender = [];
          for (let i = 0; i < textArr.length; i++) {
            textRender.push(
              <Tag
                key={i}
                color="green"
                style={{ fontSize: "8pt", fontWeight: "bold" }}
              >
                {textArr[i]}
              </Tag>
            );
            // if (i !== textArr.length - 1) {
            //     textRender.push(<span key={i + ','}>,</span>);
            // }
          }
          return textRender;
        }
        return (
          <Tag
            color="fff9f9"
            style={{ fontSize: "8pt", fontWeight: "bold", color: "black" }}
          >
            -
          </Tag>
        );
      } else {
        if (textMatrix === "-") {
          let textArr = text.split(",");
          let textRender = [];
          for (let i = 0; i < textArr.length; i++) {
            textRender.push(
              <Tag
                key={i}
                color="red"
                style={{ fontSize: "8pt", fontWeight: "bold" }}
              >
                {textArr[i]}
              </Tag>
            );
            // if (i !== textArr.length - 1) {
            //     textRender.push(<span key={i + ','}>,</span>);
            // }
          }
          return textRender;
        } else {
          let textArr = text.split(",");
          let textMatrixArr = textMatrix.split(",");
          let textRender = [];
          let textRenderStateArr = [];
          for (let i = 0; i < textArr.length; i++) {
            if (this.isExistInArray(textMatrixArr, textArr[i])) {
              textRenderStateArr.push({
                text: textArr[i],
                state: ""
              });
            } else {
              textRenderStateArr.push({
                text: textArr[i],
                state: "remove"
              });
            }
          }

          for (let i = 0; i < textMatrixArr.length; i++) {
            if (!this.isExistInArray(textArr, textMatrixArr[i])) {
              textRenderStateArr.push({
                text: textMatrixArr[i],
                state: "add"
              });
            }
          }

          textRenderStateArr
            .sort((a, b) => a.text > b.text)
            .map((item, i) => {
              if (item.state === "add") {
                textRender.push(
                  <Tag
                    key={i}
                    color="green"
                    style={{ fontSize: "8pt", fontWeight: "bold" }}
                  >
                    {item.text}
                  </Tag>
                );
              } else if (item.state === "remove") {
                textRender.push(
                  <Tag
                    key={i}
                    color="red"
                    style={{ fontSize: "8pt", fontWeight: "bold" }}
                  >
                    {item.text}
                  </Tag>
                );
              } else {
                textRender.push(
                  <Tag
                    key={i}
                    color="#fff9f9"
                    style={{
                      fontSize: "8pt",
                      fontWeight: "bold",
                      color: "black"
                    }}
                  >
                    {item.text}
                  </Tag>
                );
              }
              // if (i !== textRenderStateArr.length - 1) {
              //     textRender.push(<span key={i + ','}>,</span>);
              // }
            });
          return textRender;
        }
      }
    } else {
      if (text !== "" && text !== undefined && text !== null) {
        return (
          <Tag
            color="fff9f9"
            style={{ fontSize: "8pt", fontWeight: "bold", color: "black" }}
          >{`${text}`}</Tag>
        );
      }
    }
    return <div />;
  };

  isExistInArray = (arr, item) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === item) {
        return true;
      }
    }
    return false;
  };

  createColumnGroupSecond = group => {
    let dt = [];
    let smallGroup = _.toArray(this.createGroupCDR(group, 2));
    for (let i = 0; i < smallGroup[0].length; i++) {
      dt.push({
        title: `${smallGroup[0][i].cdr}`,
        dataIndex: `${smallGroup[0][i].cdr}`,
        key: `${smallGroup[0][i].cdr}`,
        align: "center",
        render: (text, record) => (
          <div>
            {this.checkGAPandReturnResult(
              text,
              this.getMatrixField(
                record.key,
                smallGroup[0][i].cdr,
                this.props.editMatrix
              )
            )}
          </div>
        )
      });
    }

    return dt;
  };

  createColumnGroupFirst = group => {
    //Group: 1.1 or 1.2 or 1.3
    let dt = [];
    let smallGroup = _.toArray(this.createGroupCDR(group, 2));
    _.toArray(smallGroup).forEach(group => {
      dt.push({
        title: `${group[0].cdr.slice(0, 3)}`,
        key: `${group[0].cdr.slice(0, 3)}`,
        dataIndex: `${group[0].cdr.slice(0.3)}`,
        children: this.createColumnGroupSecond(group)
      });
    });
    return dt;
  };

  createColumn = dataMatrix => {
    let result = [
      {
        title: "HK",
        width: 100,
        dataIndex: "hocky",
        key: "hocky"
      },
      {
        title: "Học phần",
        width: 100,
        dataIndex: "hocphan",
        key: "hocphan"
      },
      {
        title: "GV trưởng nhóm",
        width: 100,
        dataIndex: "gvtruongnhom",
        key: "gvtruongnhom"
      }
    ];

    let groups = this.createGroupCDR(dataMatrix[1].data, 0);
    _.toArray(groups).forEach(group => {
      result.push({
        title: `${group[0].cdr[0]}`,
        key: `${group[0].cdr[0]}`,
        dataIndex: `${group[0].cdr[0]}`,
        children: this.createColumnGroupFirst(group)
      });
    });
    return result;
  };

  createData = dataMatrix => {
    var data1 = [];
    for (let i = 0; i < dataMatrix[0].data.length; i++) {
      var a = {
        key: dataMatrix[0].data[i].idSubject,
        hocky: "chua co",
        hocphan: dataMatrix[0].data[i].subject,
        gvtruongnhom: "chua co"
      };
      for (let j = 0; j < dataMatrix[1].data.length; j++) {
        a = {
          ...a,
          [dataMatrix[1].data[j].cdr]: `${dataMatrix[0].data[i].itu[j]}`
        };
      }
      data1.push(a);
    }
    return data1;
  };

  addClassExport = () => {
    const table = document.getElementsByTagName("table")[0];
    if (!_.isEmpty(table)) {
      if (table.getAttribute("id") !== "table-to-xls") {
        table.setAttribute("id", "table-to-xls");
        for (
          let i = 0;
          i < table.tHead.getElementsByTagName("th").length;
          i++
        ) {
          table.tHead
            .getElementsByTagName("th")[i].setAttribute(
            "style",
            "background-color: rgb(114, 166, 249); border: 1px solid rgb(242, 244, 247)"
          );
        }
      }
    }
  };

  cloneEditMatrix = () => {
    $.insertStandardMatrix({
      data: this.state.matrix,
      idCtdt: this.props.ctdt
    }).then(response => {
      if (response.data === 1) {
        notification["success"]({
          message: "Cập nhật thành công",
          duration: 1
        });
        this.setState({ isSubmit: true });
        let subjectListId = [];
        this.props.allSubjectList.map(item => {
          subjectListId.push(item.IdSubject);
        });
        let data1 = {
          data: subjectListId,
          idCtdt: this.props.ctdt
        };
        if (data1.data.length > 0) {
          console.log("get roi ma")
          this.getEditMatrix(data1);
        }
      } else {
        notification["error"]({
          message: "Cập nhật thất bại",
          duration: 1
        });
      }
    });
  };

  render() {
    const { isLoading } = this.state;
    const style = {
      marginLeft: "20px"
    };

    return (
      this.props.isLoadEditMatrix === "true" &&
      this.props.allSubjectList.length > 0 && (
        <React.Fragment>
          {isLoading && <LoadingPage />}
          {!isLoading && !_.isEmpty(this.props.dataMatrix) && (
            <div className="exportMatrix" style={{ margin: "20px" }}>
              <div style={{ marginBottom: "10px" }}>
                <span className="adding-text">
                  <Icon type="plus-square" />: Thêm
                </span>

                <span style={{ marginLeft: "30px" }} className="removing-text">
                  <Icon type="close-square" />: Xóa
                </span>

                <span style={{ marginLeft: "30px" }} className="no-action-text">
                  <Icon type="minus-square" />: Không đổi
                </span>
              </div>
              <PreviewMatrix
                column={this.createColumn(this.props.dataMatrix)}
                data={this.createData(this.props.dataMatrix)}
              />
              {this.props.editMatrix.length <= 0 && !this.state.isSubmit ? (
                <Button
                  type="primary"
                  className="send-teacher-btn"
                  style={style}
                  onClick={this.cloneEditMatrix}
                >
                  Gửi chủ nhiệm
                </Button>
              ) : null}
              <Table
                bordered
                columns={this.createColumn(this.props.dataMatrix)}
                dataSource={this.createData(this.props.dataMatrix)}
                scroll={{ x: 1500 }}
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 5
                }}
              />
            </div>
          )}
        </React.Fragment>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    dataMatrix: state.matrix.previewInfo,
    editMatrix: state.editmatrix,
    subjectList: state.subjectlist,
    isLoadEditMatrix: state.isloadeditmatrix,
    cdrCdio: state.cdrcdio,
    teacherSubject: state.datactdt.teacherSubject,
    teacherReviewSubject: state.datactdt.teacherReviewSubject,
    allSubjectList: state.datactdt.allSubjectList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataMatrix: newData => dispatch(getDataMatrix(newData)),
    updateEditMatrix: newData => dispatch(editMatrix(newData)),
    updateIsLoadEditMatrix: newData => dispatch(isLoadEditMatrix(newData)),
    updateCdrCdio: newData => dispatch(cdrCdio(newData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matrix);
