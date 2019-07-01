import React, { Component } from 'react';
import { Form } from 'antd';
import DGFormItem from '../Right/DGFormItem';

const WrappedCDRForm = Form.create({ name: 'DGForm' })(DGFormItem);
class DGForm extends Component {

    render() {
        return (
            <WrappedCDRForm monhoc={this.props.monhoc} ctdt={this.props.ctdt}/>
        )
    }
}
export default DGForm;