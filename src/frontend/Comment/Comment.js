import React, { Component } from 'react';
import { Avatar, Comment ,Form, Button, Input,} from 'antd';
import { convertTime } from "../utils/Time";
import { connect } from 'react-redux';
import {SHOW_INPUT_COMMENT} from '../Constant/ActionType';

class CommentLog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.hasReply) {
            return (
                <div>
                    <Comment
                        actions={[<span onClick={()=>{this.props.showInput()}}>Reply to</span>]}
                        author={<a>{this.props.nguoi_gui}</a>}
                        datetime={this.props.timestamp ? <b style={{ color: "red" }}>{convertTime(this.props.timestamp)}</b> : ""}
                        avatar={(
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt="Han Solo"
                            />
                        )}
                        content={<p>{this.props.content}</p>}
                    >
                        {this.props.children}
                    </Comment>
                </div>
            )
        }
        return (
            <Comment
                author={<a>{this.props.nguoi_gui}</a>}
                datetime={this.props.timestamp ? <b style={{ color: "red" }}>{convertTime(this.props.timestamp)}</b> : ""}
                avatar={(
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                    />
                )}
                content={<p>{this.props.content}</p>}
            >
                {this.props.children}
            </Comment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        logReducer: state.logReducer
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showInput: () => {
            console.log(ownProps.id)
            dispatch({ type: SHOW_INPUT_COMMENT, id:ownProps.id });
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentLog);