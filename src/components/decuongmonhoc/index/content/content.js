import React, { Component } from 'react'
import {MENUITEM} from './../../../../config/chuan-dau-ra';
import ThongTinChung from './../../thong-tin-chung/thong-tin-chung';
import TaiNguyenMonHoc from './../../tai-nguyen-mon-hoc/tai-nguyen-mon-hoc';
// import Layout2 from './Layout2/Layout2';
// import Layout3 from './Layout3/Layout3';
import Layout4 from '../../../../Layout4/Layout4';
// import Layout5 from './Layout5/Layout5';
import Layout5 from '../../../../Layout5/Layout5';
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
            case MENUITEM.CHUAN_DAU_RA: {
                return content_layout = (
                    <React.Fragment>
                        <Layout4 />
                    </React.Fragment>
                );
            }   
            case MENUITEM.GIANG_DAY_LY_THUYET: {
                return content_layout = (
                    <React.Fragment>
                        <Layout5 />
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
