import React, { Component } from 'react'
import { Table } from 'antd';
import "./matrix.css";

const columns = [
    {
        title: 'HK', width: 100, dataIndex: 'hocky', key: 'hocky', fixed: 'left',
    },
    {
        title: 'Học phần', width: 100, dataIndex: 'hocphan', key: 'hocphan', fixed: 'left',
    },
    {
        title: 'GV trưởng nhóm', width: 100, dataIndex: 'gvtruongnhom', key: 'gvtruongnhom', fixed: 'left',
    },
    {
        title: '1(Kiến Thức)',
        key:'1',
        children: [
            {
                title: '1.1',
                dataIndex: '1.1',
                key: '1.1',
                children: [
                    {
                        title: '1.1.1',
                        dataIndex: '1.1.1',
                        key: '1.1.1',
                    },
                    {
                        title: '1.1.2',
                        dataIndex: '1.1.2',
                        key: '1.1.2',
                    },
                    {
                        title: '1.1.3',
                        dataIndex: '1.1.3',
                        key: '1.1.3',
                    }
                ]

            },
            {
                title: '1.2',
                dataIndex: '1.2',
                key: '1.2',
                children: [
                    {
                        title: '1.2.1',
                        dataIndex: '1.2.1',
                        key: '1.2.1',
                    },
                    {
                        title: '1.2.2',
                        dataIndex: '1.2.2',
                        key: '1.2.2',
                    },
                    {
                        title: '1.2.3',
                        dataIndex: '1.2.3',
                        key: '1.2.3',
                    }
                ]
            },
            {
                title: '1.3',
                dataIndex: '1.3',
                key: '1.3',
                children: [
                    {
                        title: '1.3.1',
                        dataIndex: '1.3.1',
                        key: '1.3.1',
                    },
                    {
                        title: '1.3.2',
                        dataIndex: '1.3.2',
                        key: '1.3.2',
                    },
                    {
                        title: '1.3.3',
                        dataIndex: '1.3.3',
                        key: '1.3.3',
                    }
                ]
            }
        ]
    },
    {
        title: '2(Kỹ Năng Mềm)',
        key:'2',
        children: [
            {
                title: '2.1',
                dataIndex: '2.1',
                key: '2.1',
                children: [
                    {
                        title: '2.1.1',
                        dataIndex: '2.1.1',
                        key: '2.1.1',
                    },
                    {
                        title: '2.1.2',
                        dataIndex: '2.1.2',
                        key: '2.1.2',
                    },
                    {
                        title: '2.1.3',
                        dataIndex: '2.1.3',
                        key: '2.1.3',
                    }
                ]

            },
            {
                title: '2.2',
                dataIndex: '2.2',
                key: '2.2',
                children: [
                    {
                        title: '2.2.1',
                        dataIndex: '2.2.1',
                        key: '2.2.1',
                    },
                    {
                        title: '2.2.2',
                        dataIndex: '2.2.2',
                        key: '2.2.2',
                    },
                    {
                        title: '2.2.3',
                        dataIndex: '2.2.3',
                        key: '2.2.3',
                    }
                ]
            },
            {
                title: '2.3',
                dataIndex: '2.3',
                key: '2.3',
                children: [
                    {
                        title: '2.3.1',
                        dataIndex: '2.3.1',
                        key: '2.3.1',
                    },
                    {
                        title: '2.3.2',
                        dataIndex: '2.3.2',
                        key: '2.3.2',
                    },
                    {
                        title: '2.3.3',
                        dataIndex: '2.3.3',
                        key: '2.3.3',
                    }
                ]
            }
        ]

    }
];

const data = [
    {
        hocky: 1,
        hocphan: 'OOP',
        gvtruongnhom: 'Le Dinh Phu',
        '1.1.1': "U I",
        '1.1.2': "U",
        '1.1.3': "T",
        '1.2.1': "U I T",
        '1.2.2': "U T",
        '1.2.3': "I T",
        '1.3.1': "T",
        '1.3.2': "U T",
        '1.3.3': "I",
        '2.1.1': "U I",
        '2.1.2': "U",
        '2.1.3': "T U",
        '2.2.1': "U I T",
        '2.2.2': "U T",
        '2.2.3': "I",
        '2.3.1': "T",
        '2.3.2': "U T",
        '2.3.3': "I U T",
    },
    {
        hocky: 2,
        hocphan: 'Design Pattern',
        gvtruongnhom: 'Le Dinh Phu 2',
        '1.1.1': "U I",
        '1.1.2': "U",
        '1.1.3': "T",
        '1.2.1': "U I T",
        '1.2.2': "U T",
        '1.2.3': "I T",
        '1.3.1': "T",
        '1.3.2': "U T",
        '1.3.3': "I",
        '2.1.1': "U I",
        '2.1.2': "U",
        '2.1.3': "T U",
        '2.2.1': "U I T",
        '2.2.2': "U T",
        '2.2.3': "I",
        '2.3.1': "T",
        '2.3.2': "U T",
        '2.3.3': "I U T",
    }
];

class Matrix extends Component {
    render() {
        return (
            <React.Fragment>
                <Table  bordered columns={columns} dataSource={data} scroll={{ x: 1500}} />
            </React.Fragment>
        )
    }
}

export default Matrix;