import React,{Component} from 'react';
import fetch from 'isomorphic-fetch';
import ReactSVG from 'react-svg';
import '../../less/article_detail.less';

class ArticleDetail extends Component{
    constructor(){
        super();
        this.state = {
            title:'一个人智商高有多可怕',
            content:'静安寺放假了肯德基傅雷家书打疯了',
            collect:123,
            answerNum:123,
            type:'article',
            answer:[],
            show:true
        };
        this._loadData = this._loadData.bind(this);
        this.showHandler = this.showHandler.bind(this);
    }
    _loadData(){
        const that = this;
        const url = '/api/getArticleDetail' + '?aid=' ;
        fetch(url,{
            method: 'GET',
            // 设置这个header，才能正确parse
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.status === 1){
                that.setState({
                    title:data.title,
                    content:data.content,
                    collect:data.collect,
                    answerNum:data.answerNum,
                    answer:data.answer
                })
            }
        })
    }
    showHandler(){
        this.text.focus();
        this.setState({
            show:!this.state.show
        })
    }
    componentDidMount(){
        this._loadData();
    }
    render(){
        return(
            <div>
                <div className="article-content">
                    <div className="pd">
                        <h1>{this.state.title}</h1>
                        <p>{this.state.content}</p>
                        <div className="tips">
                            <span>{this.state.answerNum} 人收藏</span>
                            <span>{this.state.collect} 条{this.state.type==='article'?'评论':'回答'}</span>
                            <a href="javascript:;" id="collect-btn">收藏问题</a>
                        </div>
                    </div>
                    {
                        this.state.show&&<a href="javascript:;" id="comment-btn" onClick={this.showHandler}><ReactSVG
                            path="../../svg/edit.svg"
                            className="edit-svg"
                        /> 添加{this.state.type==='article'?'评论':'回答'}</a>
                    }
                    {
                        !this.state.show&&<div>
                            <div className="comment-content">
                                <a href="javascript:;" className="btn" onClick={this.showHandler}>取消</a>
                                <a href="javascript:;" className="btn right">发布</a>
                            </div>
                            <textarea id="comment-detail" ref={(text)=>this.text = text}/>
                        </div>
                    }

                </div>
                <div className="answer-content">
                    {
                        this.state.answer.map(function (e) {
                            return(
                                <div className="answer-item">
                                    <div className="answer-tips">
                                        <img src={e.headPic}/>
                                        <span>{e.username}</span>
                                    </div>
                                    <p className="answer-content">{e.content}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ArticleDetail;