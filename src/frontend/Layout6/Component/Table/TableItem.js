import React, { Component } from "react";
import { Table, Divider, Tag, Button,Popconfirm } from "antd";
import { connect } from "react-redux";



class TableItem extends Component {

  constructor(props){
    super(props);
    this.columns = [
      {
        title: "Tuần",
        dataIndex:"key",
        key: "key"
      },
      {
        title: "Chủ đề",
        dataIndex: "titleName",
        key: "titleName"
      },
      {
        title: "Chuẩn đầu ra ",
        dataIndex: "standardOutput",
        key: "standardOutput",
        render: standardOutput => (
          <span>
            {standardOutput.map(tag => {
              let color = "green";
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
      {
        title: "Hoạt động dạy/ Hoạt động học",
        dataIndex: "teachingActs",
        key: "teachingActs",
        render: teachingActs => (
          <span>
            {teachingActs.map(tag => {
              let color = "green";
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
     
      {
        title: "Hoạt động đánh giá",
        key: "evalActs",
        dataIndex: "evalActs",
        render: evalActs => (
          <span>
            {evalActs.map(tag => {
              let color = "volcano";
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
      {
        title: "Action",
        key: "action",
        width:120,
        render: (text, record) => (
          <span>
            <a href="#a">Edit {record.name}</a>
            <Divider type="vertical" />
                  <Popconfirm
                    title="Xác nhận xóa?"
                    onConfirm={() => this.handleDelete(record.key)}
                  >
                    <a href="#a">Delete</a>
                  </Popconfirm>
          </span>
        )
      }
    ];
    this.state = {
      selectedRowKeys: [],
    };
  }


  handleDelete(key) {
   // this.props.onDeleteItemRule(key);
    this.setState({ selectedRowKeys: [] });
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {


    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;

    
    return (
      <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="danger"
          onClick={this.showModal}
          disabled={!hasSelected}
        >
          Delete
        </Button>

        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Đã chọn ${selectedRowKeys.length} mục` : ""}
        </span>
      </div>
      <Table 
      bordered
      columns={this.columns} 
      dataSource={this.props.itemKHGDTH.previewInfo} 
      rowSelection={rowSelection}
      />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    itemKHGDTH: state.itemKHGDTHReducer
  };
};
export default connect(
  mapStateToProps,
  null
)(TableItem);
