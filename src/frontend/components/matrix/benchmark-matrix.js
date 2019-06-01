import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux';
import { Table, Icon, Tag, Modal, Button } from 'antd';
import { getDataBenchMarkMatrix } from './../../Constant/matrix/matrixAction';
import { Bar } from 'react-chartjs-2';
import './matrix.css';
import $ from './../../helpers/services';


const myData = {
    "I": [
        {
            cdr: "1.1.1",
            amount: 10
        },
        {
            cdr: "1.1.2",
            amount: 11,
        },
        {
            cdr: "1.1.3",
            amount: 12,
        },
        {
            cdr: "1.2.1",
            amount: 120,
        },
        {
            cdr: "1.2.2",
            amount: 121
        },
        {
            cdr: "1.2.3",
            amount: 122
        },
        {
            cdr: "2.1.1",
            amount: 20
        },
        {
            cdr: "2.1.2",
            amount: 21
        },
        {
            cdr: "2.1.3",
            amount: 22
        },
        {
            cdr: "3.1.1",
            amount: 30
        },
        {
            cdr: "3.1.2",
            amount: 31
        },
        {
            cdr: "3.1.3",
            amount: 32
        }
    ],
    "T": [
        {
            cdr: "1.1.1",
            amount: 13
        },
        {
            cdr: "1.1.2",
            amount: 14,
        },
        {
            cdr: "1.1.3",
            amount: 15,
        },
        {
            cdr: "1.2.1",
            amount: 123,
        },
        {
            cdr: "1.2.2",
            amount: 124
        },
        {
            cdr: "1.2.3",
            amount: 125
        },
        {
            cdr: "2.1.1",
            amount: 23
        },
        {
            cdr: "2.1.2",
            amount: 24
        },
        {
            cdr: "2.1.3",
            amount: 25
        },
        {
            cdr: "3.1.1",
            amount: 33
        },
        {
            cdr: "3.1.2",
            amount: 34
        },
        {
            cdr: "3.1.3",
            amount: 35
        }
    ],
    "U": [
        {
            cdr: "1.1.1",
            amount: 16
        },
        {
            cdr: "1.1.2",
            amount: 17,
        },
        {
            cdr: "1.1.3",
            amount: 18,
        },
        {
            cdr: "1.2.1",
            amount: 126,
        },
        {
            cdr: "1.2.2",
            amount: 127
        },
        {
            cdr: "1.2.3",
            amount: 128
        },
        {
            cdr: "2.1.1",
            amount: 26
        },
        {
            cdr: "2.1.2",
            amount: 27
        },
        {
            cdr: "2.1.3",
            amount: 28
        },
        {
            cdr: "3.1.1",
            amount: 36
        },
        {
            cdr: "3.1.2",
            amount: 37
        },
        {
            cdr: "3.1.3",
            amount: 38
        }
    ]
}

