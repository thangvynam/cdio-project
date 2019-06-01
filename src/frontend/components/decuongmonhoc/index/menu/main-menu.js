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
    if(role.indexOf("ADMIN") > -1) {
        return true;
    }
    return false;
}

  checkChuNhiem = (role) => {
  if(role.indexOf("CHUNHIEM") > -1) {
      return true;
  }
  return false;
}

checkBienSoan = (role) => {
  if(role.indexOf("BIEN SOAN") > -1) {
      return true;
  }
  return false;
}

checkTeacher = (role) => {
  if(role.indexOf("TEACHER") > -1) {
      return true;
  }
  return false;
}

  checkTeacherBlock = (block) => {
    for(let i = 0;i < block.subjects.length;i++) {
      if(
        // this.checkInTeacherSubject(this.props.teacherSubject, block.subjects[i].IdSubject)
        // || 
        this.checkInTeacherReviewSubject(this.props.teacherReviewSubject, block.subjects[i].IdSubject)) {
          return true;
        }
    }
    return false;
  }

  checkInTeacherSubject = (teacherSubject, idSubject) => {
    for(let i = 0;i < teacherSubject.length;i++) {
        if(teacherSubject[i].IdSubject === idSubject) {
            return true;
        }
    }
    return false;
  }

  checkInTeacherReviewSubject = (teacherReviewSubject, idSubject) => {
      for(let i = 0;i < teacherReviewSubject.length;i++) {
          if(teacherReviewSubject[i].idTTC === idSubject) {
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
    ) 
    {
      if(this.props.content_type === "de-cuong-mon-hoc") {
        return (
          <Redirect
            to={`/${this.props.content_parent}/${this.props.content_ctdt}/${this.props.content_type}/${this.props.content_khoi}/${this.props.content_monhoc}/thong-tin-chung`}
          />
        );
      }
      else if(this.props.content_type === "itusurvey") {
        return (
          <Redirect
            to={`/${this.props.content_parent}/${this.props.content_ctdt}/${this.props.content_type}
            /${this.props.content_khoi}/${this.props.content_monhoc}/itusurvey`}
          />
        );
      }
    }
  };

  render() {
    const menuItemsCollapse = [];
    for (let i = 0; i < this.props.parentitem.length; i++) {
      if (
        this.props.content_ctdt !== "" &&
        this.props.content_ctdt !== undefined &&
        this.props.content_ctdt !== null &&
        this.props.parentitem[i].id === "ctdt" &&
        this.props.content_parent === "ctdt"
      ) {
        let ctdtIndex = this.getCtdt(this.props.ctdt, this.props.content_ctdt);
        if (ctdtIndex !== -1) {
          if (this.props.parentitem[i].id === this.props.content_parent) {
            menuItemsCollapse.push(
              <Menu.Item
                key={this.props.ctdt[ctdtIndex].Id}
                onClick={() => this.onClick(this.props.ctdt[ctdtIndex].Id)}
              >
                <Link
                  to={`/${this.props.content_parent}/${
                    this.props.ctdt[ctdtIndex].Id
                    }`}
                >
                  <Icon type="dashboard" />
                  <span>{this.props.ctdt[ctdtIndex].EduName}</span>
                </Link>
              </Menu.Item>
            );
          } else {
            menuItemsCollapse.push(
              <Menu.Item
                key={this.props.parentitem[i].id}
                onClick={() => this.onClick(this.props.parentitem[i].id)}
              >
                <Link to={`/${this.props.parentitem[i].id}`}>
                  <Icon type="dashboard" />
                  <span>{this.props.parentitem[i].name}</span>
                </Link>
              </Menu.Item>
            );
          }

          Object.keys(this.props.menuItem).map((key, id) => {
            if(key === "matrix") {
              if(this.checkBienSoan(JSON.parse(localStorage.getItem('user')).data.Role)) {
                menuItemsCollapse.push(
                  <Menu.Item key={key} onClick={() => this.onClick(key)}>
                    <Link
                      style={{ paddingLeft: "20px" }}
                      to={`/${this.props.parentitem[i].id}/${
                        this.props.content_ctdt
                        }/${key}`}
                    >
                      <Icon type="dashboard" />
                      <span>{this.props.menuItem[key].name}</span>
                    </Link>
                  </Menu.Item>
                );
              }
            }
            else if(key === "de-cuong-mon-hoc") {
              if(!this.checkAdmin(JSON.parse(localStorage.getItem('user')).data.Role)) {
                menuItemsCollapse.push(
                  <Menu.Item key={key} onClick={() => this.onClick(key)}>
                    <Link
                      style={{ paddingLeft: "20px" }}
                      to={`/${this.props.parentitem[i].id}/${
                        this.props.content_ctdt
                        }/${key}`}
                    >
                      <Icon type="dashboard" />
                      <span>{this.props.menuItem[key].name}</span>
                    </Link>
                  </Menu.Item>
                );
              }
            }
            else if(key === "benchmark-matrix") {
              if(this.checkChuNhiem(JSON.parse(localStorage.getItem('user')).data.Role)) {
                menuItemsCollapse.push(
                  <Menu.Item key={key} onClick={() => this.onClick(key)}>
                    <Link
                      style={{ paddingLeft: "20px" }}
                      to={`/${this.props.parentitem[i].id}/${
                        this.props.content_ctdt
                        }/${key}`}
                    >
                      <Icon type="dashboard" />
                      <span>{this.props.menuItem[key].name}</span>
                    </Link>
                  </Menu.Item>
                );
              }
            }
            else if(key === "edit-matrix") {
              if(this.checkChuNhiem(JSON.parse(localStorage.getItem('user')).data.Role)) {
                menuItemsCollapse.push(
                  <Menu.Item key={key} onClick={() => this.onClick(key)}>
                    <Link
                      style={{ paddingLeft: "20px" }}
                      to={`/${this.props.parentitem[i].id}/${
                        this.props.content_ctdt
                        }/${key}`}
                    >
                      <Icon type="dashboard" />
                      <span>{this.props.menuItem[key].name}</span>
                    </Link>
                  </Menu.Item>
                );
              }
            }
            else if(key === "itusurvey") {
              if(this.checkTeacher(JSON.parse(localStorage.getItem('user')).data.Role)) {
                menuItemsCollapse.push(
                  <Menu.Item key={key} onClick={() => this.onClick(key)}>
                    <Link
                      style={{ paddingLeft: "20px" }}
                      to={`/${this.props.parentitem[i].id}/${
                        this.props.content_ctdt
                        }/${key}`}
                    >
                      <Icon type="dashboard" />
                      <span>{this.props.menuItem[key].name}</span>
                    </Link>
                  </Menu.Item>
                );
              }
            }
            else {
              menuItemsCollapse.push(
                <Menu.Item key={key} onClick={() => this.onClick(key)}>
                  <Link
                    style={{ paddingLeft: "20px" }}
                    to={`/${this.props.parentitem[i].id}/${
                      this.props.content_ctdt
                      }/${key}`}
                  >
                    <Icon type="dashboard" />
                    <span>{this.props.menuItem[key].name}</span>
                  </Link>
                </Menu.Item>
              );
            }
            

            //let indexCtdt = this.getCtdt(this.props.ctdt, this.props.content_ctdt);
            if (
              this.props.content_type === "de-cuong-mon-hoc" 
              && key === "de-cuong-mon-hoc" 
              &&  this.props.dataCtdt !== undefined
              &&  this.props.dataCtdt !== null
            ) {
              for (let j = 0; j < this.props.dataCtdt.length; j++) {
                if(this.checkChuNhiem(JSON.parse(localStorage.getItem('user')).data.Role) || this.checkBienSoan(JSON.parse(localStorage.getItem('user')).data.Role)) {
                  menuItemsCollapse.push(
                    <Menu.Item
                      key={this.props.dataCtdt[j].Id}
                      onClick={() => this.onClick(this.props.dataCtdt[j].Id)}
                    >
                      <Link
                        style={{ paddingLeft: "40px" }}
                        to={`/${this.props.parentitem[i].id}/${
                          this.props.ctdt[ctdtIndex].Id
                          }/${key}/${this.props.dataCtdt[j].Id}`}
                      >
                        <Icon type="dashboard" />
                        <span>{this.props.dataCtdt[j].NameBlock}</span>
                      </Link>
                    </Menu.Item>
                  );
                }
                else {
                  if(this.checkTeacherBlock(this.props.dataCtdt[j])) {
                    menuItemsCollapse.push(
                      <Menu.Item
                        key={this.props.dataCtdt[j].Id}
                        onClick={() => this.onClick(this.props.dataCtdt[j].Id)}
                      >
                        <Link
                          style={{ paddingLeft: "40px" }}
                          to={`/${this.props.parentitem[i].id}/${
                            this.props.ctdt[ctdtIndex].Id
                            }/${key}/${this.props.dataCtdt[j].Id}`}
                        >
                          <Icon type="dashboard" />
                          <span>{this.props.dataCtdt[j].NameBlock}</span>
                        </Link>
                      </Menu.Item>
                    );
                  }
                }

                if (
                  this.props.content_monhoc !== "" &&
                  this.props.content_monhoc !== undefined &&
                  this.props.dataCtdt[j].Id === +this.props.content_khoi
                ) {
                  if (this.props.content_tab === "phan-cong") {
                    menuItemsCollapse.push(
                      <Menu.Item key={MENUITEM.PHAN_CONG}>
                        <Link
                          style={{ paddingLeft: "60px" }}
                          to={MENUITEM.PHAN_CONG}
                        >
                          <Icon type="dashboard" />
                          <span>Phân công review</span>
                        </Link>
                      </Menu.Item>
                    );
                  } else if (this.props.content_tab === "review") {
                    menuItemsCollapse.push(
                      <Menu.Item key={MENUITEM.REVIEW}>
                        <Link
                          style={{ paddingLeft: "60px" }}
                          to={MENUITEM.REVIEW}
                        >
                          <Icon type="dashboard" />
                          <span>Review môn học</span>
                        </Link>
                      </Menu.Item>
                    );
                  } else {
                    menuItemsCollapse.push(
                      <Menu.Item key={MENUITEM.THONG_TIN_CHUNG}>
                        <Tooltip title="Thông tin chung">
                          <Link style={{ paddingLeft: "60px" }} to={MENUITEM.THONG_TIN_CHUNG}>
                            <Icon type="dashboard" />
                            <span>Thông tin chung</span>
                          </Link>
                        </Tooltip>
                      </Menu.Item>
                    );
                    menuItemsCollapse.push(
                      <Menu.Item key={MENUITEM.MO_TA_MON_HOC}>
                        <Tooltip title="Mô tả môn học"><Link style={{ paddingLeft: "60px" }} to={MENUITEM.MO_TA_MON_HOC}>
                          <Icon type="pay-circle" />
                          <span>Mô tả môn học</span>
                        </Link>
                        </Tooltip>
                      </Menu.Item>
                    );
                    menuItemsCollapse.push(
                      <Menu.Item key={MENUITEM.MUC_TIEU_MON_HOC}>
                        <Tooltip title="Mục tiêu môn học">
                          <Link style={{ paddingLeft: "60px" }} to={MENUITEM.MUC_TIEU_MON_HOC}>
                            <Icon type="inbox" />
                            <span>Mục tiêu môn học</span>
                          </Link>
                        </Tooltip>

                      </Menu.Item>
                    );
                    menuItemsCollapse.push(
                      <Menu.Item key={MENUITEM.CHUAN_DAU_RA}>
                        <Tooltip title="Chuẩn đầu ra môn học">
                          <Link style={{ paddingLeft: "60px" }} to={MENUITEM.CHUAN_DAU_RA}>
                            <Icon type="table" />
                            <span>Chuẩn đầu ra môn học</span>
                          </Link>
                        </Tooltip>
                      </Menu.Item>
                    );
                    menuItemsCollapse.push(
                      <Menu.Item key={MENUITEM.GIANG_DAY_LY_THUYET}>
                        <Tooltip title="Kế hoạch giảng dạy lý thuyết">
                          <Link style={{ paddingLeft: "60px" }} to={MENUITEM.GIANG_DAY_LY_THUYET}>
                            <Icon type="read" />
                            <span>Kế hoạch giảng dạy lý thuyết</span>
                          </Link>
                        </Tooltip>
                      </Menu.Item>
                    );
                    menuItemsCollapse.push(
                      <Menu.Item key={MENUITEM.GIANG_DAY_THUC_HANH}>
                        <Tooltip title="Kế hoạch giảng dạy thực hành">
                          <Link style={{ paddingLeft: "60px" }} to={MENUITEM.GIANG_DAY_THUC_HANH}>
                            <Icon type="sync" />
                            <span>Kế hoạch giảng dạy thực hành</span>
                          </Link>
                        </Tooltip>
                      </Menu.Item>
                    );
                    menuItemsCollapse.push(
                      <Menu.Item key={MENUITEM.DANH_GIA}>
                        <Tooltip title="Đánh giá">
                          <Link style={{ paddingLeft: "60px" }} to={MENUITEM.DANH_GIA}>
                            <Icon type="file-text" />
                            <span>Đánh giá</span>
                          </Link>
                        </Tooltip>
                      </Menu.Item>
                    );
                    menuItemsCollapse.push(
                      <Menu.Item key={MENUITEM.TAI_NGUYEN_MON_HOC}>
                        <Tooltip title="Tài nguyên môn học">
                          <Link style={{ paddingLeft: "60px" }} to={MENUITEM.TAI_NGUYEN_MON_HOC}>
                            <Icon type="database" />
                            <span>Tài nguyên môn học</span>
                          </Link>
                        </Tooltip>
                      </Menu.Item>
                    );
                    menuItemsCollapse.push(
                      <Menu.Item key={MENUITEM.QUY_DINH_CHUNG}>
                        <Tooltip title="Các quy định chung">
                          <Link style={{ paddingLeft: "60px" }} to={MENUITEM.QUY_DINH_CHUNG}>
                            <Icon type="reconciliation" />
                            <span>Các quy định chung</span>
                          </Link>
                        </Tooltip>
                      </Menu.Item>
                    );
                    menuItemsCollapse.push(
                      <Menu.Item key={MENUITEM.XUAT_FILE_PDF}>
                        <Tooltip title="Xuất file PDF">
                          <Link style={{ paddingLeft: "60px" }} to={MENUITEM.XUAT_FILE_PDF}>
                            <Icon type="file-pdf" />
                            <span>Xuất file PDF</span>
                          </Link>
                        </Tooltip>
                      </Menu.Item>
                    );
                  }
                }
              }
            }
          });
        }
      } 
      else if(this.props.parentitem[i].id === "danh-muc") {
        if(this.checkAdmin(JSON.parse(localStorage.getItem('user')).data.Role)) {
          menuItemsCollapse.push(
            <Menu.Item
              key={this.props.parentitem[i].id}
              onClick={() => this.onClick(this.props.parentitem[i].id)}
            >
              <Link to={`/${this.props.parentitem[i].id}`}>
                <Icon type="dashboard" />
                <span>{this.props.parentitem[i].name}</span>
              </Link>
            </Menu.Item>
          );
        }
      }
      else if(this.props.parentitem[i].id === "view-survey") {
        if(this.checkChuNhiem(JSON.parse(localStorage.getItem('user')).data.Role)) {
          menuItemsCollapse.push(
            <Menu.Item
              key={this.props.parentitem[i].id}
              onClick={() => this.onClick(this.props.parentitem[i].id)}
            >
              <Link to={`/${this.props.parentitem[i].id}`}>
                <Icon type="dashboard" />
                <span>{this.props.parentitem[i].name}</span>
              </Link>
            </Menu.Item>
          );
        }
      }

      else if(this.props.parentitem[i].id === "survey-matrix") {
        if(this.checkChuNhiem(JSON.parse(localStorage.getItem('user')).data.Role)) {
          menuItemsCollapse.push(
            <Menu.Item
              key={this.props.parentitem[i].id}
              onClick={() => this.onClick(this.props.parentitem[i].id)}
            >
              <Link to={`/${this.props.parentitem[i].id}`}>
                <Icon type="dashboard" />
                <span>{this.props.parentitem[i].name}</span>
              </Link>
            </Menu.Item>
          );
        }
      }

      else {
        menuItemsCollapse.push(
          <Menu.Item
            key={this.props.parentitem[i].id}
            onClick={() => this.onClick(this.props.parentitem[i].id)}
          >
            <Link to={`/${this.props.parentitem[i].id}`}>
              <Icon type="dashboard" />
              <span>{this.props.parentitem[i].name}</span>
            </Link>
          </Menu.Item>
        );
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
