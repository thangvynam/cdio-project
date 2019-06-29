import React, { Component } from 'react';
import { Checkbox } from 'antd';
import { connect } from 'react-redux';

import { CHANGE_VALUE_ITU_SURVEY } from '../Constant/ActionType';
import _ from 'lodash';

const levelsOptions = ["I", "T", "U"];

class CheckboxSurvey extends Component {
    onChange = (value, key) => {
        if (key !== undefined && value !== undefined) {
            this.props.changeValueITU(key, value);
        }
    }

    render() {
        let defaultValue = '';
        
        if (this.props.defaultValue) {
            defaultValue = Array.from(this.props.defaultValue.split(','))
            defaultValue = defaultValue.splice(0, defaultValue.length - 1)
        }        
        return (
            // _.isEmpty(defaultValue) ?
            //     <Checkbox.Group
            //         options={levelsOptions}
            //         onChange={(e, id) => { this.onChange(e, this.props.id) }}
            //         style={{ width: "100%" }}>
            //     </Checkbox.Group> :
            //     <Checkbox.Group
            //         disabled
            //         value={defaultValue}
            //         options={levelsOptions}
            //         style={{ width: "100%" }}>
            //     </Checkbox.Group>
            this.props.isDone ? 
                <Checkbox.Group
                    disabled
                    value={defaultValue}
                    options={levelsOptions}
                    style={{ width: "100%" }}>
                </Checkbox.Group> :
                <Checkbox.Group
                    defaultValue={defaultValue}
                    options={levelsOptions}
                    onChange={(e, id) => { this.onChange(e, this.props.id) }}
                    style={{ width: "100%" }}>
                </Checkbox.Group>
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
        changeValueITU: (key, value) => {
            dispatch({ type: CHANGE_VALUE_ITU_SURVEY, key, value })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxSurvey);