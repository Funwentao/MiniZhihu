import React,{Component} from 'react';

import { Tabs,WingBlank,WhiteSpace} from 'antd-mobile';
import LoginForm from './LoginForm';

class LoginPage extends Component{
    constructor(){
        super();
    }
    render(){
        const tabs = [
            {title:'登录'},
            {title:'注册'}
        ]
        return(
            <WingBlank>
                <Tabs tabs={tabs}>
                    <LoginForm name="登录"/>
                    <LoginForm name="注册"/>
                </Tabs>
            </WingBlank>
        )
    }
}

export default LoginPage;