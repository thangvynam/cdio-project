import React, { Component } from 'react';
import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox } from 'antd';
import _ from 'lodash';
import { connect } from 'react-redux';
import { userPostFetch } from './../../../Constant/auth/authAction';
import './login.css';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;



class LoginPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            notice: '',
            type: 'tab1',
            autoLogin: true,
        }
    }

    componentWillReceiveProps(prevProps, prevState){
        console.log("A")
        if(this.props.isSuccess){
            this.props.history.push('/ctdt')
        }
    }

    onSubmit = (err, values) => {
        // console.log('value collected ->', {
        //     ...values,
        //     autoLogin: this.state.autoLogin,
        // });
        if (this.state.type === 'tab1') {
            this.setState(
                {
                    notice: '',
                },
                () => {
                    // if (!err && (values.username !== 'admin' || values.password !== '888888')) {
                    //     setTimeout(() => {
                    //         this.setState({
                    //             notice: 'The combination of username and password is incorrect!',
                    //         });
                    //     }, 500);
                    // }
                    this.props.userPostFetch(values)
                }
            );
        }
    };
    onTabChange = key => {
        this.setState({
            type: key,
        });
    };
    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked,
        });
    };
    render() {
        return (
            <div className="login-warp login-custom">
                <Login
                    defaultActiveKey={this.state.type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.onSubmit}
                >
                    <Tab key="tab1" tab="Login Syllabus">
                        {this.state.notice && (
                            <Alert
                                style={{ marginBottom: 24 }}
                                message={this.state.notice}
                                type="error"
                                showIcon
                                closable
                            />
                        )}
                        <UserName name="username" />
                        <Password name="password" />
                    </Tab>
                    {/* <Tab key="tab2" tab="Mobile">
                        <Mobile name="mobile" />
                        <Captcha onGetCaptcha={() => console.log('Get captcha!')} name="captcha" />
                    </Tab> */}
                    <div>
                        <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
                            Keep me logged in
                        </Checkbox>
                        <a style={{ float: 'right' }} href="">
                            Forgot password
                        </a>
                    </div>
                    <Submit>Login</Submit>
                </Login>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.userObj,
        loginSuccess: state.authentication.isSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userPostFetch: (user) => dispatch(userPostFetch(user)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);