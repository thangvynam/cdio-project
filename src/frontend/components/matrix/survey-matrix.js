import React, { Component } from 'react';
import { Table, Tag, Popover, Button, notification } from 'antd';
import { connect } from 'react-redux';
import { pathToFileURL } from 'url';
import { isUndefined } from 'util';
import { Link } from "react-router-dom";
import _ from 'lodash';
import './matrix.css'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { getDataSurveyMatrix } from './../../Constant/matrix/matrixAction';
import $ from './../../helpers/services'

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Thông báo',
    description: 'Lưu dữ liệu thành công',
  });
};

const href = "/ctdt/ctdt-1/itusurvey/view/2/itusurvey";

class SurveyMatrix extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      tempMatrix: [],
    }
  }

  getUrlParameter = (sParam) => {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
  };

  async componentDidMount() {
    let id = await this.getUrlParameter('id');
    $.getMatrixSurvey({ "data": `${id}` }).then((res) => {
      this.props.getDataSurveyMatrix(res.data);
    })
  }

  //---Create Header---//
  getCDRHeader = (myData) => {
    const arrCDR = [];
    for (const subject of myData) {
      if (!_.isUndefined(subject['itu']) && subject['itu'].length > 0) {
        subject['itu'].map(x => arrCDR.push(x['id']))
      }
    }
    return arrCDR;
  }

  groupCDRWithID = (obj, data) => {
    const result = [];
    for (let i = 0; i < data[0].length; i++) {
      if (data[0][i] === obj) {
        result.push(`${data[0][i]}/${data[1][i]}`)
      }
    }
    return result;
  }

  getDataLink = (data, itu) => {
    let dataLink = [];

    let listITU = data[0].split('*');
    let listIds = data[1].split('*');

    listITU.splice(listITU.length - 1, 1);
    listIds.splice(listIds.length - 1, 1);

    for (let i = 0; i < listITU.length; i++) {
      if (listITU[i] === itu) {
        let obj = [];
        obj.push(listITU[i]);
        obj.push(listIds[i]);
        dataLink.push(obj);
      }
    }
    return dataLink;
  }

  showitu = (text) => {
    //T*T*T*U*U*U/1*2*3*1*2*3
    let value = "-";
    let data = (!_.isEmpty(text) && text !== "-/-") ? text.split('/') : [];
    if (!_.isEmpty(data)) {
      let tagRender = [];
      let countI = data[0].split('I').length - 1;
      let countT = data[0].split('T').length - 1;
      let countU = data[0].split('U').length - 1;

      if (countI > 0) {
        const dataLink = this.getDataLink(data, 'I');

        const content = (
          <div className="popover">
            {dataLink.map(item => {

              return (<Link to={href + `?id=${item[1]}`}>Tên gv - {item[1]} </Link>)
            })}
          </div>
        );

        tagRender.push(
          <Popover content={content}>
            <Tag style={{ fontSize: "8pt", fontWeight: "bold", color: "purple" }}>{countI}I</Tag>
          </Popover>
        )
      }
      if (countT > 0) {
        const dataLink = this.getDataLink(data, 'T');
        const content = (
          <div className="popover">
            {dataLink.map(item => {
              return (<Link to={href + `?id=${item[1]}`}>Tên gv - {item[1]} </Link>)
            })}
          </div>
        );
        tagRender.push(
          <Popover content={content}>
            <Tag style={{ fontSize: "8pt", fontWeight: "bold", color: "gold" }}>{countT}T</Tag>
          </Popover>)
      }
      if (countU > 0) {
        const dataLink = this.getDataLink(data, 'U');

        const content = (
          <div className="popover">
            {dataLink.map(item => {
              return (<Link to={href + `?id=${item[1]}`}>Tên gv - {item[1]} </Link>)
            })}
          </div>
        );
        tagRender.push(<Popover content={content}>
          <Tag style={{ fontSize: "8pt", fontWeight: "bold", color: "lime" }}>{countU}U</Tag>
        </Popover>)
      }
      value = tagRender
    }
    return value;
  }

  createThirdTitleHeader = (group) => {
    let header = [];
    for (const child of group) {
      let titleChild = child.split('.') || [];
      header.push({
        //title: _.toNumber(`${titleChild[0]}${titleChild[1]}${titleChild[2]}`),
        title: child,
        dataIndex: `${child}`,
        key: `${child}`,
        align: "center",
        render: (text) => <div>
          {this.showitu(text)}
        </div>
      })
    }
    return header;
  }

  deduplicate = (arr) => {
    let set = new Set(arr);
    return [...set];
  }

  createSecondTitleHeader = (group) => {
    const groups = this.createGroupCDR(group, 2);
    let header = [];
    _.toArray(groups).map((gr, index) => {
      let smallGroup = this.deduplicate(_.toArray(gr));
      header.push({
        title: `${smallGroup[0].slice(0, 3)}`,
        key: `${smallGroup[0].slice(0, 3)}`,
        dataIndex: `${group[0].slice(0.3)}`,
        children: this.createThirdTitleHeader(smallGroup)
      })
    })
    return header;
  }


  createGroupCDR = (data, index) => {
    let result = _.chain(data)
      .groupBy(x => x[index])
      .value();
    return result;
  }

  createHeaderMatrix = (myData) => {
    let header = [
      {
        title: 'Môn Học', width: 100, dataIndex: 'mon', key: 'mon',
      },
    ];
    let groups = this.createGroupCDR(this.getCDRHeader(myData), 0);
    if (!(_.isEmpty(groups))) {
      _.toArray(groups).map((group) => {
        header.push({
          title: `${group[0][0]}`,
          key: `${group[0][0]}`,
          dataIndex: `${group[0][0]}`,
          children:
            this.createSecondTitleHeader(group)
        })
      });
    }
    console.log(header);
    return header;
  }
  //---Create Header---//

  //---Create Data---//
  createDataMatrix = (myData) => {
    const data = [];
    let index = 0;
    for (const subject of myData) {
      let dataSubject = {
        'mon': subject['mon'],
        // 'giaovien': subject['giaovien'],
        key: `${index++}`, //-${Math.random().toString(36).substring(7)}
      };
      let ituSubject = !_.isEmpty(subject['itu']) ? subject['itu'] : [];
      ituSubject.map((x, index) => {
        dataSubject = { ...dataSubject, [x['id']]: `${x['data']['cdr'] + "/" + x['data']['id']}` }
      })
      data.push(dataSubject);
    }
    //console.log(data)
    return data;
  }

  //---Create Data---//

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys: selectedRowKeys });
  }


  getCdrCdioId = (cdr_cdio, cdr) => {
    for (let i = 0; i < cdr_cdio.length; i++) {
      if (cdr_cdio[i].cdr === cdr) {
        return cdr_cdio[i].id;
      }
    }
    return -1;
  }


  //Export
  addClassExport = () => {
    const table = document.getElementsByTagName('table')[0];
    if (!_.isEmpty(table)) {
      if (table.getAttribute('id') !== "table-to-xls") {
        table.setAttribute('id', "table-to-xls");
        // for (let i = 0; i < table.tHead.getElementsByTagName('th').length; i++) {
        //   table.tHead
        //     .getElementsByTagName('th')[i]
        //     .setAttribute('style', 'background-color: rgb(114, 166, 249); border: 1px solid rgb(242, 244, 247)')
        // }
      }

    }
  }

  render() {
    const { selectedRowKeys } = this.state;
    //console.log(selectedRowKeys)
    //console.log(this.props.dataSurveyMatrix)
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      //hideDefaultSelections: true,
      //onSelection: this.onSelection,
    };

    // this.createHeaderMatrix(myData);
    return (
      !_.isEmpty(this.props.dataSurveyMatrix) && (<div>
        <p></p>
        <Button
          onClick={() => {
            let data = []
            let key = this.state.selectedRowKeys
            key.forEach(element => {
              let obj = this.props.dataSurveyMatrix[element];
              data.push(obj)
            });
            let idCtdt =  this.getUrlParameter('idCtdt');
            if (data.length > 0) {
              $.addSurveyMatrix(data, idCtdt).then(res => {
                if (res.data === 1) {
                  openNotificationWithIcon('success')
                }
              })
            }
          }
          }>
          Lưu
          </Button>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button btn btn-outline-warning"
          table="table-to-xls"
          filename="survey-matrix-export"
          sheet="tablexls"
          buttonText="Export"
        />
        <Table
          bordered
          rowSelection={rowSelection}
          columns={this.createHeaderMatrix(this.props.dataSurveyMatrix)}
          dataSource={this.createDataMatrix(this.props.dataSurveyMatrix)}
          //scroll={{ x: 2000, y: 2000 }}
          style={{ marginTop: '25px' }}
          scroll={{ x: 1500 }}
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 5,
          }}
        //   pagination={{
        //     onChange: page => {
        //         console.log(page);
        //     },
        //     pageSize: 7,
        // }}
        />
      </div>)
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    editMatrix: state.editmatrix,
    cdrCdio: state.cdrcdio,
    dataSurveyMatrix: state.surveyMatrix.previewInfo,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDataSurveyMatrix: (newData) => dispatch(getDataSurveyMatrix(newData)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SurveyMatrix);