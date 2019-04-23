import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { getLevel } from '../utils/Tree';
import "./Survey.css";

class Survey extends Component {

    Node(data) {
        this.data = data;
        this.parent = null;
        this.children = [];
    }

    Tree(data) {
        var node = new Node(data);
        this._root = node;
    }

    componentDidMount() {
        //this.props.collectDataSurvey();
        axios.get("/get-data-survey").then((res) => {
            console.log(res);
            res.data.forEach(element => {
                console.log(element.keyRow);
                console.log(getLevel(element.keyRow));
            });
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