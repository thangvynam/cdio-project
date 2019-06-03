import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckboxGroup from "./CheckboxGroup/CheckboxGroup";
import Loader from '../components/loader/loader';
import { Checkbox, message, Input, Upload, Button, Icon } from 'antd';
import $ from './../helpers/services';
import { ADD_DATA_LAYOUT_2,ADD_ARRAY_LAYOUT_3 } from '../Constant/ActionType';

const plainOptions = [
    'Thông tin chung',
    'Mô tả môn học',
    'Mục tiêu môn học',
    'Chuẩn đầu ra môn học',
    'Kế hoạch giảng dạy lý thuyết',
    'Kế hoạch giảng dạy thực hành',
    'Đánh giá',
    'Tài nguyên môn học',
    'Các quy định chung'
];

class ExportFile extends Component {

    state = {
        selectedItem: [],
        loading: -1,
    }

    // tab2
    async getData2() {
        const res = await $.getData2(this.props.subjectid);
        const resp = res.data;
        return resp.Description;
    }

    // tab3
    async getData3() {
        return $.getData3(this.props.subjectid).then(res => {
          return res.data
        }).then(resp => {
          return resp;
        });
    }

    getUnique(arr, comp) {
        const unique = arr
             .map(e => e[comp])
          .map((e, i, final) => final.indexOf(e) === i && i)
      
          .filter(e => arr[e]).map(e => arr[e]);
         return unique;
    }

    async componentDidMount() {
        //tab 2
        let data2 = await this.getData2();
        console.log(data2);
        this.props.saveAndContinue2(data2);
        
        //tab 3 
        let temp = await this.getData3();
        let saveData = [];
        let standActs = [];
        if (temp.length > 0) {
            temp.forEach(element => {
              temp.forEach(element2 => {
                if(element2.muc_tieu === element.muc_tieu) {
                  element2.KeyRow = element2.KeyRow.slice(0, element2.KeyRow.length -1)
                  element2.KeyRow = element2.KeyRow.replace(/-/g, ".")
                  standActs.push(element2.KeyRow)
                }
              });
              let newObj = {
                    objectName: element.muc_tieu,
                    description: element.mo_ta,
                    standActs: standActs,
                    del_flag: element.del_flag,
                    id: element.id,
                  }            
                saveData.push(newObj);        
            });
          }
          saveData = this.getUnique(saveData, "objectName")
          saveData = saveData.filter((item) => item.del_flag === 0)
         
          this.props.saveAndContinue3(saveData);

    }

    componentWillMount() {
        //this.props.collectDataRequest(this.props.idMH);
        plainOptions.forEach((v, i) => {
            this.setState({ [v]: false });
        });
    }

    returnReducer = (pos) => {
        switch (pos) {
            case 1: {
                return this.props.itemLayout1Reducer.previewInfo;
            }
            case 2: {
                return this.props.itemLayout2Reducer.previewInfo;
            }
            case 3: {
                return this.props.itemLayout3Reducer.previewInfo;
            }
            case 4: {
                return this.props.itemLayout4Reducer.previewInfo;
            }
            case 5: {
                return this.props.itemLayout5Reducer.previewInfo;
            }
            case 6: {
                return this.props.itemLayout6Reducer.previewInfo;
            }
            case 7: {
                return this.props.itemLayout7Reducer.previewInfo;
            }
            case 8: {
                return this.props.itemLayout8Reducer.previewInfo;
            }
            case 9: {
                return this.props.itemLayout9Reducer.previewInfo;
            }
            default:
                return null;
        }
    }

    addDataMap = (callback) => {
        if (this.state.selectedItem.length > 0) {
            let data = new Map();
            for (let i = 0; i < plainOptions.length; i++) {
                data.set(plainOptions[i], "");
            }
            for (let j = 0; j < this.state.selectedItem.length; j++) {
                for (let i = 0; i < plainOptions.length; i++) {
                    if (this.state.selectedItem[j] === plainOptions[i]) {
                        let pos = i + 1;
                        data.set(plainOptions[i], JSON.stringify(this.returnReducer(pos)));
                    }
                }
            }

            const obj = {}
            for (let [k, v] of data) {
                if (v != "") {
                    obj[k] = v
                }
            }
            callback(obj);
        } else {
            message.error("Vui lòng chọn ít nhất 1 mục ");
        }

    }
    export = () => {
        let self = this;

        this.addDataMap(function (obj) {
            self.setState({ loading: 0 });
            console.log(obj);
            $.exportFile(JSON.stringify(obj)).then(res => {
                if (res.data == 1) {
                    self.setState({ loading: 1 });
                }
            })

        })

    }
    handleChange = ({ target: { label, checked } }) => {

        this.setState({ [label]: checked });
        if (checked) { // checked
            this.setState({
                selectedItem: [...this.state.selectedItem, label]
            })
        } else {  // unchecked
            var array = [...this.state.selectedItem]; // make a separate copy of the array
            var index = array.indexOf(label)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({ selectedItem: array });
            }
        }
    }


    onCheckAllChange = (e) => {
        plainOptions.forEach((v, i) => {
            this.setState({ [v]: e.target.checked });
        });
        if (e.target.checked) {
            this.setState({ selectedItem: plainOptions });
        } else {
            this.setState({ selectedItem: [] });
        }
    }

    uploadDir = (file) => {
        console.log(file)
    }

    render() {
        return (
            <React.Fragment>
                <div className="section-layout">
                    <div className ="export-css">
                        <Checkbox
                            onChange={(e) => { this.onCheckAllChange(e) }}
                        >
                            Chọn tất cả
                                </Checkbox>
                    </div>
                    <div className ="export-css">
                        <CheckboxGroup
                            {...this.state}
                            options={plainOptions}
                            handleChange={this.handleChange} />

                    </div>
                    <br />
                    <div className ="export-css">
                        <button onClick={this.export} type="button" class="btn btn-success">Xuất file PDF</button>
                        <br /><br /><br />
                        <Loader loading={this.state.loading} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        itemLayout1Reducer: state.itemLayout1Reducer,
        itemLayout2Reducer: state.itemLayout2Reducer,
        itemLayout3Reducer: state.itemLayout3Reducer,
        itemLayout4Reducer: state.itemLayout4Reducer,
        itemLayout5Reducer: state.itemLayout5Reducer,
        itemLayout6Reducer: state.itemLayout6Reducer,
        itemLayout7Reducer: state.itemLayout7Reducer,
        itemLayout8Reducer: state.itemLayout8Reducer,
        itemLayout9Reducer: state.itemLayout9Reducer,
        subjectid: state.subjectid,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveAndContinue2: (description) => {
            dispatch({ type: ADD_DATA_LAYOUT_2, description });         
        },
        saveAndContinue3: (item) => {
            dispatch({ type: ADD_ARRAY_LAYOUT_3, item });         
        },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ExportFile);