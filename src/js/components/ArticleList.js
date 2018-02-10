import React,{Component} from 'react';
import PropTypes from 'prop-types';
import '../../less/article.less';

class ArticleList extends Component{
    static propTypes = {
        articles: PropTypes.array.isRequired
    }
    render(){
        return(
            <div className="article-list">
                {
                   this.props.articles.map((e,i)=>{
                       return(
                           <article key={i} className="article">
                               <h1 className="title">{e.title}</h1>
                               <p className="content">{e.content}</p>
                               <div className="tips">
                                   <span className="type">{e.type==='article'?'文章':'问题'}</span>
                                   <span className="time ml">{new Date(e.create_time).toLocaleString()}</span>
                                   {e.agreement!=undefined&&<span className="agree ml">{e.agreement} 赞同</span>}
                                   {e.comments&&<span className="comment ml">{e.comments.length} 评论</span>}
                                   {e.answer&&<span className="comment ml">{e.answer.length} 回答</span>}
                               </div>
                           </article>
                       )
                   })
                }
            </div>

        )
    }
}
export default ArticleList;