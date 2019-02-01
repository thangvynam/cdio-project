import React, { Component } from 'react';
import './App.css';
import RegistrationForm from './Component/Right-Layout/RegistrationForm'
import { Form } from 'antd';
const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm); 

class App extends Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm-2" >
            
          </div>
          <div class="col-sm-10" >
            <WrappedRegistrationForm />
          </div>
        </div>
      </div>
     
    );
  }
}

export default App;
