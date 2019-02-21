import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormMoTa from './Component/Main/FormMoTa';
import { Tooltip, Button } from 'antd';

class Layout2 extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-1" >
                    </div>
                    <div className="col-sm-11" >
                        <br />
                        <h1 style={{textAlign: "center"}}>MÔ TẢ MÔN HỌC</h1>
                        <FormMoTa />
                        <br />
                        <Tooltip placement="topLeft" >
                            <Button style={{color: "red", margin: "auto", width: "100%"}}>(Hướng dẫn: một đoạn văn mô tả tóm tắt về nội dung của môn học)</Button>
                        </Tooltip>
                        <Tooltip title="Nội dung mô tả">
                            <span style={{fontSize: "24px", wordWrap: "break-word", whiteSpace: 'pre-line'}}>{this.props.itemLayout2Reducer.description}</span>
                        </Tooltip>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
      itemLayout2Reducer: state.itemLayout2Reducer
    }
  }
export default connect(mapStateToProps, null)(Layout2);