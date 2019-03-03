import React, { Component } from 'react';
import { Button, Checkbox } from 'antd';
import axios from 'axios';
import CheckboxGroup from "./CheckboxGroup/CheckboxGroup";

const plainOptions = [
    'Thông tin chung',
    'Mô tả môn học',
    'Mục tiêu môn học',
    'Chuẩn đầu ra môn học',
    'Kế hoạch giảng dạy lý thuyết',
    'Kế hoạch giảng dạy thực hành',
    'Đánh giá ',
    'Tài nguyên môn học',
    'Các quy định chung',
];

class ExportFile extends Component {
    state = {
        indeterminate: true,
        checkAll: false,
        selectedItem : []
    }
    export = () => {
        let myMap = new Map(); 
        this.state.selectedItem.forEach(function (element, index) {
            console.log(element);
           
        });
        // axios.post('/exportfile',{exportData: this.props.itemLayout3Reducer.previewInfo}).then(res => {
        //     console.log(res);
        // })
        // console.log(this.state.selectedItem)
    }
    handleChange = ({ target: { label, checked } }) =>{
        this.setState({ [label]: checked });
        var newArray = this.state.selectedItem.slice();    
        newArray.push(label);   
        this.setState({selectedItem:newArray})
    }
        

    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-1" >
                    </div>
                    <div className="col-sm-11" >
                        <br />
                        <h2 style={{ textAlign: "center" }}>DANH SÁCH KẾ HOẠCH GIẢNG DẠY LÝ THUYẾT</h2>
                        <div style={{ width: "50%", margin: "0 auto " }}>
                            <CheckboxGroup
                                {...this.state}
                                options={plainOptions}
                                handleChange={this.handleChange} />
                            {/* <Checkbox
                                indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange}
                                checked={this.state.checkAll}
                            >
                                Check all
                            </Checkbox> */}
                        </div>
                        <br/>
                        <div style={{ width: "50%", margin: "0 auto " }}>
                            <button onClick={this.export} type="button" class="btn btn-success">Success</button>
                        </div>
                    </div>
                </div>
            </div>



        );
    }
}

export default ExportFile;