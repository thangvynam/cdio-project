import React, { Component } from 'react';
import { Collapse, Form, Input, Menu, Icon, Button, Dropdown, message } from 'antd';
import MucDoHanhDong from './MucDoHanhDong'
import axios from 'axios';

const Panel = Collapse.Panel;
const formItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
let itemClick = '';
let value = '';
let keyItem = '';
function callback(key) {
    console.log(key);
}

function handleMenuClick(e) {
    itemClick = e.item.props.children;
    keyItem = e.item.props.eventKey;
    message.info('Bạn vừa chọn ' + itemClick);
}
const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">Hoạt động dạy lý thuyết</Menu.Item>
        <Menu.Item key="2">Hoạt động dạy thực hành</Menu.Item>
    </Menu>
);
class Danhmuc extends Component {
    save = () => {
        const obj ={
            value :value,
            keyItem:keyItem
        }
        axios.post('/add-hdd',{data:obj})
            .then(function (response) {
                if(response.data == 1){
                    message.success('Lưu thành công');
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {

            })
    }
    handleInputChange = (e) => {
        value = e.target.value;
    }
    render() {
        return (
            
            <div>
            <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="Danh mục hoạt động dạy" key="1">
                    <Form.Item
                        {...formItemLayout}
                        label="Hoạt động dạy"
                    >
                        <Input onChange={(e) => { this.handleInputChange(e) }} />

                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Loại"
                    >
                        <Dropdown overlay={menu}>
                            <Button style={{ marginLeft: 8 }}>
                                <Icon type="down" />
                            </Button>
                        </Dropdown>
                    </Form.Item>
                    <Button type="primary" onClick={this.save} style={{ marginLeft: "22em" }}>Thêm</Button>
                </Panel>
            </Collapse>
            <MucDoHanhDong/>
            </div>
        )
    }
}

export default Danhmuc;