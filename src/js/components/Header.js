import React,{Component} from 'react';
import ReactSVG from 'react-svg';
import '../../less/header.less';


class Header extends Component{
    render(){
        return(
            <div className="search-content">
                <input type="text" placeholder="搜索内容" id="search_input"/>
                <a href="javascript:;" id="questions"><ReactSVG
                    path="../../svg/edit.svg"
                    callback={svg => console.log(svg)}
                    className="edit-svg"
                /> 提问</a>
            </div>
        )

    }
}
export default Header;