class BenchMark extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
        }
    }
   
    componentDidMount() {
        let subjectListId = [];
        this.props.subjectList.map(item => {
            subjectListId.push(item.IdSubject);
        })
        let data = {
            data: subjectListId
        }
        $.getBenchmarkMatrix(data)
        .then((res) => {
            this.props.getDataBenchMarkMatrix(res.data);
            //this.props.getDataBenchMarkMatrix(myData);
        })
    }

    createHeaderColumn = (myData) => {
        let data = myData['I'] || [];
        const columns = [
            {
                title: 'ITU', width: 60, dataIndex: 'itu', key: 'itu', fixed: 'left',
            },
        ];

        const columnsCreated = this.createHeaderFirst(data);
        for (let i = 0; i < columnsCreated.length; i++) {
            columns.push(columnsCreated[i])
        }
        return columns;
    }

    createHeaderFirst = (data) => {
        const groups = this.groupsIndexColumns(data, 0) || [];
        let column = {};
        let arrColumnFirst = [];
        for (let i = 0; i < groups.length; i++) {
            const groupsData = this.groupDataFollowIndexColumns(data, i + 1);
            column = {
                title: `${i + 1}`,

                children: this.createHeaderSecond(groupsData, i + 1)
            }
            arrColumnFirst.push(column);
        }
        return arrColumnFirst;
    }

    createHeaderSecond = (data = [], parentIndex) => {
        const groupsSecond = this.groupsIndexColumns(data, 2) || [];
        let column = {};
        let arrColumnSecond = [];
        for (let i = 0; i < groupsSecond.length; i++) {
            const dataSecond = this.groupDataSecond(data, `${parentIndex}.${i + 1}`);
            column = {
                title: `${parentIndex}.${i + 1}`,
                children: this.createHeaderThird(dataSecond, `${parentIndex}.${i + 1}`)
            }
            arrColumnSecond.push(column);
        }
        return arrColumnSecond;
    }

    createHeaderThird = (data = [], parentIndex) => {
        let column = {};
        let arrColumnThird = [];
        for (let i = 0; i < data.length; i++) {
            column = {
                title: `${parentIndex}.${i + 1}`,
                dataIndex: `${parentIndex}.${i + 1}`,
                key: `${parentIndex}.${i + 1}`
            }
            arrColumnThird.push(column);
        };
        return arrColumnThird;
    }

    groupsIndexColumns = (data, position) => {
        let temp = -1;
        let arrIndex = [];
        for (let i = 0; i < data.length; i++) {
            let index = parseInt(data[i].cdr[position]);
            if (index !== temp) {
                let check = arrIndex.find(x => x === index);
                if (_.isEmpty(check)) {
                    temp = index
                    arrIndex.push(index);
                }
            }
        }
        return arrIndex;
    }

    groupDataSecond = (data, parentIndex) => {
        const arrDataSecond = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i]['cdr'].slice(0, 3) === parentIndex) {
                arrDataSecond.push(data[i]);
            }
        }
        return arrDataSecond;
    }

    groupDataFollowIndexColumns = (data, index) => {
        let arrData = [];
        data.map((x) => {
            if (parseInt(x['cdr'][0]) === index) {
                arrData.push(x)
            }
        })
        return arrData;
    }

    createData = (myData) => {
        const newObject_I = Object.assign({}, ...myData['I'].map(item => ({ [item.cdr]: item.amount })));
        const newObject_T = Object.assign({}, ...myData['T'].map(item => ({ [item.cdr]: item.amount })));
        const newObject_U = Object.assign({}, ...myData['U'].map(item => ({ [item.cdr]: item.amount })));
        const newObject_ITU = Object.assign(
            {}, ...myData['I'].map(item => ({
                [item.cdr]: ((
                    0.1 * item.amount
                    + newObject_T[item.cdr]
                    + 0.3 * newObject_U[item.cdr]) / (7 / 10)).toFixed(2)
            }))
        );
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
        data.push({
            ...newObject_ITU,
            itu: 'ITU-Index',
            key: 4
        });
        return data;
    }

    dataChartBar = (myData) => {
        const labels = [];
        const datasets = [];
        const color = [];
        myData['I'].map(item => labels.push(item.cdr));
        const newObject_T = Object.assign({}, ...myData['T'].map(item => ({ [item.cdr]: item.amount })));
        const newObject_U = Object.assign({}, ...myData['U'].map(item => ({ [item.cdr]: item.amount })));
        const newObject_ITU = Object.assign(
            {}, ...myData['I'].map(item => ({
                [item.cdr]: ((
                    parseFloat(0.1 * item.amount
                        + newObject_T[item.cdr]
                        + 0.3 * newObject_U[item.cdr]) / (7 / 10))).toFixed(2)
            }))
        );
        _.toArray(newObject_ITU).map((x) => {
            datasets.push(parseFloat(x));
            color.push('rgba(255, 235, 59, 1)');
        })

        const chartData = {
            labels,
            datasets: [
                {
                    label: 'ITU-index',
                    data: datasets,
                    backgroundColor: color,
                }
            ]
        }

        return chartData;
    }

    getArrayDataChart = (myData = {}, index, color) => {
        const dataArr = [];
        const colors = [];
        const obj = Object.assign({}, ...myData[index].map(item => ({ [item.cdr]: item.amount })));
        _.toArray(obj).map((x) => {
            dataArr.push(parseFloat(x));
            colors.push(color);
        });
        return {
            label: index,
            data: dataArr,
            backgroundColor: colors
        };
    }

    dataChartBarMixed = (myData) => {
        const labels = [];
        myData['I'].map(item => labels.push(item.cdr));
        const chartData = {
            labels,
            datasets: [
                this.getArrayDataChart(myData, 'I', 'rgba(255, 235, 59, 1)'),
                this.getArrayDataChart(myData, 'T', 'rgba(0, 107, 114, 1)'),
                this.getArrayDataChart(myData, 'U', 'rgba(237, 107, 114, 1')
            ]
        }
        return chartData;
    }

    render() {
        return (
            !_.isEmpty(this.props.dataBenchMarkMatrix) && (
                <React.Fragment>
                    <Table
                        className="benchmark"
                        style={{ marginTop: '25px' }}
                        bordered
                        columns={this.createHeaderColumn(this.props.dataBenchMarkMatrix)}
                        dataSource={this.createData(this.props.dataBenchMarkMatrix)}
                        scroll={{ x: 1200 }}
                    />
                    <div className="chart">
                        <div className="bar-chart">
                            <Bar
                                data={this.dataChartBar(this.props.dataBenchMarkMatrix)}
                                options= {{
                                    title: {
                                        display: true,
                                        text: 'Biểu đồ đánh giá chỉ số ITU-Index cho từng chuẩn đầu ra',
                                        fontSize: 15
                                    },
                                    legend: {
                                        position: "bottom"
                                    }
                                }}
                            />
                        </div>
                        <div className="bar-chart-mixed">
                            <Bar
                                data={this.dataChartBarMixed(this.props.dataBenchMarkMatrix)}
                                options= {{
                                    title: {
                                        display: true,
                                        text: 'Phân bố ITU ở mức 3',
                                        fontSize: 15
                                    },
                                    legend: {
                                        position: "bottom"
                                    }
                                }}
                            />
                        </div>
                    </div>
                </React.Fragment>)
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataBenchMarkMatrix: state.benchmarkMatrix.previewInfo,
        subjectList: state.subjectlist,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDataBenchMarkMatrix: (newData) => dispatch(getDataBenchMarkMatrix(newData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BenchMark);