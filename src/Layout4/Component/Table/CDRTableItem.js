import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import { connect } from'react-redux';
const columns = [{
  title: 'Chuẩn đầu ra',
  dataIndex: 'cdr',
  key: 'cdr',
  render: text => <p>{text}</p>,
}, {
  title: 'Mô tả (Mức chi tiết - hành động)',
  dataIndex: 'description',
  key: 'description',
}, {
  title: 'Mức độ (I/T/U)',
  key: 'levels',
  dataIndex: 'levels',
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
  render: (text, record) => (
    <span>
      <a href="javascript:;">Edit</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];

class CDRTableItem extends Component {

    render() {
      const CDRTable = this.props.cdrtable;
      for(let i = 0;i < CDRTable.length - 1;i++){
        for(let j = i + 1;j < CDRTable.length;j++){
          if(CDRTable[i].cdr.split("G")[1].split(".")[0] > CDRTable[j].cdr.split("G")[1].split(".")[0]){
            let temp = CDRTable[i];
            CDRTable[i] = CDRTable[j];
            CDRTable[j] = temp;
          }
          else if(CDRTable[i].cdr.split("G")[1].split(".")[0] === CDRTable[j].cdr.split("G")[1].split(".")[0]){
            if(CDRTable[i].cdr.split("G")[1].split(".")[1] > CDRTable[j].cdr.split("G")[1].split(".")[1]){
              let temp = CDRTable[i];
              CDRTable[i] = CDRTable[j];
              CDRTable[j] = temp;
            }
          }
        }
      }
      
        return (
            <Table columns={columns} dataSource={CDRTable} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cdrtable: state.cdrtable,
    }
  }
  
  export default connect(mapStateToProps)(CDRTableItem);
