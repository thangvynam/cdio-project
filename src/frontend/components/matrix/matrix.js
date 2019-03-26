import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { getDataMatrix } from './../../Constant/matrix/matrixAction';
import "./matrix.css";

// const columns = [
//     {
//         title: 'HK', width: 100, dataIndex: 'hocky', key: 'hocky', fixed: 'left',
//     },
//     {
//         title: 'Học phần', width: 100, dataIndex: 'hocphan', key: 'hocphan', fixed: 'left',
//     },
//     {
//         title: 'GV trưởng nhóm', width: 100, dataIndex: 'gvtruongnhom', key: 'gvtruongnhom', fixed: 'left',
//     },
//     {
//         title: '1(Kiến Thức)',
//         key: '1',
//         children: [
//             {
//                 title: '1.1',
//                 dataIndex: '1.1',
//                 key: '1.1',
//                 children: [
//                     {
//                         title: '1.1.1',
//                         dataIndex: '1.1.1',
//                         key: '1.1.1',
//                     },
//                     {
//                         title: '1.1.2',
//                         dataIndex: '1.1.2',
//                         key: '1.1.2',
//                     },
//                     {
//                         title: '1.1.3',
//                         dataIndex: '1.1.3',
//                         key: '1.1.3',
//                     }
//                 ]

//             },
//             {
//                 title: '1.2',
//                 dataIndex: '1.2',
//                 key: '1.2',
//                 children: [
//                     {
//                         title: '1.2.1',
//                         dataIndex: '1.2.1',
//                         key: '1.2.1',
//                     },
//                     {
//                         title: '1.2.2',
//                         dataIndex: '1.2.2',
//                         key: '1.2.2',
//                     },
//                     {
//                         title: '1.2.3',
//                         dataIndex: '1.2.3',
//                         key: '1.2.3',
//                     }
//                 ]
//             },
//             {
//                 title: '1.3',
//                 dataIndex: '1.3',
//                 key: '1.3',
//                 children: [
//                     {
//                         title: '1.3.1',
//                         dataIndex: '1.3.1',
//                         key: '1.3.1',
//                     },
//                     {
//                         title: '1.3.2',
//                         dataIndex: '1.3.2',
//                         key: '1.3.2',
//                     },
//                     {
//                         title: '1.3.3',
//                         dataIndex: '1.3.3',
//                         key: '1.3.3',
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         title: '2(Kỹ Năng Mềm)',
//         key: '2',
//         children: [
//             {
//                 title: '2.1',
//                 dataIndex: '2.1',
//                 key: '2.1',
//                 children: [
//                     {
//                         title: '2.1.1',
//                         dataIndex: '2.1.1',
//                         key: '2.1.1',
//                     },
//                     {
//                         title: '2.1.2',
//                         dataIndex: '2.1.2',
//                         key: '2.1.2',
//                     },
//                     {
//                         title: '2.1.3',
//                         dataIndex: '2.1.3',
//                         key: '2.1.3',
//                     }
//                 ]

//             },
//             {
//                 title: '2.2',
//                 dataIndex: '2.2',
//                 key: '2.2',
//                 children: [
//                     {
//                         title: '2.2.1',
//                         dataIndex: '2.2.1',
//                         key: '2.2.1',
//                     },
//                     {
//                         title: '2.2.2',
//                         dataIndex: '2.2.2',
//                         key: '2.2.2',
//                     },
//                     {
//                         title: '2.2.3',
//                         dataIndex: '2.2.3',
//                         key: '2.2.3',
//                     }
//                 ]
//             },
//             {
//                 title: '2.3',
//                 dataIndex: '2.3',
//                 key: '2.3',
//                 children: [
//                     {
//                         title: '2.3.1',
//                         dataIndex: '2.3.1',
//                         key: '2.3.1',
//                     },
//                     {
//                         title: '2.3.2',
//                         dataIndex: '2.3.2',
//                         key: '2.3.2',
//                     },
//                     {
//                         title: '2.3.3',
//                         dataIndex: '2.3.3',
//                         key: '2.3.3',
//                     }
//                 ]
//             }
//         ]

//     },

// ];

// const data = [
//     {
//         hocky: 1,
//         hocphan: 'OOP',
//         gvtruongnhom: 'Le Dinh Phu',
//         '1.1.1': "U I",
//         '1.1.2': "U",
//         '1.1.3': "T",
//         '1.2.1': "U I T",
//         '1.2.2': "U T",
//         '1.2.3': "I T",
//         '1.3.1': "T",
//         '1.3.2': "U T",
//         '1.3.3': "I",
//         '2.1.1': "U I",
//         '2.1.2': "U",
//         '2.1.3': "T U",
//         '2.2.1': "U I T",
//         '2.2.2': "U T",
//         '2.2.3': "I",
//         '2.3.1': "T",
//         '2.3.2': "U T",
//         '2.3.3': "I U T",
//     },
//     {
//         hocky: 2,
//         hocphan: 'Design Pattern',
//         gvtruongnhom: 'Le Dinh Phu 2',
//         '1.1.1': "U I",
//         '1.1.2': "U",
//         '1.1.3': "T",
//         '1.2.1': "U I T",
//         '1.2.2': "U T",
//         '1.2.3': "I T",
//         '1.3.1': "T",
//         '1.3.2': "U T",
//         '1.3.3': "I",
//         '2.1.1': "U I",
//         '2.1.2': "U",
//         '2.1.3': "T U",
//         '2.2.1': "U I T",
//         '2.2.2': "U T",
//         '2.2.3': "I",
//         '2.3.1': "T",
//         '2.3.2': "U T",
//         '2.3.3': "I U T",
//     }
// ];


