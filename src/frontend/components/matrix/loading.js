import React, { Component } from 'react';
import { Spin, Icon } from 'antd';
import './loading-page.css';
class LoadingPage extends Component {
    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 80 }} spin />;
        // <Spin indicator={antIcon} />
        return (
            <div className="loading-page">
                <Spin  tip="Loading..." indicator={antIcon} />
            </div>
        )
    }
}

export default LoadingPage;