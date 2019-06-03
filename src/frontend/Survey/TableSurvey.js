import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckboxSurvey from './CheckboxSurvey';
import InputTextArea from './InputTextArea';

const dataColumns = ['Tên chi tiết', 'I/T/U', 'Hoạt động giảng dạy và đánh giá'];

class TableSurvey extends Component {

    tableHeaders() {
        return (
            <tr>
                {dataColumns.map(function (column) {
                    return <th style={{ width: "33%" }}>{column}</th>;
                })}
            </tr>
        );
    }

    tableBody() {
        const data = this.props.data;
        let dataITU = [];
        dataITU = this.props.resultITU;;
        let isDone = false;
        if (dataITU !== null) {
            if(dataITU.length > 0) {
                isDone = true
            }
        }
       
        let template = [];

        data.map(function (column) {
            let key = column.split('_')[0];
            let value = column.split('_')[1];
            let valueOfKey ;
            if(dataITU){
               valueOfKey= Object.keys(dataITU).find(item => dataITU[item].id===key)
            }
            
            template.push(
                <tr>
                    <td>{value}</td>
                    <td>
                        <CheckboxSurvey 
                            id = {key}
                            defaultValue = {valueOfKey ? dataITU[valueOfKey].value : null}
                            isDone = {isDone}
                        />
                    </td>
                    <td>
                        <InputTextArea 
                            id = {key}
                        />
                    </td>
                </tr>
            );
        })
        return template;
    }

    render() {
        return (
            <div>
                <table className="table table-bordered table-hover" width="100%" style={{ "marginLeft": "3em" }} >
                    {this.tableHeaders()}
                    {this.tableBody()}
                </table>
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
        saveAll: () => {
            
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableSurvey);