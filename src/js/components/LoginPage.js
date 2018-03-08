import React,{Component} from 'react';

import { Tabs,WingBlank} from 'antd-mobile';
import LoginForm from './LoginForm';
import fetch from 'isomorphic-fetch';
import Layer from './Layer';



class LoginPage extends Component{
    constructor(){
        super();
        this.state = {
            signUsername:'',
            signPassword:'',
            loginUsername:'',
            loginPassword:'',
            show:false,
            information:'',
        };
        this.signUsernameChangeHandler = this.signUsernameChangeHandler.bind(this);
        this.loginUsernameChangeHandler = this.loginUsernameChangeHandler.bind(this);
        this.signPasswordChangeHandler = this.signPasswordChangeHandler.bind(this);
        this.loginPasswordChangeHandler = this.loginPasswordChangeHandler.bind(this);
        this.signupAction = this.signupAction.bind(this);
        this.loginAction = this.loginAction.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
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
        const url = `/api/signup`;
        const that = this;
        if(this.state.signPassword===''||this.state.signUsername===''){
            this.setState({
                show:true,
                information:'注册信息未填写完整！'
            })
            return;
        }
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
            that.setState({
                show:true,
                information:data.msg
            })
        })
    }
    closeHandler(){
        this.setState({
            show:false
        })
    }
    loginAction() {
        const url = `/api/login`;
        const that = this;
        if(this.state.loginPassword===''||this.state.loginUsername===''){
            this.setState({
                show:true,
                information:'登录信息未填写完整！'
            })
            return;
        }
        fetch(url, {
            method: 'POST',
            // 设置这个header，才能正确parse
            credentials: 'include',
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
                console.log(data)
                that.setState({
                    show:true,
                    information:data.msg
                })
            }

        })
    }
    render(){
        const tabs = [
            {title:'登录'},
            {title:'注册'}
        ]
        return(
            <div>
                <WingBlank>
                    <Tabs tabs={tabs}>
                        <LoginForm name="登录"
                                   username={this.state.loginUsername}
                                   password={this.state.loginPassword}
                                   usernameChangeHandler={this.loginUsernameChangeHandler}
                                   passwordChangeHandler={this.loginPasswordChangeHandler}
                                   clickHandler={this.loginAction}
                        />
                        <LoginForm name="注册"
                                   username={this.state.signUsername}
                                   password={this.state.signPassword}
                                   usernameChangeHandler={this.signUsernameChangeHandler}
                                   passwordChangeHandler={this.signPasswordChangeHandler}
                                   clickHandler={this.signupAction}
                        />
                    </Tabs>
                </WingBlank>
                {
                    this.state.show&&<Layer closeHandler={this.closeHandler}>
                        <div className="test"
                             dangerouslySetInnerHTML={{__html: this.state.information}}></div>
                    </Layer>
                }
            </div>

        )
    }
}

export default LoginPage;