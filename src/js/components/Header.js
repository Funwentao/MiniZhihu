import React,{Component} from 'react';
import ReactSVG from 'react-svg';
import '../../less/header.less';
import PropTypes from 'prop-types'


class Header extends Component{
    static Proptypes = {
        clickHandler:PropTypes.func.isRequired
    }
    render(){
        return(
            <div className="search-content">
                <input type="text" placeholder="搜索内容" id="search_input"/>
                <a href="javascript:;" id="questions" onClick={this.props.clickHandler}><ReactSVG
                    path="../../svg/edit.svg"
                    className="edit-svg"
                /> 提问</a>
            </div>
        )

    }
}
export default Header;