import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import {Icon} from 'antd';

class loader extends Component {
    render() {
        switch(this.props.loading){
            case -1: 
                return null;
            case 0 :
                return (
                    <Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
                );
            case 1 :
                return (
                    <span>
                        <Icon type="check" style={{ fontSize: '2em', color: '#08c' }} theme="outlined"/> Đã hoàn tất việc xuất file
                    </span>
                )
            default :
                return null;
                 
        }
    }
}

export default loader;