import React, { Component } from 'react'
import {MENUITEM} from './../../../../Constant/ActionType';
import ThongTinChung from '../../../../Layout1/thong-tin-chung';
import Home from '../../../trangchu/index/index';
import Layout2 from '../../../../Layout2/Layout2';
import Layout3 from '../../../../Layout3/Layout3';
import Layout4 from '../../../../Layout4/Layout4';
import Layout5 from '../../../../Layout5/Layout5';
import Layout6 from '../../../../Layout6/Layout6';
import Layout9 from '../../../../Layout9/Layout9';
import Layout7 from '../../../../Layout7/Layout7';
import Layout8 from '../../../../Layout8/Layout8';
import ExportFile from '../../../../ExportFIle/ExportFile';
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
            case MENUITEM.MO_TA_MON_HOC: {
                return content_layout = (
                    <React.Fragment>
                        <Layout2 />
                    </React.Fragment>
                );
            } 
            case MENUITEM.MUC_TIEU_MON_HOC: {
                return content_layout = (
                    <React.Fragment>
                        <Layout3 />
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
            case MENUITEM.GIANG_DAY_THUC_HANH: {
                return content_layout = (
                    <React.Fragment>
                        <Layout6/>
                    </React.Fragment>
                );
            }             
            case MENUITEM.DANH_GIA:{
                return content_layout = (
                    <React.Fragment>
                        <Layout7/>
                    </React.Fragment>
                )
            }   
            case MENUITEM.TAI_NGUYEN_MON_HOC: {
                return content_layout = (
                    <React.Fragment>
                        <Layout8/>
                    </React.Fragment>
                );
            }
            case MENUITEM.QUY_DINH_CHUNG: {
                return content_layout = (
                    <React.Fragment>
                    <Layout9/>
                    </React.Fragment>
                    );
            }

            case MENUITEM.XUAT_FILE_PDF:{
                return content_layout = (
                    <React.Fragment>
                        <ExportFile/>
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
