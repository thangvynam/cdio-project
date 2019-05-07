import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { MENUITEM, subjectId, subjectMaso, updateContentTab } from "./../../../../Constant/ActionType";
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import "./menu_css.css";

const SubMenu = Menu.SubMenu;
class MenuLeft extends Component {

    state = {
        rdrCount: 0,
    }
    onClick = (key) => {        
        this.props.updateSubjectId("");
    }

    checkSubjectExist = (monhoc) => {
        for(let i = 0;i < this.props.subjectList.length;i++) {
            if(this.props.subjectList[i].Id.toString() === monhoc.toString()) {
                return true;
            }
        }
        return false;
    }

    redirect = () => {
        this.props.updateContentTab(this.props.content_tab);  
        if(this.props.content_type === 'itusurvey' && this.props.subjectId !== "" && this.props.subjectId !== undefined && (this.props.content_monhoc === "" ||
        this.props.content_monhoc === undefined)) {
            return <Redirect to={`/${this.props.content_parent}/${this.props.content_ctdt}/${this.props.content_type}/view/${this.props.subjectId}/itusurvey`}/>
        }          
        if(this.props.subjectId !== "" && this.props.subjectId !== undefined && (this.props.content_monhoc === "" ||
        this.props.content_monhoc === undefined)) {
            return <Redirect to={`/${this.props.content_ctdt}/${this.props.content_type}/${this.props.content_khoi}/${this.props.subjectId}/thong-tin-chung`}/>
        }
        else if(this.props.content_monhoc !== "" && this.props.content_monhoc !== undefined && (this.props.content_tab === ""
    || this.props.content_tab === undefined) && this.checkSubjectExist(this.props.content_monhoc) === true) {
        return <Redirect to={`/${this.props.content_ctdt}/${this.props.content_type}/${this.props.content_khoi}/${this.props.content_monhoc}/thong-tin-chung`}/>
    }
    }

