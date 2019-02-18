import React, { Component } from 'react';
import { Button } from 'antd/lib/radio';
import axios from 'axios';
class ExportFile extends Component {
    export = () => {
        axios.get('/export-file').then(res => {
          console.log(res);
        })
    }
    render() {
        return (
            <Button onClick={this.export}>Export</Button>
        );
    }
}

export default ExportFile;