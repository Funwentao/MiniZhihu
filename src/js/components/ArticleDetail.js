import React,{Component} from 'react';
import fetch from 'isomorphic-fetch';
import ReactSVG from 'react-svg';
import '../../less/article_detail.less';
import Layer from './Layer';

class ArticleDetail extends Component{
    constructor(){
        super();
        this.state = {
            headPic:'',
            title:'',
            content:'',
            be_collected:123,
            type:'article',
            like:true,
            collection:true,
            answer:[],
            show:true,
            information:'',
            layer:false,
            username:''
        };
        this._loadData = this._loadData.bind(this);
        this.showHandler = this.showHandler.bind(this);
        this.publish = this.publish.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
        this.likeHandler = this.likeHandler.bind(this);
        this.collectHandler = this.collectHandler.bind(this);
    }
    _loadData(){
        const that = this;
        const username = sessionStorage.getItem('__username__');
        const url = '/api' + location.href.match(/\/article_detail\S*/)[0] +'&username=' + username;
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
                    like:data.like,
                    be_collected:data.article.be_collect?data.article.be_collect:0,
                    title:data.article.title,
                    content:data.article.content,
                    collection:data.collect,
                    answer:data.article.comments?data.article.comments:data.article.answer,
                    headPic:data.headPic,
                    type:data.article.type,
                    username:data.username
                })
            }
        })
    }
    showHandler(){
        this.setState({
            show:!this.state.show
        })
    }
    componentDidMount(){
        this._loadData();
    }
    closeHandler(){
        this.setState({
            layer:!this.state.layer
        })
    }
    publish(){
        const that = this;
        const comment = this.text.value;
        const _id = location.href.match(/\/article_detail\S*\?/)[0].split('/')[2].slice(0,-1);
        const username = sessionStorage.getItem('__username__');
        const type = location.href.match(/type\S*/)[0].split('=')[1];
        const url = '/api/publish_comment' + '?_id=' + _id + '&username=' + username + '&comment=' + comment + '&type=' + type;
        if(!comment.trim()){
            this.setState({
                layer:true,
                information:'评论内容不能为空'
            });
            return;
        }
        fetch(url,{
            method: 'POST',
            // 设置这个header，才能正确parse
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(function (response) {
           return response.json()
        }).then(function(data){
            if(data.status===1){
                that.setState({
                    show:true,
                    information:data.msg,
                    layer:true
                });
                that._loadData();
            }
        })
    }
    collectHandler(){
        const that = this;
        const _id = location.href.match(/\/article_detail\S*\?/)[0].split('/')[2].slice(0,-1);
        const username = sessionStorage.getItem('__username__');
        const url = '/api/collect' + '?_id=' + _id + '&username=' + username;
        fetch(url,{
            method: 'GET',
            // 设置这个header，才能正确parse
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(function(response){
            return response.json();
        }).then(function (data) {
            that.setState({
                show:true,
                information:data.msg,
                layer:true
            });
            that._loadData();
        })
    }
    likeHandler(){
        const that = this;
        const username = sessionStorage.getItem('__username__');
        const writer = this.state.username;
        const url = '/api/like' + '?username=' + username + '&writer=' + writer;
        fetch(url,{
            method: 'GET',
            // 设置这个header，才能正确parse
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if(data.status === 1){
                that._loadData();
                that.setState({
                    layer:true,
                    information:data.msg
                })
            }
        })
    }
    render(){
        return(
            <div>
                <div className="fixed-content">
                    <div className="author-tips">
                        <a href="javascript:;" id="back-btn" onClick={()=>window.history.back()}><ReactSVG
                            path="../../svg/arrow.svg"
                            className="arrow-svg"
                        /></a>
                        <img src={this.state.headPic}/>
                        <span>{this.state.username}</span>
                        <a href="javascript:;" className={this.state.like?'gray-btn':'blue-btn'} onClick={this.likeHandler}>{this.state.like?'取消关注':'关注'}</a>
                    </div>
                    <div className="article-content">
                        <div className="pd">
                            <h1>{this.state.title}</h1>
                            <p>{this.state.content}</p>
                            <div className="tips">
                                <span>{this.state.be_collected} 人收藏</span>
                                <span>{this.state.answer.length} 条{this.state.type==='article'?'评论':'回答'}</span>
                                <a href="javascript:;" 
                                   id="collect-btn" 
                                   className={this.state.collection?'gray-btn':'blue-btn'}
                                   onClick={this.collectHandler}
                                >{this.state.collection?'取消收藏':'收藏'}</a>
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
                                    <a href="javascript:;" className="btn right" onClick={this.publish}>发布</a>
                                </div>
                                <textarea id="comment-detail" ref={(text)=>this.text = text}/>
                            </div>
                        }

                    </div>
                </div>
                <div className="answer-content">
                    {
                        this.state.answer.map(function (e,i) {
                            return(
                                <div className="answer-item" key={i}>
                                    <div className="answer-tips">
                                        <img src={e.headPic}/>
                                        <span>{e.username}</span>
                                        <span>{e.time}</span>
                                    </div>
                                    <p className="answer-content">{e.content}</p>
                                </div>
                            )
                        })
                    }
                    {
                        !this.state.answer.length&&<div className="no-comment">
                            {this.props.answer?'暂无回答...':'暂无评论...'}
                        </div>
                    }
                </div>
                {
                    this.state.layer&&<Layer closeHandler={this.closeHandler}>
                        <div className="test"
                             dangerouslySetInnerHTML={{__html: this.state.information}}></div>
                    </Layer>
                }
            </div>
        )
    }
}

export default ArticleDetail;