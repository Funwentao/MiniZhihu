import React,{Component} from 'react';
import '../../less/write.less';

class Write extends  Component{
    componentDidMount(){
        const dom = document.querySelector('#write-content');
        dom.style.height = (window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight) + 'px';
        dom.style.width = (window.innerWidth||document.body.clientWidth||document.documentElement.clientWidth) + 'px';
    }
    render(){
        return(
            <div id="write-content">
                <div className="header">
                    <a href="javascript:;" className="blue" id="cancel" onClick={this.props.clickHandler}>取消</a>
                    <span className="tips">{this.props.tips}</span>
                    <a href="javascript:;" className="blue" id="publish" onClick={this.props.publishHandler}>发布</a>
                </div>
                <input type="text"
                       id="title"
                       placeholder={this.props.placeholder1}
                       value={this.props.title}
                       onChange={this.props.titleChange}/>
                <textarea placeholder={this.props.palceholder}
                          id="content"
                          value={this.props.content}
                          onChange={this.props.contentChange}/>
            </div>
        )
    }
}

export default Write;