import React, { Component } from "react";
import { Table, Divider, Tag, Row, Col, Button, Icon } from 'antd';
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
                <ThongTinChung isReview={true} idMH={this.props.idMH} />
                <Layout2 isReview={true} />
                <Layout3 isReview={true} />
                <Layout4 isReview={true} />
                <Layout5 isReview={true} />
                <Layout6 isReview={true} />
                <Layout7 isReview={true} />
                <Layout8 isReview={true} />
                <Layout9 isReview={true} />
            </div>)
    }
}
const mapStateToProps = (state) => {
    return {
        teacherlist: state.teacherlist,
        subjectId: state.subjectid
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewSyllabus);

