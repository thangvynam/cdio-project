import React, { Component } from 'react';
import MainForm from '../Layout9/Component/MainForm/MainForm';

class Layout9 extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2" >
                    </div>
                    <div className="col-sm-10" >
                        <MainForm/>
                        <br />
                        <h1>CÁC QUY ĐỊNH CHUNG</h1>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout9;