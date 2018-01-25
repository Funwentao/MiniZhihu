import React,{Component} from 'react';
import { List, InputItem,Button } from 'antd-mobile';

class LoginForm extends Component{
    render(){
        return(
            <List>
                <InputItem>账户</InputItem>
                <InputItem type="password">密码</InputItem>
                <List.Item>
                    <Button>{this.props.name}</Button>
                </List.Item>
            </List>
        )
    }
}

export default LoginForm;