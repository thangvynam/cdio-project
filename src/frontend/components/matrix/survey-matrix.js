import React, { Component } from 'react';
import { Table, Tooltip, Tag, Popover } from 'antd';
import { pathToFileURL } from 'url';
import { isUndefined } from 'util';
import {Link} from "react-router-dom";
import _ from 'lodash';
import './matrix.css'

// const columns = [
//   {
//     title: 'Môn Học', width: 100, dataIndex: 'mon', key: 'mon', fixed: 'left',
//   },
//   {
//     title: 'GV trưởng nhóm', width: 100, dataIndex: 'giaovien', key: 'giaovien', fixed: 'left',
//   },
//   {
//     title: '1(Kiến Thức)',
//     key: '1',
//     children: [
//       {
//         title: '1.1',
//         dataIndex: '1.1',
//         key: '1.1',
//         children: [
//           {
//             title: '1.1.1',
//             dataIndex: '1.1.1',
//             key: '1.1.1',
//             render: (text) => <Tag color="fff9f9"
//               style={{ fontSize: "8pt", fontWeight: "bold", color: "black" }}>{text}</Tag>
//           },
//           {
//             title: '1.1.2',
//             dataIndex: '1.1.2',
//             key: '1.1.2',
//             render: (text) => <Tag color="fff9f9"
//               style={{ fontSize: "8pt", fontWeight: "bold", color: "black" }}>{text}</Tag>
//           },
//           {
//             title: '1.1.3',
//             dataIndex: '1.1.3',
//             key: '1.1.3',
//             render: (text) => <Tag color="fff9f9"
//               style={{ fontSize: "8pt", fontWeight: "bold", color: "black" }}>{text}</Tag>
//           }
//         ]

//       },
//       {
//         title: '1.2',
//         dataIndex: '1.2',
//         key: '1.2',
//         children: [
//           {
//             title: '1.2.1',
//             dataIndex: '1.2.1',
//             key: '1.2.1',
//           },
//           {
//             title: '1.2.2',
//             dataIndex: '1.2.2',
//             key: '1.2.2',
//           },
//           {
//             title: '1.2.3',
//             dataIndex: '1.2.3',
//             key: '1.2.3',
//           }
//         ]
//       }
//     ]
//   },
//   {
//     title: '2(Kỹ Năng Mềm)',
//     key: '2',
//     children: [
//       {
//         title: '2.1',
//         dataIndex: '2.1',
//         key: '2.1',
//         children: [
//           {
//             title: '2.1.1',
//             dataIndex: '2.1.1',
//             key: '2.1.1',
//           },
//           {
//             title: '2.1.2',
//             dataIndex: '2.1.2',
//             key: '2.1.2',
//           },
//           {
//             title: '2.1.3',
//             dataIndex: '2.1.3',
//             key: '2.1.3',
//           }
//         ]

//       }
//     ]

//   }
// ];

// const data = [
//   {
//     mon: 'OOP',
//     giaovien: 'John',
//     '1.1.1': "U I",
//     '1.1.2': "U",
//     '1.1.3': "T",
//     '1.2.1': "U I T",
//     '1.2.2': "U T",
//     '1.2.3': "I T",
//     '1.3.1': "T",
//     '1.3.2': "U T",
//     '1.3.3': "I",
//     '2.1.1': "U I",
//     '2.1.2': "U",
//     '2.1.3': "T U",
//     '2.2.1': "U I T",
//     '2.2.2': "U T",
//     '2.2.3': "I",
//     '2.3.1': "T",
//     '2.3.2': "U T",
//     '2.3.3': "I U T",
//   },
//   {
//     mon: 'Design Pattern',
//     giaovien: 'Phu',
//     '1.1.1': "U I",
//     '1.1.2': "U",
//     '1.1.3': "T",
//     '1.2.1': "U I T",
//     '1.2.2': "U T",
//     '1.2.3': "I T",
//     '1.3.1': "T",
//     '1.3.2': "U T",
//     '1.3.3': "I",
//     '2.1.1': "U I",
//     '2.1.2': "U",
//     '2.1.3': "T U",
//     '2.2.1': "U I T",
//     '2.2.2': "U T",
//     '2.2.3': "I",
//     '2.3.1': "T",
//     '2.3.2': "U T",
//     '2.3.3': "I U T",
//   }
// ];

const href = "/ctdt/ctdt-1/itusurvey/ktt-1/2/itusurvey";

const myData = [
  {
    "mon": "OOP",
    "giaovien": "phu",
    "ITU": [
      {
        "id": "1.1.1",
        "data": {
          "cdr": "T*T*T*U*U*U",
          "id": "1*2*3*1*2*3"
        }
      },
      {
        "id": "1.1.2",
        "data": {
          "cdr": "T*T*T*U*U*U",
          "id": "1*2*3*1*2*3"
        }
      },
      {
        "id": "1.1.3",
        "data": {
          "cdr": "T*T*U*U*I",
          "id": "1*2*1*2*3"
        }
      },
      {
        "id": "1.2.1",
        "data": {
          "cdr": "-",
          "id": "-"
        }
      },
      {
        "id": "1.2.2",
        "data": {
          "cdr": "I*T",
          "id": "1*1"
        }
      },
      {
        "id": "1.2.3",
        "data": {
          "cdr": "-",
          "id": "-"
        }
      }
    ]
  },
  {
    "mon": "Design Patern",
    "giaovien": "John",
    "ITU": [
      {
        "id": "2.1.1",
        "data": {
          "cdr": "T*U",
          "id": "1*3"
        }
      },
      {
        "id": "2.1.2",
        "data": {
          "cdr": "T*T*T*U",
          "id": "1*2*3*3"
        }
      },
      {
        "id": "2.1.3",
        "data": {
          "cdr": "T*T*U*U*I",
          "id": "1*2*1*2*3"
        }
      }
    ]
  }
]


