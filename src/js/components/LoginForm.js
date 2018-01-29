import React,{Component} from 'react';
import { List, InputItem,Button } from 'antd-mobile';
import PropTypes from 'prop-types';

class LoginForm extends Component{
    static propTypes = {
        clickHandler:PropTypes.func.isRequired,
        name:PropTypes.string.isRequired,
        username:PropTypes.string.isRequired,
        password:PropTypes.string.isRequired,
        usernameChangeHandler:PropTypes.func.isRequired,
        passwordChangeHandler:PropTypes.func.isRequired
    }
    constructor(props){
        super(props);
    }
    render(){
        return(
            <List>
                <InputItem value={this.props.username} onChange={this.props.usernameChangeHandler}>账户</InputItem>
                <InputItem value={this.props.password} onChange={this.props.passwordChangeHandler} type="password">密码</InputItem>
                <List.Item>
                    <Button onClick={this.props.clickHandler}>{this.props.name}</Button>
                </List.Item>
            </List>
        )
    }
}

export default LoginForm;