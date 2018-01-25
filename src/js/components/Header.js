import React,{Component} from 'react';

class Header extends Component{
    render(){
        return(
            <div>
                <input type="text" placeholder="搜索内容"/>
                <a href="javascript:;">提问</a>
            </div>
        )

    }
}
export default Header;