class SurveyMatrix extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: []
    }
  }

  //---Create Header---//
  getCDRHeader = (myData) => {
    const arrCDR = [];
    for (const subject of myData) {
      if (!_.isUndefined(subject['ITU'])) {
        subject['ITU'].map(x => arrCDR.push(x['id']))
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

  getDataLink = (data,ITU) => {
    let dataLink = [];
    for (let i = 0; i < data[0].length; i++) {
      if (data[0][i] === ITU) {
        let obj = [];
        obj.push(data[0][i]);
        obj.push(data[1][i]);
        dataLink.push(obj);
      }
    }
    return dataLink;
  }

  showITU = (text) => {
    //T*T*T*U*U*U/1*2*3*1*2*3
    let value = "-";
    let data = (!_.isEmpty(text) && text !== "-/-") ? text.split('/') : [];
    if (!_.isEmpty(data)) {
      // console.log("data I : " + data[0].split('I').length)
      // console.log("length I : " + data[0].split('I').length-1);
      let tagRender = [];
      let countI = data[0].split('I').length - 1;
      let countT = data[0].split('T').length - 1;
      let countU = data[0].split('U').length - 1;

      if (countI > 0) {
        const dataLink = this.getDataLink(data,'I');
        const content = (
          <div className="popover">
            {dataLink.map((item,index) => {
              
              return (<Link to={href+`?id=${item[1]}`}>Tên gv - {item[1]} </Link>)
            })}
          </div>
        );
        // const a = this.groupCDRWithID("I", data);
        tagRender.push(
          <Popover content={content}>
            <Tag style={{ fontSize: "8pt", fontWeight: "bold", color: "purple" }}>{countI}I</Tag>
          </Popover>
        )
      }
      if (countT > 0) {
        const dataLink = this.getDataLink(data,'T');
        console.log(dataLink)

        const content = (
          <div className="popover">
           {dataLink.map((item,index) => {
             console.log(item);
              return (<Link to={href+`?id=${item[1]}`}>Tên gv - {item[1]} </Link>)
            })}
          </div>
        );
        tagRender.push(
          <Popover content={content}>
            <Tag style={{ fontSize: "8pt", fontWeight: "bold", color: "gold" }}>{countT}T</Tag>
          </Popover>)
      }
      if (countU > 0) {
        const dataLink = this.getDataLink(data,'U');

        const content = (
          <div className="popover">
           {dataLink.map((item,index) => {
              return (<Link to={href+`?id=${item[1]}`}>Tên gv - {item[1]} </Link>)
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
      header.push({
        title: `${child}`,
        dataIndex: `${child}`,
        key: `${child}`,
        align: "center",
        render: (text) => <div>
          {this.showITU(text)}
        </div>
      })
    }
    return header;
  }

  createSecondTitleHeader = (group) => {
    const groups = this.createGroupCDR(group, 2);
    let header = [];
    _.toArray(groups).map((smallGroup, index) => {
      header.push({
        title: `${smallGroup[index].slice(0, 3)}`,
        key: `${smallGroup[index].slice(0, 3)}`,
        dataIndex: `${group[index].slice(0.3)}`,
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
        title: 'Môn Học', width: 100, dataIndex: 'mon', key: 'mon', fixed: 'left',
      },
      {
        title: 'GV trưởng nhóm', width: 100, dataIndex: 'giaovien', key: 'giaovien', fixed: 'left',
      },
    ];
    let groups = this.createGroupCDR(this.getCDRHeader(myData), 0);
    if (!(_.isEmpty(groups))) {
      _.toArray(groups).map((group, index) => {
        header.push({
          title: `${group[index][0]}`,
          key: `${group[index][0]}`,
          dataIndex: `${group[index][0]}`,
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
    for (const subject of myData) {
      let dataSubject = {
        'mon': subject['mon'],
        'giaovien': subject['giaovien'],
      };
      subject['ITU'].map((x, index) => {
        dataSubject = { ...dataSubject, [x['id']]: `${x['data']['cdr'] + "/" + x['data']['id']}` }
      })
      data.push(dataSubject);
    }
    return data;
  }

  //---Create Data---//

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }


  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      onSelection: this.onSelection,
    };
    // this.createHeaderMatrix(myData);
    return (
      <Table
        bordered
        rowSelection={rowSelection}
        columns={this.createHeaderMatrix(myData)}
        dataSource={this.createDataMatrix(myData)}
        scroll={{ x: 1500 }}
        style={{ marginTop: '25px' }}
      />
    )
  }
}
export default SurveyMatrix;