import React, { Component } from 'react';
import { Form } from 'antd';
import MenuMota from '../Right/MenuMoTa';

const WrappedRegistrationForm = Form.create({ name: 'register' })(MenuMota); 
class FormMoTa extends Component {
    state = {
        step : 0
    }
    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
        return step;
    }
    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
        return step;
    }   
    render() {
        const {step} = this.state;
        switch(step) {
            default:
                return <WrappedRegistrationForm 
                            nextStep={this.nextStep} 
                            prevStep={this.prevStep}
                            step={step}
                            />
        }
    }
}

export default FormMoTa;