import React,{Component} from 'react';
import Header from './Header';
import BottomBar from './BottomBar';
import ArticleList from './ArticleList';
import {WingBlank} from 'antd-mobile';
import '../../less/index.less';


class Index extends Component{
    constructor(){
        super();
        this.state = {
            articles:[
                {
                    title:"这个优秀的演员终于红了",
                    content:"这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了",
                    type:"文章",
                    time:"2018-1-26 1:31",
                    agreement:4682,
                    comments:465
                },
                {
                    title:"这个优秀的演员终于红了",
                    content:"这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了",
                    type:"文章",
                    time:"2018-1-26 1:31",
                    agreement:4682,
                    comments:465
                },
                {
                    title:"这个优秀的演员终于红了",
                    content:"这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了",
                    type:"文章",
                    time:"2018-1-26 1:31",
                    agreement:4682,
                    comments:465
                },
                {
                    title:"这个优秀的演员终于红了",
                    content:"这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了",
                    type:"文章",
                    time:"2018-1-26 1:31",
                    agreement:4682,
                    comments:465
                },
                {
                    title:"这个优秀的演员终于红了",
                    content:"这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了",
                    type:"文章",
                    time:"2018-1-26 1:31",
                    agreement:4682,
                    comments:465
                },
                {
                    title:"这个优秀的演员终于红了",
                    content:"这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了",
                    type:"文章",
                    time:"2018-1-26 1:31",
                    agreement:4682,
                    comments:465
                },
                {
                    title:"这个优秀的演员终于红了",
                    content:"这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了",
                    type:"文章",
                    time:"2018-1-26 1:31",
                    agreement:4682,
                    comments:465
                },
                {
                    title:"这个优秀的演员终于红了",
                    content:"这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了这个优秀的演员终于红了",
                    type:"文章",
                    time:"2018-1-26 1:31",
                    agreement:4682,
                    comments:465
                }
            ]
        }
    }
    render(){
        return(
            <div>
                <Header/>
                <ArticleList articles={this.state.articles}/>
                <BottomBar/>
            </div>
        )

    }
}
export default Index;