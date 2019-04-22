import React, { Component } from 'react'
import axios from 'axios';
import _ from 'lodash';
import { Table, Icon, Tag, Modal, Button } from 'antd';
import './matrix.css';


//  1.1.1 1.1.2 1.1.3
//I   a     b     r
//T   d     e     t
//U   f     g     b


// const data = [
//     {
//         key: 1,
//         itu: 'I',
//         "1.1.1": 10,
//         "1.1.2": 11,
//         "1.1.3": 12,
//         "1.2.1": 120,
//         "1.2.2": 121,
//         "1.2.3": 122,
//         "2.1.1": 20,
//         "2.1.2": 21,
//         "2.1.3": 22,
//         "3.1.1": 30,
//         "3.1.2": 31,
//         "3.1.3": 32,
//     },
//     {
//         key: 2,
//         itu: 'T',
//         "1.1.1": 13,
//         "1.1.2": 14,
//         "1.1.3": 15,
//         "1.2.1": 123,
//         "1.2.2": 124,
//         "1.2.3": 125,
//         "2.1.1": 23,
//         "2.1.2": 24,
//         "2.1.3": 25,
//         "3.1.1": 33,
//         "3.1.2": 34,
//         "3.1.3": 35,
//     },
//     {
//         key: 3,
//         itu: 'U',
//         "1.1.1": 16,
//         "1.1.2": 17,
//         "1.1.3": 18,
//         "1.2.1": 126,
//         "1.2.2": 127,
//         "1.2.3": 128,
//         "2.1.1": 26,
//         "2.1.2": 27,
//         "2.1.3": 28,
//         "3.1.1": 36,
//         "3.1.2": 37,
//         "3.1.3": 38,
//     },
//     {
//         key: 4,
//         itu: 'ITU-Index',
//     }
// ];

// const columns = [
//     {
//         title: 'ITU', width: 100, dataIndex: 'itu', key: 'itu', fixed: 'left',
//     },
//     {
//         title: '1',
//         children: [
//             {
//                 title: '1.1',
//                 width: 100,
//                 children: [
//                     {
//                         title: '1.1.1',
//                         dataIndex: '1.1.1',
//                         key: '1.1.1'
//                     },
//                     {
//                         title: '1.1.2',
//                         dataIndex: '1.1.2',
//                         key: '1.1.2'
//                     },
//                     {
//                         title: '1.1.3',
//                         dataIndex: '1.1.3',
//                         key: '1.1.3'
//                     },
//                 ]
//             },
//             {
//                 title: '1.2',
//                 children: [
//                     {
//                         title: '1.2.1',
//                         dataIndex: '1.2.1',
//                         key: '1.2.1'
//                     },
//                     {
//                         title: '1.2.2',
//                         dataIndex: '1.2.2',
//                         key: '1.2.2'
//                     },
//                     {
//                         title: '1.2.3',
//                         dataIndex: '1.2.3',
//                         key: '1.2.3'
//                     },
//                 ]
//             }
//         ]
//     },
//     {
//         title: '2',
//         children: [
//             {
//                 title: '2.1',
//                 children: [
//                     {
//                         title: '2.1.1',
//                         dataIndex: '2.1.1',
//                         key: '2.1.1'
//                     },
//                     {
//                         title: '2.1.2',
//                         dataIndex: '2.1.2',
//                         key: '2.1.2'
//                     },
//                     {
//                         title: '2.1.3',
//                         dataIndex: '2.1.3',
//                         key: '2.1.3'
//                     },
//                 ]
//             }
//         ]
//     },
//     {
//         title: '3',
//         children: [
//             {
//                 title: '3.1',
//                 children: [
//                     {
//                         title: '3.1.1',
//                         dataIndex: '3.1.1',
//                         key: '3.1.1'
//                     },
//                     {
//                         title: '3.1.2',
//                         dataIndex: '3.1.2',
//                         key: '3.1.2'
//                     },
//                     {
//                         title: '3.1.3',
//                         dataIndex: '3.1.3',
//                         key: '3.1.3'
//                     },
//                 ]
//             }
//         ]
//     }
// ];

