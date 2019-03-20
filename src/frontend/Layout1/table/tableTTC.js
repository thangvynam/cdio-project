import React, { Component } from 'react';
import { Table, Icon, Divider, notification } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import ItemTableTTC from './contentItemTable';

class tableTTC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            isSave: false
        }
    }

    xoaTTC = () => {
        this.props.toggleButtonDelete();
        this.props.xoaThongTinChung();
    }

    suaTTC = () => {
        this.props.toggleButton();
        this.setState({
            isEdit: true
        })
    }

    cancelEdit = () => {
        this.props.toggleButton();
        this.setState({
            isEdit: false
        })
    }

    toggleSave = () => {
        this.setState({
            isSave: true
        })
    }

    handleUpdateData = (e) => {
        this.setState({
            [e.target.name]: e.target.type === 'number' ? e.target.value * 1 : e.target.value
        })
    }

    save = () => {
        const a = { ...this.state };
        const c = _.find(_.toArray(a), function (o) { return o === '' })
        let newData = _.cloneDeep(this.props.dataTTC[0]);
        if (_.isUndefined(c)) {
            const arrTTC = _.map(_.toPairs(this.state), d => _.fromPairs([d]));
            arrTTC.forEach((x) => {
                const key = Object.keys(x)[0];
                const value = Object.values(x)[0];

                _.set(newData, key, value)
            })
            this.props.suaThongTinChung(newData);
            this.props.toggleButton();
            this.setState({
                isEdit: false
            })
        } else {
            notification.open({
                message: "Failed",
                icon: <Icon type="close" style={{ color: 'red' }} />,
            })
        }
    }

    render() {
        const columns = [{
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            width: '80%',
            align: 'left',
            render: (text, record) => {
                return (
                    <ItemTableTTC
                        textA={text}
                        isEdit={this.state.isEdit}
                        isSave={this.state.isSave}
                        handleUpdateData={this.handleUpdateData}
                    />
                )
            }
        }, {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (text, record, form) => (
                !this.state.isEdit
                    ? <span>
                        <a href="javascript:;" onClick={this.suaTTC}>Edit</a>
                        <Divider type="vertical" />
                    </span>
                    : <span>
                        <a href="javascript:;" onClick={this.save}>Save</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={this.cancelEdit}>Cancel</a>
                    </span>
            ),
        }];

        const data = [];
        for (let i = 0; i < this.props.dataTTC.length; i++) {
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
                    rowClassName="editable-row"
                    style={{ wordWrap: "break-word", whiteSpace: 'pre-line' }}
                />
            </React.Fragment>
        );
    }
}

export default tableTTC;