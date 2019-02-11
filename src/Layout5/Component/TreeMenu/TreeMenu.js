import React, { Component } from 'react';
import { connect } from 'react-redux';

import Item from './Item';
import Tree from 'react-animated-tree';

const treeStyles = {
    top: 40,
    left: 40,
    width: '100%'
}

class TreeMenu extends Component {
    
    render() {
        return (
            <div className="container">
                {
                    Object.keys(this.props.treeMenuReducer.tab).map(function(key,index) {
                    return (
                        <Tree key={index} content={<Item name={this.props.treeMenuReducer.tab[key]}/>} style={treeStyles} canHide >
            
                        </Tree>)
                    }.bind(this))
                }
            </div>
            // <Tree content="main" type="ITEM" open style={treeStyles}>
            //     <Tree content="hello" type={<span style={typeStyles}>🙀</span>} canHide />
            //     <Tree content="subtree with children" canHide>
            //         <Tree content="hello" />
            //         <Tree content="sub-subtree with children">
            //             <Tree content="child 1" style={{ color: '#63b1de' }} />
            //             <Tree content="child 2" style={{ color: '#63b1de' }} />
            //             <Tree content="child 3" style={{ color: '#63b1de' }} />
            //         </Tree>
            //         <Tree content="hello" />
            //     </Tree>
            //     <Tree content="hello" canHide />
            //     <Tree content="hello" canHide />
            // </Tree>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        treeMenuReducer: state.treeMenuReducer
    }
}

export default connect(mapStateToProps, null)(TreeMenu);