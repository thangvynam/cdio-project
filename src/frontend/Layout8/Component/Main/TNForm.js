import React, { Component } from 'react';
import { Form } from 'antd';
import TNFormItem from '../Right/TNFormItem';

const WrappedCDRForm = Form.create({ name: 'TNForm' })(TNFormItem);
class TNForm extends Component {

    render() {
        return (
            <WrappedCDRForm monhoc={this.props.monhoc}/>
        )
    }
}
export default TNForm;