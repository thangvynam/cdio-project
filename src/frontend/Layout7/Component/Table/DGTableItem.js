import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import { connect } from 'react-redux';

const chude =['BTVN','BTTL','DAMH','LTCK'];
const columns = [{
  title: 'Mã',
  dataIndex: 'mathanhphan',
  key: 'mathanhphan',
}, {
  title: 'Tên',
  dataIndex: 'tenthanhphan',
  key: 'tenthanhphan',
}, {
  title: 'Mô tả(gợi ý)',
  dataIndex: 'mota',
  key: 'mota',
},
{
  title: 'Các chuẩn đầu ra được đánh giá',
  dataIndex: 'standardOutput',
  key: 'standardOutput',
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
}];

class DGTableItem extends Component {

  render() {
    function isExist(value){
      for(let i=0;i<chude.length;i++){
        if(value === chude[i])
        return true;
      }
      return false;
    }
    function sortValues (checkedValues) {
      for(let i=0 ;i<checkedValues.length;i++){
        if(!isExist(checkedValues[i].mathanhphan) && checkedValues[i].mathanhphan[0] === '\xa0'){
          
          checkedValues[i].mathanhphan = checkedValues[i].mathanhphan.slice(3,checkedValues[i].mathanhphan.length); 
        }
      }
      for (let i = 0; i < checkedValues.length - 1; i++) {
          for (let j = i + 1; j < checkedValues.length; j++) {
            if (checkedValues[j].mathanhphan < checkedValues[i].mathanhphan) {
              let temp = checkedValues[j];
              checkedValues[j] = checkedValues[i];
              checkedValues[i] = temp;
            }
          } 
      }
      
      for(let i=0 ;i<checkedValues.length;i++){
        if(!isExist(checkedValues[i].mathanhphan)){
           checkedValues[i].mathanhphan = '\xa0\xa0\xa0' + checkedValues[i].mathanhphan; 
        }
      }  
  }
  sortValues(this.props.dgtable)
    return (
      <Table columns={columns} dataSource={this.props.dgtable} />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dgtable: state.dgtable,
  }
}

export default connect(mapStateToProps)(DGTableItem);
