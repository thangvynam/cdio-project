import React, { Component } from 'react';
import FormMoTa from './Component/Main/FormMoTa';
import { Tooltip, Button } from 'antd';
import TableItem from './Component/Table/TableItem';
import LogForm from '../Log/LogForm';
import { MENUITEM } from '../Constant/ActionType';

class Layout2 extends Component {
    componentWillMount(){
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <React.Fragment>
                <div className="section-layout">
                    {this.props.isReview === true ? null : <FormMoTa monhoc={this.props.monhoc} id_ctdt={this.props.id_ctdt}/>}
                </div>
                <div className="section-layout">
                <Tooltip placement="topLeft" >
                        <Button style={{ color: "red", margin: "auto", width: "100%" }}>
                            (Hướng dẫn: một đoạn văn mô tả tóm tắt về nội dung của môn học)
                            </Button>
                    </Tooltip>
                    <TableItem isReview={this.props.isReview} monhoc={this.props.monhoc} id_ctdt={this.props.id_ctdt}/>
                </div>

                <div className="section-layout">
                    <LogForm monhoc={this.props.monhoc} tab={MENUITEM.MO_TA_MON_HOC} id_ctdt={this.props.id_ctdt} tabIndex={2}/>
                </div>
            </React.Fragment>
        );
    }
}
export default Layout2;