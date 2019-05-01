import React, { Component } from 'react';
import { connect } from 'react-redux';

class ViewSurvey extends Component {

    render() {

        return (
            <div className="container1">
            View Survey
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSurvey);