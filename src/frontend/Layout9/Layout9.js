import React, { Component } from 'react';
import MainForm from './Component/Main/MainForm';
import { Element } from "react-scroll";
import TableItem from "./Component/Table/TableItem";
import LogForm from './Component/Log/LogForm';

class Layout9 extends Component {
  render() {
    const items = [...Array(100)].map((val, i) => `Item ${i}`);
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-1" ></div>
          <div className="col-sm-11">
            <br />
            <h2 style={{ textAlign: "center" }}>
              CÁC QUY ĐỊNH CHUNG
                </h2>
            <MainForm />
            <br /><br />
            <LogForm/>
            <Element name="test1" className="element">
              <TableItem />
            </Element>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout9;

// import moment from 'moment';
// import React, { Component } from 'react';
// import {
//   Comment, Avatar, Form, Button, List, Input,
// } from 'antd';

// const TextArea = Input.TextArea;

// const CommentList = ({ comments }) => (
//   <List
//     dataSource={comments}
//     header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//     itemLayout="horizontal"
//     renderItem={props => <Comment {...props} />}
//   />
// );

// const Editor = ({
//   onChange, onSubmit, submitting, value,
// }) => (
//   <div>
//     <Form.Item>
//       <TextArea rows={4} onChange={onChange} value={value} />
//     </Form.Item>
//     <Form.Item>
//       <Button
//         htmlType="submit"
//         loading={submitting}
//         onClick={onSubmit}
//         type="primary"
//       >
//         Add Comment
//       </Button>
//     </Form.Item>
//   </div>
// );

// class Layout9 extends React.Component {
//   state = {
//     comments: [],
//     submitting: false,
//     value: '',
//   }

//   handleSubmit = () => {
//     if (!this.state.value) {
//       return;
//     }

//     this.setState({
//       submitting: true,
//     });

//     setTimeout(() => {
//       this.setState({
//         submitting: false,
//         value: '',
//         comments: [
//           {
//             author: 'Han Solo',
//             avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//             content: <p>{this.state.value}</p>,
//             datetime: moment().fromNow(),
//           },
//           ...this.state.comments,
//         ],
//       });
//     }, 1000);
//   }

//   handleChange = (e) => {
//     this.setState({
//       value: e.target.value,
//     });
//   }

//   render() {
//     const { comments, submitting, value } = this.state;

//     return (
//       <div style ={{margin : "20px"}}>
//         {comments.length > 0 && <CommentList comments={comments} />}
//         <Comment
//           avatar={(
//             <Avatar
//               src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
//               alt="Han Solo"
//             />
//           )}
//           content={(
//             <Editor
//               onChange={this.handleChange}
//               onSubmit={this.handleSubmit}
//               submitting={submitting}
//               value={value}
//             />
//           )}
//         />
//       </div>
//     );
//   }
// }

// export default Layout9;
