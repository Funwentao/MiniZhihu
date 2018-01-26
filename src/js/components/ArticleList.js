import React,{Component} from 'react';
import PropTypes from 'prop-types';

class ArticleList extends Component{
    static propTypes = {
        articles: PropTypes.array
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
                                   <span className="type">{e.type}</span>
                                   <span className="time ml">{e.time}</span>
                                   <span className="agree ml">{e.agreement} 赞同</span>
                                   <span className="comment ml">{e.comments} 评论</span>
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