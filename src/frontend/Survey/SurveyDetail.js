import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Button, Icon } from 'antd';

import FormSurvey from "./FormSurvey";
import SurveyDetailForm from "./SurveyDetailForm"
import { getLevel, getPos } from '../utils/Tree';
import "./Survey.css";
import TableSurvey from './TableSurvey';
import { timingSafeEqual } from 'crypto';

class Node {
    constructor(data) {
        this.data = data;
        this.children = [];
    }
}


class SurveyDetail extends Component{ 

    constructor(props){
        super(props);
        this.state = {
            tree: [],
        }
    }

    componentDidMount() {
        let tree = [];
        
        axios.get("/get-data-survey").then((res) => {
            res.data.forEach(element => {
                let level = getLevel(element.keyRow);
                let pos0 = getPos(element.keyRow, 0);
                let pos1 = getPos(element.keyRow, 1);
                let pos2 = getPos(element.keyRow, 2);
                let pos3 = getPos(element.keyRow, 3);

                const NodeData = {
                    key: '',
                    value: ''
                }

                switch (level) {
                    case 1: {
                        NodeData.key = pos0;
                        NodeData.value = element.nameRow;

                        tree.push(new Node(NodeData));
                        break;
                    }
                    case 2: {
                        tree.forEach(node => {
                            // check identity lv1 
                            if (node.data.key === pos0) {
                                NodeData.key = pos0 + "." + pos1;
                                NodeData.value = element.nameRow;

                                node.children.push(new Node(NodeData))
                            }
                        })
                        break;
                    }
                    case 3: {
                        tree.forEach(node => {
                            // check identity lv1 
                            if (node.data.key === pos0) {
                                node.children.forEach(node2 => {
                                    if (pos0 + "." + pos1 === node2.data.key) {
                                        NodeData.key = pos0 + "." + pos1 + "." + pos2;
                                        NodeData.value = element.nameRow;
                                        node2.children.push(new Node(NodeData));
                                    }
                                });
                            }
                        })
                        break;
                    }

                    case 4: {
                        tree.forEach(node => {
                            // check identity lv1 
                            if (node.data.key === pos0) {
                                node.children.forEach(node2 => {
                                    if (pos0 + "." + pos1 === node2.data.key) {
                                        node2.children.forEach(node3 => {
                                            if (pos0 + "." + pos1 + "." + pos2 === node3.data.key) {
                                                NodeData.key = pos0 + "." + pos1 + "." + pos2 + "." + pos3;
                                                NodeData.value = element.nameRow;
                                                node3.children.push(new Node(NodeData));
                                            }
                                        })
                                    }
                                });
                            }
                        })
                    }
                    default:
                        break;
                }
            });
            this.setState({ tree: tree })
        })
    }

    genForm() {
        let data = this.state.tree;
        let htmlDOM = [];

        for (let i = 0; i < data.length; i++) {
            const elementLv1 = data[i];

            htmlDOM.push(
                <b><h5>{elementLv1.data.key + ". " + elementLv1.data.value}</h5></b>
            )

            for (let j = 0; j < elementLv1.children.length; j++) {
                const elementLv2 = elementLv1.children[j];

                htmlDOM.push(
                    <b><h5 style={{ "paddingLeft": "1em" }}>{elementLv2.data.key + ". " + elementLv2.data.value}</h5></b>
                )

                for (let k = 0; k < elementLv2.children.length; k++) {
                    const elementLv3 = elementLv2.children[k];
                    const dataChildren = [];

                    htmlDOM.push(
                        <b><h5 style={{ "paddingLeft": "2em" }}>{elementLv3.data.key + ". " + elementLv3.data.value}</h5></b>
                    )

                    for (let h = 0; h < elementLv3.children.length; h++) {
                        const elementLv4 = elementLv3.children[h];

                        dataChildren.push(elementLv4.data.key + "_" + elementLv4.data.value);
                    }

                    htmlDOM.push(
                        <TableSurvey
                            data={dataChildren}
                        />
                    )
                }
            }
        }
        return htmlDOM;
    }

    render() {
    

        return (
            <div className="container1">
                <div className="center-col">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12" >
                                <br />
                                <h1 style={{ textAlign: "center" }}>Câu hỏi khảo sát</h1>
                                <SurveyDetailForm subjectName={this.props.subjectName}
                                subjectId = {this.props.subjectId}
                                />
                                <br />
                                <div style={{ paddingLeft: "1em" }}>
                                    {this.genForm()}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyDetail);