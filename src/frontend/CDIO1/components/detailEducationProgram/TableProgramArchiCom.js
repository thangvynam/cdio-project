import React from "react";
import { Button } from "shards-react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row, Col } from "shards-react";

export default class TableProgramArchiCom extends React.Component {
  render() {
    const header = (
      <div className="p-clearfix" style={{ lineHeight: "1.87em" }}>
        Tổng số tín chỉ tích lũy khi tốt nghiệp: {this.props.sumCredit}
        <Button
          onClick={this.props.refreshCate6}
          theme="info"
          style={{ float: "right" }}
        >
          <i className="material-icons">refresh</i>
        </Button>
      </div>
    );
    const headerGroup = (
      <ColumnGroup>
        <Row>
          <Column header="Khối kiến thức" rowSpan={2} />
          <Column header="Số tín chỉ" colSpan={3} />
        </Row>
        <Row>
          <Column header="Bắt buộc" />
          <Column header="Tự chọn" />
          <Column header="Tổng cộng" />
        </Row>
      </ColumnGroup>
    );

    return (
      <div>
        <Row>
          <Col lg="12" md="12" sm="12">
            <TreeTable
              header={header}
              headerColumnGroup={headerGroup}
              value={this.props.archiNodes}
              groupField="sumCredit"
              sortField="sumCredit"
              sortOrder={1}
            >
              <Column field="name" expander />
              <Column field="sum" />
              <Column field="TCSum" />
              <Column field="BBSum" />
            </TreeTable>
          </Col>
        </Row>
      </div>
    );
  }
}
