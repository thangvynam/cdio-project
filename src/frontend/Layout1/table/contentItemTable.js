import React, { Component } from 'react'

import {
    Row, Col
} from 'antd';


class ItemTableTTC extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="contentItem">
                    <div className="left_contentItem">
                        Tên môn học (Tiếng Việt):
                    </div>
                    <div className="right_contentItem">
                        {this.props.textA.tenMonHocTV}
                    </div>
                </div>
                <div className="contentItem">
                    <div className="left_contentItem">
                        Tên môn học (Tiếng Anh):
                    </div>
                    <div className="right_contentItem">
                        {this.props.textA.tenMonHocTA}
                    </div>
                </div>
                <div className="contentItem">
                    <div className="left_contentItem">
                        Mã số môn học:
                    </div>
                    <div className="right_contentItem">
                        {this.props.textA.maMonHoc}
                    </div>
                </div>
                <div className="contentItem">
                    <div className="left_contentItem">
                        Thuộc khối kiến thức:
                    </div>
                    <div className="right_contentItem">
                        {this.props.textA.khoiKienThuc}
                    </div>
                </div>
                <div className="contentItem">
                    <div className="left_contentItem">
                        Số tín chỉ:
                    </div>
                    <div className="right_contentItem">
                        {this.props.textA.soTinChi}
                    </div>
                </div>
                <div className="contentItem">
                    <div className="left_contentItem">
                        Số tiết lý thuyết:
                    </div>
                    <div className="right_contentItem">
                        {this.props.textA.tietLyThuyet}
                    </div>
                </div>
                <div className="contentItem">
                    <div className="left_contentItem">
                        Số tiết thực hành:
                    </div>
                    <div className="right_contentItem">
                        {this.props.textA.tietThucHanh}
                    </div>
                </div>
                <div className="contentItem">
                    <div className="left_contentItem">
                        Số tiết tự học:
                    </div>
                    <div className="right_contentItem">
                        {this.props.textA.tietTuHoc}
                    </div>
                </div>
                <div className="contentItem">
                    <div className="left_contentItem">
                        Các môn tiên quyết:
                    </div>
                    <div className="right_contentItem">
                        {this.props.textA.monTienQuyet}
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

// const ItemTableTTC = Form.create()(itemRowTTC);
export default ItemTableTTC;