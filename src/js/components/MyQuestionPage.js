import React, {Component} from 'react';
import ArticleList from './ArticleList';
import fetch from 'isomorphic-fetch';
import EmptyContent from './EmptyContent';
import '../../less/questions.less';
import ArticleHeader from './ArticleHeader';
import Write from './Write';
import Layer from './Layer'



class MyQuestionPage extends Component{
    constructor(){
        super();
        this.state={
            show:false,
            write:false,
            title:'',
            content:'',
            questions:[]
        }
        this.writeHandler = this.writeHandler.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.publishHandler = this.publishHandler.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
    }
    writeHandler(){
        this.setState({
            write:!this.state.write
        })
    }
    _loadQuestions(){
        const that = this;
        const username = sessionStorage.getItem('__username__');
        const url = '/api/getQuestions'+ '?username=' + username;
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode:'cors'
        }).then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);
            if(data.status === 1){
                that.setState({
                    questions:data.questions
                })
            }
        })
    }
    componentDidMount(){
        this._loadQuestions();
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
                })
                that._loadQuestions();
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
    render(){
        const {length} = this.state.questions;
        return(
            <div>
                <ArticleHeader clickHandler={this.writeHandler}/>
                <ArticleList articles={this.state.questions} />
                {
                    !length&&<EmptyContent/>
                }
                {
                    this.state.write&&<Write clickHandler={this.writeHandler}
                                             tips="提问"
                                             placeholder1="输入问题并以问号结尾"
                                             palceholder="问题描述(选填)"
                                             publishHandler = {this.publishHandler}
                                             title={this.state.title}
                                             titleChange = {this.titleChange}
                                             contentChange = {this.contentChange}
                                             content={this.state.content}/>
                }
                {
                    this.state.show&&<Layer closeHandler={this.closeHandler}>
                        <div className="test"
                             dangerouslySetInnerHTML={{__html: this.state.information}}></div>
                    </Layer>
                }
            </div>
        )
    }
}

export default MyQuestionPage;