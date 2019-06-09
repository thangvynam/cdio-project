import React, { Component } from "react";
import { Menu, Icon, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  MENUITEM,
  subjectId,
  subjectMaso,
  updateContentTab
} from "./../../../../Constant/ActionType";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import "./menu_css.css";
import queryString from 'query-string';

const SubMenu = Menu.SubMenu;
class MenuLeft extends Component {
  state = {
    rdrCount: 0
  };
  onClick = key => {
    this.props.updateSubjectId("");
  };

  checkSubjectExist = monhoc => {
    for (let i = 0; i < this.props.subjectList.length; i++) {
      if (this.props.subjectList[i].Id === +monhoc) {
        return true;
      }
    }
    return false;
  };

  getCtdt = (Ctdt, ctdt) => {
    for (let i = 0; i < Ctdt.length; i++) {
      if (Ctdt[i].Id === +ctdt) {
        return i;
      }
    }
    return -1;
  };

  checkAdmin = (role) => {
    if (role.indexOf("ADMIN") > -1) {
      return true;
    }
    return false;
  }

  checkChuNhiem = (role) => {
    if (role.indexOf("CHUNHIEM") > -1) {
      return true;
    }
    return false;
  }

  checkBienSoan = (role) => {
    if (role.indexOf("BIEN_SOAN") > -1) {
      return true;
    }
    return false;
  }

  checkTeacher = (role) => {
    if (role.indexOf("TEACHER") > -1) {
      return true;
    }
    return false;
  }

  checkRoleExist = (userRole, menuRole) => {
    for (let role in userRole) {
      if (menuRole.includes(userRole[role])) return true;
    }
    return false;
  }

  checkTeachBlock = (block) => {
    for (let i = 0; i < block.subjects.length; i++) {
      if (this.checkInTeacherSubject(this.props.teacherSubject, block.subjects[i].IdSubject)) {
        return true;
      }
    }
    return false;
  }

  checkReviewBlock = (block) => {
    for (let i = 0; i < block.subjects.length; i++) {
      if (this.checkInTeacherReviewSubject(this.props.teacherReviewSubject, block.subjects[i].IdSubject)) {
        return true;
      }
    }
    return false;
  }

  menuItem = (key, link, span, icon, paddingLeft) => {
    return (<Menu.Item
      key={key}
      onClick={() => this.onClick(key)}
    >
      <Link style={{ paddingLeft: `${paddingLeft}` }} to={link}>
        <Icon type={`${icon}`} />
        <span>{span}</span>
      </Link>
    </Menu.Item>)
  }
  checkInTeacherSubject = (teacherSubject, idSubject) => {
    for (let i = 0; i < teacherSubject.length; i++) {
      if (teacherSubject[i].IdSubject === idSubject) {
        return true;
      }
    }
    return false;
  }

  checkInTeacherReviewSubject = (teacherReviewSubject, idSubject) => {
    for (let i = 0; i < teacherReviewSubject.length; i++) {
      if (teacherReviewSubject[i].idTTC === idSubject) {
        return true;
      }
    }
    return false;
  }

  redirect = () => {
    this.props.updateContentTab(this.props.content_tab);
    if (this.props.content_monhoc !== "" &&
      this.props.content_monhoc !== undefined && this.props.content_monhoc !== null &&
      (this.props.content_tab === "" || this.props.content_tab === undefined || this.props.content_tab === null)
    ) {
      if (this.props.content_type === "de-cuong-mon-hoc") {
        return (
          <Redirect
            to={`/${this.props.content_parent}/${this.props.content_ctdt}/${this.props.content_type}/${this.props.content_action}/${this.props.content_khoi}`}
          />
        );
      }
      else if (this.props.content_type === "itusurvey") {
        return (
          <Redirect
            to={`/${this.props.content_parent}/${this.props.content_ctdt}/${this.props.content_type}
            /${this.props.content_action}/${this.props.content_khoi}/${this.props.content_monhoc}/itusurvey`}
          />
        );
      }
    }
  };

  render() {
    const menuItemsCollapse = [];
    const userRole = JSON.parse(localStorage.getItem('user')).data.Role;
    for (let i = 0; i < this.props.parentitem.length; i++) {

      if (
        this.props.content_ctdt !== "" &&
        this.props.content_ctdt !== undefined &&
        this.props.content_ctdt !== null &&
        this.props.parentitem[i].id === "ctdt" &&
        this.props.content_parent === "ctdt"
      ) {
        let ctdtIndex = this.getCtdt(this.props.ctdt, this.props.content_ctdt);
        if (ctdtIndex !== -1) { //ctdt exists
          if (this.props.parentitem[i].id === this.props.content_parent) {
            menuItemsCollapse.push(this.menuItem(this.props.parentitem[i].id,
              `/${this.props.parentitem[i].id}`,
              this.props.parentitem[i].name,
              "dashboard", "0px"));
            menuItemsCollapse.push(this.menuItem(this.props.ctdt[ctdtIndex].Id,
              `/${this.props.content_parent}/${this.props.ctdt[ctdtIndex].Id}`,
              this.props.ctdt[ctdtIndex].EduName,
              "dashboard", "10px"));
          }
          else {
            menuItemsCollapse.push(this.menuItem(this.props.parentitem[i].id,
              `/${this.props.parentitem[i].id}`,
              this.props.parentitem[i].name,
              "dashboard", "0px"));
          }

          Object.keys(this.props.menuItem).map((key, id) => {
            if (this.checkRoleExist(userRole, this.props.menuItem[key].role)) {
              if (key !== "survey-matrix") {
                menuItemsCollapse.push(this.menuItem(key,
                  `/${this.props.parentitem[i].id}/${this.props.content_ctdt}/${key}`,
                  this.props.menuItem[key].name,
                  "container", "20px"));
              }


              if (this.props.content_type === "de-cuong-mon-hoc" && key === "de-cuong-mon-hoc") {
                for (let item in this.props.menuItem[key].children) {

                  if (this.checkRoleExist(userRole, this.props.menuItem[key].children[item].role)) {
                    menuItemsCollapse.push(this.menuItem(this.props.menuItem[key].children[item].id,
                      `/${this.props.parentitem[i].id}/${this.props.ctdt[ctdtIndex].Id}/${key}/${this.props.menuItem[key].children[item].id}`,
                      this.props.menuItem[key].children[item].name,
                      "form", "30px"));

                    if (this.props.dataCtdt !== undefined && this.props.dataCtdt !== null) {
                      if (this.props.content_action === this.props.menuItem[key].children[item].id) {
                        for (let j = 0; j < this.props.dataCtdt.length; j++) {
                          if (this.checkChuNhiem(this.props.menuItem[key].children[item].role)) {
                            menuItemsCollapse.push(this.menuItem(this.props.dataCtdt[j].Id,
                              `/${this.props.parentitem[i].id}/${this.props.ctdt[ctdtIndex].Id}/${key}/${this.props.menuItem[key].children[item].id}/${this.props.dataCtdt[j].Id}`,
                              this.props.dataCtdt[j].NameBlock,
                              "block", "40px"));
                          }
                          else if (this.checkBienSoan(this.props.menuItem[key].children[item].role)) {
                            if (this.checkTeachBlock(this.props.dataCtdt[j])) {
                              menuItemsCollapse.push(this.menuItem(this.props.dataCtdt[j].Id,
                                `/${this.props.parentitem[i].id}/${this.props.ctdt[ctdtIndex].Id}/${key}/${this.props.menuItem[key].children[item].id}/${this.props.dataCtdt[j].Id}`,
                                this.props.dataCtdt[j].NameBlock,
                                "block", "40px"));
                            }
                          }
                          else {
                            if (this.checkReviewBlock(this.props.dataCtdt[j])) {
                              menuItemsCollapse.push(this.menuItem(this.props.dataCtdt[j].Id,
                                `/${this.props.parentitem[i].id}/${this.props.ctdt[ctdtIndex].Id}/${key}/${this.props.menuItem[key].children[item].id}/${this.props.dataCtdt[j].Id}`,
                                this.props.dataCtdt[j].NameBlock,
                                "block", "40px"));
                            }
                          }

                          if (
                            this.props.content_monhoc !== "" &&
                            this.props.content_monhoc !== undefined &&
                            this.props.dataCtdt[j].Id === +this.props.content_khoi
                          ) {
                            if (this.props.content_tab === "phan-cong") {
                              menuItemsCollapse.push(this.menuItem(MENUITEM.PHAN_CONG, MENUITEM.PHAN_CONG,
                                "Phân công review", "unordered-list", "60px"));
                            }
                            else if (this.props.content_tab === "review") {
                              menuItemsCollapse.push(this.menuItem(MENUITEM.REVIEW, MENUITEM.REVIEW,
                                "Review môn học", "eye", "60px"));
                            }
                            else {
                              menuItemsCollapse.push(this.menuItem(MENUITEM.THONG_TIN_CHUNG, MENUITEM.THONG_TIN_CHUNG,
                                "Thông tin chung", "dashboard", "60px"));

                              menuItemsCollapse.push(this.menuItem(MENUITEM.MO_TA_MON_HOC, MENUITEM.MO_TA_MON_HOC,
                                "Mô tả môn học", "pay-circle", "60px"));

                              menuItemsCollapse.push(this.menuItem(MENUITEM.MUC_TIEU_MON_HOC, MENUITEM.MUC_TIEU_MON_HOC,
                                "Mục tiêu môn học", "inbox", "60px"));

                              menuItemsCollapse.push(this.menuItem(MENUITEM.CHUAN_DAU_RA, MENUITEM.CHUAN_DAU_RA,
                                "Chuẩn đầu ra môn học", "table", "60px"));

                              menuItemsCollapse.push(this.menuItem(MENUITEM.GIANG_DAY_LY_THUYET, MENUITEM.GIANG_DAY_LY_THUYET,
                                "Kế hoạch giảng dạy lý thuyết", "read", "60px"));

                              menuItemsCollapse.push(this.menuItem(MENUITEM.GIANG_DAY_THUC_HANH, MENUITEM.GIANG_DAY_THUC_HANH,
                                "Kế hoạch giảng dạy thực hành", "sync", "60px"));

                              menuItemsCollapse.push(this.menuItem(MENUITEM.DANH_GIA, MENUITEM.DANH_GIA,
                                "Đánh giá", "file-text", "60px"));

                              menuItemsCollapse.push(this.menuItem(MENUITEM.TAI_NGUYEN_MON_HOC, MENUITEM.TAI_NGUYEN_MON_HOC,
                                "Tài nguyên môn học", "database", "60px"));

                              menuItemsCollapse.push(this.menuItem(MENUITEM.QUY_DINH_CHUNG, MENUITEM.QUY_DINH_CHUNG,
                                "Các quy định chung", "reconciliation", "60px"));

                              menuItemsCollapse.push(this.menuItem(MENUITEM.XUAT_FILE_PDF, MENUITEM.XUAT_FILE_PDF,
                                "Xuất file PDF", "file-pdf", "60px"));
                            }
                          }
                        }
                      }


                    }
                  }
                }
              }
              else if (this.props.content_type === "chuan-dau-ra" && key === "chuan-dau-ra") {
                for (let item in this.props.menuItem[key].children) {
                  if (this.checkRoleExist(userRole, this.props.menuItem[key].children[item].role)) {
                    menuItemsCollapse.push(this.menuItem(this.props.menuItem[key].children[item].id,
                      `/${this.props.parentitem[i].id}/${this.props.ctdt[ctdtIndex].Id}/${key}/${this.props.menuItem[key].children[item].id}`,
                      this.props.menuItem[key].children[item].name,
                      "form", "30px"));
                  }
                }
              }
            }


          });
        }
      }
      else if (this.props.content_ctdt !== "" &&
        this.props.content_ctdt !== undefined &&
        this.props.content_ctdt !== null &&
        this.props.parentitem[i].id === "view-survey" &&
        this.props.content_parent === "view-survey") {
        menuItemsCollapse.push(this.menuItem(this.props.parentitem[i].id, `/${this.props.parentitem[i].id}`,
          this.props.parentitem[i].name,
          "dashboard", "0px"));
        if (this.props.content_ctdt === "survey-matrix") {
          menuItemsCollapse.push(this.menuItem("survey-matrix",
            `/${this.props.parentitem[i].id}/${this.props.content_ctdt}/${this.props.menuItem["survey-matrix"]}`,
            this.props.menuItem["survey-matrix"].name,
            "container", "20px"));
        }
      }
      else if (this.checkRoleExist(userRole, this.props.parentitem[i].role)) {
        menuItemsCollapse.push(this.menuItem(this.props.parentitem[i].id, `/${this.props.parentitem[i].id}`,
          this.props.parentitem[i].name,
          "dashboard", "0px"));
      }
    }
    return (
      <div>
        {this.redirect()}
        <Menu
          mode="inline"
          theme={this.props.theme}
          inlineCollapsed={this.props.collapse}
          className="menu-style"
          defaultSelectedKeys={this.props.defaultSelectedKeys}
          selectedKeys={
            this.props.content_tab !== "" &&
              this.props.content_tab !== undefined
              ? [this.props.content_tab]
              : this.props.content_khoi !== "" &&
                this.props.content_khoi !== undefined
                ? [this.props.content_khoi]
                : this.props.content_action !== "" &&
                  this.props.content_action !== undefined
                  ? [this.props.content_action]
                  : this.props.content_type !== "" &&
                    this.props.content_type !== undefined
                    ? [this.props.content_type]
                    : this.props.content_ctdt !== "edit" &&
                      this.props.content_ctdt !== "" &&
                      this.props.content_ctdt !== undefined
                      ? [this.props.content_ctdt]
                      : this.props.defaultSelectedKeys
          }
          children={menuItemsCollapse}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    menuItem: state.menuitem,
    parentitem: state.parentitem,
    subjectId: state.subjectid,
    subjectList: state.subjectlist,
    subjectMaso: state.subjectmaso,
    ctdt: state.eduPrograms,
    dataCtdt: state.datactdt.data,
    teacherSubject: state.datactdt.teacherSubject,
    teacherReviewSubject: state.datactdt.teacherReviewSubject,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateSubjectId: subjectId,
      updateSubjectMaso: subjectMaso,
      updateContentTab: updateContentTab
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuLeft);
