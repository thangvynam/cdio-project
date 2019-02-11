import React, { Component } from 'react';
import { connect } from 'react-redux';

import { REMOVE_ITEM } from '../../Constant/ActionType';
import { SHOW_TITLE } from '../../Constant/ActionType';
const styles = {
    paddingLeft: "10px",
    cursor : "pointer"
}
class Item extends Component {
    
    render() {
        return (
            <span onClick={this.props.show}>
                <span>{this.props.name}</span>
                <i className="fa fa-times" aria-hidden="true"  style={styles} onClick={this.props.removeItem}></i>
            </span>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeItem: () => {
            dispatch({type:REMOVE_ITEM,name:ownProps.name })
        },
        show:() => {
            dispatch({type:SHOW_TITLE,name:ownProps.name })
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);