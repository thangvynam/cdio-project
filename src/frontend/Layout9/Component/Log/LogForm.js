import React, { Component } from "react";
import "./1.css"
import { Comment, Tooltip, List, Avatar } from 'antd';
import moment from 'moment';

const ExampleComment = ({ children, content }) => (
    <Comment
        actions={[<span>Reply to</span>]}
        author={<a>{"phu itto"}</a>}
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
        id: 1,
        logContent : "log1",
    },
    {
        id: 2,
        logContent : "log2",
    }
]

const comment = [
    {
        id : 1,
        log_id : 1,
        content : "comment1",
    },
    {
        id : 2,
        log_id:2,
        content : "comment2",
    },
    {
        id: 3,
        log_id: 2,
        content : "comment3"
    },
    {
        id:4,
        log_id:1,
        content: "comment4"
    }
]

class LogForm extends Component {
    render() {
        
        let LogComment = log.map((itemparent, ich) => {
            let con = comment.map((itemchilren, ic) => {
                if(itemchilren.log_id === itemparent.id){
                    return  <ExampleComment content={itemchilren.content}/>;
                }else return;
                }) 
                console.log(itemparent.content)
                    return <ExampleComment children={con} content={itemparent.logContent}/>
                })
        return (
            <div className="container1">
                <div className="center-col">
                {LogComment}
                    {/* <div>
                        {rootComments}
                    </div> */}
                    {/* <ExampleComment>
                        <ExampleComment></ExampleComment>
                    </ExampleComment>
                    <ExampleComment></ExampleComment> */}




                    {/* <List
                        className="comment-list"
                        header={`${data.length} actions`}
                        itemLayout="horizontal"
                        dataSource={data}
                        style={{ marginLeft: 20 }}
                        renderItem={item => (
                            <Comment
                                actions={item.actions}
                                author={item.author}
                                avatar={item.avatar}
                                content={item.content}
                                datetime={item.datetime}
                                
                            />

                        )}
                    /> */}
              </div>
            </div>
        )
    }
}

export default LogForm;