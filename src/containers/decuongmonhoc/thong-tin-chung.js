import React, { Component } from 'react'
import { connect } from 'react-redux';
import PageThongTinChung from './../../components/decuongmonhoc/thong-tin-chung/thong-tin-chung';
import { actAddFail , actAddSuccess, resetStore } from '../../actions/decuongmonhoc/thong-tin-chung';

const mapStateToProps = (state) => {
    return {
        messageError: state.thongTinChung.messageError,
        messageSuccess: state.thongTinChung.messageSuccess,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actAddSuccess: () => dispatch(actAddSuccess()),
        actAddFail: () => dispatch(actAddFail()),
        resetStore: () => dispatch(resetStore())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageThongTinChung);
