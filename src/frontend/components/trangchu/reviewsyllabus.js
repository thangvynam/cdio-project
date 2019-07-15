import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ThongTinChung from '../../Layout1/thong-tin-chung';
import Layout2 from '../../Layout2/Layout2'
import Layout3 from '../../Layout3/Layout3'
import Layout4 from '../../Layout4/Layout4'
import Layout5 from '../../Layout5/Layout5'
import Layout6 from '../../Layout6/Layout6'
import Layout7 from '../../Layout7/Layout7'
import Layout8 from '../../Layout8/Layout8'
import Layout9 from '../../Layout9/Layout9'
class ReviewSyllabus extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {


        return (
            <div>
                {<div style={{textAlign: "center"}}><h1>Thông tin chung</h1><ThongTinChung isReview={true} idMH={this.props.idMH} /></div>}
                {<div style={{textAlign: "center"}}><h1>Mô tả</h1><Layout2 isReview={true} monhoc={this.props.idMH} ctdt={this.props.ctdt}/></div>}
                {<div style={{textAlign: "center"}}><h1>Mục tiêu môn học</h1><Layout3 isReview={true} monhoc={this.props.idMH} id_ctdt={this.props.ctdt}/></div>}
                {<div style={{textAlign: "center"}}><h1>Chuẩn đầu ra môn học</h1><Layout4 isReview={true} monhoc={this.props.idMH} ctdt={this.props.ctdt}/></div>}
                {<div style={{textAlign: "center"}}><h1>Kế hoạch giảng dạy lý thuyết</h1><Layout5 isReview={true} monhoc={this.props.idMH} ctdt={this.props.ctdt}/></div>}
                {<div style={{textAlign: "center"}}><h1>Kế hoạch giảng dạy thực hành</h1><Layout6 isReview={true} monhoc={this.props.idMH} ctdt={this.props.ctdt}/></div>}
                {<div style={{textAlign: "center"}}><h1>Đánh giá</h1><Layout7 isReview={true} monhoc={this.props.idMH} ctdt={this.props.ctdt}/></div>}
                {<div style={{textAlign: "center"}}><h1>Tài nguyên môn học</h1><Layout8 isReview={true} monhoc={this.props.idMH} ctdt={this.props.ctdt}/></div>}
                {<div style={{textAlign: "center"}}><h1>Quy định chung</h1><Layout9 isReview={true} monhoc={this.props.idMH} ctdt={this.props.ctdt}/></div>}
            </div>)
    }
}
const mapStateToProps = (state) => {
    return {
        subjectId: state.subjectid
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewSyllabus);

