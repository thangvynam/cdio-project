import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import { connect } from 'react-redux';

const chude = ['BTVN', 'BTTL', 'DAMH', 'LTCK'];
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
},
{
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#a">Edit {record.name}</a>
      <Divider type="vertical" />
      <a href="#b">Delete</a>
    </span>
  ),
}];

class DGTableItem extends Component {

  render() {
    var dgtable = this.props.dgtable;
    function isExist(value) {
      for (let i = 0; i < chude.length; i++) {
        if (value === chude[i])
          return true;
      }
      return false;
    }
    function sortValues(checkedValues) {
      console.log(checkedValues);
      for (let i = 0; i < checkedValues.length; i++) {
        if (!isExist(checkedValues[i].mathanhphan) && checkedValues[i].mathanhphan[0] === '\xa0') {

          checkedValues[i].mathanhphan = checkedValues[i].mathanhphan.slice(3, checkedValues[i].mathanhphan.length);
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
      let index = [];
      for (let i = 0; i < checkedValues.length; i++) {
        if (isExist(checkedValues[i].mathanhphan)) {
          index.push(i);
        }
      }
      //console.log(index[0]);
      if (index.length === 1) {

        let totalTile = 0;
        for (let j = 1; j < checkedValues.length; j++) {
          let newTile = checkedValues[j].tile.slice(0, checkedValues[j].tile.length - 1);
          totalTile += parseFloat(newTile);
        }

        checkedValues[index[0]].tile = totalTile + '%';
      } else {
        for (let i = 0; i < index.length - 1; i++) {
          let totalTile = 0;
          for (let j = index[i] + 1; j < index[i + 1]; j++) {
            let newTile = checkedValues[j].tile.slice(0, checkedValues[j].tile.length - 1);
            totalTile += parseFloat(newTile);
          }
          checkedValues[index[i]].tile = totalTile + '%';
        }
        let totalTile = 0;
        console.log(index[index.length - 1])
        for (let i = index[index.length - 1] + 1; i < checkedValues.length; i++) {
          let newTile = checkedValues[i].tile.slice(0, checkedValues[i].tile.length - 1);
          totalTile += parseFloat(newTile);

        }
        checkedValues[index[index.length - 1]].tile = totalTile + '%';
      }

      for (let i = 0; i < checkedValues.length; i++) {
        if (!isExist(checkedValues[i].mathanhphan)) {
          checkedValues[i].mathanhphan = '\xa0\xa0\xa0' + checkedValues[i].mathanhphan;
        }
      }

    }


    console.log(this.props.dgtable);
    sortValues(this.props.dgtable.previewInfo)
    return (
      <Table columns={columns} dataSource={this.props.dgtable.previewInfo} style={{ wordWrap: "break-word", whiteSpace: 'pre-line'}}/>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dgtable: state.itemLayout7Reducer,
  }
}

export default connect(mapStateToProps)(DGTableItem);
