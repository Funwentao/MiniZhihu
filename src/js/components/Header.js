import React,{Component} from 'react';

class Header extends Component{
    render(){
        return(
            <div className="search-content">
                <input type="text" placeholder="搜索内容" id="search_input"/>
                <a href="javascript:;" id="questions">提问</a>
            </div>
        )

    }
}
export default Header;