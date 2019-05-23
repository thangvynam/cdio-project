import React, { Component } from 'react';
import TNForm from './Component/Main/TNForm';
import TNTableItem from './Component/Table/TNTableItem';
import { Tooltip, Button } from 'antd';
import { Element } from 'react-scroll';
import LogForm from '../Log/LogForm';

class Layout8 extends Component {
  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-1" >
                </div>
                <div className="col-sm-11" >
                    <br/>
                    <h2 style={{textAlign: "center"}}>TÀI NGUYÊN MÔN HỌC</h2>
                    {this.props.isReview === true ? null : <TNForm />}
                    <br />
                    <Element name="test1" className="element" >
                        <TNTableItem isReview={this.props.isReview}/>
                    </Element>
                    <br/>
                    <br/>
                    <LogForm/>
                    <br/>
                </div>
            </div>
        </div>
    );
}
}

export default Layout8;