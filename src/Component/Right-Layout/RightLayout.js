import React, { Component } from 'react';
import { connect } from 'react-redux';

class RightLayout extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.rightLayoutReducer.title}</h1>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        rightLayoutReducer: state.rightLayoutReducer
    }
}

export default connect(mapStateToProps, null)(RightLayout);