import React, { Component } from 'react'
import { connect } from 'react-redux';
import PageChuanDauRa from './../../components/decuongmonhoc/chuan-dau-ra/chuan-dau-ra';
import {actThemChuanDauRa} from '../../actions/decuongmonhoc/chuan-dau-ra';

const mapStateToProps = (state) => {
    return {
        dataCDR: state.chuanDauRa.data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actThemChuanDauRa: (newData) => dispatch(actThemChuanDauRa(newData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageChuanDauRa);
