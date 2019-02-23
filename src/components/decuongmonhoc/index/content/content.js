import React, { Component } from 'react'
import {MENUITEM} from './../../../../config/chuan-dau-ra';
import ThongTinChung from './../../../../containers/decuongmonhoc/thong-tin-chung';
import TaiNguyenMonHoc from './../../tai-nguyen-mon-hoc/tai-nguyen-mon-hoc';
import ChuanDauRaMonHoc from './../../../../containers/decuongmonhoc/chuan-dau-ra';

export default class Content extends Component {
    render() {
        let content_layout;

        switch (this.props.content_type) {
            case MENUITEM.THONG_TIN_CHUNG: {
                return content_layout = (
                    <React.Fragment>
                        <ThongTinChung />
                    </React.Fragment>
                );
            }
            case MENUITEM.TAI_NGUYEN_MON_HOC: {
                return content_layout = (
                    <React.Fragment>
                        <TaiNguyenMonHoc />
                    </React.Fragment>
                );
            }
            case MENUITEM.CHUAN_DAU_RA: {
                return content_layout = (
                    <React.Fragment>
                        <ChuanDauRaMonHoc />
                    </React.Fragment>
                );
            }
            default: {
                content_layout = (
                    <React.Fragment>
                        <h2>HELLO</h2>
                    </React.Fragment>
                );
            }
        }

        return (
            <React.Fragment>
                {content_layout}
            </React.Fragment>
        )
    }
}
