import React, { Component } from "react";
import "./1.css"
import { Comment, Tooltip, List, Avatar } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
import { IS_LOAD_LOG } from "../../../Constant/ActionType";
import {convertTime} from "../../../utils/Time"

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
            logData: []
        }
    }

    async getData() {
        let data = {
            subjectid: this.props.subjectid,
            // contentTab: this.props.logReducer.contentTab
            contentTab: 'mo-ta-mon-hoc'
        }
        return axios.post(`/get-log`, {data}).then(res => {
            return res.data
        })
    }

    // shouldComponentUpdate(nextState, nextProps) {
    //     if(this.state.logData === [] || this.state.logData === undefined || this.state.logData === null) {
    //         return true;
    //     }
    //     return false
    // }

    async componentDidMount() {
        if (!this.props.logReducer.isLoaded) {
            let data = await this.getData();
            console.log(data);

            this.setState({logData: data})        
            this.props.setFlag(true);   
        }
    }

    render() {
        console.log(this.state.logData);
        
        let LogComment = this.state.logData.map((itemparent, ich) => {
            let con = comment.map((itemchilren, ic) => {
                if(itemchilren.log_id === itemparent.id){
                    return  <ExampleComment content={itemchilren.content}/>;
                }else return;
                }) 
                    return <ExampleComment children={con} 
                        content={itemparent.noi_dung} timestamp={itemparent.thoi_gian}
                        nguoi_gui={itemparent.nguoi_gui}/>
                })
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
    setFlag: (idLoaded) => {
        dispatch({ type: IS_LOAD_LOG, idLoaded });         
      },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogForm);