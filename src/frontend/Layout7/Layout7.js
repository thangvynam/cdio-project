import React, { Component } from 'react';
import DGForm from './Component/Main/DGForm';
import DGTableItem from './Component/Table/DGTableItem';
import { Tooltip, Button } from 'antd';
import { Element } from 'react-scroll';
import LogForm from '../Log/LogForm';
import { MENUITEM } from '../Constant/ActionType';

class Layout7 extends Component {
    componentWillMount(){
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <React.Fragment>
                <div className="section-layout">
                    {this.props.isReview === true ? null : <DGForm monhoc={this.props.monhoc} ctdt={this.props.ctdt}/>}
                </div>
                <div className="section-layout">
                    <Tooltip placement="topLeft">
                        <Button style={{ color: "red", margin: "auto", width: "100%", height: "50px" }}>(Mô tả các thành phần bài tập, bài thi, đồ án... dùng để đánh giá kết quả của sinh viên khi tham gia môn học này. <br /> Bên cạnh mỗi nhóm bài tập, bài thi... cần có tỉ lệ % điểm tương ứng) </Button>
                    </Tooltip>
                    <Element name="test1" className="element" >
                        <DGTableItem isReview={this.props.isReview} monhoc={this.props.monhoc} ctdt={this.props.ctdt} />
                    </Element>
                </div>
                <div className="section-layout">
                    <LogForm monhoc={this.props.monhoc} tab={MENUITEM.DANH_GIA} id_ctdt={this.props.ctdt} tabIndex={7}/>
                </div>
            </React.Fragment>
        );
    }
}

export default Layout7;