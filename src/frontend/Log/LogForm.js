import React, { Component } from "react";
import "./1.css"
import { connect } from 'react-redux';
import $ from './../helpers/services'
import { Form, Button, Input } from 'antd';
import { SAVE_LOG_DATA, SAVE_COMMENT } from "../Constant/ActionType"
import CommentLog from "../Comment/Comment"
import { getCurrTime } from "../utils/Time";
const TextArea = Input.TextArea;
let firstCollect = false;

class LogForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            logData: [],
            contentTab: "",
            count: 0,
        }
    }

    async componentWillReceiveProps(nextProps) {
        let count = this.state.count;
        if (count <= 2) {
            this.setState({ contentTab: this.props.tab, count: count + 1 })
            let data = await this.getData(this.props.tab);
            this.props.saveLoad(data, this.props.tab, this.props.monhoc);
        }

    }

    async getData(contentTab) {
        let data = {
            subjectid: this.props.monhoc,
            contentTab: contentTab,
            id_ctdt: this.props.id_ctdt
        }

        return $.getLog({ data }).then(res => {
            return res.data
        })
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    submit = () => {
         this.props.saveComment(this.props.logReducer.idLog, this.state.value);
    }

    componentDidMount() {
        if (!firstCollect) {
            firstCollect = true;
            this.props.getComment();
        }

    }

    getDataReducer() {
        let data = this.props.logReducer
        switch (this.state.contentTab) {
            case "thong-tin-chung": {
                return data.logData1
            }
            case "mo-ta-mon-hoc": {
                return data.logData2
            }
            case "muc-tieu-mon-hoc": {
                return data.logData3
            }
            case "chuan-dau-ra-mh": {
                return data.logData4
            }
            case "giang-day-ly-thuyet": {
                return data.logData5
            }
            case "giang-day-thuc-hanh": {
                return data.logData6
            }
            case "danh-gia": {
                return data.logData7
            }
            case "tai-nguyen-mon-hoc": {
                return data.logData8
            }
            case "quy-dinh-chung": {
                return data.logData9
            }
            case "review": {
                let tabLogString = `logData${this.props.tabIndex}`;
                return data[tabLogString];
            }
            default:
                return null
        }
    }

    render() {
        let data = this.getDataReducer()
        let LogComment = <div></div>
        if (this.props.logReducer.renderComment || !this.props.logReducer.renderComment) {

            if (data) {
                try {
                    data.sort((a, b) => {
                        return b.thoi_gian - a.thoi_gian
                    })
                } catch (error) {
                    return error
                }
                LogComment = data.map((itemparent, ich) => {
                    let con = this.props.logReducer.logComment2.map((itemchilren, ic) => {
                        if (itemchilren.log_id === itemparent.id) {
                            return <CommentLog content={itemchilren.content} hasReply={false}
                                nguoi_gui={itemchilren.nguoi_gui} timestamp={itemchilren.thoi_gian} />;
                        } else return;
                    })
                    if (itemparent.id === this.props.logReducer.idLog) {
                        con.push(<div>
                            <Form.Item>
                                <TextArea rows={4} onChange={this.handleChange} />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    onClick={this.submit}
                                    type="primary"
                                >
                                    Add Comment
                              </Button>
                            </Form.Item>
                        </div>
                        );
                    }
                    return <CommentLog children={con}
                        content={itemparent.noi_dung} timestamp={itemparent.thoi_gian}
                        nguoi_gui={itemparent.nguoi_gui} id={itemparent.id}
                        hasReply={true} />
                })
            }
        }
        return (
            <div className="">
                <div className="center-col">
                    {LogComment}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        subjectid: state.subjectid,
        logReducer: state.logReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveLoad: (data, contentTab, subjectid) => {
            dispatch({ type: SAVE_LOG_DATA, data, contentTab, subjectid });
        },
        saveComment: (logID, content) => {
            const obj = {
                log_id: logID,
                nguoi_gui: JSON.parse(localStorage.getItem('user')).data.Name,
                content: content,
                thoi_gian: getCurrTime(),
            }
            
            $.addComment({ data: obj })
                .then(res => {
                })

            dispatch({ type: SAVE_COMMENT, obj: obj });
        },
        getComment: () => {
            $.getComment()
                .then(res => {
                    let data = res.data;

                    if (data != null) {
                        for (let obj of data) {
                            const sample = {
                                log_id: obj.log_id,
                                id: obj.id,
                                nguoi_gui: obj.nguoi_gui,
                                content: obj.noi_dung,
                                thoi_gian: obj.thoi_gian,
                            }
                            dispatch({ type: SAVE_COMMENT, obj: sample });
                        }
                    }
                });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogForm);