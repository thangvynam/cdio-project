import React from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Row, Col, Button } from "shards-react";
import { connect } from "react-redux";
import { OrderList } from "primereact/orderlist";


import * as knowledgeTableAction from "../../actions/_knowledgeTableAction";

class ListContentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionEdupro: "",
      optionKnowledge: "",
      filterEdupros: [],
      filterKnowledges: [],
      listKnowledges: []
    };
  }

  componentWillReceiveProps(nextProps) {

  }
  onChangeListEdupros = e => {
    this.setState({
      optionEdupro: e.value
    });
  }

  onChangeListKnowledge = e => {
    if(typeof e.value !== "object"){
      return;
    }
    let knowledge = this.checkExistsfilterKnowledges(this.state.filterKnowledges,e.value);
    const checkListknows = this.checkExistsListknows(this.state.listKnowledges,e.value);
    let arr = this.state.listKnowledges;
    if(knowledge && !checkListknows){
      knowledge = {...knowledge, EduName: this.state.optionEdupro.EduName}
      arr.push(knowledge);
    }
    this.setState({
      optionKnowledge: e.value,
      listKnowledges : arr
    });
  }

  checkExistsfilterKnowledges = (filterKnows, value ) =>{
    const length = filterKnows.length;
    for(let i = 0; i < length ; i++){
      if(filterKnows[i].KeyRow === value.KeyRow){
        return filterKnows[i];
      }
    }
  }

  checkExistsListknows = (listKnows, value) =>{
    const length = listKnows.length;
    for(let i = 0; i < length ; i++){
       if(listKnows[i].KeyRow === value.KeyRow){
         return true;
       }
    }
    return false;
  }

  filterEdupros = e => {
    const idDetail = this.props.contentList[0].IdDetailPro;
    this.props.onLoadKnowledgeTable(idDetail)
    const listEdus = [...this.props.contentList];
    
    this.setState({
      filterEdupros: listEdus
    });
  }

  filterKnowledges = e => {
    let knowledgeTables = [...this.props.knowledgeTables];
    knowledgeTables = knowledgeTables.map(know => {
      return { ...know, display: `${know.KeyRow} - ${know.NameRow}` };
    })

    this.setState({ filterKnowledges: knowledgeTables })
  }

  knowledgeTemplate = knowledge =>{
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
          {knowledge.KeyRow+" - "+ knowledge.NameRow}
        </div>
        <p
          style={{
            fontSize: "14px",
            float: "right",
            margin: "5px 5px 0 0",
            borderBottom: "ridge"
          }}
          onClick={() => this.deleteKnowledge(knowledge)}
        >
          <i className="material-icons">clear</i>
        </p>
      </div>
    );
  }

  deleteKnowledge = knowledge =>{

  }

  render() {
    // contentList (đã có trước đó từ việc gọi redux ở nơi khác)
    // knowledgeTables có được từ việc gọi onLoadKnowledgeTable của redux
    // console.log(this.props.contentList);
    // console.log(this.props.knowledgeTables);
    // bắt sự kiện chọn content thuộc contentList => gọi redux onLoadKnowledgeTable
    return (
      <div>
        {/* <Button onClick={() => this.props.onLoadKnowledgeTable(67)}>
        load KnowledgeTable
        </Button>
        
        <Button onClick={() => this.props.onAddKnowledgeTable(this.props.knowledgeTables)}>
        add KnowledgeTable
        </Button> */}
        <Row>
          <Col lg="3" md="3" sm="3">
            <label>Chương trình đào tạo:</label>
          </Col>
          <Col lg="6" md="6" sm="6">
            <AutoComplete
              field="EduName"
              value={this.state.optionEdupro}
              dropdown={true}
              onChange={e => this.onChangeListEdupros(e)}
              size={40}
              placeholder="Chương trình đào tạo"
              minLength={1}
              suggestions={this.state.filterEdupros}
              completeMethod={e => this.filterEdupros(e)}
            />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col lg="3" md="3" sm="3">
            <label>Khối kiến thức:</label>
          </Col>
          <Col lg="6" md="6" sm="6">
            <AutoComplete
              field="display"
              value={this.state.optionKnowledge}
              dropdown={true}
              onChange={e => this.onChangeListKnowledge(e)}
              size={40}
              placeholder="Khối kiến thức"
              minLength={1}
              suggestions={this.state.filterKnowledges}
              completeMethod={e => this.filterKnowledges(e)}
            />
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col lg="12" md="12" sm="12">
            <OrderList
              header="Danh Sách Khối Kiến Thức:"
              value={this.state.listKnowledges}
              responsive={true}
              itemTemplate={this.knowledgeTemplate}
            />
          </Col>
        </Row>
        <hr></hr>
        <Button onClick={() => this.props.onAddKnowledgeTable(this.state.listKnowledges,true)}>
        Thêm
        </Button>
        <Button onClick={() => this.props.onAddKnowledgeTable(false,false)}>
        Hủy
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contentList: state.contentList,
  knowledgeTables: state.knowledgeTables

});

export default connect(mapStateToProps, {
  onLoadKnowledgeTable: knowledgeTableAction.onLoadKnowledgeTable
})(ListContentContainer);
