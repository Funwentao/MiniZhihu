import React,{Component} from 'react';
import BottomBar from './BottomBar';
import ArticleList from './ArticleList';
import EmptyContent from './EmptyContent';


class CollectionPage extends Component{
    constructor(){
        super();
        this.state = {
            articles:[]
        };
        this._loadData = this._loadData.bind(this);
    }
    _loadData(){
        const that = this;
        const username = sessionStorage.getItem('__username__');
        const url = '/api/getCollections' + '?username=' + username;
        fetch(url,{
            method: 'GET',
            // 设置这个header，才能正确parse
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(function(resopnse){
            return resopnse.json();
        }).then(function(data){
            if(data.status===1){
                that.setState({
                    articles:data.collections
                })
            }
        })

    }
    componentDidMount(){
        this._loadData();
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