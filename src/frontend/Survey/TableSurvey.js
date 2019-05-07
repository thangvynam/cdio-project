import React, { Component } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { connect } from 'react-redux';
import CheckboxSurvey from './CheckboxSurvey';

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
        let template = [];

        data.map(function (column) {
            let key = column.split('_')[0];
            let value = column.split('_')[1];

            template.push(
                <tr>
                    <td>{value}</td>
                    <td>
                        <CheckboxSurvey 
                            id = {key}
                        />
                    </td>
                    <td>
                        <TextArea />
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