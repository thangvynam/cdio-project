import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { getLevel, getPos} from '../utils/Tree';
import "./Survey.css";

function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}

class Survey extends Component {

    componentDidMount() {
        let tree = [];
        //this.props.collectDataSurvey();
        axios.get("/get-data-survey").then((res) => {
            //let tree = new Tree(new Map(1,"root"));
           
            res.data.forEach(element => {
                let level = getLevel(element.keyRow);

                switch (level) {
                    case 1:{
                        
                        let pos = getPos(element.keyRow, 0);

                        const NodeData = {
                            key : '',
                            value : ''
                        }

                        NodeData.key = pos;
                        NodeData.value = element.nameRow;
        
                        tree.push(new Node(NodeData));
                        break;
                    }
                       
                    case 2:{
                        let pos0 = getPos(element.keyRow, 0);
                        let pos1 = getPos(element.keyRow, 1);

                        tree.forEach(node => {
                            // check identity lv1 
                            if (node.data.key === pos0) {
                                const NodeData = {
                                    key : '',
                                    value : ''
                                }
                                
                                NodeData.key = pos1;
                                NodeData.value = element.nameRow;

                                node.children.push(new Node(NodeData))
                            }
                        })

                        break;
                    }

                    default:
                        break;
                }
                
            });
            console.log(tree);
        })
    }

    render() {
        return (       
            <div className="container1">
                <div className="center-col">
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        collectDataSurvey: () => {
            axios.get("/get-data-survey").then((res) => {
                console.log(res);
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Survey);