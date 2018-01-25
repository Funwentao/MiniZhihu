import React,{Component} from 'react';
import PropTypes from 'prop-types';

class ArticleList extends Component{
    static propTypes = {
        articles: PropTypes.array
    }
    render(){
        return(
            <div>
                {
                   this.props.articles.map((e,i)=>{
                       return(
                           <article key={i}>
                               <h1 className="title">{e.title}</h1>
                               <p className="content">{e.content}</p>
                               <div>
                                   <span>{e.type}</span>
                                   <span>{e.time}</span>
                                   <span>{e.agreement}赞同</span>
                                   <span>{e.comments}</span>
                               </div>
                           </article>
                       )
                   })
                }
            </div>

        )
    }
}