class Matrix extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isError: false,
            isSuccess: false
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        var a = axios.get('/get-reality-matrix');
        var b = axios.get('/get-cdr-cdio');
        Promise.all([a, b])
            .then((res) => {
                this.props.getDataMatrix(res)
                console.log(res);
                this.createData(res);
                this.setState({
                    isLoading: false
                })
            })
            .catch((err) => {
                console.log(err)
            })

    }

    createGroupCDR = (data, index) => {
        let result = _.chain(data)
            .groupBy(x => x.cdr[index])
            .value();
        return result;
    }

    getMatrixField = (key, dataIndex, matrix) => {
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i].key === key) {
                return matrix[i][dataIndex];
            }
        }
        return "";
    }
    checkGAPandReturnResult = (text, textMatrix) => {
        if (textMatrix !== "") {
            if (text === "-") {
                if (text !== textMatrix) {
                    let textArr = textMatrix.split(",");
                    let textRender = [];
                    for (let i = 0; i < textArr.length; i++) {
                        textRender.push(<span key={i} className="adding-text">{textArr[i]}</span>);
                        if (i !== textArr.length - 1) {
                            textRender.push(<span key={i + ','}>,</span>);
                        }
                    }
                    return textRender;
                }
                return <span>-</span>;
            }
            else {
                if (textMatrix === "-") {
                    let textArr = text.split(",");
                    let textRender = [];
                    for (let i = 0; i < textArr.length; i++) {
                        textRender.push(<span key={i} className="removing-text">{textArr[i]}</span>);
                        if (i !== textArr.length - 1) {
                            textRender.push(<span key={i + ','}>,</span>);
                        }
                    }
                    return textRender;
                }
                else {
                    let textArr = text.split(",");
                    let textMatrixArr = textMatrix.split(",");
                    let textRender = [];
                    let textRenderStateArr = [];
                    for (let i = 0; i < textArr.length; i++) {
                        if (this.isExistInArray(textMatrixArr, textArr[i])) {
                            textRenderStateArr.push({
                                text: textArr[i],
                                state: ""
                            })
                        }
                        else {
                            textRenderStateArr.push({
                                text: textArr[i],
                                state: "remove"
                            })
                        }
                    }

                    for (let i = 0; i < textMatrixArr.length; i++) {
                        if (!this.isExistInArray(textArr, textMatrixArr[i])) {
                            textRenderStateArr.push({
                                text: textMatrixArr[i],
                                state: "add"
                            })
                        }
                    }

                    textRenderStateArr.sort((a, b) => a.text > b.text).map((item, i) => {
                        if (item.state === "add") {
                            textRender.push(<span key={i} className="adding-text">{item.text}</span>);
                        }
                        else if (item.state === "remove") {
                            textRender.push(<span key={i} className="removing-text">{item.text}</span>);
                        }
                        else {
                            textRender.push(<span key={i}>{item.text}</span>);
                        }
                        if (i !== textRenderStateArr.length - 1) {
                            textRender.push(<span key={i + ','}>,</span>);
                        }
                    })
                    return textRender;
                }
            }
        }
        return <div></div>;
    }

    isExistInArray = (arr, item) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === item) {
                return true;
            }
        }
        return false;
    }
    //TV đi t đi mua sữa cái ,về liên :))) ok
    createColumnGroupSecond = (group) => {
        let dt = [];
        let smallGroup = _.toArray(this.createGroupCDR(group, 2));
        for (let i = 0; i < smallGroup[0].length; i++) {
            dt.push({
                title: `${smallGroup[0][i].cdr}`,
                dataIndex: `${smallGroup[0][i].cdr}`,
                key: `${smallGroup[0][i].cdr}`,
                render: (text, record) =>
                    <div>{this.checkGAPandReturnResult(text, this.getMatrixField(record.key, smallGroup[0][i].cdr, this.props.editMatrix))}</div>,
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
        // cai column nho
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
                key: dataMatrix[0].data[i].idSubject,
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

    addDataCDR = (data, dataMatrix) => {
        for (let i = 0; i < data.length; i++) {
            var kkk = "K"
            var a = {
                ...data[i],
                [kkk]: 'ss'
            }
            console.log(a)
        }
    }

    render() {
        const { isLoading } = this.state;
        return (
            this.props.editMatrix && <React.Fragment>
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

const mapStateToProps = (state) => {
    return {
        dataMatrix: state.matrix.previewInfo,
        editMatrix: state.editmatrix
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDataMatrix: (newData) => dispatch(getDataMatrix(newData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Matrix);