const myData = {
    "I": [
        {
            cdr:"1.1.1",
            amount: 10
        },
        {
            cdr:"1.1.2",
            amount: 11,
        },
        {
            cdr:"1.1.3",
            amount: 12,
        },
        {
            cdr:"1.2.1",
            amount: 120,
        },
        {
            cdr:"1.2.2",
            amount: 121
        },
        {
            cdr:"1.2.3",
            amount: 122
        },
        {
            cdr:"2.1.1",
            amount: 20
        },
        {
            cdr:"2.1.2",
            amount: 21
        },
        {
            cdr:"2.1.3",
            amount: 22
        },
        {
            cdr:"3.1.1",
            amount: 30
        },
        {
            cdr:"3.1.2",
            amount: 31
        },
        {
            cdr:"3.1.3",
            amount: 32
        }
    ],
    "T": [
        {
            cdr:"1.1.1",
            amount: 13
        },
        {
            cdr:"1.1.2",
            amount: 14,
        },
        {
            cdr:"1.1.3",
            amount: 15,
        },
        {
            cdr:"1.2.1",
            amount: 123,
        },
        {
            cdr:"1.2.2",
            amount: 124
        },
        {
            cdr:"1.2.3",
            amount: 125
        },
        {
            cdr:"2.1.1",
            amount: 23
        },
        {
            cdr:"2.1.2",
            amount: 24
        },
        {
            cdr:"2.1.3",
            amount: 25
        },
        {
            cdr:"3.1.1",
            amount: 33
        },
        {
            cdr:"3.1.2",
            amount: 34
        },
        {
            cdr:"3.1.3",
            amount: 35
        }
    ],
    "U": [
        {
            cdr:"1.1.1",
            amount: 16
        },
        {
            cdr:"1.1.2",
            amount: 17,
        },
        {
            cdr:"1.1.3",
            amount: 18,
        },
        {
            cdr:"1.2.1",
            amount: 126,
        },
        {
            cdr:"1.2.2",
            amount: 127
        },
        {
            cdr:"1.2.3",
            amount: 128
        },
        {
            cdr:"2.1.1",
            amount: 26
        },
        {
            cdr:"2.1.2",
            amount: 27
        },
        {
            cdr:"2.1.3",
            amount: 28
        },
        {
            cdr:"3.1.1",
            amount: 36
        },
        {
            cdr:"3.1.2",
            amount: 37
        },
        {
            cdr:"3.1.3",
            amount: 38
        }
    ]
}

class BenchMark extends Component {

    createHeaderColumn = () => {
        let data = myData['I'] || [];
        const columns = [
            {
                title: 'ITU', width: 100, dataIndex: 'itu', key: 'itu', fixed: 'left',
            },
        ];

        const columnsCreated = this.createHeaderFirst(data);
        for(let i = 0; i< columnsCreated.length; i++){
            columns.push(columnsCreated[i])
        }
        return columns;
    }

    createHeaderFirst = (data) => {
        const groups = this.groupsIndexColumns(data, 0) || [];
        let column = {};
        let arrColumnFirst = [];
        for(let i = 0; i < groups.length; i++){
            const groupsData = this.groupDataFollowIndexColumns(i+1);
            column = {
                title: `${i+1}`,
                children: this.createHeaderSecond(groupsData, i+1)
            }
            arrColumnFirst.push(column);
        }
        return arrColumnFirst;
    }

    createHeaderSecond = (data=[], parentIndex) => {
        const groupsSecond = this.groupsIndexColumns(data, 2) || [];
        let column = {};
        let arrColumnSecond = [];
        for(let i = 0; i < groupsSecond.length; i++){
            const dataSecond = this.groupDataSecond(data, `${parentIndex}.${i+1}`);
            column = {
                title: `${parentIndex}.${i+1}`,
                children: this.createHeaderThird(dataSecond, `${parentIndex}.${i+1}`)
            }
            arrColumnSecond.push(column);
        }
        return arrColumnSecond;
    }

    createHeaderThird = (data=[], parentIndex) => {
        let column = {};
        let arrColumnThird = [];
        for(let i = 0; i < data.length; i++){
            column = {
                title: `${parentIndex}.${i+1}`,
                dataIndex: `${parentIndex}.${i+1}`,
                key: `${parentIndex}.${i+1}`
            }
            arrColumnThird.push(column);
        };
        return arrColumnThird;
    }

    groupsIndexColumns = (data, position) => {
        let temp = -1;
        let arrIndex = [];
        for(let i = 0; i < data.length; i++){
            let index = parseInt(data[i].cdr[position]);
            if(index !== temp) {
                let check = arrIndex.find(x => x === index);
                if(_.isEmpty(check)){
                    temp = index
                    arrIndex.push(index);
                }
            }
        }
        return arrIndex;
    }

    groupDataSecond = (data, parentIndex) => {
        const arrDataSecond = [];
        for(let i = 0; i < data.length; i++){
            if(data[i]['cdr'].slice(0,3) === parentIndex){
                arrDataSecond.push(data[i]);
            }
        }
        return arrDataSecond;
    }

    groupDataFollowIndexColumns = (index) => {
        let data = myData["I"] || [];
        let arrData = [];
        data.map((x)=>{
            if(parseInt(x['cdr'][0]) === index){
                arrData.push(x)
            }
        })
        return arrData;
    }

    createData = ()=>{
        const newObject_I = Object.assign({}, ...myData['I'].map(item => ({ [item.cdr]: item.amount })));
        const newObject_T = Object.assign({}, ...myData['T'].map(item => ({ [item.cdr]: item.amount })));
        const newObject_U = Object.assign({}, ...myData['U'].map(item => ({ [item.cdr]: item.amount })));
        const data = [];
        data.push({
            ...newObject_I,
            itu: 'I',
            key: 1
        });
        data.push({
            ...newObject_T,
            itu: 'T',
            key: 2
        });
        data.push({
            ...newObject_U,
            itu: 'U',
            key: 3
        });
        return data;
    }
    

    render() {
        const columns = this.createHeaderColumn();
        const data = this.createData();
        return (
            <Table
                className="benchmark"
                style={{ padding: '10px' }}
                bordered columns={columns} dataSource={data} scroll={{ x: 1200, y: 300 }} />
        )
    }
}

export default BenchMark;