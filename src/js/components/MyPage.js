import React,{Component} from 'react';
import BottomBar from './BottomBar';
import {List,Button} from 'antd-mobile';
import '../../less/my.less';
import Layer from './Layer';
import fetch from 'isomorphic-fetch';


class MyPage extends Component{
    constructor(){
        super();
        if(!sessionStorage.getItem('__username__')){
            location.href = '/';
            return;
        }
        this.state = {
            pic:'',
            username:'',
            like:0,
            beLiked:0,
            show:false,
            tempPic:'',
            al:0,
            ql:0,
            cl:0,
            anl:0
        }
        this.editHandler = this.editHandler.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    logoutHandler(){
        sessionStorage.removeItem('__username__');
        location.href = '/';
    }
    editHandler(){
        this.setState({
            show:!this.state.show
        })
    }
    uploadHandler(e){
        const that = this;
        e.preventDefault();
        const url = `/api/upload`;
        const file = e.target.files[0];

        let formData = new FormData();
        try{
            if(formData.set){
                formData.set('file',file);
            }else{
                formData.append('file',file);
            }
        }catch (e){
            console.log(e.message);
        }
        fetch(url, {
            method: 'POST',
            body:formData,
            mode: 'cors'
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            if(data.status === 1) {
                that.setState({
                    tempPic:'/img/'+data.path
                })
            }
        })
    }
    submitHandler(){
        const that = this;
        const url = '/api/updateInformation';
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                oldName:sessionStorage.getItem('__username__'),
                newName:this.usernameInput.value,
                pic:document.querySelector('#tempPic').src,
                password:this.passwordInput.value
            }),
            mode:'cors'
        }).then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data.msg);
            sessionStorage.setItem('__username__',that.usernameInput.value);
            that.setState({
                pic:that.state.tempPic,
                username:that.usernameInput.value,
                show:false
            })
        })
    }
    componentDidMount(){
        const username = sessionStorage.getItem('__username__');
        const that = this;
        const url = '/api/getInformation' + '?username=' + username;
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode:'cors'
        }).then(function(response){
            return response.json();
        }).then(function(data){
            const {headPic,al,ql,ll,bl,cl,anl} = data;
            that.setState({
                like:ll,
                beLiked:bl,
                pic:headPic,
                tempPic:headPic,
                username:username,
                al:al,
                ql:ql,
                cl:cl,
                anl:anl
            })
        })
    }
    render(){
        return(
            <div>
                <div className="person">
                    <div className="head-pic">
                        <img src={this.state.pic}/>
                        <span>{this.state.username}</span>
                    </div>
                    <div className="tip">
                        <div className="tip-item">
                            <p className="bold">{this.state.like}</p>
                            <p className="gray">关注</p>
                        </div>
                        <div className="tip-item">
                            <p className="bold">{this.state.beLiked}</p>
                            <p className="gray">关注者</p>
                        </div>
                        <div className="big-tip-item">
                            <a href="javascript:;" className="btn" onClick={this.editHandler}>编辑</a>
                        </div>
                    </div>
                </div>
                <div className="information">
                    <List>
                        <List.Item>原创文章<span  className="right">{this.state.al}</span></List.Item>
                        <List.Item>我的提问<span  className="right">{this.state.ql}</span></List.Item>
                        <List.Item>我的关注<span  className="right">{this.state.like}</span></List.Item>
                        <List.Item>我的回答<span  className="right">{this.state.anl}</span></List.Item>
                        <List.Item>我的收藏<span  className="right">{this.state.cl}</span></List.Item>
                    </List>
                </div>
                <div className="logout" onClick={this.logoutHandler}>
                    退出登录
                </div>
                <BottomBar selected="my"/>
                {
                    this.state.show&&<Layer closeHandler={this.editHandler}>
                        <div className="layer-item">
                            <img src={this.state.tempPic} className="pic" id="tempPic"/>
                            <input type="file" className="file-upload" accept="image/*" onChange={this.uploadHandler}/>
                        </div>
                        <div className="layer-item">
                            用户名:&emsp;<input type="text" defaultValue={this.state.username} className="name-input" ref={(usernameInput)=>{this.usernameInput = usernameInput}}/>
                        </div>
                        <div className="layer-item">
                            密&emsp;码:&emsp;<input type="password"  className="name-input" ref={(passwordInput)=>{this.passwordInput = passwordInput}}/>
                        </div>
                        <div className="layer-item">
                            <Button type="primary" inline size="small" onClick={this.submitHandler}>提交</Button>
                        </div>
                    </Layer>
                }
            </div>
        )

    }
}
export default MyPage;