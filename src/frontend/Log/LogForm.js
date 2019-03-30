import React, { Component } from "react";
import "./1.css"
import { Comment, Tooltip, List, Avatar } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
import { IS_LOAD_LOG, SAVE_LOG_DATA } from "../Constant/ActionType"
import {convertTime} from "../utils/Time"

const ExampleComment = ({ children, content, timestamp, nguoi_gui }) => (
    <Comment 
        actions={[<span>Reply to</span>]}
        author={<a>{nguoi_gui}</a>}
        datetime={timestamp ? <b style={{color: "red"}}>{convertTime(timestamp)}</b>: ""}
        avatar={(
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
            />
        )}
        content={<p>{content}</p>}
    >
        {children}
    </Comment>
);

  
const log = [
    {
        key:1,
        id: 1,
        logContent : "log1",
    },
    {
        key:2,
        id: 2,
        logContent : "log2",
    }
]

const comment = [
    {
        key:1,
        id : 1,
        log_id : 1,
        content : "comment1",
    },
]

class LogForm extends Component {

    constructor (props) {
        super(props)
        this.state = {
            logData: [],
            contentTab: "",
            count: 0,
        }
    }

    async componentWillReceiveProps(nextProps) { 
        let count = this.state.count;
        if(count <= 5) {
            this.setState({contentTab: nextProps.logReducer.contentTab, count: count + 1})   
            let data = await this.getData(nextProps.logReducer.contentTab);
            this.props.saveLoad(data, nextProps.logReducer.contentTab, this.props.subjectid); 
        }               
              
    }

    async getData(contentTab) {        
        let data = {
            subjectid: this.props.subjectid,
            contentTab: contentTab
        }              
        return axios.post(`/get-log`, {data}).then(res => {
            return res.data
        })
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
            case "chuan-dau-ra": {
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
            default: 
                return null
        }
    }

    render() {
        let data = this.getDataReducer()
        let LogComment = <div></div>
        if (data) {
            data.sort((a,b) => {
                return b.thoi_gian - a.thoi_gian
            })        
            LogComment = data.map((itemparent, ich) => {
                let con = comment.map((itemchilren, ic) => {
                    if(itemchilren.log_id === itemparent.id){
                        return  <ExampleComment content={itemchilren.content}/>;
                    }else return;
                    }) 
                        return <ExampleComment children={con} 
                            content={itemparent.noi_dung} timestamp={itemparent.thoi_gian}
                            nguoi_gui={itemparent.nguoi_gui}/>
                    })
        }
        
        return (
            <div className="container1">
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogForm);