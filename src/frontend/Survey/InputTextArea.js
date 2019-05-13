import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';

import { CHANGE_VALUE_DESCRIPTION_SURVEY } from '../Constant/ActionType';

let myMap = new Map();

class InputTextArea extends Component {
    
    onChange = (e, key) => {
        const value = e.target.value;
        myMap.set(key,value);
        this.props.changeValueDescription();
    }

    render() {
        return (
            <div>
                 <TextArea 
                    onChange={(e,id) => { this.onChange(e, this.props.id )}}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeValueDescription: () => {
            dispatch({ type: CHANGE_VALUE_DESCRIPTION_SURVEY, data: myMap })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InputTextArea);