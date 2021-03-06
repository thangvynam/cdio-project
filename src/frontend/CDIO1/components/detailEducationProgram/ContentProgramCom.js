import React from "react";
import { TreeTable } from "primereact/treetable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Row, Col, Button } from "shards-react";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";
import { Spinner } from "primereact/spinner";
import { OrderList } from "primereact/orderlist";

import TableSubjectsCom from "./TableSubjectsCom";

import ListContentContainer from "./ListContentContainer";

import * as logic from "../../business/logicEducationProgram";
import * as common from "../../business/commonEducation";

export default class ContentProgramCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      node: [],
      nodeTables: [], // list subject of blockSubject
      isDialogRoot: false,
      isDialogChild: false,
      isDialogTable: false,
      isDialogDelete: false,
      isDialogPartStudy: false,
      subject: {},
      isDialogDeleteSubject: false,
      nameValue: "", // title of row
      isTable: false, // check is table,
      isTitle: false, // check is Title,
      isAnyTable: false, // check is add any table,
      filterSubjects: [],
      optionSubjects: [],
      listSubjects: [], // add into table
      isRequired: true,
      isAccumulationBB: true,
      isAccumulationTC: true,
      note: "",
      optionalCredit: 0,
      // hover
      nodeHover: "",
      descriptionBlockTC: "",
      descriptionBlockBB: "",
      filterBlocks: [],
      // học phần tự do
      descriptionFreePartStudy: "",
      filterDSCFreeStudies: [],
      creditFreeStudy: 1,
    };
    this.deleteSubject.bind(this);
  }

  // **************************************************************
  onAddKnowledgeTable = (knowledgeTables, isDialog) => {
    if (isDialog) {
      // here
      let data = logic.addFreePartStudies(
        this.state.nodes,
        knowledgeTables,
        this.state.node
      );
      data = this.loadTreeNodes(data);
      this.setState({ nodes: data });
    }
    this.setState({
      isDialogPartStudy: false
    })
  }
  // **************************************************************

  // get targetNodes from redux
  getContentNodes = (contentNodes, subjects) => {
    let contents = logic.convertDbToTreeNodes(contentNodes, subjects);
    contents = this.loadTreeNodes(contents);
    this.setState({ nodes: contents });
  };

  getContentNodesFromRevert = contentNodes => {
    this.setState({ nodes: contentNodes.nodes });
  };
  // end get targetNodes from redux

  // Add
  handleAddRoot = () => {
    const data = logic.addRoot(this.state.nodes, this.state.nameValue);
    this.setState({ nodes: data, nameValue: "" });
    this.onHideDialogRoot();
  };

  handleAddChild = () => {
    const data = [...this.state.nodes];
    if (this.state.isTitle) {
      const nodes = logic.addChildTitle(
        data,
        this.state.node,
        this.state.nameValue
      );
      this.setState({
        nodes: nodes,
        nameValue: ""
      });
    } else if (this.state.isTable) {
      this.setState({ nodes: this.addChildTable(data, this.state.node) });
    }
    else { // HP tu do
      const data = logic.addChildFreePartStudy(
        this.state.nodes,
        this.state.node, 
        "Kiến thức tự chọn tự do",
        this.state.descriptionFreePartStudy,
        this.state.creditFreeStudy
      )
      this.setState({ nodes: data });
    }
    this.onHideDialogChild();
  };

  addChildTable = (data, nodeParent) => {
    const length = nodeParent.children.length;
    const key = `${nodeParent.key}.${length + 1}`;
    let node = {
      key: key,
      data: {
        isTable: true,
        //optionalCredit: 0,
        totalCredits: 0,
        subjects: [],
        displayName: ""
      },
      children: []
    };
    // reset credits
    if (this.state.isRequired) {
      this.setState({ optionalCredit: 0 });
    }
    node = this.convertNodeToDataTable(node);
    nodeParent.children.push(node);
    data = common.updateNode(data, nodeParent);
    return data;
  };

  convertNodeToDataTable = node => {
    if (!node.data.isTable) {
      return node;
    }
    const subjects = node.data.subjects;
    node.data.displayName = (
      <TableSubjectsCom
        subjects={subjects}
        deleteSubject={this.isShowDialogDeleteSubject}
        sum={node.data.totalCredits}
      />
    );
    return node;
  };

  addRowTable = () => {
    let data = [...this.state.nodes];
    const subjects = logic.updateBlocks(
      this.state.listSubjects,
      this.state.descriptionBlockBB,
      this.state.descriptionBlockTC,
      this.state.isAccumulationBB,
      this.state.isAccumulationTC,
      this.state.optionalCredit
    );

    data = this.addRowTableLogic(data, this.state.node, subjects);
    this.setState({ nodes: data });
    this.onHideDialogTable();
  };

  addRowTableLogic = (nodes, node, subjectsAdd) => {
    if (!node.data.isTable) {
      return nodes;
    }
    let child = { ...node };
    let root = [...nodes];
    //child.data.subjects = [child.data.subjects,...subjects];
    let subjectsTable = child.data.subjects;
    subjectsAdd.forEach(subject => {
      subject.parentKey = child.key;
      subjectsTable = logic.addSubjectInOnchange(subjectsTable, subject);
    });
    // check exists block
    const blocks = logic.blocksOfTable(this.state.node);
    if (logic.checkExistsBlock(this.state.descriptionBlockTC, blocks)) {
      subjectsTable = logic.updateAccumulationAndCredit(
        subjectsTable,
        this.state.descriptionBlockTC,
        this.state.isAccumulationTC,
        this.state.optionalCredit
      );
    }
    child.data.subjects = subjectsTable;

    child.data.totalCredits = logic.totalCreditsOfTable(subjectsTable);
    child.data.subjects = logic.sortSubject(child.data.subjects);
    child.data.subjects = logic.indexSubjects(child.data.subjects);
    child = this.convertNodeToDataTable(child);
    root = common.updateNode(root, child);
    return root;
  };

  // Delete
  deleteNode = () => {
    const root = logic.deleteNode(this.state.nodes, this.state.node);
    this.setState({
      nodes: root,
      isDialogDelete: false
    });
  };

  // update
  nameEditor = props => {
    return this.inputTextEditor(props, "name");
  };

  inputTextEditor = (props, field) => {
    if (props.node.data.isTable) {
      return (
        <TableSubjectsCom
          subjects={props.node.data.subjects}
          deleteSubject={this.isShowDialogDeleteSubject}
          sum={props.node.data.totalCredits}
        />
      );
    } else {
      return (
        <InputText
          style={{ width: "80%" }}
          type="text"
          value={props.node.data[field]}
          onChange={e => this.onEditorValueChange(props, e.target.value)}
        />
      );
    }
  };

  onEditorValueChange = (props, value) => {
    let key = props.node.key;
    // case root = 7.1.... => 1.1...
    if (this.state.nodes[0].key[0] === "7") {
      const firstDot = key.indexOf(".");
      key = key.slice(firstDot + 1, key.length);
    }
    const editedNode = { ...common.findNodeByKey(this.state.nodes, key) };
    editedNode.data.name = value;
    editedNode.data.displayName = `${editedNode.key}. ${editedNode.data.name}`;
    const data = common.updateNode(this.state.nodes, editedNode);
    this.setState({
      nodes: data
    });
  };

  // edit table
  codeSubjectEditor = props => {
    return this.inputTextTableEditor(props, "SubjectCode");
  };

  inputTextTableEditor = (props, field) => {
    return <InputText type="text" value={props.rowData.SubjectCode} />;
  };

  // up/down node
  upSameLevel = node => {
    let root = logic.upSameLevel(this.state.nodes, node);
    root = this.loadTreeNodes(root);
    this.setState({ nodes: root });
  };

  downSameLevel = node => {
    let root = logic.downSameLevel(this.state.nodes, node);
    root = this.loadTreeNodes(root);
    this.setState({ nodes: root });
  };

  // mouseOver
  mouseOver = node => {
    this.setState({ nodeHover: node.key });
  };

  // hover up level
  mouseOverUp = node => {
    this.setState({ nodeHover: common.hoverUpLevel(node) });
  };

  // hover down level
  mouseOverDown = node => {
    this.setState({ nodeHover: common.hoverDownLevel(this.state.nodes, node) });
  };

  // show/hidden Dialong
  isShowDialogRoot = () => {
    this.setState({
      isDialogRoot: true
    });
  };

  isShowDialogChild = node => {
    this.setState({
      isDialogChild: true,
      node: node
    });
  };

  isShowDialogPartStudy = node => {
    this.setState({
      node: node,
      isDialogPartStudy: true,
      descriptionFreePartStudy: node.data.description,
      creditFreeStudy: node.data.credit
    });

  }

  isShowDialogTable = node => {
    this.setState({
      isDialogTable: true,
      node: node,
      isAccumulationBB: true,
      isAccumulationTC: true,
      optionalCredit: 0,
      isRequired: true,
      descriptionBlockBB: "",
      descriptionBlockTC: "",
      listSubjects: []
    });
  };

  isShowDialogDelete = node => {
    this.setState({
      isDialogDelete: true,
      node: node
    });
  };

  isShowDialogDeleteSubject = subject => {
    debugger;
    this.setState({
      isDialogDeleteSubject: true,
      subject: subject
    });
  };


  onHideDialogRoot = () => {
    this.setState({ isDialogRoot: false });
  };

  onHideDialogChild = () => {
    this.setState({ isDialogChild: false });
  };

  onHideDialogTable = () => {
    this.setState({
      listSubjects: [],
      isDialogTable: false
    });
  };

  onHideDialogFreePartStudy = () => {
    this.setState({
      isDialogPartStudy: false,
      descriptionFreePartStudy: "",
      creditFreeStudy: 1
    });
  };

  onHideDialogDelete = () => {
    this.setState({ isDialogDelete: false });
  };

  onHideDialogDeleteSubject = () => {
    this.setState({ isDialogDeleteSubject: false });
  };

  handleChangeValue = e => {
    this.setState({ nameValue: e.target.value });
  };

  // supporting

  loadSubNode = node => {
    if (node.children) {
      const length = node.children.length;
      for (let i = 0; i < length; i++) {
        if (node.children[i].data.isTable) {
          node.children[i] = this.convertNodeToDataTable(node.children[i]);
        }
        if (node.children[i].children) {
          this.loadSubNode(node.children[i]);
        }
      }
    }
  };

  loadTreeNodes = nodes => {
    const root = [...nodes];
    const length = root.length;
    for (let i = 0; i < length; i++) {
      this.loadSubNode(root[i]);
    }
    return root;
  };

  deleteSubjectOnTable = () => {
    let root = logic.deleteSubjectTable(this.state.nodes, this.state.subject);
    root = this.loadTreeNodes(root);
    this.setState({ 
      nodes: root,
      isDialogDeleteSubject: false
    });
  };

  filterSubjects = e => {
    this.setState({
      filterSubjects: logic.filterSubjects(e, this.props.subjects).map(subject =>{
        return {...subject, display: subject.SubjectCode +" - " + subject.SubjectName};
      })
    });
  };

  filterBlocks = e => {
    this.setState({
      filterBlocks: logic.blocksOfTable(this.state.node)
    });
  };

  filterFreeStudy = e => {

  }

  // onchange

  onChangeListSubjectsRequired = e =>{
    let list = this.state.listSubjects;
    let listBB = this.state.listSubjects.filter(subject => {
      if (subject.nameBlock.startsWith("BB")) {
        return subject;
      }
    })
    let i = 0;
    listBB = e.value;
    list = list.map(subject=>{
      if(subject.nameBlock.startsWith("BB")){
        ++i;
        let flag = i;
        return listBB[--flag];
      }
      return subject;
    })
    this.setState({listSubjects: list})
  }

  onChangeListSubjectsOption = e =>{
    let list = this.state.listSubjects;
    let listTC = this.state.listSubjects.filter(subject => {
      if (subject.nameBlock.startsWith("TC")) {
        return subject;
      }
    })
    let i = 0;
    listTC = e.value;
    list = list.map(subject=>{
      if(subject.nameBlock.startsWith("TC")){
        ++i;
        let flag = i;
        return listTC[--flag];
      }
      return subject;
    })
    this.setState({listSubjects: list})
  }

  onChangeCreditFreeStudy = e => {
    this.setState({
      creditFreeStudy: e.value
    });
  }

  onChangeDSCFreeStudy = e => {
    this.setState({
      descriptionFreePartStudy: e.value
    })
  }

  onChangeListSubjects = e => {
    if (typeof e.value === "object") {
      const subjetcsEdu = logic.listSubjects(this.state.nodes);
      const subject = e.value;
      const checkAdd = subjetcsEdu.find(item => item.Id === subject.Id);
      if(checkAdd){
        const key = checkAdd.parentKey;
        const keyTable = key.slice(0, key.lastIndexOf('.'));
        alert("Môn học đã tồn tại tại bảng " + keyTable);
        return ;
      }
      subject.nameBlock = this.state.isRequired ? "BB" : "TC";
      subject.isAccumulation = true;
      const subjects = logic.addSubjectInOnchange(
        this.state.listSubjects,
        subject
      );
      this.setState({ listSubjects: subjects });
    }
    this.setState({ optionSubjects: e.value });
  };

  onChangeDescriptionBlock = e => {
    if (this.state.isRequired) {
      this.setState({ descriptionBlockBB: e.value });
    } else {
      const credit = logic.findCreditByNameBlock(this.state.node, e.value);
      this.setState({
        descriptionBlockTC: e.value,
        optionalCredit: credit
      });
    }
  };

  onChangeCredit = e => {
    if (e.value > 0)
      this.setState({
        optionalCredit: e.value
      });
  };

  isCanAdd = node => {
    if (node.children[0]) if (node.children[0].data.isTable) return false;
    return true;
  };

  // on check

  onCheckAddTitle = () => {
    this.setState({
      isTitle: true,
      isTable: false,
      isAnyTable: false
    });
  };

  onCheckAddTable = () => {
    this.setState({
      isTable: true,
      isTitle: false,
      isAnyTable: false
    });
  };

  onCheckAddAnyTable = () => {
    this.setState({
      isAnyTable: true,
      isTable: false,
      isTitle: false
    });
  };

  // Template
  actionTemplate(node, column) {
    return (
      JSON.parse(localStorage.getItem("user")).data.Role.includes(
        "BIEN_SOAN"
      ) && (
        <div>
          {node.data.isTable ? (
            <Button
              onClick={() => this.isShowDialogTable(node)}
              theme="success"
              style={{ marginRight: ".3em", padding: "8px" }}
              title={`Thêm môn học`}
            >
              <i className="material-icons">playlist_add</i>
            </Button>
          ) : (
              <span>
                {this.isCanAdd(node) && (
                  node.data.credit ? (
                    <Button
                      onClick={() => this.isShowDialogPartStudy(node)}
                      onMouseOver={() => this.mouseOver(node)}
                      theme="success"
                      style={{ marginRight: ".3em", padding: "8px" }}
                      title={`Thêm học phần tự do của ${this.state.nodeHover}`}
                    >
                      <i className="material-icons">add_to_queue</i>
                    </Button>
                  ) : (
                      <Button
                        onClick={() => this.isShowDialogChild(node)}
                        onMouseOver={() => this.mouseOver(node)}
                        theme="success"
                        style={{ marginRight: ".3em", padding: "8px" }}
                        title={`Thêm cấp con của ${this.state.nodeHover}`}
                      >
                        <i className="material-icons">add</i>
                      </Button>
                    )

                )}
                <Button
                  onClick={() => this.upSameLevel(node)}
                  onMouseOver={() => this.mouseOverUp(node)}
                  theme="info"
                  style={{ marginRight: ".3em", padding: "8px" }}
                  title={`Lên cấp ${this.state.nodeHover}`}
                >
                  <i className="material-icons">arrow_upward</i>
                </Button>
                <Button
                  onClick={() => this.downSameLevel(node)}
                  // onMouseOver = {() => this.mouseOverDown(node)}
                  theme="info"
                  style={{ marginRight: ".3em", padding: "8px" }}
                //title={`Xuống xấp ${this.state.nodeHover}`}
                >
                  <i className="material-icons">arrow_downward</i>
                </Button>
              </span>
            )}
          <Button
            onClick={() => this.isShowDialogDelete(node)}
            onMouseOver={() => this.mouseOver(node)}
            theme="secondary"
            style={{ marginRight: ".3em", padding: "8px" }}
            title={`Xóa cấp ${this.state.nodeHover}`}
          >
            <i className="material-icons">delete_sweep</i>
          </Button>
        </div>
      )
    );
  }

  deleteSubject = (subject) => {
    this.setState({
      listSubjects: logic.deteleSubject(this.state.listSubjects, subject)
    });
  };

  subjectTemplate = subject => {
    return (
      <div className="p-clearfix">
        <div
          style={{
            fontSize: "14px",
            float: "left",
            margin: "5px 5px 0 0",
            borderBottom: "ridge"
          }}
        >
          {subject.SubjectCode +" - "+ subject.SubjectName}
        </div>
        <p
          style={{
            fontSize: "14px",
            float: "right",
            margin: "5px 5px 0 0",
            borderBottom: "ridge"
          }}
          onClick={() => this.deleteSubject(subject)}
        >
          <i className="material-icons">clear</i>
        </p>
      </div>
    );
  };

  footer = (
    <div className="p-clearfix" style={{ width: "100%" }}>
      <Button theme="success" style={{ float: "left" }} title="Thêm môn học">
        <i className="material-icons">playlist_add</i>
      </Button>
    </div>
  );

  footerRoot = (
    <div>
      <Button onClick={this.handleAddRoot} theme="success">
        Thêm
      </Button>
      <Button onClick={this.onHideDialogRoot} theme="secondary">
        Hủy
      </Button>
    </div>
  );

  footerChild = (
    <div>
      <Button onClick={this.handleAddChild} theme="success">
        Thêm
      </Button>
      <Button onClick={this.onHideDialogChild} theme="secondary">
        Hủy
      </Button>
    </div>
  );

  footerDialogTable = (
    <div>
      <Button onClick={this.addRowTable} theme="success">
        Thêm
      </Button>
      <Button onClick={this.onHideDialogTable} theme="secondary">
        Hủy
      </Button>
    </div>
  );

  footerDialogDelete = (
    <div>
      <Button onClick={this.deleteNode} theme="success">
        Xóa
      </Button>
      <Button onClick={this.onHideDialogDelete} theme="secondary">
        Hủy
      </Button>
    </div>
  );

  footerDialogDeleteSubject = (
    <div>
      <Button onClick={this.deleteSubjectOnTable} theme="success">
        Xóa
      </Button>
      <Button onClick={this.onHideDialogDeleteSubject} theme="secondary">
        Hủy
      </Button>
    </div>
  );

  footerDialogFreePartStudy = (
    <div>
      <Button
        onClick={this.onAddKnowledgeTable}
        theme="success">
        Thêm
    </Button>
      <Button onClick={this.onHideDialogFreePartStudy} theme="secondary">
        Hủy
    </Button>
    </div>
  )

  render() {
    return (
      <div>
        <TreeTable value={this.state.nodes}>
          <Column
            field="displayName"
            header="Tên dòng"
            editor={
              JSON.parse(localStorage.getItem("user")).data.Role.includes(
                "BIEN_SOAN"
              )
                ? this.nameEditor
                : null
            }
            expander
          />
          <Column
            header={
              JSON.parse(localStorage.getItem("user")).data.Role.includes(
                "BIEN_SOAN"
              ) && (
                <Button
                  onClick={() => this.isShowDialogRoot(null)}
                  theme="success"
                >
                  <i className="material-icons">add</i> Thêm cấp
                </Button>
              )
            }
            body={(node, column) => this.actionTemplate(node, column)}
            style={{ textAlign: "center", width: "12em" }}
          />
        </TreeTable>

        {/* Dialog Root */}
        <Dialog
          header="Thêm Nội Dung Chương Trình"
          visible={this.state.isDialogRoot}
          onHide={() => this.onHideDialogRoot()}
          style={{ width: "50vw" }}
          footer={this.footerRoot}
        >
          <Col>
            <InputText
              type="text"
              value={this.state.nameValue}
              onChange={this.handleChangeValue}
              placeholder="Tên"
              style={{ width: "100%" }}
            />
          </Col>
        </Dialog>
        {/* Dialog Child */}
        <Dialog
          header="Thêm Nội Dung Chương Trình"
          visible={this.state.isDialogChild}
          onHide={() => this.onHideDialogChild()}
          style={{ width: "60vw" }}
          footer={this.footerChild}
        >
          {/* Checked */}
          <Row>
            <Col lg="2" md="2" sm="4">
              <Checkbox
                checked={this.state.isTitle}
                onChange={this.onCheckAddTitle}
              />
              <label htmlFor="cb2" className="p-checkbox-label">
                Thêm cấp
              </label>
            </Col>
            <Col lg="2" md="2" sm="4">
              <Checkbox
                checked={this.state.isTable}
                onChange={this.onCheckAddTable}
              />
              <label htmlFor="cb2" className="p-checkbox-label">
                Thêm bảng
              </label>
            </Col>
            <Col lg="4" md="4" sm="4">
              <Checkbox
                checked={this.state.isAnyTable}
                onChange={this.onCheckAddAnyTable}
              />
              <label htmlFor="cb2" className="p-checkbox-label">
                Thêm học phần tự do
              </label>
            </Col>
          </Row>
          <hr />
          {/* is title */}
          <Row>
            <Col>
              <InputText
                hidden={!this.state.isTitle}
                type="text"
                value={this.state.nameValue}
                onChange={this.handleChangeValue}
                placeholder="Tên"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          {/* is table if accumulation true: Có, else Không. if isRequired true => BB*/}
          <Row>
            <div hidden={!this.state.isTable}>
              <DataTable headerColumnGroup={logic.headerGroup}>
                <Column header="STT" />
                <Column header="Loại Học Phần" />
                <Column header="Mã Môn Học" />
                <Column header="Tên Môn Học" />
                <Column header="Số Tín Chỉ" />
                <Column header="Lý Thuyết" />
                <Column header="Thực Hành" />
                <Column header="Bài Tập" />
                <Column header="Description" />
              </DataTable>
            </div>
          </Row>
          {/* is add any table */}
          <div hidden={!this.state.isAnyTable}>
            {/* đây là component  với tham số truyền vào là function onAddKnowledgeTable được định nghĩa ở 
                ContentProgramCom và có dữ liệu truyền vào từ ListContentContainer
                cách viết hàm: onAddKnowledgeTable = knowledgeTable =>{
                  sự dụng knowledgeTable ở đây
                }
            */}
            {/*<ListContentContainer onAddKnowledgeTable={this.onAddKnowledgeTable} />*/}
            <Row>
              <Col lg="5" md="5" sm="5">
                <AutoComplete
                  field="SubjectName"
                  value={this.state.descriptionFreePartStudy}
                  dropdown={true}
                  onChange={e => this.onChangeDSCFreeStudy(e)}
                  size={30}
                  placeholder="Mô tả"
                  minLength={1}
                  suggestions={this.state.filterDSCFreeStudies}
                  completeMethod={e => this.filterFreeStudy(e)}
                />
              </Col>
              <Col lg="2" md="2" sm="2">
                <label>Số chỉ tích lũy:</label>
              </Col>
              <Col lg="1" md="1" sm="1">
                <Spinner
                  value={+this.state.creditFreeStudy}
                  onChange={e => this.onChangeCreditFreeStudy(e)}
                  min={1} max={100}
                />
              </Col>
            </Row>
          </div>

        </Dialog>
        {/* Dialog of dataTable */}
        <Dialog
          header="Thêm Nội Dung Môn Học"
          visible={this.state.isDialogTable}
          onHide={() => this.onHideDialogTable()}
          style={{ width: "60vw" }}
          footer={this.footerDialogTable}
        >
          <Row>
            <Col lg="3" md="3" sm="3">
              <span>Môn Học thêm vào:</span>
            </Col>
            <Col lg="9" md="9" sm="9">
              <AutoComplete
                field="display"
                value={this.state.optionSubjects}
                dropdown={true}
                onChange={e => this.onChangeListSubjects(e)}
                size={40}
                placeholder="Toán rời rạc"
                minLength={1}
                suggestions={this.state.filterSubjects}
                completeMethod={e => this.filterSubjects(e)}
              />
            </Col>
          </Row>
          <hr />
          <div hidden={!this.state.isRequired}>
            <Row>
              <Col lg="12" md="12" sm="12">
                <OrderList
                  header="Danh Sách Môn Học BB:"
                  value={this.state.listSubjects.filter(subject => {
                    if (subject.nameBlock.startsWith("BB")) {
                      return subject;
                    }
                  })}
                  responsive={true}
                  itemTemplate={this.subjectTemplate}
                  onChange={(e) => this.onChangeListSubjectsRequired(e)}
                />
              </Col>
            </Row>
          </div>
          <div hidden={this.state.isRequired}>
            <Row>
              <Col lg="12" md="12" sm="12">
                <OrderList
                  header="Danh Sách Môn Học TC:"
                  value={this.state.listSubjects.filter(subject => {
                    if (subject.nameBlock.startsWith("TC")) {
                      return subject;
                    }
                  })}
                  responsive={true}
                  itemTemplate={this.subjectTemplate}
                  onChange={(e) => this.onChangeListSubjectsOption(e)}
                />
              </Col>
            </Row>
          </div>
          <br />
          <Row>
            <Col lg="2" md="2" sm="2">
              <label>Loại Học Phần:</label>
            </Col>
            <Col lg="2" md="2" sm="2">
              <Checkbox
                checked={this.state.isRequired}
                onChange={e => this.setState({ isRequired: true })}
              />
              <label htmlFor="cb2" className="p-checkbox-label">
                Bắt Buộc
              </label>
            </Col>
            <Col lg="2" md="2" sm="2">
              <Checkbox
                checked={!this.state.isRequired}
                onChange={e => this.setState({ isRequired: false })}
              />
              <label htmlFor="cb2" className="p-checkbox-label">
                Tự Chọn
              </label>
            </Col>
            <Col lg="2" md="2" sm="2" hidden={this.state.isRequired}>
              <label>Số chỉ Tự Chọn:</label>
            </Col>
            <Col lg="1" md="1" sm="1" hidden={this.state.isRequired}>
              <Spinner
                value={+this.state.optionalCredit}
                onChange={e => this.onChangeCredit(e)}
              />
            </Col>
          </Row>
          <div hidden={!this.state.isRequired}>
            <br />
            <Row>
              <Col lg="2" md="2" sm="2">
                <label>Mô tả:</label>
              </Col>
              <Col lg="6" md="6" sm="6">
                <AutoComplete
                  value={this.state.descriptionBlockBB}
                  dropdown={true}
                  onChange={e => this.onChangeDescriptionBlock(e)}
                  size={40}
                  placeholder="Tự Nhiên"
                  minLength={1}
                  suggestions={this.state.filterBlocks}
                  completeMethod={e => this.filterBlocks(e)}
                />
              </Col>
              <Col lg="2" md="2" sm="2">
                <Checkbox
                  checked={this.state.isAccumulationBB}
                  onChange={e =>
                    this.setState({
                      isAccumulationBB: !this.state.isAccumulationBB
                    })
                  }
                />
                <label htmlFor="cb2" className="p-checkbox-label">
                  Có Tính Lũy
                </label>
              </Col>
            </Row>
          </div>
          <div hidden={this.state.isRequired}>
            <br />
            <Row>
              <Col lg="2" md="2" sm="2">
                <label>Mô tả:</label>
              </Col>
              <Col lg="6" md="6" sm="6">
                <AutoComplete
                  value={this.state.descriptionBlockTC}
                  dropdown={true}
                  onChange={e => this.onChangeDescriptionBlock(e)}
                  size={40}
                  placeholder="Toán Học"
                  minLength={1}
                  suggestions={this.state.filterBlocks}
                  completeMethod={e => this.filterBlocks(e)}
                />
              </Col>
              <Col lg="2" md="2" sm="2">
                <Checkbox
                  checked={this.state.isAccumulationTC}
                  onChange={e =>
                    this.setState({
                      isAccumulationTC: !this.state.isAccumulationTC
                    })
                  }
                />
                <label htmlFor="cb2" className="p-checkbox-label">
                  Có Tích Lũy
                </label>
              </Col>
            </Row>
          </div>
          <Row hidden={true}>
            <Col lg="2" md="2" sm="6">
              <label>Ghi chú:</label>
            </Col>
            <Col lg="10" md="10" sm="12">
              <InputTextarea
                rows={1}
                cols={30}
                value={this.state.note}
                onChange={e => this.setState({ note: e.target.value })}
              />
            </Col>
          </Row>
        </Dialog>

        {/* Dialoag delete node*/}
        <Dialog
          header="Xóa"
          visible={this.state.isDialogDelete}
          onHide={() => this.onHideDialogDelete()}
          style={{ width: "50vw" }}
          footer={this.footerDialogDelete}
        >
          <p>{`Bạn thực sự muốn xóa cấp ${this.state.node.key}`}</p>
        </Dialog>

         {/* Dialoag delete subject */}
         <Dialog
          header="Xóa"
          visible={this.state.isDialogDeleteSubject}
          onHide={() => this.onHideDialogDeleteSubject()}
          style={{ width: "50vw" }}
          footer={this.footerDialogDeleteSubject}
        >
          <p>{`Bạn thực sự muốn xóa môn học`}</p>
        </Dialog>

        {/* Dialog add free study part */}
        <Dialog
          header="Thêm các khối kiến thức cho học phần tự do"
          visible={this.state.isDialogPartStudy}
          onHide={() => this.onHideDialogFreePartStudy()}
          style={{ width: "50vw" }}
        // footer={this.footerDialogFreePartStudy}
        >
          <ListContentContainer onAddKnowledgeTable={this.onAddKnowledgeTable} />
        </Dialog>
      </div>
    );
  }
}
