import React,{Component} from 'react';
import Header from './Header';
import BottomBar from './BottomBar';
import ArticleList from './ArticleList';
import {Tabs} from 'antd-mobile';
import '../../less/index.less';
import EmptyContent from './EmptyContent';

class Index extends Component{
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
        const tabs = [
            {title:'最新'},
            {title:'最热'}
        ];
        const {length} = this.state.articles;
        return(
            <div>
                <Header/>
                <div className="tab-content">
                    <Tabs tabs={tabs}>
                        {length?<ArticleList articles={this.state.articles}/>:<EmptyContent/>}
                        {length?<ArticleList articles={this.state.articles}/>:<EmptyContent/>}
                    </Tabs>
                </div>
                <BottomBar selected="index"/>
            </div>
        )

    }
}
export default Index;