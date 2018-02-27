import React,{Component} from 'react';
import fetch from 'isomorphic-fetch';
import ReactSVG from 'react-svg';
import '../../less/article_detail.less';

class ArticleDetail extends Component{
    constructor(){
        super();
        this.state = {
            headPic:'',
            title:'一个人智商高有多可怕',
            content:'静安寺放假了肯德基傅雷家书打疯了',
            be_collected:123,
            type:'article',
            like:true,
            collection:true,
            answer:[{
                headPic:'../img/810438.jpg',
                username:'fun',
                content:'就放假弗兰克斯的解放路圣诞节',
                time:'2018/10/2 16:8'
            },{
                headPic:'../img/810438.jpg',
                username:'fun',
                content:'就放假弗兰克斯的解放路圣诞节',
                time:'2018/10/2 16:8'
            },{
                headPic:'../img/810438.jpg',
                username:'fun',
                content:'就放假弗兰克斯的解放路圣诞节',
                time:'2018/10/2 16:8'
            },{
                headPic:'../img/810438.jpg',
                username:'fun',
                content:'就放假弗兰克斯的解放路圣诞节',
                time:'2018/10/2 16:8'
            },{
                headPic:'../img/810438.jpg',
                username:'fun',
                content:'就放假弗兰克斯的解放路圣诞节',
                time:'2018/10/2 16:8'
            },{
                headPic:'../img/810438.jpg',
                username:'fun',
                content:'就放假弗兰克斯的解放路圣诞节',
                time:'2018/10/2 16:8'
            }],
            show:true
        };
        this._loadData = this._loadData.bind(this);
        this.showHandler = this.showHandler.bind(this);
        this.publish = this.publish.bind(this);
    }
    _loadData(){
        const that = this;
        const url = '/api' + location.href.match(/\/article_detail\S*/)[0] ;
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
                    answer:data.article.comments||data.article.answer,
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
    publish(){
        const comment = this.text.value;
        const url = '/api/publish_comment';
        fetch(url,{
            method: 'POST',
            // 设置这个header，才能正确parse
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
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
                        <a href="javascript:;" className={this.state.like?'gray-btn':'blue-btn'}>{this.state.like?'取消关注':'关注'}</a>
                    </div>
                    <div className="article-content">
                        <div className="pd">
                            <h1>{this.state.title}</h1>
                            <p>{this.state.content}</p>
                            <div className="tips">
                                <span>{this.state.be_collected} 人收藏</span>
                                <span>{this.state.answer.length} 条{this.state.type==='article'?'评论':'回答'}</span>
                                <a href="javascript:;" id="collect-btn" className={this.state.collection?'gray-btn':'blue-btn'}>{this.state.collection?'取消收藏':'收藏'}</a>
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
            </div>
        )
    }
}

export default ArticleDetail;