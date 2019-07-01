import React, { Component } from 'react';
import { Table, Tag, Popover, Button, notification, Empty } from 'antd';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import _ from 'lodash';
import './matrix.css'
import { getDataSurveyMatrix, getNameGV } from './../../Constant/matrix/matrixAction';
import $ from './../../helpers/services'
import { subjectList } from '../../Constant/ActionType';

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Thông báo',
    description: 'Lưu dữ liệu thành công',
  });
};

class SurveyMatrix extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      tempMatrix: [],
      idCtdt : "",
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

  getBlockSubjects = (ctdt) => {
    var self = this;
    $.getBlockSubject(ctdt).then(res => {
      let resData = res.data.data;
      let dataSubject = [];
      let dataCtdt = [];
      if (resData !== undefined && resData !== null) {
          for (let i = 0; i < resData.length; i++) {
              dataCtdt = dataCtdt.concat(resData[i].block);
              for (let j = 0; j < resData[i].block.length; j++) {
                  dataSubject = dataSubject.concat(resData[i].block[j].subjects);
              }
          }
          dataSubject.sort((a, b) => a.IdSubject - b.IdSubject);
          self.props.updateSubjectList(dataSubject);
      }
  })
  }

  async componentDidMount() {
   
    let idCtdt =  await this.getUrlParameter('idCtdt');
    this.getBlockSubjects(idCtdt)
    this.setState({
      idCtdt
    })

    let id = await this.getUrlParameter('id');
    $.getMatrixSurvey({ "data": `${id}`,"idCtdt":`${idCtdt}` }).then((res) => {
      this.props.getDataSurveyMatrix(res.data);
    })


    $.getTeacherName(id).then(res => {
      let listNameGV = [];
      if(res && res.data.length > 0){
        res.data.forEach(item => {
          let obj = {
            id : item.id,
            id_mon : item.id_mon,
            id_giaovien : item.id_giaovien,
            name : item.name,
          }
          listNameGV.push(obj);
        })
      }

      this.props.getNameGV(listNameGV)
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

  getHref = (subject,idSurvey) => {
    return `/ctdt/${this.state.idCtdt}/itusurvey/dosurvey/view/${subject}/itusurvey?id=${idSurvey}`
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
              let name = "" ;
              let href = "" ; 
              if(this.props.listNameGV.length > 0){
                let selected = this.props.listNameGV.filter(element => element.id === parseInt(item[1]))[0];
                if(selected){
                  href = this.getHref(selected.id_mon,selected.id)
                  name = selected.name;
                } 
              }
              
              return (<Link to={href}>{name} - {item[1]} </Link>)
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
              let name = "" ;
              let href = "" ; 
              if(this.props.listNameGV.length > 0){
                let selected = this.props.listNameGV.filter(element => element.id === parseInt(item[1]))[0];
                if(selected){
                  href = this.getHref(selected.id_mon,selected.id)
                  name = selected.name;
                } 
              }
              
              return (<Link to={href}>{name} - {item[1]} </Link>)
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
              let name = "" ;
              let href = "" ; 
              if(this.props.listNameGV.length > 0){
                let selected = this.props.listNameGV.filter(element => element.id === parseInt(item[1]))[0];
                if(selected){
                  href = this.getHref(selected.id_mon,selected.id)
                  name = selected.name;
                } 
              }
              
              return (<Link to={href}>{name} - {item[1]} </Link>)
            })}
          </div>
        );
        tagRender.push(<Popover content={content}>
          <Tag style={{ fontSize: "8pt", fontWeight: "bold", color: "lime" }}>{countU}U</Tag>
        </Popover>)
      }
      if(countI <= 0 && countT <= 0 && countU <= 0){
        tagRender.push(<div>-</div>)
      }
      value = tagRender
    }
    return value;
  }

  createThirdTitleHeader = (group) => {
    let header = [];
    for (const child of group) {
      header.push({
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
    console.log(data)
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
    // console.log(this.props.listNameGV)
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    // this.createHeaderMatrix(myData);
    return (
      <React.Fragment>
      {_.isEmpty(this.props.dataSurveyMatrix) && <Empty/>}
      {!_.isEmpty(this.props.dataSurveyMatrix) && (<div>
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
        {/* <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button btn btn-outline-warning"
          table="table-to-xls"
          filename="survey-matrix-export"
          sheet="tablexls"
          buttonText="Export"
        /> */}
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
      </div>
      )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    editMatrix: state.editmatrix,
    cdrCdio: state.cdrcdio,
    dataSurveyMatrix: state.surveyMatrix.previewInfo,
    listNameGV : state.surveyMatrix.listNameGV,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDataSurveyMatrix: (newData) => dispatch(getDataSurveyMatrix(newData)),
    getNameGV : (newData) => dispatch(getNameGV(newData)),
    updateSubjectList : (newData) => dispatch(subjectList(newData)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SurveyMatrix);