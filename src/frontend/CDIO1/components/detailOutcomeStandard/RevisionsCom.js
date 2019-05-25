import React from "react";
import { Row, Col, Button } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default class RevisionsCom extends React.Component {
  actionTemplate = (data, column) => {
    return (
      <div>
        <Button
          title="Chỉnh sửa"
          onClick={() => this.props.onEdit(data.Id)}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">edit</i>
        </Button>
      </div>
    );
  };

  render() {
    return (
      <Row>
        <Col
          lg="12"
          md="12"
          sm="12"
          style={{ overflowY: "scroll", height: "320px" }}
        >
          <DataTable value={this.props.revisions}>
            <Column field="NameRevision" header="Tên phiên bản" />
            <Column
              body={this.actionTemplate}
              style={{ textAlign: "center", width: "4em" }}
            />
          </DataTable>
        </Col>
      </Row>
    );
  }
}
// 
//        <Button
//          title="Xóa"
//          onClick={() => this.props.onShowDeleteReAlert(data.Id)}
//          theme="secondary"
//          style={{ marginRight: ".3em", padding: "8px" }}
//        >
//          <i className="material-icons">delete</i>
//        </Button>
