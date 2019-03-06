import React, { Component } from 'react';
import { Table, Popconfirm, Tag, Button, Divider } from 'antd';
import { connect } from 'react-redux';
import ItemTableTTC from './contentItemTable';

class tableTTC extends Component {
    constructor(props) {
        super(props)

    }

    xoaTTC = ()=>{
        this.props.toggleButton();
        this.props.xoaThongTinChung();
    }

    suaTTC = ()=>{
        this.props.toggleButton();
    }

    render() {
        const columns = [{
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            width: '80%',
            align: 'left',
            render: (text, record)=>{
                return(
                    <ItemTableTTC textA={text}/>
                )
            }
        }, {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (text, record) => (
                <span>
                    <a href="javascript:;"  onClick={this.suaTTC}>Edit</a>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={this.xoaTTC}>Delete</a>
                </span>
            ),
        }];

        const data = [];
        for(let  i = 0; i < this.props.dataTTC.length; i++){
            data.push({
                key: i,
                content: this.props.dataTTC[0]
            })
        }

        return (
            <React.Fragment>
                <Table
                    bordered
                    columns={columns}
                    dataSource={data}
                    style={{ wordWrap: "break-word", whiteSpace: 'pre-line'}}
                />
            </React.Fragment>
        );
    }
}

export default tableTTC;