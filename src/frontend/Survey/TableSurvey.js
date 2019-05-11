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
        const dataITU = this.props.resultITU;
        // console.log(dataITU)
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
                        />
                    </td>
                    <td>
                        <TextArea onChange={this.handleDesInputChange}/>
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