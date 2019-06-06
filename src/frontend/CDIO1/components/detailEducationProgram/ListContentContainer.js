import React from "react";

import { Button } from "shards-react";

import { connect } from "react-redux";

import * as knowledgeTableAction from "../../actions/_knowledgeTableAction";

class ListContentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
    });
}

  onAddKnowledgeTable = () => {
    // gọi hàm onAddKnowledgeTable của ContentPrgramCom với
    // data truyền vào là state.knowledgeTable của ListContentContainer
    this.props.onAddKnowledgeTable(this.state.knowledgeTable);
  };

  render() {
    // contentList (đã có trước đó từ việc gọi redux ở nơi khác)
    console.log(this.props.contentList);
    // knowledgeTables có được từ việc gọi onLoadKnowledgeTable của redux
    console.log(this.props.knowledgeTables);
    // bắt sự kiện chọn content thuộc contentList => gọi redux onLoadKnowledgeTable
    return (
      <Button onClick={() => this.props.onLoadKnowledgeTable(67)}>
        <i className="material-icons">playlist_add</i>
      </Button>
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
