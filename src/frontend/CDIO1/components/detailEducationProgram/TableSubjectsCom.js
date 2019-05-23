import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row, Col, Button } from "shards-react";

import * as logic from "../../business/logicEducationProgram";

export default class TableSubjectsCom extends React.Component {
  headerTemplate(data) {
    return data.nameBlock;
  }

  footerTemplate(data, index) {
    return "";
  }

  actionTemplate = (rowData, column) => {
    return (
      <div>
        <Button
          onClick={() => this.props.deleteSubject(rowData)}
          theme="secondary"
          title="Xóa môn học"
          style={{ marginRight: ".3em", padding: "0.5em" }}
        >
          <i className="material-icons">clear</i>
        </Button>
      </div>
    );
  };
  render() {
    const footerGroup = (
      <ColumnGroup>
        <Row>
          <Column footer="Tổng chỉ:" colSpan={3} />
          <Column footer={this.props.sum} />
        </Row>
      </ColumnGroup>
    );

    return (
      <div>
        <Row>
          <Col lg="12" md="12" sm="12">
            <DataTable
              value={this.props.subjects}
              headerColumnGroup={logic.headerGroup}
              rowGroupMode="subheader"
              sortField="nameBlock"
              sortOrder={1}
              groupField="nameBlock"
              editable={true}
              rowGroupHeaderTemplate={this.headerTemplate}
              rowGroupFooterTemplate={this.footerTemplate}
              footerColumnGroup={footerGroup}
            >
              {/* <Column field="nameBlock" header="Loại Học Phần" /> */}
              <Column field="index" header="STT" />
              <Column field="SubjectCode" header="Mã Môn Học" />
              <Column field="SubjectName" header="Tên Môn Học" />
              <Column field="Credit" header="Số Tín Chỉ" style={{ textAlign: "center" }} />
              <Column field="TheoryPeriod" header="Lý Thuyết" style={{ textAlign: "center" }} />
              <Column field="PracticePeriod" header="Thực Hành" style={{ textAlign: "center" }} />
              <Column field="ExercisePeriod" header="Bài Tập" style={{ textAlign: "center" }} />
              <Column field="note" header="Ghi chú" />
              <Column
                body={(rowData, column) => this.actionTemplate(rowData, column)}
                style={{ textAlign: "center", width: "4em" }}
              />
            </DataTable>
          </Col>
        </Row>
      </div>
    );
  }
}