    render() {
        const menuItemsCollapse = [];
        for(let i = 0;i < this.props.ctdt.length;i++) {
            if(this.props.content_ctdt === this.props.ctdt[i].id) {
                menuItemsCollapse.push(<Menu.Item key={this.props.ctdt[i].id} onClick={() => this.onClick(this.props.ctdt[i].id)}>
                    <Link to={`/${this.props.ctdt[i].id}`} >
                        <Icon type="dashboard" />
                        <span>{this.props.ctdt[i].name}</span>
                    </Link>
                    </Menu.Item>)
                Object.keys(this.props.menuItem).map((key, id) => {
                    menuItemsCollapse.push(<Menu.Item key={key} onClick={() => this.onClick(key)}>
                    <Link style={{paddingLeft: "20px"}} to={`/${this.props.ctdt[i].id}/${key}`} >
                        <Icon type="dashboard" />
                        <span>{this.props.menuItem[key].name}</span>
                    </Link>
                    </Menu.Item>)
                    if(this.props.content_type === "de-cuong-mon-hoc" && key === "de-cuong-mon-hoc") {
                        for(let j = 0;j < this.props.ctdt[i].children.length;j++) {
                            menuItemsCollapse.push(<Menu.Item key={this.props.ctdt[i].children[j].id} onClick={() => this.onClick(this.props.ctdt[i].children[j].id)}>
                            <Link style={{paddingLeft: "40px"}} to={`/${this.props.ctdt[i].id}/${key}/${this.props.ctdt[i].children[j].id}`} >
                                <Icon type="dashboard" />
                                <span>{this.props.ctdt[i].children[j].name}</span>
                            </Link>
                            </Menu.Item>)
                            if(this.props.content_monhoc !== "" && this.props.content_monhoc !== undefined && this.props.ctdt[i].children[j].id === this.props.content_khoi) {
                            menuItemsCollapse.push(<Menu.Item key={MENUITEM.THONG_TIN_CHUNG}>
                                <Link style={{paddingLeft: "60px"}} to={MENUITEM.THONG_TIN_CHUNG}>
                                    <Icon type="dashboard" />
                                    <span>Thông tin chung</span>
                                </Link>
                            </Menu.Item>)
                            menuItemsCollapse.push(<Menu.Item key={MENUITEM.MO_TA_MON_HOC}>
                            <Link style={{paddingLeft: "60px"}} to={MENUITEM.MO_TA_MON_HOC}>
                                <Icon type="pay-circle" />
                                <span>Mô tả môn học</span>
                            </Link>
                            </Menu.Item>)
                            menuItemsCollapse.push(<Menu.Item key={MENUITEM.MUC_TIEU_MON_HOC}>
                            <Link style={{paddingLeft: "60px"}} to={MENUITEM.MUC_TIEU_MON_HOC}>
                                <Icon type="inbox" />
                                <span>Mục tiêu môn học</span>
                            </Link>
                            </Menu.Item>)
                            menuItemsCollapse.push(<Menu.Item key={MENUITEM.CHUAN_DAU_RA}>
                            <Link style={{paddingLeft: "60px"}} to={MENUITEM.CHUAN_DAU_RA}>
                                <Icon type="table" />
                                <span>Chuẩn đầu ra môn học</span>
                            </Link>
                            </Menu.Item>)
                            menuItemsCollapse.push(<Menu.Item key={MENUITEM.GIANG_DAY_LY_THUYET}>
                            <Link style={{paddingLeft: "60px"}} to={MENUITEM.GIANG_DAY_LY_THUYET}>
                                <Icon type="read" />
                                <span>Kế hoạch giảng dạy lý thuyết</span>
                            </Link>
                            </Menu.Item>)
                            menuItemsCollapse.push(<Menu.Item key={MENUITEM.GIANG_DAY_THUC_HANH}>
                            <Link style={{paddingLeft: "60px"}} to={MENUITEM.GIANG_DAY_THUC_HANH}>
                                <Icon type="sync" />
                                <span>Kế hoạch giảng dạy thực hành</span>
                            </Link>
                            </Menu.Item>)
                            menuItemsCollapse.push(<Menu.Item key={MENUITEM.DANH_GIA}>
                            <Link style={{paddingLeft: "60px"}} to={MENUITEM.DANH_GIA}>
                                <Icon type="file-text" />
                                <span>Đánh giá</span>
                            </Link>
                            </Menu.Item>)
                            menuItemsCollapse.push(<Menu.Item key={MENUITEM.TAI_NGUYEN_MON_HOC}>
                            <Link style={{paddingLeft: "60px"}} to={MENUITEM.TAI_NGUYEN_MON_HOC}>
                                <Icon type="database" />
                                <span>Tài nguyên môn học</span>
                            </Link>
                            </Menu.Item>)
                            menuItemsCollapse.push(<Menu.Item key={MENUITEM.QUY_DINH_CHUNG}>
                            <Link style={{paddingLeft: "60px"}} to={MENUITEM.QUY_DINH_CHUNG}>
                                <Icon type="reconciliation" />
                                <span>Các quy định chung</span>
                            </Link>
                            </Menu.Item>)
                            menuItemsCollapse.push(<Menu.Item key={MENUITEM.XUAT_FILE_PDF}>
                            <Link style={{paddingLeft: "60px"}} to={MENUITEM.XUAT_FILE_PDF}>
                                <Icon type="file-pdf" />
                                <span>Xuất file PDF</span>
                            </Link>
                            </Menu.Item>)
                        }
                        }
                        
                    }

                })
            }
            else {
                menuItemsCollapse.push(<Menu.Item key={this.props.ctdt[i].id} onClick={() => this.onClick(this.props.ctdt[i].id)}>
                    <Link to={`/${this.props.ctdt[i].id}`} >
                        <Icon type="dashboard" />
                        <span>{this.props.ctdt[i].name}</span>
                    </Link>
                    </Menu.Item>)
            }
        }
        // Object.keys(this.props.menuItem).map((key, id) => {
        //     if(key === this.props.content_type && key === "de-cuong-mon-hoc") {
        //         menuItemsCollapse.push(<Menu.Item key={key} onClick={() => this.onClick(key)}>
        //                  <Link to={`/${key}`} >
        //                      <Icon type="dashboard" />
        //                      <span>{this.props.menuItem[key].name}</span>
        //                  </Link>
        //              </Menu.Item>)
        //         for(let i = 0;i < this.props.ctdt.length;i++) {
        //             menuItemsCollapse.push(<Menu.Item key={this.props.ctdt[i].id} onClick={() => this.onClick(key)}>
        //                  <Link style={{paddingLeft: "20px"}} to={`/${key}/${this.props.ctdt[i].id}`} >
        //                      <Icon type="dashboard" />
        //                      <span>{this.props.ctdt[i].name}</span>
        //                  </Link>
        //              </Menu.Item>)
        //              if(this.props.content_ctdt === this.props.ctdt[i].id) {
        //                  for(let j = 0;j < this.props.ctdt[i].children.length;j++) {
        //                     menuItemsCollapse.push(<Menu.Item key={this.props.ctdt[i].children[j].id} onClick={() => this.onClick(key)}>
        //                     <Link style={{paddingLeft: "40px"}} to={`/${key}/${this.props.ctdt[i].id}/${this.props.ctdt[i].children[j].id}`} >
        //                         <Icon type="dashboard" />
        //                         <span>{this.props.ctdt[i].children[j].name}</span>
        //                     </Link>
        //                 </Menu.Item>)
        //                 if(this.props.content_monhoc !== "" && this.props.content_monhoc !== undefined && this.props.ctdt[i].children[j].id === this.props.content_khoi) {
        //                     menuItemsCollapse.push(<Menu.Item key={MENUITEM.THONG_TIN_CHUNG}>
        //                         <Link style={{paddingLeft: "60px"}} to={MENUITEM.THONG_TIN_CHUNG}>
        //                             <Icon type="dashboard" />
        //                             <span>Thông tin chung</span>
        //                         </Link>
        //                     </Menu.Item>)
        //                     menuItemsCollapse.push(<Menu.Item key={MENUITEM.MO_TA_MON_HOC}>
        //                     <Link style={{paddingLeft: "60px"}} to={MENUITEM.MO_TA_MON_HOC}>
        //                         <Icon type="pay-circle" />
        //                         <span>Mô tả môn học</span>
        //                     </Link>
        //                     </Menu.Item>)
        //                     menuItemsCollapse.push(<Menu.Item key={MENUITEM.MUC_TIEU_MON_HOC}>
        //                     <Link style={{paddingLeft: "60px"}} to={MENUITEM.MUC_TIEU_MON_HOC}>
        //                         <Icon type="inbox" />
        //                         <span>Mục tiêu môn học</span>
        //                     </Link>
        //                     </Menu.Item>)
        //                     menuItemsCollapse.push(<Menu.Item key={MENUITEM.CHUAN_DAU_RA}>
        //                     <Link style={{paddingLeft: "60px"}} to={MENUITEM.CHUAN_DAU_RA}>
        //                         <Icon type="table" />
        //                         <span>Chuẩn đầu ra môn học</span>
        //                     </Link>
        //                     </Menu.Item>)
        //                     menuItemsCollapse.push(<Menu.Item key={MENUITEM.GIANG_DAY_LY_THUYET}>
        //                     <Link style={{paddingLeft: "60px"}} to={MENUITEM.GIANG_DAY_LY_THUYET}>
        //                         <Icon type="read" />
        //                         <span>Kế hoạch giảng dạy lý thuyết</span>
        //                     </Link>
        //                     </Menu.Item>)
        //                     menuItemsCollapse.push(<Menu.Item key={MENUITEM.GIANG_DAY_THUC_HANH}>
        //                     <Link style={{paddingLeft: "60px"}} to={MENUITEM.GIANG_DAY_THUC_HANH}>
        //                         <Icon type="sync" />
        //                         <span>Kế hoạch giảng dạy thực hành</span>
        //                     </Link>
        //                     </Menu.Item>)
        //                     menuItemsCollapse.push(<Menu.Item key={MENUITEM.DANH_GIA}>
        //                     <Link style={{paddingLeft: "60px"}} to={MENUITEM.DANH_GIA}>
        //                         <Icon type="file-text" />
        //                         <span>Đánh giá</span>
        //                     </Link>
        //                     </Menu.Item>)
        //                     menuItemsCollapse.push(<Menu.Item key={MENUITEM.TAI_NGUYEN_MON_HOC}>
        //                     <Link style={{paddingLeft: "60px"}} to={MENUITEM.TAI_NGUYEN_MON_HOC}>
        //                         <Icon type="database" />
        //                         <span>Tài nguyên môn học</span>
        //                     </Link>
        //                     </Menu.Item>)
        //                     menuItemsCollapse.push(<Menu.Item key={MENUITEM.QUY_DINH_CHUNG}>
        //                     <Link style={{paddingLeft: "60px"}} to={MENUITEM.QUY_DINH_CHUNG}>
        //                         <Icon type="reconciliation" />
        //                         <span>Các quy định chung</span>
        //                     </Link>
        //                     </Menu.Item>)
        //                     menuItemsCollapse.push(<Menu.Item key={MENUITEM.XUAT_FILE_PDF}>
        //                     <Link style={{paddingLeft: "60px"}} to={MENUITEM.XUAT_FILE_PDF}>
        //                         <Icon type="file-pdf" />
        //                         <span>Xuất file PDF</span>
        //                     </Link>
        //                     </Menu.Item>)
        //                 }
        //                  }
        //              }
        //         }
                
        //     }
        //     else {
        //         menuItemsCollapse.push(<Menu.Item key={key} onClick={() => this.onClick(key)}>
        //             <Link to={`/${key}`} >
        //                 <Icon type="dashboard" />
        //                 <span>{this.props.menuItem[key].name}</span>
        //             </Link>
        //             </Menu.Item>)
        //     }
        // })

      
        return (
            <div>
            {this.redirect()}
        <Menu
                mode="inline"
                theme={this.props.theme}
                inlineCollapsed={this.props.collapse}
                className="menu-style"
                defaultSelectedKeys={this.props.defaultSelectedKeys}
                selectedKeys={this.props.content_tab !== "" && this.props.content_tab !== undefined ? [this.props.content_tab] 
                : this.props.content_khoi !== "" && this.props.content_khoi !== undefined ? [this.props.content_khoi] 
                : this.props.content_type !== "" && this.props.content_type !== undefined ? [this.props.content_type] 
                : this.props.defaultSelectedKeys}
                children={menuItemsCollapse}
            >
            </Menu>
        </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        menuItem: state.menuitem,
        subjectId: state.subjectid,
        subjectList: state.subjectlist,
        subjectMaso: state.subjectmaso,
        ctdt: state.ctdt
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      updateSubjectId: subjectId,
      updateSubjectMaso: subjectMaso,
      updateContentTab: updateContentTab
    }, dispatch);
  }
export default connect(mapStateToProps, mapDispatchToProps)(MenuLeft);
