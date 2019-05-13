import React, { Component } from 'react';
import { Checkbox } from 'antd';
import { connect } from 'react-redux';

import { CHANGE_VALUE_ITU_SURVEY } from '../Constant/ActionType';
import _ from 'lodash';

const levelsOptions = ["I", "T", "U"];
let myMap = new Map();

class CheckboxSurvey extends Component {
    onChange = (value, key) => {
        myMap.set(key, value);
        this.props.changeValueITU();
    }

    render() {
        let defaultValue = '';

        if (this.props.defaultValue) {
            defaultValue = Array.from(this.props.defaultValue.split(','))
            defaultValue = defaultValue.splice(0, defaultValue.length - 1)
        }
        return (
            _.isEmpty(defaultValue) ?
                <Checkbox.Group
                    options={levelsOptions}
                    onChange={(e, id) => { this.onChange(e, this.props.id) }}
                    style={{ width: "100%" }}>
                </Checkbox.Group> :
                <Checkbox.Group
                    disabled
                    defaultValue={defaultValue}
                    options={levelsOptions}
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
        changeValueITU: () => {
            dispatch({ type: CHANGE_VALUE_ITU_SURVEY, data: myMap })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxSurvey);