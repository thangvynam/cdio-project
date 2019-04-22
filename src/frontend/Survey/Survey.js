import React, { Component } from 'react';
import FormSurvey from "./FormSurvey"

class Survey extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-1" >
                    </div>
                    <div className="col-sm-11" >
                        <br />
                        <h1 style={{textAlign: "center"}}>Câu hỏi khảo sát</h1>
                        <FormSurvey />
                    </div>
                </div>
            </div>
        );
    }
}
export default Survey;