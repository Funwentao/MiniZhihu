import React,{Component} from 'react';
import Header from './Header';
import BottomBar from './BottomBar';
import ArticleList from './ArticleList';
import {Tabs} from 'antd-mobile';
import '../../less/index.less';
import EmptyContent from './EmptyContent';
import Write from './Write';
import fetch from 'isomorphic-fetch';
import Layer from './Layer';

class Index extends Component{
    constructor(){
        super();
        this.state = {
            write:false,
            show:false,
            title:'',
            content:'',
            information:'',
            all:[]
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.publishHandler = this.publishHandler.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
        this._loadContent = this._loadContent.bind(this);
    }
    clickHandler(){
        this.setState({
            write:!this.state.write
        })
    }
    publishHandler(){
        if(!this.state.title){
            this.setState({
                show:true,
                information:'至少要填写问题'
            });
            return;
        }
        const url = '/api/publishQuestion';
        const that = this;
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
            if(data.status === 1){
                that.setState({
                    title:'',
                    content:'',
                    write:false,
                    information:data.msg,
                    show:true
                });
                that._loadContent();
            }
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
    closeHandler(){
        this.setState({
            show:false
        })
    }
    _loadContent() {
        const that = this;
        const url = '/api/getAll';
        fetch(url, {
            method: 'GET',
            // 设置这个header，才能正确parse
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            that.setState({
                all:data.all
            })
        })
    }
    componentDidMount(){
        this._loadContent();
    }
    render(){
        const tabs = [
            {title:'最新'},
            {title:'最热'}
        ];
        const {length} = this.state.all;
        return(
            <div>
                <Header clickHandler={this.clickHandler}/>
                <div className="tab-content">
                    <Tabs tabs={tabs}>
                        {length?<ArticleList articles={this.state.all}/>:<EmptyContent/>}
                        {length?<ArticleList articles={this.state.all}/>:<EmptyContent/>}
                    </Tabs>
                </div>
                <BottomBar selected="index"/>
                {
                    this.state.show&&<Layer closeHandler={this.closeHandler}>
                        <div className="test"
                             dangerouslySetInnerHTML={{__html: this.state.information}}></div>
                    </Layer>
                }
                {this.state.write&&<Write clickHandler={this.clickHandler}
                                          tips="提问"
                                          placeholder1="输入问题并以问号结尾"
                                          palceholder="问题描述(选填)"
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