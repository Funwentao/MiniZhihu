import React,{Component} from 'react';
import Header from './Header';
import BottomBar from './BottomBar';
import ArticleList from './ArticleList';
import {Tabs} from 'antd-mobile';
import '../../less/index.less';
import EmptyContent from './EmptyContent';
import Write from './Write';
import fetch from 'isomorphic-fetch';

class Index extends Component{
    constructor(){
        super();
        this.state = {
            write:false,
            title:'',
            content:'',
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
        this.clickHandler = this.clickHandler.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.publishHandler = this.publishHandler.bind(this);
    }
    clickHandler(){
        this.setState({
            write:!this.state.write
        })
    }
    publishHandler(){
        const url = '/api/publishQuestion';
        fetch(url,{
            method: 'POST',
            // 设置这个header，才能正确parse
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                content: this.state.content,
                author:sessionStorage.getItem('__username__')
            }),
            mode: 'cors'
        }).then(function(response){
            return response.json();
        }).then(function(data){

        })
    }
    contentChange(e){
        this.setState({
            content:e.target.value
        })
    }
    titleChange(e){
        this.setState({
            title:e.target.value
        })
    }
    render(){
        const tabs = [
            {title:'最新'},
            {title:'最热'}
        ];
        const {length} = this.state.articles;
        return(
            <div>
                <Header clickHandler={this.clickHandler}/>
                <div className="tab-content">
                    <Tabs tabs={tabs}>
                        {length?<ArticleList articles={this.state.articles}/>:<EmptyContent/>}
                        {length?<ArticleList articles={this.state.articles}/>:<EmptyContent/>}
                    </Tabs>
                </div>
                <BottomBar selected="index"/>
                {this.state.write&&<Write clickHandler={this.clickHandler}
                                          publishHandler = {this.publishHandler}
                                          title={this.state.title}
                                          titleChange = {this.titleChange}
                                          contentChange = {this.contentChange}
                                          content={this.state.content}/>}
            </div>
        )

    }
}
export default Index;