import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Index extends Component {
    render() {
           return (<Redirect to="/de-cuong-mon-hoc/thong-tin-chung" />);
    }
}
export default Index;