import React,{Component} from 'react';

import { Tabs,WingBlank} from 'antd-mobile';
import LoginForm from './LoginForm';
import fetch from 'isomorphic-fetch'

class LoginPage extends Component{
    constructor(){
        super();
        this.state = {
            signUsername:'',
            signPassword:'',
            loginUsername:'',
            loginPassword:''
        };
        this.signUsernameChangeHandler = this.signUsernameChangeHandler.bind(this);
        this.loginUsernameChangeHandler = this.loginUsernameChangeHandler.bind(this);
        this.signPasswordChangeHandler = this.signPasswordChangeHandler.bind(this);
        this.loginPasswordChangeHandler = this.loginPasswordChangeHandler.bind(this);
        this.signupAction = this.signupAction.bind(this);
        this.loginAction = this.loginAction.bind(this);
    }
    signUsernameChangeHandler(e){
        this.setState({
            signUsername:e
        })
    }
    signPasswordChangeHandler(e){
        this.setState({
            signPassword:e
        })
    }
    loginUsernameChangeHandler(e){
        this.setState({
            loginUsername:e
        })
    }
    loginPasswordChangeHandler(e){
        this.setState({
            loginPassword:e
        })
    }
    signupAction() {
        const url = `/api/signup`
        fetch(url, {
            method: 'POST',
            // 设置这个header，才能正确parse
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.signUsername,
                password: this.state.signPassword
            }),
            mode: 'cors'
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
        })
    }
    loginAction() {
        const url = `/api/login`
        fetch(url, {
            method: 'POST',
            // 设置这个header，才能正确parse
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.loginUsername,
                password: this.state.loginPassword
            }),
            mode: 'cors'
        }).then(function(response) {
                return response.json();
        }).then(function(data) {
            if(data.status === 1) {
                console.log( data )
                sessionStorage.setItem('__token__', data.token);
                sessionStorage.setItem('__username__', data.username);
                location.href = '/index';
            }
            else {
                console.log( data )
            }

        })
    }
    render(){
        const tabs = [
            {title:'登录'},
            {title:'注册'}
        ]
        return(
            <WingBlank>
                <Tabs tabs={tabs}>
                    <LoginForm name="登录"
                               username={this.state.loginUsername}
                               password={this.state.loginPassword}
                               usernameChangeHandler={this.loginUsernameChangeHandler}
                               passwordChangeHandler={this.loginPasswordChangeHandler}
                               clickHandler={this.loginAction}/>
                    <LoginForm name="注册"
                               username={this.state.signUsername}
                               password={this.state.signPassword}
                               usernameChangeHandler={this.signUsernameChangeHandler}
                               passwordChangeHandler={this.signPasswordChangeHandler}
                               clickHandler={this.signupAction}/>
                </Tabs>
            </WingBlank>
        )
    }
}

export default LoginPage;