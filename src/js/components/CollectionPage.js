import React,{Component} from 'react';
import BottomBar from './BottomBar';
import ArticleList from './ArticleList';
import EmptyContent from './EmptyContent';


class CollectionPage extends Component{
    constructor(){
        super();
        this.state = {
            articles:[
                // {
                //     title:"这个优秀的演员终于红了",
                //     content:"这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了",
                //     type:"文章",
                //     time:"2018-1-26 1:31",
                //     agreement:4682,
                //     comments:465
                // }
            ]
        }
    }
    render(){
        const {length} = this.state.articles;
        return(
            <div>
                <ArticleList articles={this.state.articles}/>
                {!length&&<EmptyContent/>}
                <BottomBar selected="collection"/>
            </div>
        )

    }
}
export default CollectionPage;