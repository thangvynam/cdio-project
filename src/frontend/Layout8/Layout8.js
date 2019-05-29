import React, { Component } from 'react';
import TNForm from './Component/Main/TNForm';
import TNTableItem from './Component/Table/TNTableItem';
import { Tooltip, Button } from 'antd';
import { Element } from 'react-scroll';
import LogForm from '../Log/LogForm';

class Layout8 extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="section-layout">
                    {this.props.isReview === true ? null : <TNForm />}
                </div>
                <div className="section-layout">
                    <Element name="test1" className="element" >
                        <TNTableItem isReview={this.props.isReview} monhoc={this.props.monhoc} />
                    </Element>
                </div>
                <div className="section-layout">
                    <LogForm />
                </div>
            </React.Fragment>

        );
    }
}

export default Layout8;