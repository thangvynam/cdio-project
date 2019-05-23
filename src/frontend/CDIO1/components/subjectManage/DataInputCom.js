import React from "react";

export default class DataInputCom extends React.Component {
  handleFile = e => {
    const files = e.target.files;
    if (files && files[0]) this.props.importFile(files[0]);
  };
  render() {
    return (
      <form>
        <label
          style={{
            borderRadius: " 8px",
            border: "1px solid #17C671",
            margin: "0px 0px 0px 10px",
            display: "inline-block",
            color: "#17C671",
            padding: "6px",
            cursor: "pointer"
          }}
          htmlFor="file"
          className="custom-file-upload"
        >
          <i className="material-icons">backup</i> Tải file Excel
        </label>
        <input
          type="file"
          style={{ visibility: "hidden" }}
          className="form-control"
          id="file"
          onChange={this.handleFile}
        />
      </form>
    );
  }
}
