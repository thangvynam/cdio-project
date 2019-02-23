import React, { Component } from 'react'

import {
    Form, Table, Card
} from 'antd';

import './chuan-dau-ra.table.css'


class ChuanDauRaTable extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        const columns = [{
            title: 'Chuẩn Đầu Ra',
            dataIndex: 'cdr',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: 'Mô Tả (Mức Chi Tiết - Hành Động)',
            dataIndex: 'description',
        }, {
            title: 'Mức Độ (I/T/U)',
            dataIndex: 'levels',
        }];
        // const data = [{
        //     key: '1',
        //     name: 'John Brown',
        //     age: 32,
        //     address: 'New York No. 1 Lake Park',
        // }, {
        //     key: '2',
        //     name: 'Jim Green',
        //     age: 42,
        //     address: 'London No. 1 Lake Park',
        // }, {
        //     key: '3',
        //     name: 'Joe Black',
        //     age: 32,
        //     address: 'Sidney No. 1 Lake Park',
        // }, {
        //     key: '4',
        //     name: 'Disabled User',
        //     age: 99,
        //     address: 'Sidney No. 1 Lake Park',
        // }];


        console.log(this.props.dataCDR)
        return (

            <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.dataCDR} />

        );
    }
}

const tableCDR = Form.create()(ChuanDauRaTable);
export default tableCDR;