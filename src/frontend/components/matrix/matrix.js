import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import _ from 'lodash';
import { Table, Icon, Tag, Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { getDataMatrix } from './../../Constant/matrix/matrixAction';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import "./matrix.css";
import PreviewMatrix from './previewMatrix';

class Matrix extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isError: false,
            isSuccess: false,
            isShow: false
        };
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        var a = axios.get('/get-reality-matrix');
        var b = axios.get('/get-cdr-cdio');
        Promise.all([a, b])
            .then((res) => {
                this.props.getDataMatrix(res)
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
                        textRender.push(<Tag key={i} color="green" style={{ fontSize: "8pt", fontWeight: "bold" }}>{textArr[i]}</Tag>);
                        // if (i !== textArr.length - 1) {
                        //     textRender.push(<span key={i + ','}>,</span>);
                        // }
                    }
                    return textRender;
                }
                return <Tag color="black" style={{ fontSize: "8pt", fontWeight: "bold" }}>-</Tag>;
            }
            else {
                if (textMatrix === "-") {
                    let textArr = text.split(",");
                    let textRender = [];
                    for (let i = 0; i < textArr.length; i++) {
                        textRender.push(<Tag key={i} color="red" style={{ fontSize: "8pt", fontWeight: "bold" }}>{textArr[i]}</Tag>);
                        // if (i !== textArr.length - 1) {
                        //     textRender.push(<span key={i + ','}>,</span>);
                        // }
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
                            textRender.push(<Tag key={i} color="green" style={{ fontSize: "8pt", fontWeight: "bold" }}>{item.text}</Tag>);
                        }
                        else if (item.state === "remove") {
                            textRender.push(<Tag key={i} color="red" style={{ fontSize: "8pt", fontWeight: "bold" }}>{item.text}</Tag>);
                        }
                        else {
                            textRender.push(<Tag key={i} color="black" style={{ fontSize: "8pt", fontWeight: "bold" }}>{item.text}</Tag>);
                        }
                        // if (i !== textRenderStateArr.length - 1) {
                        //     textRender.push(<span key={i + ','}>,</span>);
                        // }
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

    createColumnGroupSecond = (group) => {
        let dt = [];
        let smallGroup = _.toArray(this.createGroupCDR(group, 2));
        for (let i = 0; i < smallGroup[0].length; i++) {
            dt.push({
                title: `${smallGroup[0][i].cdr}`,
                dataIndex: `${smallGroup[0][i].cdr}`,
                key: `${smallGroup[0][i].cdr}`,
                align: "center",
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
                title: 'HK', width: 100, dataIndex: 'hocky', key: 'hocky',
            },
            {
                title: 'Học phần', width: 100, dataIndex: 'hocphan', key: 'hocphan',
            },
            {
                title: 'GV trưởng nhóm', width: 100, dataIndex: 'gvtruongnhom', key: 'gvtruongnhom',
            },
        ];

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

    showPreview = () => {
        return (
            <PreviewMatrix isShow={true} />
        )
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    showModal = () => {
        this.setState({
            isShow: true,
        });
    }

    showAA = () => {
        const A = document.getElementsByTagName('table')[0];
        if(!_.isEmpty(A)){
            if(A.getAttribute('id') !== "table-to-xls"){
                A.setAttribute('id', "table-to-xls");
            }
        }
    }

    render() {
        const { isLoading, isShow } = this.state;
        return (
            this.props.editMatrix && <React.Fragment>
                {
                    !isLoading
                    && !_.isEmpty(this.props.dataMatrix)
                    && <div style={{ margin: "10px" }}>
                        {this.showAA()}
                        <div style={{ marginBottom: "10px" }}>
                            <span className="adding-text"><Icon type="plus-square" />: Thêm</span>

                            <span style={{ marginLeft: "30px" }} className="removing-text"><Icon type="close-square" />: Xóa</span>

                            <span style={{ marginLeft: "30px" }} className="no-action-text"><Icon type="minus-square" />: Không đổi</span>
                        </div>
                        {/* <button className="btn btn-outline-warning"
                            onClick={this.showModal}
                        >Export Matrix</button> */}
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download as XLS" 
                        />
                        <Table
                            ref="Progress1"
                            bordered
                            columns={this.createColumn(this.props.dataMatrix)}
                            dataSource={this.createData(this.props.dataMatrix)}
                            scroll={{ x: 1500 }}
                        />
                    </div>
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