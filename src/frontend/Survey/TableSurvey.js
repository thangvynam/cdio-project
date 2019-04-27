import React, { Component } from 'react';
import { Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const dataColumns = ['Tên chi tiết', 'I/T/U', 'Hoạt động giảng dạy và đánh giá'];
const levelsOptions = ["I", "T", "U"];

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
            template.push(
                <tr>
                    <td>{column}</td>
                    <td>
                        <Checkbox.Group 
                            options={levelsOptions} 
                            //onChange={this.onLevelsChange} 
                            style={{ width: "100%" }}>
                        </Checkbox.Group>
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

export default TableSurvey;