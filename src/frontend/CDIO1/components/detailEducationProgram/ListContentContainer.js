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

  render() {
    // contentList (đã có trước đó từ việc gọi redux ở nơi khác)
    console.log(this.props.contentList);
    // knowledgeTables có được từ việc gọi onLoadKnowledgeTable của redux
    console.log(this.props.knowledgeTables);
    // bắt sự kiện chọn content thuộc contentList => gọi redux onLoadKnowledgeTable
    return (
      <div>
        <Button onClick={() => this.props.onLoadKnowledgeTable(67)}>
        load KnowledgeTable
        </Button>
        
        <Button onClick={() => this.props.onAddKnowledgeTable(this.props.knowledgeTables)}>
        add KnowledgeTable
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
