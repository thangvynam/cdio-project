import React, { Component } from 'react'
import {MENUITEM, subjectList} from '../../Constant/ActionType';
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Icon, Modal, message, List, Avatar, Row, Col, Popconfirm, Input, Form} from 'antd';
import { Link } from "react-router-dom";
import Page404 from '../../NotFound/Page404';
import { subjectListReducer } from '../../Reducers/subjectListReducer';
import './content.css';

const EditableContext = React.createContext();

class Content extends Component {

    state = { visible: false, isEditting: "" }
    addSubject = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        let input = document.getElementById("subject-name").value;
        if(input === "" || input === undefined) {
           message.warning("Chưa nhập tên!")
        }
        else {
            let type = this.props.content_type;
            const data = this.props.subjectList;
            const item = {
                title: input
            }
            data[type].push(item);
            this.props.updateSubjectList(data);
        }
        this.setState({
            visible: false,
          });
        
      }
    
      handleCancel = (e) => {
        this.setState({
            visible: false,
        });
      }
      handleDelete = (id) => {
        let type = this.props.content_type;
       
        if (id !== -1) {
            const data = this.props.subjectList;
            data[type].splice(id, 1);
            this.props.updateSubjectList(data);
            this.setState({
                visible: false,
                });
        }
      }

      edit = (id) => {
        this.setState({
            isEditting: id,
        });
      }

      save = (id) => {
        let value = document.getElementById("subject-name-edit").value;
        let type = this.props.content_type;
        const data = this.props.subjectList;
        data[type][id].title = value;
        this.props.updateSubjectList(data);
        this.setState({
            isEditting: "",
        });
      }
      
      cancel = () => {
        this.setState({
            isEditting: "",
        });
      }
    render() { 
        var subjectList;
        let type = this.props.content_type;
        let isExist = 0;
        for(let i = 0;i < Object.keys(this.props.subjectList).length;i++) {
            if(type === Object.keys(this.props.subjectList)[i]) {
                subjectList = this.props.subjectList[type];
                isExist = 1;
                break;
            }
        }
        if(isExist === 0) {
            return <Page404/>;
        }

        return (
            <React.Fragment>
                <div>
                <Modal
          title="Nhập tên môn học"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="OK"
          cancelText="Cancel"
          centered
          destroyOnClose={true}
        >
        <p>Tên môn học: </p>
            <Input autoFocus="true" style={{width: "100%"}} id="subject-name"/>
        </Modal>
        <List
    itemLayout="horizontal"
    dataSource={subjectList}
    renderItem={(item, id) => (
        <Row>
            <div style={{height: "10px"}}></div>
                <Col span={1} className="col-left">
                </Col>
                <Col span={22} className="col-left">
                
                <div className="list-border" style={{borderRadius: "12px"}}>
        
      <List.Item actions={!this.state.isEditting ? [<a href="#a" onClick={() => this.edit(id)} style={{fontSize: "12pt"}}>Sửa</a>, 
      <Popconfirm title="Xác nhận xóa?" onConfirm={() => this.handleDelete(id)}>
                  <a href="#a">Xóa</a>
                </Popconfirm>] : [
                    <EditableContext.Consumer>
                      {form => (
                        <a
                          href="#a"
                          onClick={() => this.save(id)}
                          style={{ marginRight: 8 }}
                        >
                          Save
                        </a>
                      )}
                    </EditableContext.Consumer>,
                    <Popconfirm
                      title="Hủy bỏ?"
                      onConfirm={() => this.cancel()}
                    >
                      <a href="#a">Cancel</a>
                    </Popconfirm>
                ]}>
        <List.Item.Meta
          avatar={<Avatar src="https://cdn2.vectorstock.com/i/1000x1000/99/96/book-icon-isolated-on-white-background-vector-19349996.jpg" />}
          title={this.state.isEditting !== id ? 
          <Link style={{fontSize: "25pt"}}to={`${this.props.content_type}/${id}/thong-tin-chung`}>{item.title}</Link>
          : <Input defaultValue={item.title} id="subject-name-edit"/>
        }
        />
      </List.Item>
      </div>
      
      </Col>
      </Row>
    )}
  />
  <Row>
            <div style={{height: "10px"}}></div>
                <Col span={1} className="col-left">
                </Col>
                
            <Button onClick={this.addSubject} style={{width: "30%", alignContent: "center"}}><Icon type="plus" />New</Button>
            </Row>
            </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        subjectList: state.subjectlist
    }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateSubjectList: subjectList,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);
