import React,{Component} from 'react';
import '../../less/article_header.less';
import ReactSVG from 'react-svg';

class ArticleHeader extends Component{
    render() {
        return (
            <div className="article-header">
                <a href="javascript:;" id="back-btn" onClick={()=>window.history.back()}><ReactSVG
                    path="../../svg/arrow.svg"
                    className="arrow-svg"
                /></a>
                <a href="javascript:;" id="add-btn" onClick={this.props.clickHandler}>新增 <ReactSVG
                    path="../../svg/edit.svg"
                    className="edit-svg"
                /></a>
            </div>
        )
    }
}
export default ArticleHeader;