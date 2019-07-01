import React, { Component } from 'react'
import { Table, Modal, Button, Row, Icon } from 'antd';
import _ from 'lodash';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import "./matrix.css";

class PreviewMatrix extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible2: false
        }
    }

    addClassExport = () => {
        var table = document.getElementsByTagName('table');
        if (!_.isEmpty(table)) {
            for (var i = 0; i < table.length; i++) {
                if (i === table.length - 1) {
                    if (table[i].getAttribute('id') !== 'table-to-xls') {
                        table[i].setAttribute('id', 'table-to-xls');
                    } else {
                        continue;
                    }
                } else {
                    table[i].setAttribute('id', "");
                }
            }
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel2 = e => {
        this.setState({
            visible2: false,
        });
    };

    showModalConfirm = async () => {
        await this.setState({
            visible2: true,
        });
        await this.addClassExport();
    }

    render() {
        return (
            <div className="survey-matrix-wrap">
                <Button type="primary" onClick={this.showModal}>
                    Preview Matrix
                </Button>
                <Modal
                    className="wrapper-preview-dialog"
                    width={"80%"}
                    title="Preview Matrix"
                    onCancel={this.handleCancel}
                    visible={this.state.visible}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Cancel
                        </Button>,
                        <Button type="primary" onClick={this.showModalConfirm}>
                            Confirm
                        </Button>,
                    ]}
                >
                    <Row className="preview-matrix">
                        <Modal
                            visible={this.state.visible2}
                            onCancel={this.handleCancel2}
                            closable={false}
                            width = {400} 
                            footer={null}
                        >
                            <div className="custom-modal-confirm">
                                <Row className='row-message-confirm'>
                                    <Icon type="question-circle"/> <span className="message">Are you sure to export matrix?</span>
                                </Row>
                                <Row className="row-button-confirm">
                                    <Button className="mr-1" key="back" onClick={this.handleCancel2}>
                                        No
                                    </Button>
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="download-table-xls-button btn btn-outline-warning"
                                        table="table-to-xls"
                                        filename="matrix"
                                        sheet="tablexls"
                                        buttonText="Yes"
                                    />
                                </Row>
                            </div>
                        </Modal>
                        <Table
                            bordered
                            columns={this.props.column}
                            dataSource={this.props.data}
                            scroll={{ x: 1500 }}
                            pagination={false}

                        />
                    </Row>
                </Modal>
            </div>
        )
    }
}
export default PreviewMatrix;
