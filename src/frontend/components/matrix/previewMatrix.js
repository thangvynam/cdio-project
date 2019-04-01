import React, { Component } from 'react'
import _ from 'lodash';
import { Table } from 'antd';

class PreviewMatrix extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isError: false,
            isSuccess: false
        }
    }

    createGroupCDR = (data, index) => {
        let result = _.chain(data)
            .groupBy(x => x.cdr[index])
            .value();
        return result;
    }

    createColumnGroupSecond = (group) => {
        let dt = [];
        let smallGroup = _.toArray(this.createGroupCDR(group, 2));
        for (let i = 0; i < smallGroup[0].length; i++) {
            dt.push({
                title: `${smallGroup[0][i].cdr}`,
                dataIndex: `${smallGroup[0][i].cdr}`,
                key: `${smallGroup[0][i].cdr}`,
            })
        }
        return dt;
    }

    createColumnGroupFirst = (group) => {
        //Group: 1.1 or 1.2 or 1.3
        let dt = [];
        let smallGroup = _.toArray(this.createGroupCDR(group, 2));
        _.toArray(smallGroup).forEach(group => {
            dt.push({
                title: `${group[0].cdr.slice(0, 3)}`,
                key: `${group[0].cdr.slice(0, 3)}`,
                dataIndex: `${group[0].cdr.slice(0.3)}`,
                children:
                    this.createColumnGroupSecond(group)
            })
        });
        return dt;
    }

    createColumn = (dataMatrix) => {
        let result = [
            {
                title: 'HK', width: 100, dataIndex: 'hocky', key: 'hocky', fixed: 'left',
            },
            {
                title: 'Học phần', width: 100, dataIndex: 'hocphan', key: 'hocphan', fixed: 'left',
            },
            {
                title: 'GV trưởng nhóm', width: 100, dataIndex: 'gvtruongnhom', key: 'gvtruongnhom', fixed: 'left',
            },
        ];

        //Group: 1 or 2 or 3
        let groups = this.createGroupCDR(dataMatrix[1].data, 0);
        _.toArray(groups).forEach(group => {
            result.push({
                title: `${group[0].cdr[0]}`,
                key: `${group[0].cdr[0]}`,
                dataIndex: `${group[0].cdr[0]}`,
                children:
                    this.createColumnGroupFirst(group)

            })
        });
        return result;
    }

    createData = (dataMatrix) => {
        var data1 = [];
        for (let i = 0; i < dataMatrix[0].data.length; i++) {
            var a = {
                hocky: "chua co",
                hocphan: dataMatrix[0].data[i].subject,
                gvtruongnhom: 'chua co'
            }
            for (let j = 0; j < dataMatrix[1].data.length; j++) {
                a = { ...a, [dataMatrix[1].data[j].cdr]: `${dataMatrix[0].data[i].itu[j]}` }
            }
            data1.push(a);
        }
        return data1;
    }

    render() {
        const { isLoading } = this.state;
        return (
            <React.Fragment>
                {
                    !isLoading
                    && !_.isEmpty(this.props.dataMatrix)
                    && <Table bordered
                        columns={this.createColumn(this.props.dataMatrix)}
                        dataSource={this.createData(this.props.dataMatrix)}
                        scroll={{ x: 1500 }}
                    />
                }
            </React.Fragment>
        )
    }
}
export default PreviewMatrix;