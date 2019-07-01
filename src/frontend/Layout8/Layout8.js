import React, { Component } from 'react';
import TNForm from './Component/Main/TNForm';
import TNTableItem from './Component/Table/TNTableItem';
import { Element } from 'react-scroll';
import LogForm from '../Log/LogForm';
import { MENUITEM } from '../Constant/ActionType';

class Layout8 extends Component {
    componentWillMount(){
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <React.Fragment>
                <div className="section-layout">
                    {this.props.isReview === true ? null : <TNForm monhoc={this.props.monhoc}/>}
                </div>
                <div className="section-layout">
                    <Element name="test1" className="element" >
                        <TNTableItem isReview={this.props.isReview} monhoc={this.props.monhoc} />
                    </Element>
                </div>
                <div className="section-layout">
                    <LogForm monhoc={this.props.monhoc} tab={MENUITEM.TAI_NGUYEN_MON_HOC} tabIndex={8}/>
                </div>
            </React.Fragment>

        );
    }
}

export default Layout8;